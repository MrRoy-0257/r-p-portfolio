import { motion } from "framer-motion";
import { skills } from "../data/projects";


const pillColor = g => g==="AI Tools"
  ? {border:"1px solid rgba(168,85,247,0.3)",color:"#a855f7",background:"rgba(168,85,247,0.05)"}
  : {border:"1px solid rgba(0,245,255,0.12)",color:"#c8e6f5",background:"rgba(255,255,255,0.02)"};
export default function Skills() {
  return ( 
    <section id="skills" className="py-28 px-24">
      <div className="section-label">// MY ARSENAL</div>
      <h2 className="section-title text-5xl">SKILLS</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {Object.entries(skills).map(([group,items],i)=>(
          <motion.div key={group} className="card p-7"
            whileInView={{opacity:1,y:0}} initial={{opacity:0,y:20}} transition={{duration:0.5,delay:i*0.08}}>
            <div className="flex items-center gap-3 mb-5">
              <div style={{width:"16px",height:"1px",background:"#ffd700"}}/>
              <div style={{fontFamily:"'Orbitron',monospace",fontSize:"0.72rem",letterSpacing:"3px",color:"#ffd700"}}>{group.toUpperCase()}</div>
            </div>
            <div className="flex flex-wrap gap-2">
              {items.map(s=>(
                <span key={s} style={{fontFamily:"'Share Tech Mono',monospace",fontSize:"0.65rem",letterSpacing:"1px",padding:"5px 12px",...pillColor(group)}}>{s}</span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>   
  );
}