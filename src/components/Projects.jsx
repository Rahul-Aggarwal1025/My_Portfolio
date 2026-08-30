import { useState, useEffect, useRef } from "react";

/* ─── Cozy, Hand-Drawn Notebook Collage Palette ──────────────────────
   Backdrop:    #FAF6EE  (warm cream)
   Ink:         #1D222E  (deep navy-black)
   Gold/Yellow: #fdcb6e  (Project Alpha - Neural Spec)
   Cyan/Teal:   #00cec9  (Project Beta - Web Spec)
   Coral/Red:   #ff7675  (Project Gamma - System Spec)
──────────────────────────────────────────────────────────────────── */

const projects = [
  {
    id: 1,
    tag: "NLP / Analytics",
    title: "Work Culture Index (WCI)",
    sub: "NLP & Analytics Project",
    desc: "NLP pipeline evaluating workplace culture. Processes 6,600+ reviews via RoBERTa and VADER to build a standardized index.",
    chips: ["Python", "RoBERTa", "VADER", "PCA", "Streamlit"],
    emoji: "📊",
    color: "#fdcb6e", // warm gold
    tabLabel: "WCI.SPEC",
  },
  {
    id: 2,
    tag: "ML / Data Eng",
    title: "Solar Irradiance Prediction",
    sub: "ML & Data Engineering Project",
    desc: "Scalable machine learning pipeline forecasting solar energy across India. Merges weather and pollution datasets via geospatial mapping.",
    chips: ["Python", "xarray", "Pandas", "ERA5 weather", "ML"],
    emoji: "☀️",
    color: "#00cec9", // warm cyan
    tabLabel: "SOLAR.SYS",
  },
  {
    id: 3,
    tag: "NLP / Analytics",
    title: "Pharma Perception Tool",
    sub: "NLP & Analytics Project",
    desc: "Data platform mapping patient sentiment. Benchmarks unstructured reviews across AskAPatient, WebMD, and PubMed.",
    chips: ["NLP", "Sentiment Analysis", "Python", "React", "Drugs.com"],
    emoji: "💊",
    color: "#ff7675", // warm coral
    tabLabel: "PHARMA.LOG",
  },
];

/* ─── Cozy Spec Folder Card Component ────────────────────────────── */
function ProjectCard({ project, onClick }) {
  const [hovered, setHovered] = useState(false);

  // Render hand-drawn micro-animated diagrams (cozy telemetry themed to each project!)
  const renderCozyTelemetry = () => {
    if (project.id === 1) {
      return (
        <svg width="100%" height="60" viewBox="0 0 200 60" style={{ display: "block" }}>
          {/* Cozy Dial Arc */}
          <path d="M 35 48 A 30 30 0 0 1 95 48" fill="none" stroke="#1D222E" strokeWidth="2.2" strokeLinecap="round" strokeDasharray="3 3" />

          {/* Emojis along the sentiment arc */}
          <text x="25" y="48" fontFamily="'Outfit', sans-serif" fontSize="10" textAnchor="middle">🙁</text>
          <text x="65" y="16" fontFamily="'Outfit', sans-serif" fontSize="10" textAnchor="middle">😐</text>
          <text x="105" y="48" fontFamily="'Outfit', sans-serif" fontSize="10" textAnchor="middle">🙂</text>

          {/* Needle with dynamic swinging animation */}
          <g transform="translate(65, 48)">
            <line x1="0" y1="0" x2="0" y2="-26" stroke="#1D222E" strokeWidth="2.5" strokeLinecap="round">
              <animateTransform
                attributeName="transform"
                type="rotate"
                values="-60; 45; -15; 60; -60"
                keyTimes="0; 0.25; 0.5; 0.75; 1"
                dur="5s"
                repeatCount="indefinite"
              />
            </line>
            <circle cx="0" cy="0" r="3.5" fill="#fdcb6e" stroke="#1D222E" strokeWidth="1.5" />
          </g>

          {/* Live Sentiment analysis bars */}
          <rect x="130" y="42" width="10" height="6" fill="none" stroke="#1D222E" strokeWidth="1.2" />
          <rect x="145" y="32" width="10" height="16" fill="none" stroke="#1D222E" strokeWidth="1.2" />
          <rect x="160" y="22" width="10" height="26" fill="none" stroke="#1D222E" strokeWidth="1.2" />

          <rect x="132" y="44" width="6" height="2" fill="#fdcb6e">
            <animate attributeName="height" values="2;4;1;3;2" dur="3s" repeatCount="indefinite" />
          </rect>
          <rect x="147" y="34" width="6" height="12" fill="#fdcb6e">
            <animate attributeName="height" values="12;6;14;8;12" dur="3.5s" repeatCount="indefinite" />
          </rect>
          <rect x="162" y="24" width="6" height="22" fill="#fdcb6e">
            <animate attributeName="height" values="22;15;24;18;22" dur="4s" repeatCount="indefinite" />
          </rect>

          <text x="130" y="14" fontFamily="'JetBrains Mono', monospace" fontSize="6.5" fontWeight="900" fill="#1D222E">
            SENTIMENT: +0.72
          </text>
          <text x="130" y="55" fontFamily="'JetBrains Mono', monospace" fontSize="5.5" fontWeight="700" fill="rgba(29,34,46,0.5)">
            VIBE.FLOWING...
          </text>
        </svg>
      );
    }
    if (project.id === 2) {
      return (
        <svg width="100%" height="60" viewBox="0 0 200 60" style={{ display: "block" }}>
          {/* Rotating Cozy Sun on the left */}
          <g transform="translate(35, 30)">
            {/* Sun Core */}
            <circle cx="0" cy="0" r="7" fill="#00cec9" stroke="#1D222E" strokeWidth="1.8" />
            {/* Ray structure rotating */}
            <g>
              <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="10s" repeatCount="indefinite" />
              <line x1="0" y1="-12" x2="0" y2="-10" stroke="#1D222E" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="0" y1="10" x2="0" y2="12" stroke="#1D222E" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="-12" y1="0" x2="-10" y2="0" stroke="#1D222E" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="10" y1="0" x2="12" y2="0" stroke="#1D222E" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="-8" y1="-8" x2="-7" y2="-7" stroke="#1D222E" strokeWidth="1.2" strokeLinecap="round" />
              <line x1="7" y1="7" x2="8" y2="8" stroke="#1D222E" strokeWidth="1.2" strokeLinecap="round" />
              <line x1="8" y1="-8" x2="7" y2="-7" stroke="#1D222E" strokeWidth="1.2" strokeLinecap="round" />
              <line x1="-7" y1="7" x2="-8" y2="8" stroke="#1D222E" strokeWidth="1.2" strokeLinecap="round" />
            </g>
          </g>

          {/* Sketchy Solar Irradiance Daily Wave Curve */}
          <line x1="70" y1="46" x2="185" y2="46" stroke="#1D222E" strokeWidth="1.5" strokeDasharray="3 3" />

          <path d="M 70 46 Q 127 12 185 46" fill="none" stroke="#1D222E" strokeWidth="2" strokeLinecap="round" />

          <circle r="3.5" fill="#00cec9" stroke="#1D222E" strokeWidth="1.5">
            <animateMotion
              path="M 70 46 Q 127 12 185 46"
              dur="4s"
              repeatCount="indefinite"
            />
          </circle>

          {/* Real-time Telemetry readouts */}
          <text x="75" y="11" fontFamily="'JetBrains Mono', monospace" fontSize="6.5" fontWeight="900" fill="#1D222E">
            RAD: 682 W/m²
          </text>
          <text x="75" y="55" fontFamily="'JetBrains Mono', monospace" fontSize="5.5" fontWeight="700" fill="rgba(29,34,46,0.5)">
            FORECAST: SOLAR.MODEL_2
          </text>
        </svg>
      );
    }
    if (project.id === 3) {
      return (
        <svg width="100%" height="60" viewBox="0 0 200 60" style={{ display: "block" }}>
          {/* Cozy sketchy Capsule Pill on the left */}
          <g transform="translate(35, 30) rotate(-35)">
            <rect x="-14" y="-7" width="28" height="14" rx="7" fill="none" stroke="#1D222E" strokeWidth="1.8" />
            <path d="M -7 -6.1 L 0 -6.1 L 0 6.1 L -7 6.1 A 6 6 0 0 1 -7 -6.1" fill="#ff7675" stroke="#1D222E" strokeWidth="0.8" />
            <line x1="-10" y1="-3" x2="-4" y2="-3" stroke="#FAF6EE" strokeWidth="1" strokeLinecap="round" />
          </g>

          {/* Gap Comparison Chart: Patient vs Clinical */}
          <rect x="85" y="15" width="14" height="32" rx="2" fill="none" stroke="#1D222E" strokeWidth="1.2" />
          <rect x="87" y="17" width="10" height="28" rx="1" fill="rgba(29,34,46,0.15)" />
          <text x="92" y="54" fontFamily="'JetBrains Mono', monospace" fontSize="5.5" fontWeight="900" fill="#1D222E" textAnchor="middle">CLINIC</text>

          <rect x="115" y="15" width="14" height="32" rx="2" fill="none" stroke="#1D222E" strokeWidth="1.2" />
          <rect x="117" y="27" width="10" height="18" rx="1" fill="#ff7675">
            <animate attributeName="y" values="27;19;31;25;27" dur="3.5s" repeatCount="indefinite" />
            <animate attributeName="height" values="18;26;14;20;18" dur="3.5s" repeatCount="indefinite" />
          </rect>
          <text x="122" y="54" fontFamily="'JetBrains Mono', monospace" fontSize="5.5" fontWeight="900" fill="#1D222E" textAnchor="middle">PATIENT</text>

          {/* Discrepancy indicator bracket */}
          <path d="M 103 17 L 111 17 M 103 27 L 111 27 M 107 17 L 107 27" stroke="#1D222E" strokeWidth="1" fill="none">
            <animate attributeName="d" values="M 103 17 L 111 17 M 103 27 L 111 27 M 107 17 L 107 27; M 103 17 L 111 17 M 103 19 L 111 19 M 107 17 L 107 19; M 103 17 L 111 17 M 103 31 L 111 31 M 107 17 L 107 31; M 103 17 L 111 17 M 103 25 L 111 25 M 107 17 L 107 25; M 103 17 L 111 17 M 103 27 L 111 27 M 107 17 L 107 27" dur="3.5s" repeatCount="indefinite" />
          </path>

          {/* Telemetry data info */}
          <text x="142" y="22" fontFamily="'JetBrains Mono', monospace" fontSize="6.5" fontWeight="900" fill="#1D222E">
            GAP DETECTED
          </text>
          <text x="142" y="32" fontFamily="'JetBrains Mono', monospace" fontSize="6" fontWeight="700" fill="#ff7675">
            DISCORD: 32%
          </text>
        </svg>
      );
    }
    return null;
  };

  const defaultRot = project.id === 1 ? "-1.5deg" : project.id === 2 ? "1.2deg" : "-0.8deg";

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        width: "290px",
        height: "365px",
        background: "#CBA375", // Masonite wooden clipboard tan texture
        backgroundImage: "radial-gradient(circle at 50% 50%, #D4AE85 0%, #B89265 100%)", // High-fidelity wood grain gradient!
        border: "2.2px solid #1D222E",
        borderRadius: "14px",
        boxShadow: hovered ? "8px 8px 0px #1D222E" : "5px 5px 0px #1D222E",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        zIndex: hovered ? 10 : 2,
        padding: "0px", // Padded by absolute paper positioning
      }}
    >
      {/* 1. Metal Spring Clip (Steel Hardware) absolute at top center */}
      <div
        style={{
          position: "absolute",
          top: "-12px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 5,
          pointerEvents: "none",
        }}
      >
        <svg width="60" height="26" viewBox="0 0 60 26" fill="none" style={{ filter: "drop-shadow(0 2px 3px rgba(0,0,0,0.18))" }}>
          {/* Spring clip plate */}
          <path
            d="M 6,24 L 54,24 Q 56,24 56,20 L 52,4 Q 51,1 48,1 L 12,1 Q 9,1 8,4 L 4,20 Q 4,24 6,24 Z"
            fill="#DFE6E9"
            stroke="#1D222E"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          {/* Fastener rivet left */}
          <circle cx="16" cy="18" r="2.5" fill="#FAF6EE" stroke="#1D222E" strokeWidth="1.5" />
          <circle cx="16" cy="18" r="0.8" fill="#1D222E" />
          {/* Fastener rivet right */}
          <circle cx="44" cy="18" r="2.5" fill="#FAF6EE" stroke="#1D222E" strokeWidth="1.5" />
          <circle cx="44" cy="18" r="0.8" fill="#1D222E" />
          {/* Spring tension loop center */}
          <rect x="25" y="4" width="10" height="4" rx="2" fill="#74B9FF" stroke="#1D222E" strokeWidth="1.5" />
        </svg>
      </div>

      {/* 2. Clipped Paper Spec Sheet */}
      <div
        style={{
          position: "absolute",
          inset: "34px 10px 10px",
          background: "#FFFDF0", // Drawing paper warm yellow-white
          backgroundImage: `linear-gradient(135deg, ${project.color}05 0%, transparent 100%)`,
          border: "1.8px solid #1D222E",
          borderRadius: "8px",
          padding: "16px 16px 14px 16px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          boxSizing: "border-box",
          zIndex: 3,
          transform: hovered ? "rotate(0deg) translateY(-2px)" : `rotate(${defaultRot})`,
          boxShadow: hovered ? "3px 6px 16px rgba(0,0,0,0.12)" : "1px 2px 6px rgba(0,0,0,0.06)",
          transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease",
          overflow: "hidden",
        }}
      >
        {/* Drafting red margin line */}
        <div
          style={{
            position: "absolute",
            left: "6px",
            top: 0,
            bottom: 0,
            width: "1px",
            borderLeft: "1px dashed rgba(229,57,53,0.2)",
            pointerEvents: "none",
          }}
        />

        {/* Paper title label block */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "8.5px",
                fontWeight: "900",
                color: "#1D222E",
                textTransform: "uppercase",
                letterSpacing: "1.2px",
                background: `${project.color}15`,
                border: `1.2px solid ${project.color}40`,
                padding: "2px 6px",
                borderRadius: "4px",
              }}
            >
              {project.tag}
            </span>
            <span style={{ fontSize: "18px" }}>{project.emoji}</span>
          </div>

          <h3
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "17.5px",
              fontWeight: "900",
              color: "#1D222E",
              margin: 0,
              letterSpacing: "-0.01em",
            }}
          >
            {project.title}
          </h3>

          <span
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "10.5px",
              fontWeight: "700",
              color: "rgba(29, 34, 46, 0.45)",
              display: "block",
              marginTop: "2px",
            }}
          >
            {project.sub}
          </span>

          <p
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "12px",
              fontWeight: "600",
              color: "rgba(29, 34, 46, 0.7)",
              lineHeight: 1.5,
              margin: "8px 0 0 0",
            }}
          >
            {project.desc}
          </p>
        </div>

        {/* Technical Live Telemetry visual section */}
        <div
          style={{
            margin: "8px 0",
            background: "rgba(29, 34, 46, 0.02)",
            border: "1px dashed rgba(29, 34, 46, 0.12)",
            borderRadius: "6px",
            padding: "6px",
            boxSizing: "border-box",
            position: "relative",
          }}
        >
          {renderCozyTelemetry()}
        </div>

        {/* Chips & bottom tags */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
            {project.chips.map((chip) => (
              <span
                key={chip}
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "7.5px",
                  fontWeight: "800",
                  color: "#1D222E",
                  background: "rgba(29, 34, 46, 0.04)",
                  border: "1px solid rgba(29, 34, 46, 0.08)",
                  borderRadius: "4px",
                  padding: "1px 4.5px",
                }}
              >
                {chip}
              </span>
            ))}
          </div>

          {/* Action indicator line */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontFamily: "'Outfit', sans-serif",
              fontSize: "9.5px",
              fontWeight: "800",
              color: hovered ? "#1D222E" : "rgba(29, 34, 46, 0.4)",
              transition: "color 0.3s ease",
              paddingTop: "5px",
              borderTop: "1px dashed rgba(29, 34, 46, 0.12)",
            }}
          >
            <span>{"TELEMETRY SPEC EXPAND"}</span>
            <span style={{ fontSize: "11px", transform: hovered ? "translateX(3px)" : "none", transition: "transform 0.3s ease" }}>{"→"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Projects Blueprint Drafting Workspace ────────────────────────── */
function Projects({ onProjectOpen }) {
  const canvasRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // Responsive boundary checks
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 900);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // HTML5 Live Vector Drafting Table Canvas logic
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    // Mouse coordinates tracker relative to drafting surface
    let mouse = { x: null, y: null };
    let targetMouse = { x: null, y: null };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      targetMouse.x = e.clientX - rect.left;
      targetMouse.y = e.clientY - rect.top;

      if (mouse.x === null) {
        mouse.x = targetMouse.x;
        mouse.y = targetMouse.y;
      }
    };

    const handleMouseLeave = () => {
      targetMouse.x = null;
      targetMouse.y = null;
    };

    const parent = canvas.parentElement;
    parent.addEventListener("mousemove", handleMouseMove);
    parent.addEventListener("mouseleave", handleMouseLeave);

    const handleResize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    // Dynamic rotation angle for compass dials
    let angle = 0;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Interpolate mouse movement for super smooth cursor dragging sweeps!
      if (targetMouse.x !== null) {
        mouse.x += (targetMouse.x - mouse.x) * 0.12;
        mouse.y += (targetMouse.y - mouse.y) * 0.12;

        angle += 0.01;

        // Draw elegant technical drafting vector lines centered on cursor (Live Drafting Tool!)
        ctx.strokeStyle = "rgba(29, 34, 46, 0.04)";
        ctx.lineWidth = 1;

        // 1. T-Square horizontal alignment line
        ctx.beginPath();
        ctx.setLineDash([6, 6]);
        ctx.moveTo(0, mouse.y);
        ctx.lineTo(width, mouse.y);
        ctx.stroke();

        // 2. Vertical coordinate alignment line
        ctx.beginPath();
        ctx.setLineDash([6, 6]);
        ctx.moveTo(mouse.x, 0);
        ctx.lineTo(mouse.x, height);
        ctx.stroke();

        // 3. concentric compass drafting rings
        ctx.strokeStyle = "rgba(29, 34, 46, 0.05)";
        ctx.beginPath();
        ctx.setLineDash([]);
        ctx.arc(mouse.x, mouse.y, 25, 0, Math.PI * 2);
        ctx.stroke();

        ctx.strokeStyle = "rgba(29, 34, 46, 0.03)";
        ctx.beginPath();
        ctx.setLineDash([4, 4]);
        ctx.arc(mouse.x, mouse.y, 55, 0, Math.PI * 2);
        ctx.stroke();

        // 4. Outer sweep arc dial (Compass compass dial effect!)
        ctx.strokeStyle = "rgba(29, 34, 46, 0.04)";
        ctx.beginPath();
        ctx.setLineDash([]);
        ctx.arc(mouse.x, mouse.y, 90, angle, angle + Math.PI * 0.4);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 90, angle + Math.PI, angle + Math.PI * 1.4);
        ctx.stroke();

        // Tiny crosshair target at center
        ctx.strokeStyle = "rgba(29, 34, 46, 0.12)";
        ctx.beginPath();
        ctx.moveTo(mouse.x - 6, mouse.y);
        ctx.lineTo(mouse.x + 6, mouse.y);
        ctx.moveTo(mouse.x, mouse.y - 6);
        ctx.lineTo(mouse.x, mouse.y + 6);
        ctx.stroke();
      } else {
        // Slowly ease mouse coordinates out to null when cursor departs
        mouse.x = null;
        mouse.y = null;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      parent.removeEventListener("mousemove", handleMouseMove);
      parent.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section
      id="projects"
      style={{
        background: "#FAF6EE", // Restored cozy warm cream background!
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: isMobile ? "80px 24px" : "110px 24px 120px",
        position: "relative",
        overflow: "hidden",
        boxSizing: "border-box",
      }}
    >
      {/* Real-time vector drafting table canvas backdrop */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* Blueprint grid pattern overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(to right, rgba(29,34,46,0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(29,34,46,0.02) 1px, transparent 1px)",
          backgroundSize: "45px 45px",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* Cozy ambient radial backdrop lighting glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(circle at center, rgba(255,255,255,0.7) 0%, rgba(250,246,238,0.2) 100%)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* ── Section header ── */}
      <div style={{ textAlign: "center", marginBottom: "64px", position: "relative", zIndex: 2 }}>
        {/* Cozy tech washi tape flag accent */}
        <div
          style={{
            position: "absolute",
            top: "-14px",
            left: "50%",
            transform: "translateX(-155px) rotate(-5deg)",
            width: "48px",
            height: "14px",
            background: "rgba(0, 206, 201, 0.4)",
            border: "1px solid rgba(29, 34, 46, 0.08)",
            borderRadius: "2px",
            pointerEvents: "none",
          }}
        />

        {/* Star doodle matching Experience.jsx */}
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          style={{
            position: "absolute",
            top: "-18px",
            right: "calc(50% - 140px)",
            opacity: 0.45,
            pointerEvents: "none",
          }}
        >
          <path d="M9 1 L10.2 7.2 L16.5 9 L10.2 10.8 L9 17 L7.8 10.8 L1.5 9 L7.8 7.2 Z" fill="#1D222E" />
        </svg>

        <h2
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: "clamp(34px, 5.5vw, 54px)",
            fontWeight: "900",
            color: "#1D222E",
            margin: "0 0 16px",
            lineHeight: 1.1,
          }}
        >
          My{" "}
          <span style={{ position: "relative", display: "inline-block" }}>
            <span
              style={{
                position: "absolute",
                inset: "-4px -8px",
                background: "#1D222E",
                borderRadius: "4px",
                transform: "rotate(-1.5deg)",
                zIndex: 0,
              }}
            />
            <span style={{ position: "relative", zIndex: 1, color: "#ffeaa7", padding: "0 6px" }}>
              Projects
            </span>
          </span>
        </h2>

        {/* Technical doodle zigzag separator */}
        <svg
          width="72"
          height="10"
          viewBox="0 0 72 10"
          style={{
            display: "block",
            margin: "12px auto 0",
            opacity: 0.22,
            pointerEvents: "none",
          }}
        >
          <polyline
            points="0,5 9,1 18,9 27,1 36,9 45,1 54,9 63,1 72,5"
            fill="none"
            stroke="#1D222E"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <p
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: "16px",
            fontWeight: "600",
            color: "rgba(29, 34, 46, 0.55)",
            lineHeight: 1.6,
            maxWidth: "600px",
            margin: "24px auto 0",
          }}
        >
          Computational artifacts developed across machine learning, natural language processing, and data engineering.
        </p>
      </div>

      {/* COZY SPEC FOLDER BENTO ARRAY */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          maxWidth: "1040px",
          display: "flex",
          flexWrap: "wrap",
          gap: "40px",
          justifyContent: "center",
          alignItems: "center",
          padding: "0 8px",
          boxSizing: "border-box",
        }}
      >
        {projects.map((p) => (
          <ProjectCard key={p.id} project={p} onClick={() => onProjectOpen(p.id)} />
        ))}
      </div>
    </section>
  );
}

export default Projects;