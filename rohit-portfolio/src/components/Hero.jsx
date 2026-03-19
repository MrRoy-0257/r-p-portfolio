import { motion } from "framer-motion";
import { Link } from "react-scroll";
import HeroBg from "./HeroBg";

const fadeUp = (delay=0) => ({
  hidden:{opacity:0,y:30},
  show:{opacity:1,y:0,transition:{duration:0.7,delay}}
});

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center px-24 gap-4"
      style={{paddingTop:"80px"}}>
      <HeroBg/>
      <div className="relative z-10 flex flex-col gap-4">
        <motion.div variants={fadeUp(0.1)} initial="hidden" animate="show" className="section-label">
          // FRESHER · FULL STACK SOFTWARE ENGINEER · M.Sc. CS 2025
        </motion.div>
        <motion.h1 variants={fadeUp(0.3)} initial="hidden" animate="show"
          style={{fontFamily:"'Orbitron',monospace",fontWeight:900,lineHeight:0.95}}
          className="text-7xl md:text-9xl">
          <span style={{color:"#fff",display:"block"}}>ROHIT</span>
          <span className="glow-text" style={{display:"block"}}>PATIL</span>
        </motion.h1>
        <motion.div variants={fadeUp(0.5)} initial="hidden" animate="show"
          style={{fontFamily:"'Share Tech Mono',monospace",color:"#00ff88",letterSpacing:"3px",fontSize:"1rem"}}>
          [ FULL-STACK · AI INTEGRATOR · GAME DEV ]
        </motion.div>
        <motion.p variants={fadeUp(0.7)} initial="hidden" animate="show"
          className="max-w-xl text-lg leading-relaxed" style={{color:"#4a6a80"}}>
          Building <strong style={{color:"#00f5ff"}}>scalable web apps</strong> with ReactJS, NodeJS & Flask.
          Skilled in <strong style={{color:"#00f5ff"}}>Dockerized microservices</strong>, CI/CD & AI solutions.
          Fresher, eager to contribute.
        </motion.p>
        <motion.div variants={fadeUp(0.85)} initial="hidden" animate="show" className="flex flex-wrap gap-5">
          {[["📞","+91 7447803017","tel:+917447803017"],
            ["✉","patilrohit0257@gmail.com","mailto:patilrohit0257@gmail.com"],
            ["⌂","github.com/MrRoy-0257","https://github.com/MrRoy-0257"]
          ].map(([icon,txt,href])=>(
            <a key={txt} href={href} target={href.startsWith("http")?"_blank":undefined}
              style={{fontFamily:"'Share Tech Mono',monospace",fontSize:"0.75rem",color:"#4a6a80",textDecoration:"none",display:"flex",gap:"6px",alignItems:"center",cursor:"none"}}>
              {icon} {txt}
            </a>
          ))}
        </motion.div>
        <motion.div variants={fadeUp(1)} initial="hidden" animate="show" className="flex gap-4 mt-2">
          <Link to="projects" smooth duration={600} offset={-70}>
            <button className="btn-primary">VIEW PROJECTS</button>
          </Link>
          <Link to="room" smooth duration={600} offset={-70}>
            <button className="btn-outline">MY 3D ROOM ↗</button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}