import { motion } from "framer-motion";
import { projects } from "../data/projects";

export default function Projects() {
  return (
    <section id="projects" className="py-28 px-24">
      <div className="section-label">// WHAT I'VE BUILT</div>
      <h2 className="section-title text-5xl">PROJECTS</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mt-4">
        {projects.map((p,i)=>(
          <motion.div key={p.id} className="card p-8 relative overflow-hidden"
            whileInView={{opacity:1,y:0}} initial={{opacity:0,y:28}}
            transition={{duration:0.5,delay:i*0.07}}
            style={p.blank?{borderStyle:"dashed",borderColor:"rgba(0,245,255,0.2)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center",minHeight:"240px"}:{}}>
            {p.blank ? (
              <>
                <div style={{fontSize:"2rem",opacity:0.2,marginBottom:"12px"}}>+</div>
                <div style={{fontFamily:"'Orbitron',monospace",fontSize:"0.65rem",letterSpacing:"3px",color:"#4a6a80"}}>COMING SOON</div>
                <div style={{fontFamily:"'Share Tech Mono',monospace",fontSize:"0.6rem",color:"#4a6a80",opacity:0.5,marginTop:"6px",letterSpacing:"2px"}}>{`// SLOT ${p.id}`}</div>
              </>
            ) : (
              <>
                <div style={{fontFamily:"'Share Tech Mono',monospace",fontSize:"0.65rem",color:"#ff00aa",letterSpacing:"3px",marginBottom:"14px"}}>{p.id} // {p.category}</div>
                <div style={{fontFamily:"'Orbitron',monospace",fontSize:"1rem",fontWeight:700,color:"#fff",marginBottom:"10px",lineHeight:1.3}}>{p.title}</div>
                <p style={{fontSize:"0.9rem",lineHeight:1.8,color:"#4a6a80",marginBottom:"16px"}}>{p.desc}</p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {p.tags.map(t=>(
                    <span key={t} style={{fontFamily:"'Share Tech Mono',monospace",fontSize:"0.62rem",padding:"3px 10px",border:"1px solid rgba(0,245,255,0.15)",color:"#00f5ff",background:"rgba(0,245,255,0.05)"}}>{t}</span>
                  ))}
                </div>
                <div className="flex gap-4">
                  {p.github && <a href={p.github} target="_blank" rel="noopener noreferrer"
                    style={{fontFamily:"'Share Tech Mono',monospace",fontSize:"0.72rem",color:"#00f5ff",textDecoration:"none",letterSpacing:"2px",cursor:"none"}}>
                    GITHUB →
                  </a>}
                  {p.live && <a href={p.live} target="_blank" rel="noopener noreferrer"
                    style={{fontFamily:"'Share Tech Mono',monospace",fontSize:"0.72rem",color:"#ff00aa",textDecoration:"none",letterSpacing:"2px",cursor:"none"}}>
                    LIVE DEMO →
                  </a>}
                </div>
              </>
            )}
          </motion.div>
        ))}
      </div>
    </section>
    
  );
}