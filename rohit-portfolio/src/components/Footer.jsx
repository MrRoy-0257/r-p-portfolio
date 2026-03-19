export default function Footer() {
  return (
    <footer className="flex justify-between items-center px-24 py-7"
      style={{borderTop:"1px solid rgba(0,245,255,0.12)"}}>
      <div style={{fontFamily:"'Share Tech Mono',monospace",fontSize:"0.7rem",color:"#4a6a80",letterSpacing:"2px"}}>© 2025 ROHIT PATIL</div>
      <div style={{fontFamily:"'Orbitron',monospace",fontSize:"1rem",fontWeight:900,color:"#00f5ff",letterSpacing:"4px",textShadow:"0 0 15px #00f5ff"}}>RP.DEV</div>
      <div style={{fontFamily:"'Share Tech Mono',monospace",fontSize:"0.7rem",color:"#4a6a80",letterSpacing:"2px"}}>BUILT WITH ♥ & CAFFEINE</div>
    </footer>
  );
}