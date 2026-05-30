import { useEffect, useRef, useState } from "react";

export default function PageDecorator() {
  const canvasRef = useRef(null);
  const [vibeMetric, setVibeMetric] = useState(95);

  // Custom cursor states
  const [isTouchUser, setIsTouchUser] = useState(false);
  const [cursorType, _setCursorType] = useState("default");
  const cursorTypeRef = useRef("default");
  const setCursorType = (type) => {
    cursorTypeRef.current = type;
    _setCursorType(type);
  };
  const [isClicked, setIsClicked] = useState(false);
  const [hasMovedOnce, setHasMovedOnce] = useState(false);
  const hasMovedRef = useRef(false);

  // Refs for LERP positioning
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const mouseCoords = useRef({ x: 0, y: 0 });
  const ringCoords = useRef({ x: 0, y: 0 });

  // Detect touch
  useEffect(() => {
    const handleTouch = () => {
      setIsTouchUser(true);
      document.body.classList.remove("custom-cursor-active");
    };
    window.addEventListener("touchstart", handleTouch, { passive: true });
    return () => window.removeEventListener("touchstart", handleTouch);
  }, []);

  // Vibe metric pulse
  useEffect(() => {
    const timer = setInterval(() => {
      setVibeMetric(() => Math.floor(94 + Math.random() * 6));
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  // Subtle soft dot canvas trail
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let particles = [];

    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    const onMouseMove = (e) => {
      if (particles.length > 18) return;
      if (Math.random() > 0.45) return; // sparse spawning
      particles.push({
        x: e.clientX + (Math.random() - 0.5) * 6,
        y: e.clientY + (Math.random() - 0.5) * 6,
        size: Math.random() * 2.5 + 1,
        opacity: 0.35 + Math.random() * 0.15,
        decay: Math.random() * 0.012 + 0.008,
        color: ["#00cec9", "#6c5ce7", "#fdcb6e"][Math.floor(Math.random() * 3)],
      });
    };
    window.addEventListener("mousemove", onMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, w, h);
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.opacity -= p.decay;
        p.y -= 0.3;
        if (p.opacity <= 0) { particles.splice(i, 1); continue; }
        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      animId = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  // Custom cursor logic
  useEffect(() => {
    if (isTouchUser) return;
    document.body.classList.add("custom-cursor-active");

    const onMouseMove = (e) => {
      mouseCoords.current = { x: e.clientX, y: e.clientY };
      if (!hasMovedRef.current) {
        hasMovedRef.current = true;
        setHasMovedOnce(true);
      }
    };
    const onMouseDown = () => setIsClicked(true);
    const onMouseUp = () => setIsClicked(false);
    const onMouseLeave = () => {
      if (dotRef.current) dotRef.current.style.opacity = 0;
      if (ringRef.current) ringRef.current.style.opacity = 0;
    };
    const onMouseEnter = () => {
      if (!hasMovedRef.current) return;
      if (dotRef.current) dotRef.current.style.opacity = cursorTypeRef.current === "text" ? 0 : 1;
      if (ringRef.current) ringRef.current.style.opacity = 1;
    };

    const onMouseOver = (e) => {
      const t = e.target;
      if (!t) return;
      const clickable = t.closest("a, button, [role='button'], .btn-primary, .btn-secondary");
      const isText = t.closest("p, h1, h2, h3, h4, h5, h6, li, span, code, pre") && !clickable;
      const isDoodle = t.closest("[data-doodle]");
      if (isDoodle) setCursorType("doodle");
      else if (clickable) setCursorType("clickable");
      else if (isText) setCursorType("text");
      else setCursorType("default");
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);
    window.addEventListener("mouseover", onMouseOver);

    let rafId;
    const tick = () => {
      ringCoords.current.x += (mouseCoords.current.x - ringCoords.current.x) * 0.12;
      ringCoords.current.y += (mouseCoords.current.y - ringCoords.current.y) * 0.12;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(calc(${mouseCoords.current.x}px - 50%), calc(${mouseCoords.current.y}px - 50%), 0)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(calc(${ringCoords.current.x}px - 50%), calc(${ringCoords.current.y}px - 50%), 0)`;
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      window.removeEventListener("mouseover", onMouseOver);
    };
  }, [isTouchUser]);

  // Cursor ring style based on context
  const getRingStyle = () => {
    const base = {
      width: "28px",
      height: "28px",
      border: "1px solid rgba(29, 34, 46, 0.4)",
      borderRadius: "50%",
      backgroundColor: "transparent",
    };
    if (isClicked) {
      base.width = "18px";
      base.height = "18px";
    }
    switch (cursorType) {
      case "clickable":
        base.width = isClicked ? "36px" : "44px";
        base.height = isClicked ? "36px" : "44px";
        base.border = "1px solid rgba(108, 92, 231, 0.5)";
        base.backgroundColor = "rgba(108, 92, 231, 0.05)";
        break;
      case "text":
        base.width = "2px";
        base.height = "22px";
        base.borderRadius = "2px";
        base.border = "none";
        base.backgroundColor = "rgba(29, 34, 46, 0.6)";
        break;
      case "doodle":
        base.width = "42px";
        base.height = "42px";
        base.border = "1px dashed rgba(29, 34, 46, 0.3)";
        break;
      default:
        break;
    }
    return base;
  };

  const getDotOpacity = () => {
    if (!hasMovedOnce) return 0;
    return cursorType === "text" ? 0 : 1;
  };

  if (isTouchUser) {
    return (
      <canvas
        ref={canvasRef}
        style={{ position: "fixed", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 9998 }}
      />
    );
  }

  return (
    <>
      {/* Cursor dot */}
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "5px",
          height: "5px",
          borderRadius: "50%",
          backgroundColor: "#1D222E",
          pointerEvents: "none",
          zIndex: 10001,
          opacity: getDotOpacity(),
          transition: "opacity 0.2s ease, width 0.15s ease, height 0.15s ease",
          willChange: "transform",
        }}
      />

      {/* Cursor ring */}
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 10000,
          opacity: hasMovedOnce ? 1 : 0,
          transition: "width 0.25s cubic-bezier(0.16,1,0.3,1), height 0.25s cubic-bezier(0.16,1,0.3,1), border 0.25s ease, background-color 0.25s ease, border-radius 0.25s ease, opacity 0.3s ease",
          willChange: "transform",
          ...getRingStyle(),
        }}
      />

      {/* Subtle canvas trail */}
      <canvas
        ref={canvasRef}
        style={{ position: "fixed", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 9998 }}
      />

      {/* Doodle A: Coffee Cup — bottom left */}
      <div
        data-doodle="coffee"
        style={{
          position: "fixed",
          left: "20px",
          bottom: "20px",
          zIndex: 90,
          pointerEvents: "auto",
          opacity: 0.55,
          transition: "opacity 0.3s ease, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
        onMouseEnter={e => { e.currentTarget.style.opacity = 1; e.currentTarget.style.transform = "translateY(-4px)"; }}
        onMouseLeave={e => { e.currentTarget.style.opacity = 0.55; e.currentTarget.style.transform = "translateY(0)"; }}
      >
        <svg width="34" height="30" viewBox="0 0 45 40" fill="none">
          <path d="M 12 6 Q 14 3 12 0" stroke="#1D222E" strokeWidth="1" strokeLinecap="round">
            <animate attributeName="d" values="M 12 6 Q 14 3 12 0; M 13 6 Q 11 3 13 0; M 12 6 Q 14 3 12 0" dur="2.4s" repeatCount="indefinite" />
          </path>
          <path d="M 19 6 Q 21 3 19 0" stroke="#1D222E" strokeWidth="1" strokeLinecap="round">
            <animate attributeName="d" values="M 19 6 Q 21 3 19 0; M 20 6 Q 18 3 20 0; M 19 6 Q 21 3 19 0" dur="3s" repeatCount="indefinite" />
          </path>
          <path d="M 8 12 L 30 12 C 30 12, 29 32, 19 32 C 9 32, 8 12, 8 12 Z" fill="#FFFDF0" stroke="#1D222E" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M 30 15 C 36 15, 36 24, 29 24" fill="none" stroke="#1D222E" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="4" y1="35" x2="34" y2="35" stroke="#1D222E" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>

      {/* Doodle B: Vibe Status — bottom right */}
      <div
        data-doodle="vibe"
        style={{
          position: "fixed",
          right: "20px",
          bottom: "20px",
          zIndex: 90,
          background: "rgba(250, 246, 238, 0.85)",
          border: "1px solid rgba(29, 34, 46, 0.15)",
          borderRadius: "6px",
          padding: "5px 10px",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "8px",
          fontWeight: "600",
          color: "rgba(29, 34, 46, 0.55)",
          display: "flex",
          alignItems: "center",
          gap: "6px",
          pointerEvents: "auto",
          userSelect: "none",
          opacity: 0.7,
          transition: "opacity 0.3s ease",
        }}
        onMouseEnter={e => e.currentTarget.style.opacity = 1}
        onMouseLeave={e => e.currentTarget.style.opacity = 0.7}
      >
        <span style={{
          width: "5px",
          height: "5px",
          borderRadius: "50%",
          background: "#00cec9",
          display: "inline-block",
          animation: "pulseVibeGlow 2s ease-in-out infinite",
        }} />
        <span>sys.vibe: {vibeMetric}%</span>
      </div>

      <style>{`
        @keyframes pulseVibeGlow {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
      `}</style>
    </>
  );
}
