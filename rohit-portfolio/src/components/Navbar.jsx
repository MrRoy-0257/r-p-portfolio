import { Link } from "react-scroll";
const links = ["about","projects","skills","education","room","hologram","contact"];
export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-16 py-4"
      style={{background:"rgba(2,4,9,0.9)",backdropFilter:"blur(20px)",borderBottom:"1px solid rgba(0,245,255,0.12)"}}>
      <div style={{fontFamily:"'Orbitron',monospace",fontSize:"1.1rem",fontWeight:900,color:"#00f5ff",letterSpacing:"5px",textShadow:"0 0 20px #00f5ff"}}>
        RP.DEV
      </div>
      <ul className="flex gap-8 list-none">
        {links.map(l=>(
          <li key={l}>
            <Link to={l} smooth duration={600} offset={-70}
              style={{fontFamily:"'Share Tech Mono',monospace",color:"#4a6a80",textDecoration:"none",fontSize:"0.78rem",letterSpacing:"2px",cursor:"none"}}>
              {l.toUpperCase()}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}