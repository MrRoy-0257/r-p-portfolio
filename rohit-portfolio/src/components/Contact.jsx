import { motion } from "framer-motion";

const links = [
  ["📞","+91 7447803017","tel:+917447803017"],
  ["✉","patilrohit0257@gmail.com","mailto:patilrohit0257@gmail.com"],
  ["⌂","github.com/MrRoy-0257","https://github.com/MrRoy-0257"],
  ["📍","Parbhani, Maharashtra, India","#"],
];

export default function Contact() {
  return (
    <section id="contact" className="py-28 px-24">
      <div className="section-label">// GET IN TOUCH</div>
      <h2 className="section-title text-5xl">CONTACT</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mt-4">
        <div>
          <p className="text-base leading-relaxed mb-8" style={{color:"#4a6a80",maxWidth:"400px"}}>
            Fresher & open to freelance, collaborations & full-time roles. Let's build something great!
          </p>
          <div className="flex flex-col gap-3">
            {links.map(([icon,txt,href])=>(
              <motion.a key={txt} href={href} target={href.startsWith("http")?"_blank":undefined}
                whileHover={{x:6}} className="card flex items-center gap-4 p-4 no-underline"
                style={{fontFamily:"'Share Tech Mono',monospace",fontSize:"0.82rem",color:"#c8e6f5",textDecoration:"none",cursor:"none",letterSpacing:"1px"}}>
                <span style={{fontSize:"1rem"}}>{icon}</span> {txt}
              </motion.a>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          {["Your Name","Email Address"].map(ph=>(
            <input key={ph} type={ph.includes("Email")?"email":"text"} placeholder={ph}
              className="w-full p-4 text-base outline-none"
              style={{background:"rgba(0,245,255,0.04)",border:"1px solid rgba(0,245,255,0.12)",color:"#c8e6f5",fontFamily:"'Rajdhani',sans-serif"}}
              onFocus={e=>e.target.style.borderColor="#00f5ff"}
              onBlur={e=>e.target.style.borderColor="rgba(0,245,255,0.12)"}/>
          ))}
          <textarea placeholder="Tell me about your project or opportunity..." rows={5}
            className="w-full p-4 text-base outline-none resize-none"
            style={{background:"rgba(0,245,255,0.04)",border:"1px solid rgba(0,245,255,0.12)",color:"#c8e6f5",fontFamily:"'Rajdhani',sans-serif"}}
            onFocus={e=>e.target.style.borderColor="#00f5ff"}
            onBlur={e=>e.target.style.borderColor="rgba(0,245,255,0.12)"}/>
          <button className="btn-primary self-start">SEND MESSAGE</button>
        </div>
      </div>
    </section>
  );
}