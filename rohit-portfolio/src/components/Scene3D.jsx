import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls, Html, Stars } from "@react-three/drei";
import * as THREE from "three";

// single source of truth — change this ONE number if avatar is off
const RING_Y = -1.15;

// ── Room Model ─────────────────────────────────────────────
function RoomModel() {
  const { scene } = useGLTF("/room.glb");
  const ref = useRef();
  useFrame((s) => {
    ref.current.position.y = Math.sin(s.clock.getElapsedTime() * 0.4) * 0.03;
  });
  return <primitive ref={ref} object={scene} scale={0.7} position={[3, 2, -2]} />;
}

// ── Hotspot ────────────────────────────────────────────────
function Hotspot({ position, label, detail, color, isActive, onClick }) {
  return (
    <Html position={position} center distanceFactor={8}>
      <div onClick={onClick} style={{ cursor:"pointer", textAlign:"center", userSelect:"none" }}>
        <div style={{
          width:"13px", height:"13px", borderRadius:"50%",
          background:color, margin:"0 auto",
          boxShadow:`0 0 ${isActive?"18px":"8px"} ${color}`,
          border:`2px solid ${color}`,
          animation:"hspot 1.8s ease-in-out infinite",
        }}/>
        <div style={{
          fontFamily:"'Share Tech Mono',monospace", fontSize:"8px",
          letterSpacing:"2px", color, marginTop:"4px",
          textShadow:`0 0 6px ${color}`, whiteSpace:"nowrap",
        }}>{label}</div>
        {isActive && (
          <div style={{
            position:"absolute", bottom:"26px", left:"50%",
            transform:"translateX(-50%)",
            background:"rgba(2,4,9,0.96)",
            border:`1px solid ${color}`,
            padding:"10px 14px", borderRadius:"4px",
            width:"175px", textAlign:"center",
            fontFamily:"'Rajdhani',sans-serif",
            fontSize:"12px", color:"#c8e6f5", lineHeight:"1.6",
            boxShadow:`0 0 18px ${color}35`, zIndex:10,
          }}>{detail}</div>
        )}
      </div>
    </Html>
  );
}

// ── Avatar ─────────────────────────────────────────────────
function AvatarMesh({ color }) {
  const { scene } = useGLTF("/avatar.glb");
  const ref = useRef();

  const meshes = [];
  scene.traverse(c => { if (c.isMesh) meshes.push(c); });

  // ReadyPlayer.me avatars: feet at y ≈ -0.9 in local space at scale 1.2
  // RING_Y + 0.9 places feet exactly on the ring
  const FEET_OFFSET = RING_Y + 0.3;

  const uniforms = useRef({
    uTime:  { value: 0 },
    uColor: { value: new THREE.Color(color) },
  });

  useFrame((s) => {
    const t = s.clock.getElapsedTime();
    uniforms.current.uTime.value = t;
    uniforms.current.uColor.value.set(color);
    ref.current.rotation.y = t * 0.35;
    // gentle up/down float — small value so feet stay near ring
    ref.current.position.y = FEET_OFFSET + Math.sin(t * 0.7) * 0.04;
  });

  const vertexShader = `
    varying vec3 vPosition;
    varying vec3 vNormal;
    void main() {
      vPosition = position;
      vNormal   = normalize(normalMatrix * normal);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    uniform float uTime;
    uniform vec3  uColor;
    varying vec3  vPosition;
    varying vec3  vNormal;
    void main() {
      float scan  = step(0.5, fract(vPosition.y * 20.0 + uTime * 1.2));
      float scan2 = step(0.97, fract(vPosition.y * 90.0));
      vec3  vd      = normalize(cameraPosition - vPosition);
      float fresnel = pow(1.0 - clamp(dot(vd, vNormal), 0.0, 1.0), 2.5);
      float flicker = sin(uTime * 9.0) * 0.03 + sin(uTime * 25.0) * 0.02 + 1.0;
      float alpha   = scan * 0.3 + scan2 * 0.6 + fresnel * 1.0;
      alpha *= 0.9 * flicker;
      alpha  = clamp(alpha, 0.0, 1.0);
      vec3 fc = uColor * (0.8 + scan * 0.4 + fresnel * 0.6);
      gl_FragColor = vec4(fc, alpha);
    }
  `;

  return (
    <group ref={ref} position={[0, FEET_OFFSET, 0]} scale={1.5}>
      {meshes.map((mesh, i) => (
        <mesh
          key={i}
          geometry={mesh.geometry}
          position={mesh.position}
          rotation={mesh.rotation}
          scale={mesh.scale}
        >
          <shaderMaterial
            vertexShader={vertexShader}
            fragmentShader={fragmentShader}
            uniforms={uniforms.current}
            transparent
            side={THREE.DoubleSide}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
}

// ── Base Rings — always at RING_Y ───────────────────────────
function BaseRings({ color }) {
  const r1 = useRef(), r2 = useRef();
  useFrame((s) => {
    r1.current.rotation.z =  s.clock.getElapsedTime() * 0.7;
    r2.current.rotation.z = -s.clock.getElapsedTime() * 0.4;
  });
  return (
    <group position={[0, RING_Y, 0]} rotation={[Math.PI / 2, 0, 0]}>
      <mesh ref={r1}>
        <torusGeometry args={[0.58, 0.035, 16, 64]} />
        <meshBasicMaterial color={color} transparent opacity={0.85} side={THREE.DoubleSide} />
      </mesh>
      <mesh ref={r2}>
        <torusGeometry args={[0.74, 0.02, 16, 64]} />
        <meshBasicMaterial color={color} transparent opacity={0.35} side={THREE.DoubleSide} />
      </mesh>
      <mesh>
        <circleGeometry args={[0.72, 64]} />
        <meshBasicMaterial color={color} transparent opacity={0.07} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

// ── Orbit Particles — centred on RING_Y ────────────────────
function OrbitParticles({ color }) {
  const ref   = useRef();
  const count = 60;
  const pos   = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const a = (i / count) * Math.PI * 2;
    const r = 1.0 + Math.random() * 0.4;
    pos[i * 3]     = Math.cos(a) * r;
    pos[i * 3 + 1] = (Math.random() - 0.5) * 3.2;
    pos[i * 3 + 2] = Math.sin(a) * r;
  }
  useFrame((s) => { ref.current.rotation.y = s.clock.getElapsedTime() * 0.25; });
  return (
    <points ref={ref} position={[0, RING_Y, 0]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={pos} count={count} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color={color} size={0.022} transparent opacity={0.55} sizeAttenuation />
    </points>
  );
}

// ── MAIN EXPORT ─────────────────────────────────────────────
export default function Scene3D({ view, holoColor, roomHotspot, onRoomHotspot }) {
  return (
    <Canvas
      camera={
        view === "room"
          ? { position:[-36, 38, 25], fov:80  }
          : { position:[0,  0.5,  5], fov:52  }
      }
      gl={{ antialias:false, powerPreference:"high-performance", alpha:true }}
      dpr={[1, 1]}
      style={{ width:"100%", height:"100%", background:"transparent" }}
    >
      <Stars radius={80} depth={40} count={1200} factor={2} saturation={0} fade speed={0.4} />
      <ambientLight intensity={0.25} />
      <pointLight position={[2,   3,  2]} color={holoColor || "#00f5ff"} intensity={3}   />
      <pointLight position={[-2,  1, -1]} color={holoColor || "#00f5ff"} intensity={1.5} />
      <pointLight position={[0,  -1,  2]} color="#ffffff"                intensity={0.3} />

      <Suspense fallback={null}>

        {/* ── ROOM ── */}
        {view === "room" && (
          <>
            <RoomModel />
            {[
              { id:"monitor",   position:[4.7, 2,  -3.8], label:"MY SETUP",    detail:"ReactJS + VS Code. Where magic happens.", color:"#00f5ff" },
              { id:"bookshelf", position:[5.8, 2.5,  0],  label:"BOOKSHELF",   detail:"Clean Code, DDIA, Game Dev with Unity.",  color:"#ffd700" },
              { id:"lamp",      position:[-1,  2.8,-3.5], label:"LATE NIGHTS", detail:"Best code written after midnight ☕",      color:"#ff00aa" },
            ].map(h => (
              <Hotspot key={h.id} {...h}
                isActive={roomHotspot === h.id}
                onClick={() => onRoomHotspot(h.id)}
              />
            ))}
            <OrbitControls
              enablePan={false}
              minDistance={2} maxDistance={80}
              minPolarAngle={0.2} maxPolarAngle={Math.PI / 2.2}
              autoRotate autoRotateSpeed={0.2}
            />
          </>
        )}

        {/* ── HOLOGRAM ── */}
        {view === "hologram" && (
          <>
            {/* NO Float wrapper — keeps feet on ring */}
            <AvatarMesh color={holoColor} />
            <BaseRings color={holoColor} />
            <OrbitParticles color={holoColor} />

            <Html position={[1.5, 0.6, 0]} distanceFactor={6}>
              <div style={{
                fontFamily:"'Share Tech Mono',monospace", fontSize:"9px",
                letterSpacing:"1.5px", color:holoColor, lineHeight:"2",
                textShadow:`0 0 8px ${holoColor}`, whiteSpace:"nowrap",
                pointerEvents:"none",
              }}>
                <div style={{ opacity:0.45 }}>// IDENTITY</div>
                <div>NAME    :: ROHIT_PATIL</div>
                <div>ROLE    :: FULL_STACK_DEV</div>
                <div>STATUS  :: <span style={{ color:"#00ff88" }}>OPEN_TO_WORK</span></div>
                <div>DEGREE  :: M.Sc_CS_2025</div>
                <div style={{ opacity:0.45, margin:"6px 0 2px" }}>// SKILLS</div>
                <div>REACT   :: ████████░░</div>
                <div>NODE    :: ███████░░░</div>
                <div>PYTHON  :: ███████░░░</div>
                <div>DOCKER  :: ██████░░░░</div>
                <div>UNITY   :: █████░░░░░</div>
              </div>
            </Html>

            <OrbitControls
              enablePan={false} enableZoom={false}
              minPolarAngle={Math.PI / 3.5} maxPolarAngle={Math.PI / 1.7}
              autoRotate autoRotateSpeed={1.0}
            />
          </>
        )}

      </Suspense>
    </Canvas>
  );
}

useGLTF.preload("/room.glb");
useGLTF.preload("/avatar.glb");