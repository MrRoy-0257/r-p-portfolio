import { motion } from "framer-motion";
import rohitImg from "../assets/rohit.jpg";

const stats = [["7+","PROJECTS"],["M.Sc.","CS 2025"],["8.00","B.SC CGPA"],["3","LANGUAGES"]];

export default function About() {
  return (
    <section id="about" className="py-28 px-24">
      <div className="section-label">// WHO I AM</div>
      <h2 className="section-title text-5xl">ABOUT ME</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mt-4">
        <div>
          {/* Photo + bio */}
          <div className="flex gap-8 items-start mb-8">
            <div className="relative flex-shrink-0">
              <img src={rohitImg} alt="Rohit Patil"
                className="w-36 h-36 object-cover rounded-full"
                style={{ border:"2px solid #00f5ff", boxShadow:"0 0 24px rgba(0,245,255,0.4)" }} />
              <div className="absolute -bottom-2 -right-2 px-3 py-1 text-xs"
                style={{ fontFamily:"'Share Tech Mono',monospace", background:"#020409", border:"1px solid #00ff88", color:"#00ff88", letterSpacing:"2px" }}>
                ● OPEN TO WORK
              </div>
            </div>
            <div>
              <p className="text-base leading-relaxed mb-3" style={{ color:"#4a6a80" }}>
                I'm <strong style={{ color:"#00f5ff" }}>Rohit Sanjay Patil</strong>, a fresher Full Stack Engineer
                with an <strong style={{ color:"#00f5ff" }}>M.Sc. in CS (2025)</strong>.
              </p>
              <p className="text-base leading-relaxed mb-3" style={{ color:"#4a6a80" }}>
                Stack: <strong style={{ color:"#00f5ff" }}>ReactJS, NodeJS, Flask, MongoDB, AWS ECS</strong>.
                Passionate about microservices, CI/CD & AI.
              </p>
              <p className="text-base leading-relaxed" style={{ color:"#4a6a80" }}>
                Also into <strong style={{ color:"#00f5ff" }}>game dev</strong> (Unity & Godot), Blender 3D, dance & cricket.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {stats.map(([num,lbl]) => (
              <motion.div key={lbl} className="card p-6"
                whileInView={{ opacity:1, y:0 }} initial={{ opacity:0, y:20 }} transition={{ duration:0.5 }}
                style={{ position:"relative", paddingLeft:"20px" }}>
                <div style={{ position:"absolute", left:0, top:0, width:"3px", height:"100%", background:"linear-gradient(180deg,#00f5ff,#ff00aa)" }} />
                <div style={{ fontFamily:"'Orbitron',monospace", fontSize:"1.8rem", fontWeight:900, background:"linear-gradient(90deg,#00f5ff,#ffd700)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>{num}</div>
                <div style={{ fontSize:"0.75rem", color:"#4a6a80", letterSpacing:"2px", marginTop:"4px" }}>{lbl}</div>
              </motion.div>
            ))}
          </div>

          {/* Personal details */}
          <div className="card p-6">
            <div style={{ fontFamily:"'Orbitron',monospace", fontSize:"0.75rem", color:"#ffd700", letterSpacing:"3px", marginBottom:"16px" }}>PERSONAL DETAILS</div>
            {[
              ["DOB","19th September 2001"],
              ["Nationality","Indian · Male"],
              ["Languages","English, Hindi, Marathi"],
              ["Hobbies","Dance, Gaming, Music, Cricket, Travelling"],
              ["Address","Narsinh Nagar, Khanapur Fata, Parbhani – 431401"],
            ].map(([k,v]) => (
              <div key={k} className="flex gap-4 mb-2 text-sm">
                <span style={{ color:"#4a6a80", fontFamily:"'Share Tech Mono',monospace", fontSize:"0.7rem", minWidth:"80px" }}>{k}</span>
                <span style={{ color:"#c8e6f5" }}>{v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CSS 3D Cube — no WebGL needed! */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"center", height:"380px" }}>
          <style>{`
            .cube-scene { width:180px; height:180px; perspective:500px; }
            .cube { width:100%; height:100%; position:relative; transform-style:preserve-3d; animation:rotateCube 12s linear infinite; }
            @keyframes rotateCube { from{transform:rotateX(-20deg) rotateY(0deg)} to{transform:rotateX(-20deg) rotateY(360deg)} }
            .face {
              position:absolute; width:180px; height:180px;
              border:1px solid rgba(0,245,255,0.4);
              background:rgba(0,245,255,0.04);
              display:flex; align-items:center; justify-content:center;
              font-family:'Orbitron',monospace; font-size:0.65rem;
              font-weight:700; color:#00f5ff; letter-spacing:2px;
              text-align:center; padding:10px;
              text-shadow:0 0 10px #00f5ff;
              backface-visibility:visible;
            }
            .face.front  { transform:translateZ(90px); }
            .face.back   { transform:rotateY(180deg) translateZ(90px); }
            .face.left   { transform:rotateY(-90deg) translateZ(90px); }
            .face.right  { transform:rotateY(90deg)  translateZ(90px); }
            .face.top    { transform:rotateX(90deg)  translateZ(90px); }
            .face.bottom { transform:rotateX(-90deg) translateZ(90px); }
          `}</style>
          <div className="cube-scene">
            <div className="cube">
              <div className="face front">REACT JS</div>
              <div className="face back">NODE JS</div>
              <div className="face left">PYTHON</div>
              <div className="face right">AWS ECS</div>
              <div className="face top">DOCKER</div>
              <div className="face bottom">FLASK</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}