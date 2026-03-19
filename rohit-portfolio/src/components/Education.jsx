import { motion } from "framer-motion";
import { education } from "../data/projects";

const certs = [
  {title:"Full Stack Development in Java", org:"SEED Infotech, Pune"},
  {title:"C / C++ Programming",            org:"Coding Circle Academy, Parbhani"},
];

export default function Education() {
  return (
    <section id="education" className="py-28 px-24">
      <div className="section-label">// ACADEMIC JOURNEY</div>
      <h2 className="section-title text-5xl">EDUCATION</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-4">
        {education.map((e,i)=>(
          <motion.div key={e.year} className="card p-6 relative overflow-hidden"
            whileInView={{opacity:1,y:0}} initial={{opacity:0,y:20}} transition={{duration:0.5,delay:i*0.08}}>
            <div className="absolute top-0 left-0 right-0 h-0.5" style={{background:"linear-gradient(90deg,#a855f7,#00f5ff)"}}/>
            <div style={{fontFamily:"'Share Tech Mono',monospace",fontSize:"0.65rem",color:"#a855f7",letterSpacing:"2px",marginBottom:"8px"}}>{e.year}</div>
            <div style={{fontFamily:"'Orbitron',monospace",fontSize:"0.82rem",fontWeight:700,color:"#fff",marginBottom:"6px",lineHeight:1.3}}>{e.degree}</div>
            <div style={{fontSize:"0.82rem",color:"#4a6a80",marginBottom:"8px"}}>{e.uni}</div>
            <div style={{fontFamily:"'Share Tech Mono',monospace",fontSize:"0.7rem",color:"#ffd700"}}>{e.grade}</div>
          </motion.div>
        ))}
      </div>
      <div className="section-label mt-16 mb-2">// CERTIFICATIONS</div>
      <h2 className="section-title text-3xl">CERTIFICATIONS</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
        {certs.map((c,i)=>(
          <motion.div key={c.title} className="card p-6 relative"
            whileInView={{opacity:1,y:0}} initial={{opacity:0,y:20}} transition={{duration:0.5,delay:i*0.1}}>
            <div className="absolute left-0 top-0 bottom-0 w-0.5" style={{background:"linear-gradient(180deg,#ffd700,#ff00aa)"}}/>
            <div style={{fontFamily:"'Orbitron',monospace",fontSize:"0.85rem",fontWeight:700,color:"#fff",marginBottom:"6px",paddingLeft:"12px"}}>{c.title}</div>
            <div style={{fontFamily:"'Share Tech Mono',monospace",fontSize:"0.7rem",color:"#ffd700",paddingLeft:"12px",letterSpacing:"2px"}}>{c.org}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}