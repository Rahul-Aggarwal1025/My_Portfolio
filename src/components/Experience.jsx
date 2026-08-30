import { useState, useEffect, useRef } from "react";
import plakshaLogo from "../assets/plaksha_logo.png";
import leoLogo from "../assets/leo_logo.png";
import CreativeBridge from "./CreativeBridge";

const experiences = [
  {
    id: 1,
    image: plakshaLogo,
    ticketNo: "TICKET #01",
    tag: "Policy & Impact",
    date: "Mar 2026",
    title: "Research Intern",
    company: "Plaksha University DEI Lab",
    description: "Processed multi-source stakeholder data to author a 20-page publication-ready DEI Impact Report, refining raw analytical metrics into structured strategic narratives.",
    checklist: [
      "Structured a 15–20 page DEI Impact Report compiling multi-stakeholder metrics",
      "Synthesized multi-source data into key trend narratives & analytical case studies",
      "Delivered publication-ready report combining data analysis, storytelling & visualization"
    ],
    chips: ["DEI Impact Report", "Stakeholder Metrics", "Data Visualization", "Policy Storytelling"],
    status: "SHIPPED // PUBLICATION_READY DEI REPORT 🚀",
    color: "#e17055",
    accentBg: "rgba(225, 112, 85, 0.08)",
    borderColor: "rgba(225, 112, 85, 0.25)",
    sectionBg: "#FAF0EE",
  },
  {
    id: 2,
    image: leoLogo,
    ticketNo: "TICKET #02",
    tag: "Applied NLP & Economics",
    date: "June 2026 – July 2026",
    title: "Data Science Research Intern",
    company: "LEO Lab, Plaksha University",
    description: "Merged employee review, financial, and stock data across 2,000+ companies to model workplace culture vs market performance using applied NLP sentiment extraction.",
    checklist: [
      "Merged employee review, financial & stock data across 2,000+ companies",
      "Built unified multi-source dataset to model workplace culture vs company performance",
      "Extracted structured insights from unstructured review text to study perception at scale"
    ],
    chips: ["2,000+ Companies", "Employee Review Scraping", "Financial & Stock Data", "Applied NLP"],
    status: "ACTIVE // 2,000+ FIRMS PROCESSED ⚡",
    color: "#00cec9",
    accentBg: "rgba(0, 206, 201, 0.08)",
    borderColor: "rgba(0, 206, 201, 0.25)",
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
          if (currentRef) observer.unobserve(currentRef);
        }
      },
      { threshold: isMobile ? 0.15 : 0.25 }
    );
    if (currentRef) observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [exp.id, onActive, isMobile]);

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        width: "100%",
        maxWidth: "920px",
        margin: isMobile ? "20px auto" : "28px auto",
        position: "relative",
        zIndex: 2,
        transition: "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s ease, opacity 0.6s ease",
        transform: isInView
          ? (isHovered ? "translateY(-4px)" : "translateY(0)")
          : "translateY(30px)",
        opacity: isInView ? 1 : 0,
      }}
    >
      {/* Sleek Minimalist Planning Ticket Container */}
      <div
        style={{
          background: "#ffffff",
          border: "2px solid #1D222E",
          borderRadius: "16px",
          boxShadow: isHovered ? "8px 8px 0px #1D222E" : "4px 4px 0px #1D222E",
          padding: isMobile ? "20px 18px" : "28px 32px",
          display: "flex",
          flexDirection: "column",
          gap: "18px",
          transition: "box-shadow 0.3s ease",
          position: "relative",
          boxSizing: "border-box",
        }}
      >
        {/* Minimal Metallic Pin Cap at Top Center */}
        <div
          style={{
            position: "absolute",
            top: "-8px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "16px",
            height: "16px",
            borderRadius: "50%",
            background: "radial-gradient(circle at 35% 35%, #ffffff 0%, #cbd5e1 50%, #1D222E 100%)",
            border: "1.5px solid #1D222E",
            boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
            zIndex: 5,
          }}
        />

        {/* ── Row 1: Monospace Ticket Meta Header ── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "10px",
            borderBottom: "1px solid rgba(29, 34, 46, 0.08)",
            paddingBottom: "12px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "11px",
                fontWeight: "800",
                color: "#1D222E",
                background: "#FAF6EE",
                border: "1px solid rgba(29,34,46,0.15)",
                padding: "2px 8px",
                borderRadius: "4px",
                letterSpacing: "0.5px",
              }}
            >
              {exp.ticketNo}
            </span>

            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "10px",
                fontWeight: "700",
                color: exp.color,
                background: exp.accentBg,
                border: `1px solid ${exp.borderColor}`,
                padding: "2px 8px",
                borderRadius: "4px",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              {exp.tag}
            </span>
          </div>

          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "11px",
              fontWeight: "600",
              color: "rgba(29, 34, 46, 0.5)",
            }}
          >
            {exp.date}
          </span>
        </div>

        {/* ── Row 2: Main Info Grid (Role, Company Logo & Summary) ── */}
        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: isMobile ? "flex-start" : "center",
            justifyContent: "space-between",
            gap: "18px",
          }}
        >
          <div style={{ flex: 1 }}>
            <h3
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: isMobile ? "20px" : "24px",
                fontWeight: "900",
                color: "#1D222E",
                margin: "0 0 4px 0",
                lineHeight: 1.25,
                letterSpacing: "-0.01em",
              }}
            >
              {exp.title}
            </h3>

            <div
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "14.5px",
                fontWeight: "700",
                color: exp.color,
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <span>{exp.company}</span>
            </div>

            <p
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "14px",
                fontWeight: "500",
                color: "rgba(29, 34, 46, 0.75)",
                lineHeight: 1.5,
                margin: "8px 0 0 0",
              }}
            >
              {exp.description}
            </p>
          </div>

          {/* Minimal Organization Logo Badge */}
          <div
            style={{
              background: "#FAF6EE",
              border: "1.5px solid rgba(29, 34, 46, 0.12)",
              borderRadius: "10px",
              padding: "8px 14px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              maxWidth: isMobile ? "100%" : "160px",
              alignSelf: isMobile ? "stretch" : "center",
              flexShrink: 0,
            }}
          >
            <img
              src={exp.image}
              alt={exp.company}
              style={{
                maxHeight: "40px",
                maxWidth: "120px",
                objectFit: "contain",
              }}
            />
          </div>
        </div>

        {/* ── Row 3: Deliverables Minimal Checklist ── */}
        <div
          style={{
            background: "#FAF6EE",
            border: "1px solid rgba(29, 34, 46, 0.08)",
            borderRadius: "10px",
            padding: "14px 18px",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "10px",
              fontWeight: "800",
              color: "rgba(29, 34, 46, 0.4)",
              textTransform: "uppercase",
              letterSpacing: "0.8px",
              marginBottom: "4px",
            }}
          >
            Key Deliverables
          </div>

          {exp.checklist.map((item, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "8px",
                fontFamily: "'Outfit', sans-serif",
                fontSize: "13.5px",
                fontWeight: "600",
                color: "#1D222E",
                lineHeight: 1.4,
              }}
            >
              <span
                style={{
                  color: exp.color,
                  fontWeight: "900",
                  fontSize: "12px",
                  lineHeight: 1.3,
                }}
              >
                ▪
              </span>
              <span>{item}</span>
            </div>
          ))}
        </div>

        {/* ── Row 4: Minimal Tags & Status Pill ── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "12px",
            marginTop: "2px",
          }}
        >
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", alignItems: "center" }}>
            {exp.chips.map((chip, idx) => (
              <span
                key={idx}
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "11px",
                  fontWeight: "700",
                  color: "rgba(29, 34, 46, 0.8)",
                  background: "#ffffff",
                  padding: "3px 9px",
                  borderRadius: "5px",
                  border: "1px solid rgba(29, 34, 46, 0.15)",
                }}
              >
                {chip}
              </span>
            ))}
          </div>

          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "10px",
              fontWeight: "800",
              color: exp.color,
              background: exp.accentBg,
              border: `1px solid ${exp.borderColor}`,
              padding: "4px 10px",
              borderRadius: "6px",
              letterSpacing: "0.5px",
            }}
          >
            {exp.status}
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
          border: "2px solid #1D222E",
          borderRadius: "12px",
          boxShadow: "4px 4px 0px #1D222E",
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
          e.currentTarget.style.boxShadow = "6px 6px 0px #1D222E";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "rotate(-3deg) translateY(0)";
          e.currentTarget.style.boxShadow = "4px 4px 0px #1D222E";
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
          border: "2px solid #1D222E",
          borderRadius: "12px",
          boxShadow: "4px 4px 0px #1D222E",
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
            e.currentTarget.style.boxShadow = "6px 6px 0px #1D222E";
          }
        }}
        onMouseLeave={(e) => {
          if (!isMobile) {
            e.currentTarget.style.transform = "rotate(3.5deg) translateX(-20px) translateY(0)";
            e.currentTarget.style.boxShadow = "4px 4px 0px #1D222E";
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
  const [activeExp, setActiveExp] = useState(1);
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
        padding: isMobile ? "80px 18px" : "100px 48px",
        boxSizing: "border-box",
        overflow: "hidden",
        transition: "background 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {/* Background blueprint grid overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(to right, rgba(0,0,0,0.018) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.018) 1px, transparent 1px)",
          backgroundSize: "45px 45px",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* SECTION HEADER */}
      <div style={{ zIndex: 3, textAlign: "center", marginBottom: "40px", maxWidth: "800px", position: "relative" }}>
        {/* Small washi accent */}
        <div
          style={{
            position: "absolute",
            top: "-12px",
            left: "50%",
            transform: "translateX(-155px) rotate(-5deg)",
            width: "46px",
            height: "14px",
            background: "rgba(253, 203, 110, 0.6)",
            border: "1px solid rgba(29, 34, 46, 0.15)",
            borderRadius: "2px",
            pointerEvents: "none",
          }}
        />

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
            <span style={{ position: "relative", zIndex: 1, color: "#fdcb6e", padding: "0 6px" }}>
              Experience
            </span>
          </span>
        </h2>

        {/* Subtle zigzag underline */}
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
            color: "rgba(29, 34, 46, 0.65)",
            lineHeight: 1.6,
            maxWidth: "640px",
            margin: "20px auto 0",
          }}
        >
          Applied research milestones, data extraction pipelines, and policy deliverables across Plaksha University & LEO Lab.
        </p>
      </div>

      {/* EXPERIENCES PLANNING BOARD CONTAINER */}
      <div
        style={{
          width: "100%",
          maxWidth: "960px",
          display: "flex",
          flexDirection: "column",
          gap: isMobile ? "20px" : "28px",
          position: "relative",
          zIndex: 2,
        }}
      >
        {experiences.map((exp, idx) => (
          <ExperienceCard
            key={exp.id}
            exp={exp}
            index={idx}
            onActive={setActiveExp}
            isMobile={isMobile}
          />
        ))}

        {/* BEYOND THE CODE SECTION */}
        <CreativeBridge />

        {/* TIMELINE COMPLETION SEAL */}
        <TimelineCompletionSeal isMobile={isMobile} />
      </div>
    </div>
  );
}
