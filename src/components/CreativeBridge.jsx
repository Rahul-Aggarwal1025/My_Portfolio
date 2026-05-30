/* ── CreativeBridge.jsx ──────────────────────────────────────────────
   "The Living Liquid Wave Streams" — a clean flowing composition
   with condensed data engineering humor + responsive generative wave art.
   No cards. No panels. No buttons. No sliders. Just pure visual flow.
   Palette: The signature warm cream, charcoal, teal, coral, and purple theme.
 ─────────────────────────────────────────────────────────────────── */
import { useState, useEffect, useRef } from "react";

/* ── Signature Color Palette ───────────────────────────────────────── */
const palette = {
  bg: "#FFFDF8", // Warm light-cream frame background
  border: "#1D222E",
  circle: "#00cec9",
  triangle: "#e17055",
  curve: "#6c5ce7",
  diamond: "#fdcb6e",
  arc: "#55efc4",
  gridColor: "rgba(29,34,46,0.03)"
};

/* ── 4 parallel wave pipeline stream configurations ────────────────── */
const artStreams = [
  { id: 0, y_base: 110, color: palette.circle, scale: 1.0 },
  { id: 1, y_base: 160, color: palette.triangle, scale: -0.8 },
  { id: 2, y_base: 210, color: palette.curve, scale: 1.2 },
  { id: 3, y_base: 260, color: palette.diamond, scale: -1.0 }
];

function CreativeBridge() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [guidesVisible, setGuidesVisible] = useState(true);

  /* Continuous Live Animation Tick State (60fps) */
  const [time, setTime] = useState(0);

  /* Mouse Parallax & Deflection Tracking State */
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [hoveredShape, setHoveredShape] = useState(null);

  /* Intersection observer for scroll-reveal */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.12 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  /* 60fps RequestAnimationFrame Loop for continuous sines flow */
  useEffect(() => {
    let animId;
    const loop = () => {
      setTime((t) => t + 0.025); // slow, elegant wave speed
      animId = requestAnimationFrame(loop);
    };
    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, []);

  /* Fade out construction guides after drawing completes */
  useEffect(() => {
    if (!isVisible) return;
    const timer = setTimeout(() => setGuidesVisible(false), 5500);
    return () => clearTimeout(timer);
  }, [isVisible]);

  /* Handle Mouse Movement for wave deflection coordinates */
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const scaleX = 460 / rect.width;
    const scaleY = 360 / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;
    setMousePos({ x, y });
  };

  const handleMouseEnter = () => {
    setIsMouseOver(true);
  };

  const handleMouseLeave = () => {
    setIsMouseOver(false);
    setMousePos({ x: 0, y: 0 });
  };

  /* Calculated cursor parallax derived sways */
  const dx = isMouseOver ? (mousePos.x - 230) / 230 * 16 : 0;
  const dy = isMouseOver ? (mousePos.y - 180) / 180 * 16 : 0;

  /* Staggered Title Text */
  const statementLines = [
    { text: "I build robust data pipelines...", weight: "400", size: "clamp(20px, 2.8vw, 30px)" },
    { text: "...but my design streams are pure chaos.", weight: "900", size: "clamp(26px, 4.2vw, 38px)" },
  ];

  /* Reduced Copy: one short, high-contrast paragraph */
  const paragraphText = [
    "Optimizing database pipelines is my day job. Off-call, I trade rigid constraints for the pure flow of vector design and video timelines as my personal creative playground."
  ];

  /* Calculate specific control point coordinates dynamically based on time and cursor deflection */
  const getPoint = (x, y_base, scale) => {
    // Ambient sine wave: depends on dynamic 60fps time tick + horizontal x
    let by = y_base + Math.sin(time + x * 0.012) * 16 * scale;

    // Direct cursor repulsion warp
    if (isMouseOver) {
      const cxDist = mousePos.x - x;
      const cyDist = mousePos.y - by;
      const dist = Math.sqrt(cxDist * cxDist + cyDist * cyDist);

      if (dist < 120) {
        const force = (120 - dist) / 120;
        // Pushes the wave coordinates away vertically
        const pushY = (cyDist > 0 ? -1 : 1) * force * 38;
        by += pushY;
      }
    }
    return { x, y: by };
  };

  return (
    <section
      ref={sectionRef}
      id="creative-bridge"
      style={{
        minHeight: "75vh",
        background: "#FAF6EE",
        position: "relative",
        overflow: "hidden",
        padding: "90px 24px 100px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* ── Grid overlay ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(to right, rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.03) 1px, transparent 1px)",
          backgroundSize: "45px 45px",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* ── Warm radial glow ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at center, rgba(255,255,255,0.8) 0%, rgba(250,246,238,0.2) 100%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* ── Section Title ── */}
      <div
        style={{
          position: "relative",
          zIndex: 5,
          textAlign: "center",
          marginBottom: "70px",
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(25px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}
      >
        <div
          style={{
            position: "relative",
            display: "inline-block",
            transform: `translate(${dx * 0.45}px, ${dy * 0.45}px)`,
            transition: "transform 0.15s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {/* Left Twinkling Sparkle - Soft Coral */}
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            style={{
              position: "absolute",
              left: "-32px",
              top: "12%",
              opacity: 0.85,
              pointerEvents: "none",
            }}
          >
            <path d="M9 1 L10.2 7.2 L16.5 9 L10.2 10.8 L9 17 L7.8 10.8 L1.5 9 L7.8 7.2 Z" fill="#ff7675">
              <animateTransform
                attributeName="transform"
                type="rotate"
                values="0 9 9; 360 9 9"
                dur="8s"
                repeatCount="indefinite"
              />
            </path>
          </svg>

          {/* Right Twinkling Sparkle - Soft Indigo */}
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            style={{
              position: "absolute",
              right: "-32px",
              bottom: "12%",
              opacity: 0.85,
              pointerEvents: "none",
            }}
          >
            <path d="M9 1 L10.2 7.2 L16.5 9 L10.2 10.8 L9 17 L7.8 10.8 L1.5 9 L7.8 7.2 Z" fill="#6c5ce7">
              <animateTransform
                attributeName="transform"
                type="rotate"
                values="360 9 9; 0 9 9"
                dur="6s"
                repeatCount="indefinite"
              />
            </path>
          </svg>

          <h2
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "clamp(30px, 4.5vw, 48px)",
              fontWeight: "900",
              color: "#1D222E",
              letterSpacing: "-0.5px",
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            Beyond the{" "}
            <span style={{ position: "relative", display: "inline-block" }}>
              {/* Hand-drawn marker highlighter stroke */}
              <svg
                style={{
                  position: "absolute",
                  left: "-5%",
                  bottom: "8%",
                  width: "110%",
                  height: "38%",
                  pointerEvents: "none",
                  zIndex: 0,
                }}
                viewBox="0 0 100 20"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="highlighterGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#ff7675" stopOpacity="0.25" />
                    <stop offset="50%" stopColor="#74b9ff" stopOpacity="0.22" />
                    <stop offset="100%" stopColor="#6c5ce7" stopOpacity="0.25" />
                  </linearGradient>
                </defs>
                <path
                  d="M 2,12 Q 25,7 50,10 Q 75,13 98,11"
                  fill="none"
                  stroke="url(#highlighterGrad)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray="100"
                  strokeDashoffset="100"
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    values="100;0"
                    dur="1.5s"
                    fill="freeze"
                  />
                </path>
              </svg>
              <span style={{ position: "relative", zIndex: 1, color: "#1D222E" }}>
                Code
              </span>
            </span>
          </h2>
        </div>
      </div>

      {/* ── Main Two-Column Composition ── */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: "clamp(40px, 6vw, 80px)",
          maxWidth: "1100px",
          width: "100%",
          flexWrap: "wrap",
          zIndex: 5,
        }}
      >
        {/* ━━━ LEFT: The Words (Reduced Copy & Data Engineer Vibe) ━━━ */}
        <div
          style={{
            flex: "1",
            minWidth: "280px",
            maxWidth: "440px",
          }}
        >
          {/* Bold Statement */}
          {statementLines.map((line, i) => (
            <div
              key={i}
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: line.size,
                fontWeight: line.weight,
                color: palette.border,
                lineHeight: 1.15,
                letterSpacing: "-0.3px",
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(20px)",
                transition: `opacity 0.6s ease ${0.3 + i * 0.15}s, transform 0.6s ease ${0.3 + i * 0.15}s`,
              }}
            >
              {line.text}
            </div>
          ))}

          {/* Hand-drawn arrow pointing right */}
          <svg
            width="60"
            height="20"
            viewBox="0 0 60 20"
            style={{
              display: "block",
              margin: "24px 0 28px",
              opacity: isVisible ? 0.2 : 0,
              transition: "opacity 0.6s ease 0.7s",
              pointerEvents: "none",
            }}
          >
            <path
              d="M2 10 C15 10, 30 6, 48 10"
              stroke={palette.border}
              strokeWidth="1.8"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M42 5 L50 10 L42 15"
              stroke={palette.border}
              strokeWidth="1.8"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          {/* Flowing paragraph */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0px" }}>
            {paragraphText.map((line, i) => {
              /* Highlight specific phrases with accent marks */
              const highlights = {
                "bezier handle": "#00cec9",
                "database tables perfectly normalized": "#fdcb6e",
                "data streams": "#6c5ce7",
                "YAML configuration file": "#e17055",
                "vector design": "#00cec9",
                "creative playground.": "#55efc4",
              };

              let content = line;
              let highlighted = false;

              for (const [phrase, color] of Object.entries(highlights)) {
                if (line.includes(phrase)) {
                  const parts = line.split(phrase);
                  content = (
                    <>
                      {parts[0]}
                      <span
                        style={{
                          position: "relative",
                          display: "inline",
                        }}
                      >
                        <span
                          style={{
                            position: "absolute",
                            bottom: "0px",
                            left: "-2px",
                            right: "-2px",
                            height: "6px",
                            background: color,
                            opacity: 0.18,
                            borderRadius: "2px",
                            zIndex: 0,
                          }}
                        />
                        <span style={{ position: "relative", zIndex: 1 }}>
                          {phrase}
                        </span>
                      </span>
                      {parts[1]}
                    </>
                  );
                  highlighted = true;
                  break;
                }
              }

              return (
                <p
                  key={i}
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: "15px",
                    fontWeight: "500",
                    color: "#555",
                    lineHeight: 1.75,
                    margin: 0,
                    letterSpacing: "0.1px",
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "translateY(0)" : "translateY(12px)",
                    transition: "opacity 0.6s ease 0.6s, transform 0.6s ease 0.6s",
                  }}
                >
                  {highlighted ? content : line}
                </p>
              );
            })}
          </div>
        </div>

        {/* ━━━ RIGHT: The Living Liquid Wave Streams Canvas ━━━ */}
        <div
          style={{
            position: "relative",
            flex: "1",
            minWidth: "300px",
            maxWidth: "485px",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s",
          }}
        >
          {/* Neo-brutalist frame containing light cream app window */}
          <div
            style={{
              position: "relative",
              background: palette.bg,
              border: `2.5px solid ${palette.border}`,
              borderRadius: "6px",
              padding: "20px 20px 24px",
              boxShadow: `6px 6px 0px ${palette.border}`,
            }}
          >
            {/* ── Visual Studio Window Top Bar ── */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderBottom: `2.5px solid ${palette.border}`,
                paddingBottom: "8px",
                marginBottom: "20px",
              }}
            >
              {/* Window dot controls */}
              <div style={{ display: "flex", gap: "6px" }}>
                <div style={{ width: "9px", height: "9px", borderRadius: "50%", background: "#ff7675", border: `1.2px solid ${palette.border}` }} />
                <div style={{ width: "9px", height: "9px", borderRadius: "50%", background: "#ffeaa7", border: `1.2px solid ${palette.border}` }} />
                <div style={{ width: "9px", height: "9px", borderRadius: "50%", background: "#55efc4", border: `1.2px solid ${palette.border}` }} />
              </div>
              {/* Active composition file label */}
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "9.5px",
                  fontWeight: "900",
                  color: palette.border,
                  letterSpacing: "0.5px",
                }}
              >
                living_liquid_streams.svg
              </span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: palette.border, opacity: 0.6 }}>
                v1.8
              </span>
            </div>

            {/* SVG Artboard Canvas with interactive mouse move triggers */}
            <div
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              style={{
                position: "relative",
                width: "100%",
                borderRadius: "4px",
                overflow: "hidden",
                cursor: "crosshair",
              }}
            >
              <svg
                viewBox="0 0 460 360"
                width="100%"
                style={{ display: "block" }}
              >
                {/* ── Grid lines inside the SVG canvas ── */}
                <g style={{ opacity: 0.1 }}>
                  <line x1="0" y1="90" x2="460" y2="90" stroke={palette.border} strokeWidth="0.5" strokeDasharray="6 4" />
                  <line x1="0" y1="180" x2="460" y2="180" stroke={palette.border} strokeWidth="0.5" strokeDasharray="6 4" />
                  <line x1="0" y1="270" x2="460" y2="270" stroke={palette.border} strokeWidth="0.5" strokeDasharray="6 4" />
                  <line x1="115" y1="0" x2="115" y2="360" stroke={palette.border} strokeWidth="0.5" strokeDasharray="6 4" />
                  <line x1="230" y1="0" x2="230" y2="360" stroke={palette.border} strokeWidth="0.5" strokeDasharray="6 4" />
                  <line x1="345" y1="0" x2="345" y2="360" stroke={palette.border} strokeWidth="0.5" strokeDasharray="6 4" />
                </g>

                {/* ── Center Crosshairs ── */}
                <g style={{ opacity: guidesVisible ? 0.08 : 0, transition: "opacity 1.5s ease" }}>
                  <circle cx="230" cy="180" r="4" stroke={palette.border} strokeWidth="0.5" fill="none" />
                  <line x1="226" y1="180" x2="234" y2="180" stroke={palette.border} strokeWidth="0.5" />
                  <line x1="230" y1="176" x2="230" y2="184" stroke={palette.border} strokeWidth="0.5" />
                </g>

                {/* ── Parallel Warped Liquid Wave Streams ── */}
                {artStreams.map((stream) => {
                  /* Compute 6 dynamic control points waving at 60fps & deflecting around the cursor */
                  const p0 = getPoint(0, stream.y_base, stream.scale);
                  const p1 = getPoint(92, stream.y_base, stream.scale);
                  const p2 = getPoint(184, stream.y_base, stream.scale);
                  const p3 = getPoint(276, stream.y_base, stream.scale);
                  const p4 = getPoint(368, stream.y_base, stream.scale);
                  const p5 = getPoint(460, stream.y_base, stream.scale);

                  const scaleVal = [0.4, -0.6, 0.8, -0.3][stream.id % 4];
                  const finalTx = dx * scaleVal;
                  const finalTy = dy * scaleVal;

                  /* Construct an exceptionally smooth cubic spline path using bezier curves */
                  const pathD = `M 0 ${p0.y} C 92 ${p1.y}, 184 ${p2.y}, 230 ${(p2.y + p3.y) / 2} S 368 ${p4.y}, 460 ${p5.y}`;

                  return (
                    <g
                      key={stream.id}
                      style={{
                        transform: `translate(${finalTx}px, ${finalTy}px)`,
                        transformOrigin: "center",
                        transition: "transform 0.8s cubic-bezier(0.165, 0.84, 0.44, 1)",
                      }}
                    >
                      {/* Ambient handle lines for vector direct selection HUD look */}
                      {isMouseOver && (
                        <g opacity="0.12">
                          <line x1="92" y1={stream.y_base} x2={p1.x} y2={p1.y} stroke={stream.color} strokeWidth="0.8" strokeDasharray="3 3" />
                          <line x1="184" y1={stream.y_base} x2={p2.x} y2={p2.y} stroke={stream.color} strokeWidth="0.8" strokeDasharray="3 3" />
                          <line x1="276" y1={stream.y_base} x2={p3.x} y2={p3.y} stroke={stream.color} strokeWidth="0.8" strokeDasharray="3 3" />
                          <line x1="368" y1={stream.y_base} x2={p4.x} y2={p4.y} stroke={stream.color} strokeWidth="0.8" strokeDasharray="3 3" />
                          <circle cx={p1.x} cy={p1.y} r="2.5" fill={stream.color} />
                          <circle cx={p2.x} cy={p2.y} r="2.5" fill={stream.color} />
                          <circle cx={p3.x} cy={p3.y} r="2.5" fill={stream.color} />
                          <circle cx={p4.x} cy={p4.y} r="2.5" fill={stream.color} />
                        </g>
                      )}

                      {/* Main Dynamic Wave Path */}
                      <path
                        d={pathD}
                        stroke={stream.color}
                        strokeWidth={hoveredShape === stream.id ? "3.5" : "2.5"}
                        fill="none"
                        strokeLinecap="round"
                        style={{
                          transition: "stroke-width 0.25s ease, filter 0.25s ease, stroke 0.3s ease",
                          filter: hoveredShape === stream.id
                            ? `drop-shadow(0 0 8px ${stream.color})`
                            : "none"
                        }}
                        onMouseEnter={() => setHoveredShape(stream.id)}
                        onMouseLeave={() => setHoveredShape(null)}
                      />

                      {/* Floating Coordinate nodes along the wave splits */}
                      {[p1, p2, p3, p4].map((pt, i) => (
                        <circle
                          key={i}
                          cx={pt.x}
                          cy={pt.y}
                          r={hoveredShape === stream.id ? "3.5" : "2.5"}
                          fill={palette.bg}
                          stroke={stream.color}
                          strokeWidth="1.5"
                          style={{
                            transition: "r 0.2s ease, fill 0.3s ease, stroke 0.3s ease",
                            filter: hoveredShape === stream.id
                              ? `drop-shadow(0 0 4px ${stream.color})`
                              : "none"
                          }}
                        />
                      ))}
                    </g>
                  );
                })}
              </svg>

              {/* v1.8 Composition watermark */}
              <div
                style={{
                  position: "absolute",
                  bottom: "10px",
                  right: "14px",
                  fontFamily: "var(--font-mono)",
                  fontSize: "8.5px",
                  color: palette.border,
                  opacity: 0.35,
                  letterSpacing: "0.5px",
                  fontWeight: "700",
                  pointerEvents: "none",
                }}
              >
                LIQUID FLOW // 001
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CreativeBridge;
