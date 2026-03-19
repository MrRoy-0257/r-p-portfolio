import { useState } from "react";
import { motion } from "framer-motion";
import Scene3D from "./Scene3D";

export default function HologramAvatar() {
  const [color, setColor] = useState("#00f5ff");

  const colors = [
    { label:"CYAN",    value:"#00f5ff" },
    { label:"MAGENTA", value:"#ff00aa" },
    { label:"GOLD",    value:"#ffd700" },
    { label:"GREEN",   value:"#00ff88" },
  ];

  return (
    <section id="hologram" className="py-28 px-24"
      style={{ background:"linear-gradient(180deg,transparent,rgba(0,245,255,0.012),transparent)" }}>
      <style>{`
        @keyframes hud-sweep { 0%{top:-10%} 100%{top:110%} }
        @keyframes name-glow {
          0%,100% { text-shadow: 0 0 10px currentColor, 0 0 20px currentColor; }
          50%      { text-shadow: 0 0 20px currentColor, 0 0 40px currentColor, 0 0 60px currentColor; }
        }
      `}</style>

      <div className="section-label">// DIGITAL IDENTITY</div>
      <h2 className="section-title text-5xl">HOLOGRAM</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mt-4">

        {/* ── LEFT: Canvas ── */}
        <motion.div style={{
          height:"560px", position:"relative",
          border:`1px solid ${color}35`,
          borderRadius:"4px", overflow:"hidden",
          background:"radial-gradient(ellipse at center,#020d1a 0%,#020409 70%)",
          transition:"border-color 0.4s",
        }}
          whileInView={{ opacity:1 }} initial={{ opacity:0 }} transition={{ duration:1 }}>

          {/* Sweep overlay */}
          <div style={{
            position:"absolute", left:0, right:0, height:"30%",
            background:`linear-gradient(180deg,transparent,${color}08,transparent)`,
            animation:"hud-sweep 3.5s linear infinite",
            zIndex:2, pointerEvents:"none",
          }}/>

          {/* Corner brackets */}
          {[
            { top:0,    left:0,  borderTop:`2px solid ${color}`,    borderLeft:`2px solid ${color}`    },
            { top:0,    right:0, borderTop:`2px solid ${color}`,    borderRight:`2px solid ${color}`   },
            { bottom:0, left:0,  borderBottom:`2px solid ${color}`, borderLeft:`2px solid ${color}`    },
            { bottom:0, right:0, borderBottom:`2px solid ${color}`, borderRight:`2px solid ${color}`   },
          ].map((s,i) => (
            <div key={i} style={{
              position:"absolute", width:"22px", height:"22px",
              zIndex:3, transition:"border-color 0.4s", ...s,
            }}/>
          ))}

          {/* Top HUD bar */}
          <div style={{
            position:"absolute", top:"14px", left:0, right:0,
            display:"flex", justifyContent:"space-between",
            padding:"0 18px", zIndex:3,
            fontFamily:"'Share Tech Mono',monospace",
            fontSize:"0.58rem", letterSpacing:"2px",
            pointerEvents:"none",
          }}>
            <span style={{ color }}>HOLO_SYS v2.5</span>
            <span style={{ color:"#4a6a80" }}>ID :: RP-0257</span>
            <span style={{ color:"#00ff88" }}>● ACTIVE</span>
          </div>

          <Scene3D view="hologram" holoColor={color} />

          {/* Bottom HUD bar */}
          <div style={{
            position:"absolute", bottom:"14px", left:0, right:0,
            display:"flex", justifyContent:"center", gap:"20px",
            zIndex:3, pointerEvents:"none",
            fontFamily:"'Share Tech Mono',monospace",
            fontSize:"0.55rem", color:"#4a6a80", letterSpacing:"2px",
          }}>
            <span>DRAG TO ROTATE</span>
            <span style={{ color:`${color}60` }}>◆</span>
            <span>SWITCH COLOR BELOW</span>
          </div>
        </motion.div>

        {/* ── RIGHT: Info panel ── */}
        <div className="flex flex-col gap-7">

          {/* Name — fixed, no WebkitTextFillColor */}
          <div>
            <div style={{ marginBottom:"12px" }}>
              {[
                { word:"ROHIT",  color:color      },
                { word:"SANJAY", color:color  },
                { word:"PATIL",  color:color  },
              ].map(({ word, color:c }) => (
                <div key={word} style={{
                  fontFamily:"'Orbitron',monospace",
                  fontSize:"2.6rem",
                  fontWeight:900,
                  lineHeight:1.05,
                  color: c,
                  textShadow:`0 0 18px ${c}`,
                  animation:"name-glow 3s ease-in-out infinite",
                }}>
                  {word}
                </div>
              ))}
            </div>

            <div style={{
              fontFamily:"'Share Tech Mono',monospace",
              fontSize:"0.72rem", color:"#00ff88",
              letterSpacing:"3px", marginBottom:"18px",
            }}>
              [ FRESHER · FULL STACK · AI · GAME DEV ]
            </div>

            <p style={{ color:"#4a6a80", lineHeight:1.85, fontSize:"0.95rem" }}>
              A developer who builds at the intersection of{" "}
              <strong style={{ color }}>web, AI, and game engines</strong>.
              From ReactJS microservices to Unity 3D games —
              I bring ideas to life with code, creativity, and caffeine.
            </p>
          </div>

          {/* Color picker */}
          <div>
            <div style={{
              fontFamily:"'Share Tech Mono',monospace",
              fontSize:"0.62rem", color:"#4a6a80",
              letterSpacing:"3px", marginBottom:"10px",
            }}>
              // HOLOGRAM COLOR
            </div>
            <div className="flex gap-3 flex-wrap">
              {colors.map(c => (
                <button key={c.value} onClick={() => setColor(c.value)} style={{
                  fontFamily:"'Share Tech Mono',monospace",
                  fontSize:"0.6rem", letterSpacing:"2px",
                  padding:"9px 16px", cursor:"none",
                  background:  color === c.value ? `${c.value}18`              : "transparent",
                  border:     `1px solid ${color === c.value ? c.value : "rgba(255,255,255,0.1)"}`,
                  color:       color === c.value ? c.value                      : "#4a6a80",
                  boxShadow:   color === c.value ? `0 0 14px ${c.value}35`     : "none",
                  transition:  "all 0.25s",
                }}>
                  ● {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-2 gap-3">
            {[
              ["STACK",    "React · Node · Flask"   ],
              ["CLOUD",    "AWS ECS · Docker"        ],
              ["GAME DEV", "Unity · Godot · Blender" ],
              ["AI TOOLS", "GPT-4 · Claude · LLaMA"  ],
            ].map(([label, value]) => (
              <motion.div key={label} className="card p-4"
                style={{ position:"relative", paddingLeft:"14px" }}
                whileInView={{ opacity:1, x:0 }}
                initial={{ opacity:0, x:20 }}
                transition={{ duration:0.5 }}>
                <div style={{
                  position:"absolute", left:0, top:0, bottom:0, width:"2px",
                  background:`linear-gradient(180deg,${color},transparent)`,
                  transition:"background 0.4s",
                }}/>
                <div style={{
                  fontFamily:"'Share Tech Mono',monospace",
                  fontSize:"0.58rem", color,
                  letterSpacing:"2px", marginBottom:"3px",
                  transition:"color 0.4s",
                }}>
                  {label}
                </div>
                <div style={{ fontSize:"0.78rem", color:"#c8e6f5" }}>
                  {value}
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}