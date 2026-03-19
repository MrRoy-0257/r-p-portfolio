import { useState } from "react";
import { motion } from "framer-motion";
import Scene3D from "./Scene3D";

export default function Room() {
  const [active, setActive] = useState(null);
  const toggle = (id) => setActive(p => p === id ? null : id);

  const hotspots = [
    { id:"monitor",   color:"#00f5ff", label:"MY SETUP"   },
    { id:"bookshelf", color:"#ffd700", label:"BOOKSHELF"  },
    { id:"lamp",      color:"#ff00aa", label:"LATE NIGHTS"},
  ];

  return (
    <section id="room" className="py-28 px-24">
      <style>{`
        @keyframes hspot{0%,100%{opacity:1}50%{opacity:0.5}}
      `}</style>

      <div className="section-label">// MY WORKSPACE</div>
      <h2 className="section-title text-5xl">3D ROOM</h2>
      <p className="mb-8" style={{
        fontFamily:"'Share Tech Mono',monospace",
        fontSize:"0.72rem", color:"#4a6a80", letterSpacing:"2px",
      }}>
        // DRAG TO ROTATE · SCROLL TO ZOOM · CLICK DOTS TO EXPLORE
      </p>

      <motion.div style={{
        height:"600px", width:"100%",
        border:"1px solid rgba(255,215,0,0.2)",
        borderRadius:"4px", overflow:"hidden",
        background:"linear-gradient(135deg,#020409,#050920)",
        position:"relative",
      }}
        whileInView={{opacity:1}} initial={{opacity:0}} transition={{duration:1}}>

        <Scene3D
          view="room"
          holoColor="#00f5ff"
          roomHotspot={active}
          onRoomHotspot={toggle}
        />

        <div style={{position:"absolute",top:"14px",left:"16px",fontFamily:"'Share Tech Mono',monospace",fontSize:"0.58rem",color:"#00f5ff",letterSpacing:"2px",opacity:0.7,pointerEvents:"none"}}>SCENE_01 :: DEV_ROOM</div>
        <div style={{position:"absolute",top:"14px",right:"16px",fontFamily:"'Share Tech Mono',monospace",fontSize:"0.58rem",color:"#ff00aa",letterSpacing:"2px",opacity:0.7,pointerEvents:"none"}}>ROHIT_PATIL :: 2025</div>
        <div style={{position:"absolute",bottom:"14px",left:"16px",fontFamily:"'Share Tech Mono',monospace",fontSize:"0.58rem",color:"#4a6a80",letterSpacing:"2px",pointerEvents:"none"}}>THREE.JS + BLENDER + REACT</div>
      </motion.div>

      <div className="flex flex-wrap gap-4 mt-6">
        {hotspots.map(h=>(
          <button key={h.id} onClick={()=>toggle(h.id)} style={{
            fontFamily:"'Share Tech Mono',monospace",
            fontSize:"0.62rem", letterSpacing:"2px",
            padding:"8px 16px", cursor:"none",
            background: active===h.id ? `${h.color}18` : "transparent",
            border:`1px solid ${active===h.id ? h.color : "rgba(255,255,255,0.1)"}`,
            color: active===h.id ? h.color : "#4a6a80",
            transition:"all 0.2s",
          }}>● {h.label}</button>
        ))}
      </div>
    </section>
  );
}