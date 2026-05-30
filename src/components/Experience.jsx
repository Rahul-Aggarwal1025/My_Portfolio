import { useState, useEffect, useRef } from "react";
import plakshaLogo from "../assets/plaksha_logo.png";
import leoLogo from "../assets/leo_logo.png";

const experiences = [
  {
    id: 1,
    image: plakshaLogo,
    tag: "Internship #01 · Policy",
    date: "Summer 2024 · 3 mos",
    title: "Diversity, Equity & Inclusion Policy Intern",
    company: "Plaksha University DEI Lab",
    description: "Processed stakeholder data, turning complex multi-source inputs into structured insights. Authored a 20-page DEI Impact Report: the kind of work where you refine spreadsheet analysis into a publication-ready corporate standard.",
    chips: ["Stakeholder Data", "DEI Impact Report", "Oxford Comma Debates ✍️", "Caffeine Overdrive ☕"],
    status: "🚀 COFFEE_LEVEL: 100% CONCENTRATE",
    color: "#C78685",
    bgColor: "rgba(199, 134, 133, 0.08)",
    borderColor: "rgba(199, 134, 133, 0.2)",
    numeralBg: "rgba(199, 134, 133, 0.03)",
    sectionBg: "#FAF0EE",
  },
  {
    id: 2,
    image: leoLogo,
    tag: "Research #02 · Applied NLP",
    date: "Fall 2024 · 4 mos",
    title: "Applied NLP & Social Impact Researcher",
    company: "LEO Lab (Data Science & Economic Behaviour)",
    description: "Conducted applied NLP research on public perception, scraping large-scale review data and extracting structured insights from unstructured text datasets to model online consumer behavior.",
    chips: ["NLP Research", "Data Scraping", "Sentiment Analysis", "Cat Classifier 🐱", "VRAM Allocation 💾"],
    status: "⏳ STAGE: QUEUED (Awaiting H100 GPU allocation from the Lab Gods)",
    color: "#72A18A",
    bgColor: "rgba(114, 161, 138, 0.08)",
    borderColor: "rgba(114, 161, 138, 0.2)",
    numeralBg: "rgba(114, 161, 138, 0.03)",
    sectionBg: "#F2FAF4",
  }
];

function ExperienceCard({ exp, index, onActive, isMobile }) {
  const cardRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const currentRef = cardRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          onActive(exp.id);
          // Unobserve immediately to lock the animation in place (triggering once only!)
          if (currentRef) {
            observer.unobserve(currentRef);
          }
        }
      },
      {
        threshold: isMobile ? 0.15 : 0.35,
        rootMargin: "-8% 0px -8% 0px",
      }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [exp.id, onActive, isMobile]);

  const isEven = index % 2 === 0;

  return (
    <div
      ref={cardRef}
      className={`exp-row ${isInView ? "is-active" : ""}`}
      style={{
        width: "100%",
        position: "relative",
        zIndex: 2,
        margin: isMobile ? "24px 0" : "48px 0",
      }}
    >
      {/* Left timeline anchor and horizontal connector (Desktop Only) - Aligns with vertical track at left: -35px */}
      {!isMobile && (
        <div
          className="timeline-link-bridge"
          style={{
            position: "absolute",
            left: "-70px", // Pushed corridor left to -70px for generous breathing space (was -40px)
            top: "50%",
            transform: "translateY(-50%)",
            width: "70px", // Expanded to 70px width (was 40px)
            display: "flex",
            alignItems: "center",
            zIndex: 3,
            pointerEvents: "none",
          }}
        >
          {/* Coordinate anchor dot on vertical line */}
          <div
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              background: isInView ? exp.color : "rgba(29, 34, 46, 0.1)",
              border: `2px solid ${isInView ? "#ffffff" : "#FAF6EE"}`,
              boxShadow: isInView ? `0 0 10px ${exp.color}` : "none",
              transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
              position: "relative",
            }}
          />

          {/* Horizontal connection line (scaled independently) */}
          <div
            style={{
              width: "60px", // Expanded connection line width (was 30px)
              height: "1px",
              borderTop: `2px dashed ${isInView ? exp.color : "rgba(29, 34, 46, 0.12)"}`,
              transform: isInView ? "scaleX(1)" : "scaleX(0)",
              transformOrigin: "left",
              transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
              position: "relative",
            }}
          />

          {/* Dynamic target node label centered perfectly above dashed link corridor without scale warping */}
          <span
            style={{
              position: "absolute",
              left: "40px", // Mathematically centered over the 60px dashed line (10px dot + 30px = 40px)
              transform: "translateX(-50%)",
              bottom: "10px", // Elevated above the connection line
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "8px",
              fontWeight: "800",
              color: isInView ? exp.color : "rgba(29,34,46,0.3)",
              opacity: isInView ? 1 : 0,
              transition: "opacity 0.6s ease 0.2s, color 0.6s ease", // Slight delay to let the line extend first
              whiteSpace: "nowrap",
            }}
          >
            NODE.0{exp.id}
          </span>
        </div>
      )}

      {/* Frosted Glassmorphic Folio Plate Card with elegant slide, scale & blur entrance */}
      <div
        className="experience-folio-plate"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          border: "1px solid rgba(255, 255, 255, 0.55)",
          borderRadius: "24px",
          padding: isMobile ? "24px" : "36px",
          background: isHovered ? "rgba(255, 255, 255, 0.6)" : "rgba(255, 255, 255, 0.45)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          boxShadow: isHovered 
            ? "0 32px 80px rgba(29, 34, 46, 0.08), inset 0 1px 0 rgba(255,255,255,1)" 
            : "0 24px 64px rgba(29, 34, 46, 0.03), inset 0 1px 0 rgba(255,255,255,1)",
          display: "flex",
          flexDirection: isMobile ? "column" : (isEven ? "row" : "row-reverse"),
          gap: isMobile ? "24px" : "36px",
          alignItems: "center",
          transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease, filter 0.6s ease, opacity 0.6s ease, background-color 0.4s ease",
          position: "relative",
          overflow: "hidden",
          // One-time scroll + hover animations
          transform: isInView 
            ? (isHovered ? "scale(1.01) translateY(-4px)" : "scale(1) translateY(0)") 
            : "scale(0.96) translateY(45px)",
          filter: isInView ? "none" : "blur(6px)",
          opacity: isInView ? 1 : 0,
        }}
      >
        {/* Decorative backdrop oversized numeral */}
        <div
          className="backdrop-numeral"
          style={{
            position: "absolute",
            fontFamily: "'Outfit', sans-serif",
            fontWeight: "900",
            color: exp.numeralBg,
            userSelect: "none",
            pointerEvents: "none",
            right: isEven ? "3%" : "auto",
            left: isEven ? "auto" : "3%",
            top: "-10px",
            zIndex: 0,
          }}
        >
          0{exp.id}
        </div>

        {/* Column 1: Blueprint Viewport Panel */}
        <div
          className="blueprint-viewport-wrapper"
          style={{
            flex: isMobile ? "1 1 100%" : "0 0 35%", // Reduced basis to 35% to prevent total columns + gap exceeding content width
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div
            className="blueprint-outer"
            style={{
              position: "relative",
              padding: "16px",
              border: "1px solid rgba(255, 255, 255, 0.5)",
              background: "rgba(255, 255, 255, 0.2)",
              borderRadius: "16px",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "200px",
              boxSizing: "border-box",
            }}
          >
            {/* Core blueprint grid overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage: "radial-gradient(rgba(29, 34, 46, 0.05) 1px, transparent 1px)",
                backgroundSize: "16px 16px",
                pointerEvents: "none",
                zIndex: 0,
              }}
            />

            {/* Reveal Wrapper */}
            <div
              className="blueprint-image-wrapper"
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                zIndex: 1,
                borderRadius: "10px",
                overflow: "hidden",
                padding: "10px",
                background: exp.bgColor,
                border: `1px solid ${exp.borderColor}`,
                boxSizing: "border-box",
              }}
            >
              {/* Smooth color wipe mask */}
              <div
                className="wipe-mask"
                style={{
                  position: "absolute",
                  inset: 0,
                  background: exp.color,
                  transform: isInView ? "scaleX(0)" : "scaleX(1)",
                  transformOrigin: isEven ? "left" : "right",
                  transition: "transform 0.9s cubic-bezier(0.77, 0, 0.175, 1)",
                  zIndex: 2,
                }}
              />
              <img
                src={exp.image}
                alt={exp.title}
                style={{
                  maxWidth: "92%",
                  maxHeight: exp.id === 1 ? "95px" : "125px",
                  objectFit: "contain",
                  filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.04))",
                  zIndex: 1,
                  transform: isHovered ? "scale(1.1)" : "scale(1.02)",
                  transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
                className="blueprint-img"
              />
            </div>
          </div>

          {/* Coordination notes below framing */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "9px",
              color: "rgba(29, 34, 46, 0.4)",
              padding: "0 4px",
            }}
          >
            <span>ENGINEERING // FILE:00{exp.id}</span>
            <span>COORD: {isEven ? "[45.98 // -12.18]" : "[72.11 // 195.42]"}</span>
          </div>
        </div>

        {/* Column 2: Narrative Content Panel */}
        <div
          className="editorial-text-panel"
          style={{
            flex: isMobile ? "1 1 100%" : "1 1 0%", // Grows to fill exact remaining container width, perfectly preserving card padding
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "14px",
            position: "relative",
            zIndex: 1,
            textAlign: "left",
          }}
        >
          {/* Metabar details */}
          <div
            className="reveal-element delay-1"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "10px",
                fontWeight: "700",
                color: exp.color,
                background: exp.bgColor,
                border: `1px solid ${exp.borderColor}`,
                padding: "3px 8px",
                borderRadius: "4px",
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              {exp.tag}
            </span>
            <span
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "13px",
                fontWeight: "600",
                color: "rgba(29, 34, 46, 0.4)",
              }}
            >
              {exp.date}
            </span>
          </div>

          {/* Dynamic Title block */}
          <div className="reveal-element delay-2" style={{ position: "relative" }}>
            <h3
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: isMobile ? "20px" : "26px",
                fontWeight: "900",
                color: "#1D222E",
                margin: "0 0 4px 0",
                lineHeight: 1.25,
                letterSpacing: "-0.01em",
              }}
            >
              {exp.title}
            </h3>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
              <span
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "15px",
                  fontWeight: "700",
                  color: exp.color,
                }}
              >
                {exp.company}
              </span>
              <span style={{ fontSize: "12px", color: "rgba(29,34,46,0.12)" }}>|</span>
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "10px",
                  fontWeight: "700",
                  color: exp.color,
                  background: "rgba(255,255,255,0.6)",
                  padding: "2px 8px",
                  borderRadius: "4px",
                  border: `1px solid ${exp.borderColor}`,
                }}
              >
                {exp.status}
              </span>
            </div>
          </div>

          {/* Narrative Block with technical left borders */}
          <div
            className="reveal-element delay-3"
            style={{
              background: "rgba(255, 255, 255, 0.4)",
              borderLeft: `4px solid ${exp.color}`,
              padding: "18px 28px", // Increased padding for generous white space from borders
              borderRadius: "4px 12px 12px 4px",
              boxShadow: "0 8px 24px rgba(29,34,46,0.01)",
              backdropFilter: "blur(8px)",
            }}
          >
            <p
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "14.5px",
                fontWeight: "500",
                color: "rgba(29, 34, 46, 0.8)",
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              {exp.description}
            </p>
          </div>

          {/* Tech chips catalog */}
          <div
            className="reveal-element delay-4"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
              alignItems: "center",
            }}
          >
            {exp.chips.map((chip, idx) => (
              <span
                key={idx}
                className="chip-tag"
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "11px",
                  fontWeight: "700",
                  color: exp.color,
                  background: "rgba(255, 255, 255, 0.85)",
                  padding: "4px 10px",
                  borderRadius: "6px",
                  border: `1px solid ${exp.borderColor}`,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.01)",
                  transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              >
                {chip}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function TimelineCompletionSeal({ isMobile }) {
  const sealRef = useRef(null);
  const [isActivated, setIsActivated] = useState(false);

  useEffect(() => {
    const currentRef = sealRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsActivated(true);
          if (currentRef) {
            observer.unobserve(currentRef);
          }
        }
      },
      {
        threshold: 0.15,
      }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const handleReboot = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <div
      ref={sealRef}
      style={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        alignItems: "center",
        justifyContent: "center",
        gap: isMobile ? "32px" : "0px",
        width: "100%",
        maxWidth: "680px",
        margin: isMobile ? "50px auto 20px" : "80px auto 40px",
        position: "relative",
        zIndex: 2,
        opacity: isActivated ? 1 : 0,
        transform: isActivated ? "translateY(0)" : "translateY(40px)",
        transition: "opacity 1.0s cubic-bezier(0.16, 1, 0.3, 1), transform 1.0s cubic-bezier(0.16, 1, 0.3, 1)",
        boxSizing: "border-box",
      }}
    >
      {/* 1. Tactile Polaroid snapshot card */}
      <div
        style={{
          width: "240px",
          background: "#ffffff",
          border: "2.5px solid #1D222E",
          borderRadius: "12px",
          boxShadow: "6px 6px 0px #1D222E",
          padding: "14px",
          transform: isActivated ? "rotate(-3deg)" : "rotate(-12deg) scale(0.9)",
          transition: "transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.3s ease",
          boxSizing: "border-box",
          cursor: "default",
          position: "relative",
          zIndex: 3,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "rotate(-0.5deg) translateY(-4px)";
          e.currentTarget.style.boxShadow = "8px 8px 0px #1D222E";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "rotate(-3deg) translateY(0)";
          e.currentTarget.style.boxShadow = "6px 6px 0px #1D222E";
        }}
      >
        {/* Custom Vector SVG Cozy Workstation slot */}
        <div
          style={{
            width: "100%",
            height: "160px",
            background: "#1E222F", // Dark blueprint sky background
            borderRadius: "6px",
            border: "1.5px solid #1D222E",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <svg width="100%" height="100%" viewBox="0 0 200 160" style={{ display: "block" }}>
            {/* Twinkling star cluster */}
            <g fill="#FAF6EE" opacity="0.6">
              <circle cx="25" cy="30" r="1.5" className="star-twinkle-1" />
              <circle cx="160" cy="40" r="1.2" className="star-twinkle-2" />
              <circle cx="40" cy="90" r="1.5" className="star-twinkle-2" />
              <circle cx="175" cy="85" r="1.0" className="star-twinkle-1" />
            </g>

            {/* Cozy Neon Desk Monitor */}
            <rect x="55" y="45" width="90" height="60" rx="4" fill="#121622" stroke="#FAF6EE" strokeWidth="2.5" />
            {/* Monitor Stand */}
            <path d="M90 105 L110 105 L106 122 L94 122 Z" fill="#FAF6EE" />
            <rect x="80" y="122" width="40" height="4" rx="1" fill="#FAF6EE" />

            {/* Glowing Green Heart on Screen */}
            <path
              d="M100 82 C95 72, 82 72, 82 82 C82 92, 100 102, 100 102 C100 102, 118 92, 118 82 C118 72, 105 72, 100 82 Z"
              fill="rgba(114, 161, 138, 0.2)"
              stroke="#72A18A"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Warm Desk Lamp casting yellow light */}
            <path d="M15 130 L45 130 L38 60 L22 60 Z" fill="rgba(253, 203, 110, 0.12)" /> {/* Light Beam */}
            <path d="M22 60 L38 60 L30 50 Z" fill="#FAF6EE" /> {/* Lamp Head */}
            <path d="M30 50 L30 110 C30 110, 20 120, 20 128" stroke="#FAF6EE" strokeWidth="2" fill="none" /> {/* Lamp neck */}
            <rect x="12" y="128" width="16" height="4" rx="1" fill="#FAF6EE" /> {/* Lamp base */}

            {/* Coffee Mug with rising steam waves */}
            <rect x="145" y="112" width="16" height="16" rx="3" fill="#C78685" />
            <path d="M161 116 C165 116, 167 119, 167 122 C167 125, 165 128, 161 128" stroke="#C78685" strokeWidth="2.5" fill="none" /> {/* Handle */}
            {/* Rising Steam Waves */}
            <path d="M149 105 Q151 100, 149 95" stroke="#FAF6EE" strokeWidth="1.5" strokeLinecap="round" fill="none" className="coffee-steam-1" />
            <path d="M154 107 Q156 102, 154 97" stroke="#FAF6EE" strokeWidth="1.5" strokeLinecap="round" fill="none" className="coffee-steam-2" />
          </svg>
        </div>

        {/* Polaroid caption signature */}
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "9px",
            fontWeight: "800",
            color: "#1D222E",
            marginTop: "12px",
            textAlign: "center",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
          }}
        >
          FILE: SCROLL_COMPLETE.ZIP 📦
        </div>
      </div>

      {/* 2. Overlapping yellow post-it/notepad sheet */}
      <div
        style={{
          width: isMobile ? "100%" : "340px",
          background: "#FFFDF0", // Warm sketchpad scrap yellow
          border: "2.5px solid #1D222E",
          borderRadius: "12px",
          boxShadow: "6px 6px 0px #1D222E",
          padding: "24px 28px",
          transform: isMobile ? "rotate(0deg)" : "rotate(3.5deg) translateX(-20px)", // Organically overlaps polaroid
          transition: "transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.3s ease",
          boxSizing: "border-box",
          position: "relative",
          zIndex: 2,
          textAlign: "left",
        }}
        onMouseEnter={(e) => {
          if (!isMobile) {
            e.currentTarget.style.transform = "rotate(1deg) translateX(-20px) translateY(-4px)";
            e.currentTarget.style.boxShadow = "8px 8px 0px #1D222E";
          }
        }}
        onMouseLeave={(e) => {
          if (!isMobile) {
            e.currentTarget.style.transform = "rotate(3.5deg) translateX(-20px) translateY(0)";
            e.currentTarget.style.boxShadow = "6px 6px 0px #1D222E";
          }
        }}
      >
        {/* Retro paperclip vector overlapping at top */}
        <div style={{ position: "absolute", top: "-14px", left: "40px", zIndex: 4 }}>
          <svg width="24" height="36" viewBox="0 0 24 36" fill="none" stroke="#1D222E" strokeWidth="2.5">
            <path d="M8 26 L8 12 A6 6 0 0 1 20 12 L20 22 A4 4 0 0 1 12 22 L12 12 A2 2 0 0 1 16 12 L16 20" strokeLinecap="round" />
          </svg>
        </div>

        {/* Heading */}
        <h4
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: "17px",
            fontWeight: "900",
            color: "#1D222E",
            margin: "0 0 8px 0",
            letterSpacing: "-0.01em",
          }}
        >
          Thank you for making it this far.
        </h4>

        {/* Body content */}
        <p
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: "13px",
            fontWeight: "600",
            color: "rgba(29, 34, 46, 0.75)",
            lineHeight: 1.5,
            margin: "0 0 16px 0",
          }}
        >
          Seriously, your scroll wheel deserves a raise. If this page was a neural net, your browser would be completely overfit on my credentials by now. 🧠⚡
        </p>

        {/* Notebook horizontal grid line overlay (subtle) */}
        <div
          style={{
            borderTop: "1px dashed rgba(29, 34, 46, 0.15)",
            paddingTop: "10px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "9px",
            color: "rgba(29, 34, 46, 0.4)",
            fontWeight: "800",
          }}
        >
          <span>LOSS: 0.00 // EPOCHS: 999</span>
          {/* Compass reboot button styled like a technical compass dial */}
          <button
            onClick={handleReboot}
            style={{
              background: "#ffffff",
              border: "1.5px solid #1D222E",
              borderRadius: "50%",
              width: "28px",
              height: "28px",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              boxShadow: "2px 2px 0px #1D222E",
              transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
              outline: "none",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-1px) rotate(180deg)";
              e.currentTarget.style.boxShadow = "3px 3px 0px #1D222E";
              e.currentTarget.style.background = "#FAF0EE";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0) rotate(0deg)";
              e.currentTarget.style.boxShadow = "2px 2px 0px #1D222E";
              e.currentTarget.style.background = "#ffffff";
            }}
            title="Rollback System to Top!"
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#1D222E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="19" x2="12" y2="5" />
              <polyline points="5,12 12,5 19,12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Experience() {
  const [activeExp, setActiveExp] = useState(0);
  const [scrollPercent, setScrollPercent] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);

  // Screen responsiveness hook
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 900);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Track scroll position inside experience container for visual progress SVG timeline
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalDist = rect.height + windowHeight;
      const currentDist = windowHeight - rect.top;
      const pct = Math.max(0, Math.min(100, (currentDist / totalDist) * 100));
      setScrollPercent(pct);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Compute active background color morph
  const activeData = experiences.find((e) => e.id === activeExp);
  const backdropBg = activeData ? activeData.sectionBg : "#FAF6EE";

  return (
    <div
      id="experience"
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        background: backdropBg,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: isMobile ? "80px 24px" : "100px 64px", // Balanced desktop padding letting centered margins work safely
        boxSizing: "border-box",
        overflow: "hidden",
        transition: "background 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {/* Premium custom animations and responsive overrides */}
      <style>
        {`
          /* Custom Grid Drawing overlays */
          .blueprint-outer::before {
            content: '';
            position: absolute;
            top: 0; left: 0; right: 0; height: 1px;
            background: linear-gradient(to right, rgba(29,34,46,0.1) 0%, transparent 100%);
          }
          .blueprint-outer::after {
            content: '';
            position: absolute;
            bottom: 0; left: 0; right: 0; height: 1px;
            background: linear-gradient(to right, transparent 0%, rgba(29,34,46,0.1) 100%);
          }

          /* Interactive Hover Scaling on Blueprint image frames */
          .experience-folio-plate {
            transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease, filter 0.8s ease, opacity 0.8s ease, background-color 0.4s ease;
          }
          .experience-folio-plate:hover {
            transform: translateY(-4px) !important;
            box-shadow: 0 32px 72px rgba(29, 34, 46, 0.05), inset 0 1px 0 rgba(255,255,255,1) !important;
            background: rgba(255, 255, 255, 0.6) !important;
          }
          .blueprint-img {
            transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
          }
          .experience-folio-plate:hover .blueprint-img {
            transform: scale(1.04) rotate(0.5deg);
          }
          .chip-tag:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(29,34,46,0.06);
            background: #ffffff !important;
          }

          /* Cinematic intersection text entrance controllers */
          .reveal-element {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
          }
          .backdrop-numeral {
            opacity: 0;
            font-size: clamp(140px, 20vw, 240px);
            transform: translateY(80px) rotate(-6deg);
            transition: opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1), transform 1.2s cubic-bezier(0.16, 1, 0.3, 1);
          }

          .exp-row.is-active .reveal-element {
            opacity: 1;
            transform: translateY(0);
          }
          .exp-row.is-active .backdrop-numeral {
            opacity: 1;
            transform: translateY(0) rotate(-2deg);
          }

          /* Stagger Delays */
          .reveal-element.delay-1 { transition-delay: 50ms; }
          .reveal-element.delay-2 { transition-delay: 150ms; }
          .reveal-element.delay-3 { transition-delay: 250ms; }
          .reveal-element.delay-4 { transition-delay: 350ms; }

          /* Rotating Dashed Scope Ring Animation */
          @keyframes rotateScope {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          .spin-ring {
            animation: rotateScope 16s linear infinite;
          }

          /* Frosted diagonal glass light sweep sweep exactly once */
          .experience-folio-plate::before {
            content: '';
            position: absolute;
            inset: 0;
            background: linear-gradient(
              110deg,
              transparent 35%,
              rgba(255, 255, 255, 0.35) 45%,
              rgba(255, 255, 255, 0.35) 55%,
              transparent 65%
            );
            transform: translateX(-100%);
            z-index: 2;
            pointer-events: none;
          }

          .exp-row.is-active .experience-folio-plate::before {
            animation: lightSweep 1.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            animation-delay: 0.1s;
          }

          @keyframes lightSweep {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }

          /* Mobile layout overrides */
          @media (max-width: 900px) {
            #experience {
              padding: 80px 24px !important;
            }
            .exp-row {
              margin: 32px 0 !important;
            }
            .backdrop-numeral {
              font-size: 140px !important;
              top: -20px !important;
              left: 50% !important;
              transform: translateX(-50%) translateY(30px) !important;
              opacity: 0.5;
            }
            .exp-row.is-active .backdrop-numeral {
            }
          }

          /* Polaroid rising coffee steam and twinkling star animations */
          @keyframes steamRise {
            0% { transform: translateY(0) scaleX(1); opacity: 0; }
            15% { opacity: 0.4; }
            50% { transform: translateY(-16px) scaleX(1.2) translateX(2px); opacity: 0.6; }
            85% { opacity: 0.2; }
            100% { transform: translateY(-30px) scaleX(0.9) translateX(-2px); opacity: 0; }
          }
          .coffee-steam-1 {
            animation: steamRise 3s ease-in-out infinite;
          }
          .coffee-steam-2 {
            animation: steamRise 3s ease-in-out infinite;
            animation-delay: 1s;
          }
          .star-twinkle-1 {
            animation: twinkleStar 2s ease-in-out infinite;
          }
          .star-twinkle-2 {
            animation: twinkleStar 2s ease-in-out infinite;
            animation-delay: 1s;
          }
          @keyframes twinkleStar {
            0%, 100% { opacity: 0.3; transform: scale(0.8); }
            50% { opacity: 1; transform: scale(1.2); }
          }
        `}
      </style>

      {/* Star doodle outline backdrop */}
      <div
        style={{
          position: "absolute",
          top: "-5%",
          left: "-5%",
          width: "40%",
          height: "40%",
          background: "radial-gradient(circle, rgba(199,134,133,0.04) 0%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-5%",
          right: "-5%",
          width: "40%",
          height: "40%",
          background: "radial-gradient(circle, rgba(114,161,138,0.04) 0%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Blueprint background grid coordinate overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(to right, rgba(0,0,0,0.015) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.015) 1px, transparent 1px)",
          backgroundSize: "45px 45px",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* SECTION HEADER */}
      <div style={{ zIndex: 3, textAlign: "center", marginBottom: "48px", maxWidth: "800px", position: "relative" }}>
        {/* Small washi accent matching Skills.jsx */}
        <div
          style={{
            position: "absolute",
            top: "-12px",
            left: "50%",
            transform: "translateX(-155px) rotate(-5deg)",
            width: "46px",
            height: "14px",
            background: "rgba(162, 155, 254, 0.4)",
            border: "1px solid rgba(29, 34, 46, 0.08)",
            borderRadius: "2px",
            pointerEvents: "none",
          }}
        />
        {/* Star doodle matching Skills.jsx */}
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          style={{
            position: "absolute",
            top: "-16px",
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
            fontSize: "clamp(30px, 4.5vw, 50px)",
            fontWeight: "900",
            color: "#1D222E",
            margin: "0 0 16px",
            lineHeight: 1.1,
          }}
        >
          Work{" "}
          <span style={{ position: "relative", display: "inline-block" }}>
            <span
              style={{
                position: "absolute",
                inset: "-4px -8px",
                background: "#1D222E",
                transform: "rotate(-1.5deg)",
                borderRadius: "4px",
                zIndex: 0,
              }}
            />
            <span style={{ position: "relative", zIndex: 1, color: "#a29bfe", padding: "0 6px" }}>
              Experience
            </span>
          </span>
        </h2>
        
        {/* Subtle zigzag underline matching Skills.jsx */}
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
          A highly analytical journey sitting at the intersection of data extraction, applied research, and structural policy drafting.
        </p>
      </div>

      {/* EXPERIENCES CONTAINER */}
      <div
        style={{
          width: "100%",
          maxWidth: "1000px",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* DYNAMIC SCROLL GAUGE // TIMELINE (Desktop Only) - Nested perfectly inside the centered container */}
        {!isMobile && (
          <div
            style={{
              position: "absolute",
              left: "-65px", // Aligns exactly with bridge dots centers! (pushed further left for breathing room)
              top: "20px",  // Stretches from card 1 offset
              bottom: "120px", // Stretches down to seal offset
              width: "12px",
              zIndex: 1,
              pointerEvents: "none",
            }}
          >
            {/* Ruler centimeter/millimeter tick marks (repeating gradient) */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage: "repeating-linear-gradient(to bottom, rgba(29, 34, 46, 0.08) 0px, rgba(29, 34, 46, 0.08) 1px, transparent 1px, transparent 10px)",
                borderLeft: "1px solid rgba(29, 34, 46, 0.04)",
                left: "4px",
              }}
            />
            {/* Main vertical line */}
            <div
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: "0px",
                width: "1px",
                background: "rgba(29, 34, 46, 0.04)",
              }}
            />
            {/* Active growing gauge line */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: "0px",
                width: "1px",
                height: `${scrollPercent}%`,
                background: "linear-gradient(to bottom, #C78685 0%, #72A18A 100%)",
                transition: "height 0.1s ease-out",
              }}
            />

            {/* TECHNICAL ROTATING SCOPE FOLLOWER */}
            <div
              style={{
                position: "absolute",
                top: `${scrollPercent}%`,
                left: "0px",
                transform: "translate(-50%, -50%)",
                width: "28px",
                height: "28px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "top 0.1s ease-out",
              }}
            >
              {/* Rotating dashed scope ring */}
              <div
                className="spin-ring"
                style={{
                  position: "absolute",
                  width: "24px",
                  height: "24px",
                  borderRadius: "50%",
                  border: "1px dashed #1D222E",
                  opacity: 0.25,
                  boxSizing: "border-box",
                }}
              />
              {/* Outer soft glowing halo */}
              <div
                style={{
                  position: "absolute",
                  width: "14px",
                  height: "14px",
                  borderRadius: "50%",
                  background: activeData ? `${activeData.color}15` : "transparent",
                  transition: "background 0.4s ease",
                }}
              />
              {/* Tracking core node */}
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: activeData ? activeData.color : "#1D222E",
                  border: `2px solid ${backdropBg}`,
                  boxShadow: activeData ? `0 0 10px ${activeData.color}` : "none",
                  transition: "background-color 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease",
                  zIndex: 2,
                }}
              />
            </div>
          </div>
        )}

        {experiences.map((exp, idx) => (
          <ExperienceCard
            key={exp.id}
            exp={exp}
            index={idx}
            onActive={setActiveExp}
            isMobile={isMobile}
          />
        ))}

        {/* TIMELINE COMPLETION SEAL */}
        <TimelineCompletionSeal isMobile={isMobile} />
      </div>
    </div>
  );
}

