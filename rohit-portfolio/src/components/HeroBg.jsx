import { useEffect, useRef } from "react";

export default function HeroBg() {
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext("2d");

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const stars = Array.from({ length: 250 }, () => ({
      x:       Math.random() * canvas.width,
      y:       Math.random() * canvas.height,
      r:       Math.random() * 1.4 + 0.2,
      speed:   Math.random() * 0.15 + 0.05,
      twinkle: Math.random() * Math.PI * 2,
    }));

    const nodes = Array.from({ length: 18 }, () => ({
      x:    Math.random() * canvas.width,
      y:    Math.random() * canvas.height,
      vx:   (Math.random() - 0.5) * 0.4,
      vy:   (Math.random() - 0.5) * 0.4,
      r:    Math.random() * 1.5 + 1,
    }));

    let animId;

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Stars
      stars.forEach(s => {
        s.twinkle += 0.018;
        s.y       -= s.speed;
        if (s.y < 0) { s.y = canvas.height; s.x = Math.random() * canvas.width; }
        const alpha = 0.3 + Math.sin(s.twinkle) * 0.4;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200,230,255,${alpha})`;
        ctx.fill();
      });

      // Nodes + connections
      nodes.forEach(n => {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > canvas.width)  n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
      });

      nodes.forEach((a, i) => {
        nodes.forEach((b, j) => {
          if (j <= i) return;
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < 160) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(0,245,255,${0.06 * (1 - dist / 160)})`;
            ctx.lineWidth   = 0.5;
            ctx.stroke();
          }
        });
        ctx.beginPath();
        ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0,245,255,0.45)";
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <>
      {/* 2D canvas — zero WebGL */}
      <canvas
        ref={canvasRef}
        style={{ position:"absolute", inset:0, zIndex:0, opacity:0.9 }}
      />

      {/* CSS 3D wireframe cube — no GPU */}
      <div style={{
        position: "absolute", right: "8%", top: "50%",
        transform: "translateY(-50%)", zIndex: 1,
        pointerEvents: "none",
      }}>
        <style>{`
          .hcube-scene{width:170px;height:170px;perspective:420px;}
          .hcube{
            width:100%;height:100%;
            position:relative;transform-style:preserve-3d;
            animation:hcube-rot 10s linear infinite;
          }
          @keyframes hcube-rot{
            from{transform:rotateX(-22deg) rotateY(0deg)}
            to  {transform:rotateX(-22deg) rotateY(360deg)}
          }
          .hface{
            position:absolute;width:170px;height:170px;
            border:1px solid rgba(0,245,255,0.3);
            background:rgba(0,245,255,0.025);
          }
          .hface.hf{transform:translateZ(85px);}
          .hface.hb{transform:rotateY(180deg) translateZ(85px);}
          .hface.hl{transform:rotateY(-90deg) translateZ(85px);}
          .hface.hr{transform:rotateY(90deg)  translateZ(85px);}
          .hface.ht{transform:rotateX(90deg)  translateZ(85px);}
          .hface.hd{transform:rotateX(-90deg) translateZ(85px);}
        `}</style>
        <div className="hcube-scene">
          <div className="hcube">
            <div className="hface hf" />
            <div className="hface hb" />
            <div className="hface hl" />
            <div className="hface hr" />
            <div className="hface ht" />
            <div className="hface hd" />
          </div>
        </div>
      </div>
    </>
  );
}