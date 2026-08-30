/* ── Skills.jsx ─────────────────────────────────────────────────────
   Three-panel dashboard: IDE · Viz · Human
   Palette locked to site: #FAF6EE / #1D222E / #00cec9 / #74b9ff / #ff7675 / #ffeaa7
──────────────────────────────────────────────────────────────────── */
import { useState, useEffect } from "react";

/* ── Panel 1 data: syntax-highlighted code lines ───────────────────── */
const codeLines = [
  { n: "01", tokens: [{ t: "import", c: "#ff7675" }, { t: " numpy as", c: "#b2bec3" }, { t: " np", c: "#55efc4" }] },
  { n: "02", tokens: [{ t: "import", c: "#ff7675" }, { t: " pandas as", c: "#b2bec3" }, { t: " pd", c: "#55efc4" }] },
  { n: "03", tokens: [{ t: "import", c: "#ff7675" }, { t: " sqlite3", c: "#55efc4" }] },
  { n: "04", tokens: [] },
  { n: "05", tokens: [{ t: "from", c: "#ff7675" }, { t: " sklearn.ensemble ", c: "#b2bec3" }, { t: "import", c: "#ff7675" }, { t: " RandomForestClassifier", c: "#55efc4" }] },
  { n: "06", tokens: [] },
  { n: "07", tokens: [{ t: "# skills and expertise", c: "#5E9C6E" }] },
  {
    n: "08", tokens: [
      { t: "stack", c: "#74b9ff" }, { t: " = [", c: "#b2bec3" },
      { t: '"Python"', c: "#ffeaa7" }, { t: ", ", c: "#b2bec3" },
      { t: '"SQL"', c: "#ffeaa7" }, { t: "]", c: "#b2bec3" },
    ]
  },
  { n: "09", tokens: [] },
  { n: "10", tokens: [{ t: "def", c: "#ff7675" }, { t: " analyze_data(df):", c: "#74b9ff" }] },
  { n: "11", tokens: [{ t: "    # query DB", c: "#5E9C6E" }] },
  { n: "12", tokens: [{ t: '    q = ', c: "#b2bec3" }, { t: '"SELECT * FROM portfolio"', c: "#ffeaa7" }] },
  { n: "13", tokens: [{ t: "    return", c: "#ff7675" }, { t: " pd.read_sql(q, sqlite3.connect())", c: "#b2bec3" }] },
];

/* ── Panel 2 data: simple skills directory categorized ─────────────── */
const skillCategories = [
  {
    category: "Languages & Databases",
    skills: ["Python", "SQL", "sqlite3"]
  },
  {
    category: "Data Wrangling & Prep",
    skills: ["Pandas", "Numpy", "Feature Selection"]
  },
  {
    category: "Modeling & Machine Learning",
    skills: ["Scikit-Learn", "RandomForest", "XGBoost"]
  },
  {
    category: "Visuals & Deployment",
    skills: ["Streamlit", "REST APIs", "Data Viz"]
  }
];

/* ── Panel 3 data: proven soft skills ──────────────────────────────── */
const humanSkills = [
  { icon: "🗣️", skill: "Communication", evidence: "Published in Morung Express", chip: "Media · Press" },
  { icon: "🔬", skill: "Research", evidence: "15-page DEI report, multi-source", chip: "Academic · Policy" },
  { icon: "⚡", skill: "Problem Solving", evidence: "#1 FinTech, 24 hr hackathon", chip: "Competitive · FinTech" },
];

/* ═══════════════════════════════════════════════════════════════════ */

function IDEPanel() {
  const [hovered, setHovered] = useState(null);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  // Helper inside component: total visible characters in a line's tokens
  const getLineLen = (line) => {
    if (!line || !line.tokens) return 0;
    return line.tokens.reduce((s, t) => s + t.t.length, 0);
  };

  // Helper inside component: render tokens sliced to budget
  const renderPartial = (tokens, charBudget) => {
    let budget = charBudget;
    const result = [];
    for (let j = 0; j < tokens.length; j++) {
      const tok = tokens[j];
      if (budget <= 0) break;
      if (tok.t.length <= budget) {
        result.push(
          <span key={j} style={{ color: tok.c }}>
            {tok.t}
          </span>
        );
        budget -= tok.t.length;
      } else {
        result.push(
          <span key={j} style={{ color: tok.c }}>
            {tok.t.substring(0, budget)}
          </span>
        );
        budget = 0;
      }
    }
    return result;
  };

  useEffect(() => {
    if (isFinished) return;

    const line = codeLines[currentLine];
    if (!line) {
      const timer = setTimeout(() => {
        setIsFinished(true);
      }, 0);
      return () => clearTimeout(timer);
    }

    const totalLen = getLineLen(line);

    // If it's a blank line, skip it quickly
    if (totalLen === 0) {
      const timer = setTimeout(() => {
        if (currentLine + 1 < codeLines.length) {
          setCurrentLine(prev => prev + 1);
          setCurrentChar(0);
        } else {
          setIsFinished(true);
        }
      }, 90);
      return () => clearTimeout(timer);
    }

    // Type character by character
    const timer = setTimeout(() => {
      if (currentChar < totalLen) {
        setCurrentChar(prev => prev + 1);
      } else {
        // Line finished, move to next line after a short pause
        if (currentLine + 1 < codeLines.length) {
          setCurrentLine(prev => prev + 1);
          setCurrentChar(0);
        } else {
          setIsFinished(true);
        }
      }
    }, 42); // 42ms per character typing speed - extremely crisp and fluid!

    return () => clearTimeout(timer);
  }, [currentLine, currentChar, isFinished]);

  return (
    <div style={{
      flex: "1 1 320px",
      maxWidth: "400px",
      background: "#131924",
      borderRadius: "12px",
      border: "2px solid #1D222E",
      boxShadow: "6px 6px 0px #1D222E",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
    }}>
      {/* Blinking cursor styles */}
      <style>{`
        @keyframes cursor-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>

      {/* Title bar */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "6px",
        padding: "10px 14px",
        background: "#0d1117",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        flexShrink: 0,
      }}>
        <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#ff5f56" }} />
        <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#ffbd2e" }} />
        <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#27c93f" }} />
        <span style={{
          marginLeft: "10px",
          fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
          fontSize: "11px",
          color: "#4d5f6b",
          letterSpacing: "0.3px",
        }}>skills.py</span>
        <span style={{
          marginLeft: "auto",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "10px",
          color: "#27c93f",
          background: "rgba(39,201,63,0.1)",
          border: "1px solid rgba(39,201,63,0.25)",
          borderRadius: "3px",
          padding: "1px 6px",
        }}>Python 3.11</span>
      </div>

      {/* Code body */}
      <div style={{
        padding: "14px 0 18px",
        flex: 1,
        overflowY: "auto",
      }}>
        {codeLines.map((line, i) => {
          const isCompleted = i < currentLine || isFinished;
          const isActive = i === currentLine && !isFinished;
          const isUntyped = i > currentLine && !isFinished;

          return (
            <div
              key={i}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "1.5px 0",
                background: hovered === i ? "rgba(116,185,255,0.06)" : (isActive ? "rgba(116,185,255,0.03)" : "transparent"),
                transition: "background 0.15s ease",
                minHeight: "22px",
              }}
            >
              {/* Line number */}
              <span style={{
                fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                fontSize: "11.5px",
                color: isActive ? "#74b9ff" : "#2d3e4e",
                width: "38px",
                textAlign: "right",
                paddingRight: "16px",
                flexShrink: 0,
                userSelect: "none",
                fontWeight: isActive ? "bold" : "normal",
                transition: "color 0.15s ease",
              }}>{line.n}</span>

              {/* Tokens */}
              <span style={{ fontFamily: "'JetBrains Mono', 'Fira Code', monospace", fontSize: "12px" }}>
                {isCompleted && line.tokens.map((tok, j) => (
                  <span key={j} style={{ color: tok.c }}>{tok.t}</span>
                ))}
                {isActive && (
                  <>
                    {renderPartial(line.tokens, currentChar)}
                    <span style={{
                      color: "#74b9ff",
                      fontWeight: "bold",
                      marginLeft: "1px",
                      animation: "cursor-blink 1s infinite step-end"
                    }}>▎</span>
                  </>
                )}
                {isUntyped && <span style={{ opacity: 0 }}>&nbsp;</span>}
              </span>
            </div>
          );
        })}
      </div>

      {/* Status bar */}
      <div style={{
        display: "flex",
        alignItems: "center",
        padding: "5px 14px",
        background: "#0d1117",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        gap: "14px",
        flexShrink: 0,
      }}>
        <span style={{ fontSize: "9.5px", color: isFinished ? "#27c93f" : "#ffbd2e", fontFamily: "monospace", transition: "color 0.25s ease" }}>
          {isFinished ? "● idle" : "▶ typing"}
        </span>
        <span style={{ fontSize: "9.5px", color: "#4d5f6b", fontFamily: "monospace" }}>
          Ln {isFinished ? codeLines.length : currentLine + 1}, Col {isFinished ? 1 : currentChar + 1}
        </span>
        <span style={{ fontSize: "9.5px", color: "#4d5f6b", fontFamily: "monospace", marginLeft: "auto" }}>UTF-8</span>
      </div>
    </div>
  );
}

/* ── Panel 2: Tag Cloud ─────────────────────────────────────────────── */
function SimpleListPanel() {
  const [hoveredIdx, setHoveredIdx] = useState(null); // format: "catIdx-skillIdx"

  return (
    <div style={{
      flex: "1 1 380px",
      maxWidth: "520px",
      background: "#ffffff", // Clean, elegant white card matching dashboard layout
      borderRadius: "12px",
      border: "2px solid #1D222E",
      boxShadow: "6px 6px 0px #1D222E",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
    }}>
      {/* Panel header */}
      <div style={{
        padding: "14px 20px 12px",
        borderBottom: "1px solid rgba(29,34,46,0.07)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexShrink: 0,
      }}>
        <span style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: "12px",
          fontWeight: "800",
          color: "#1D222E",
          textTransform: "uppercase",
          letterSpacing: "1px",
        }}>Technical Skills</span>
        <span style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: "10px",
          fontWeight: "600",
          color: "rgba(29,34,46,0.35)",
        }}>skills directory</span>
      </div>

      {/* List Container */}
      <div style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around", // Distribute spacing equally
        padding: "16px 20px",
      }}>
        {skillCategories.map((cat, catIdx) => (
          <div
            key={catIdx}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              padding: "4px 0",
            }}
          >
            {/* Category header */}
            <div style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "12.5px",
              fontWeight: "800",
              color: "#1D222E",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}>
              <span style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: catIdx === 0 ? "#74b9ff" : (catIdx === 1 ? "#a29bfe" : (catIdx === 2 ? "#55efc4" : "#ff7675")),
              }} />
              {cat.category}
            </div>

            {/* Inline list of skill chips */}
            <div style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
              paddingLeft: "12px",
            }}>
              {cat.skills.map((skill, skillIdx) => {
                const key = `${catIdx}-${skillIdx}`;
                const isHov = hoveredIdx === key;

                // Color assignments per row on hover
                let hoverColor = "#74b9ff";
                let hoverBg = "rgba(116, 185, 255, 0.12)";
                let hoverBorder = "rgba(116, 185, 255, 0.35)";

                if (catIdx === 1) {
                  hoverColor = "#8274f8";
                  hoverBg = "rgba(162, 155, 254, 0.12)";
                  hoverBorder = "rgba(162, 155, 254, 0.35)";
                } else if (catIdx === 2) {
                  hoverColor = "#22c295";
                  hoverBg = "rgba(85, 239, 196, 0.12)";
                  hoverBorder = "rgba(85, 239, 196, 0.35)";
                } else if (catIdx === 3) {
                  hoverColor = "#e25c5b";
                  hoverBg = "rgba(255, 118, 117, 0.12)";
                  hoverBorder = "rgba(255, 118, 117, 0.35)";
                }

                return (
                  <span
                    key={skillIdx}
                    onMouseEnter={() => setHoveredIdx(key)}
                    onMouseLeave={() => setHoveredIdx(null)}
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: "12px",
                      fontWeight: "600",
                      color: isHov ? hoverColor : "rgba(29,34,46,0.68)",
                      background: isHov ? hoverBg : "rgba(29,34,46,0.04)",
                      border: `1px solid ${isHov ? hoverBorder : "rgba(29,34,46,0.08)"}`,
                      borderRadius: "6px",
                      padding: "4px 10px",
                      cursor: "default",
                      transition: "all 0.2s ease",
                      transform: isHov ? "translateY(-1px)" : "none",
                      boxShadow: isHov ? "0 2px 5px rgba(29,34,46,0.03)" : "none",
                    }}
                  >
                    {skill}
                  </span>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Muted directory footer */}
      <div style={{
        padding: "10px 20px 12px",
        borderTop: "1px solid rgba(29,34,46,0.06)",
        flexShrink: 0,
      }}>
        <span style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: "10px",
          fontWeight: "600",
          color: "rgba(29,34,46,0.3)",
          fontStyle: "italic",
        }}>directory lookup · classified by operations</span>
      </div>
    </div>
  );
}

/* ── Panel 3: Human Skills ──────────────────────────────────────────── */
function HumanPanel() {
  const [hovered, setHovered] = useState(null);
  return (
    <div style={{
      flex: "1 1 300px",
      maxWidth: "380px",
      background: "#FFF8F0",
      borderRadius: "12px",
      border: "2px solid #1D222E",
      boxShadow: "6px 6px 0px #1D222E",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
    }}>
      {/* Panel header */}
      <div style={{
        padding: "14px 20px 12px",
        borderBottom: "2px solid rgba(29,34,46,0.07)",
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        <span style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: "12px",
          fontWeight: "800",
          color: "#1D222E",
          textTransform: "uppercase",
          letterSpacing: "1px",
        }}>Soft Skills</span>
        <span style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: "10px",
          color: "rgba(29,34,46,0.35)",
          fontWeight: "600",
        }}>proven, not claimed</span>
      </div>

      {/* Skills list — 3 items stretched to fill */}
      <div style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        padding: "4px 0",
      }}>
        {humanSkills.map((item, i) => {
          const isHov = hovered === i;
          const dividers = i < humanSkills.length - 1;

          // Distinctive, personality-driven styles for each of the 3 soft skills on hover (Muted Softer Pastels)
          let rowBg = "transparent";
          let rowBorderLeft = "4px solid transparent";

          let iconBg = "rgba(29,34,46,0.06)";
          let iconBorder = "1.5px solid rgba(29,34,46,0.10)";
          let iconTransform = "none";
          let iconColor = "inherit";

          let skillColor = "#1D222E";

          let chipBg = "rgba(29,34,46,0.06)";
          let chipColor = "rgba(29,34,46,0.4)";
          let chipBorder = "1px solid rgba(29,34,46,0.12)";
          let chipTransform = "none";

          if (isHov) {
            if (i === 0) {
              // 🗣️ Communication: Soft Rose Accents — Broadcast/Wave animation
              rowBg = "rgba(226, 169, 168, 0.06)";
              rowBorderLeft = "4px solid #E2A9A8";
              iconBg = "#E2A9A8";
              iconBorder = "1.5px solid #E2A9A8";
              iconTransform = "scale(1.15) rotate(-6deg)";
              iconColor = "#ffffff";
              skillColor = "#C78685";
              chipBg = "rgba(226, 169, 168, 0.12)";
              chipColor = "#C78685";
              chipBorder = "1px solid rgba(226, 169, 168, 0.35)";
              chipTransform = "translateY(-1px)";
            } else if (i === 1) {
              // 🔬 Research: Soft Sage Green Accents — Focus/Zoom/Details animation
              rowBg = "rgba(163, 203, 182, 0.06)";
              rowBorderLeft = "4px solid #A3CBB6";
              iconBg = "#A3CBB6";
              iconBorder = "1.5px solid #A3CBB6";
              iconTransform = "scale(1.18) rotate(15deg) translateY(-2px)";
              iconColor = "#ffffff";
              skillColor = "#72A18A";
              chipBg = "rgba(163, 203, 182, 0.12)";
              chipColor = "#72A18A";
              chipBorder = "1px solid rgba(163, 203, 182, 0.35)";
              chipTransform = "scale(1.06)";
            } else if (i === 2) {
              // ⚡ Problem Solving: Soft Sand Gold Accents — Electric Jitter/Strike animation
              rowBg = "rgba(231, 205, 166, 0.08)";
              rowBorderLeft = "4px solid #E7CDA6";
              iconBg = "#E7CDA6";
              iconBorder = "1.5px solid #E7CDA6";
              iconTransform = "scale(1.22) rotate(-15deg) translate(2px, -2px)";
              iconColor = "#ffffff";
              skillColor = "#BF9C68";
              chipBg = "rgba(231, 205, 166, 0.18)";
              chipColor = "#BF9C68";
              chipBorder = "1px solid rgba(231, 205, 166, 0.4)";
              chipTransform = "translateY(-2px) rotate(1deg)";
            }
          }

          return (
            <div
              key={i}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                gap: "16px",
                padding: "0 22px",
                background: rowBg,
                borderLeft: rowBorderLeft,
                borderBottom: dividers ? "1px solid rgba(29,34,46,0.06)" : "none",
                transition: "background 0.25s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                cursor: "default",
                position: "relative",
              }}
            >
              {/* Large icon in a custom-tinted bubble with springy hover scaling */}
              <div style={{
                width: "44px",
                height: "44px",
                borderRadius: "10px",
                background: iconBg,
                border: iconBorder,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "22px",
                flexShrink: 0,
                transform: iconTransform,
                color: iconColor,
                transition: "all 0.28s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
              }}>{item.icon}</div>

              {/* Skill name + evidence with interactive highlighting */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "16px",
                  fontWeight: "900",
                  color: skillColor,
                  lineHeight: 1.2,
                  marginBottom: "4px",
                  transition: "color 0.25s ease",
                }}>{item.skill}</div>

                <div style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "12px",
                  fontWeight: "500",
                  color: isHov ? "rgba(29,34,46,0.72)" : "rgba(29,34,46,0.52)",
                  lineHeight: 1.4,
                  marginBottom: "7px",
                  transition: "color 0.25s ease",
                }}>{item.evidence}</div>

                {/* Keyword chip */}
                <span style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "9px",
                  fontWeight: "800",
                  color: chipColor,
                  background: chipBg,
                  border: chipBorder,
                  borderRadius: "4px",
                  padding: "2px 8px",
                  textTransform: "uppercase",
                  letterSpacing: "0.7px",
                  display: "inline-block",
                  transform: chipTransform,
                  transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                }}>{item.chip}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div style={{
        padding: "12px 22px 16px",
        borderTop: "1px solid rgba(29,34,46,0.07)",
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        <span style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: "10px",
          fontWeight: "700",
          color: "rgba(29,34,46,0.28)",
          fontStyle: "italic",
        }}>evidence over adjectives</span>
        <span style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: "10px",
          fontWeight: "800",
          color: "#fdcb6e",
          background: "rgba(253,203,110,0.15)",
          border: "1px solid rgba(253,203,110,0.35)",
          borderRadius: "4px",
          padding: "2px 8px",
        }}>3 skills</span>
      </div>

    </div>
  );
}

/* ── Section ─────────────────────────────────────────────────────────── */
function Skills() {
  return (
    <section
      id="skills"
      style={{
        background: "#FAF6EE",
        backgroundImage: "linear-gradient(to right, rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.03) 1px, transparent 1px)",
        backgroundSize: "45px 45px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "64px 24px 72px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Warm radial glow — matches Hero */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(circle at center, rgba(255,255,255,0.8) 0%, rgba(250,246,238,0.2) 100%)",
        pointerEvents: "none", zIndex: 0,
      }} />

      {/* ── Section heading ── */}
      <div style={{
        textAlign: "center",
        marginBottom: "56px",
        position: "relative",
        zIndex: 2,
      }}>
        {/* Small washi accent */}
        <div style={{
          position: "absolute", top: "-8px", left: "50%",
          transform: "translateX(-155px) rotate(-5deg)",
          width: "46px", height: "14px",
          background: "rgba(0,206,201,0.4)",
          border: "1px solid rgba(29,34,46,0.08)",
          borderRadius: "2px",
          pointerEvents: "none",
        }} />
        {/* Star doodle */}
        <svg width="18" height="18" viewBox="0 0 18 18" style={{
          position: "absolute", top: "-12px", right: "calc(50% - 140px)",
          opacity: 0.45, pointerEvents: "none",
        }}>
          <path d="M9 1 L10.2 7.2 L16.5 9 L10.2 10.8 L9 17 L7.8 10.8 L1.5 9 L7.8 7.2 Z" fill="#1D222E" />
        </svg>

        <h2 style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: "clamp(30px, 4.5vw, 50px)",
          fontWeight: "900",
          color: "#1D222E",
          margin: "0 0 10px",
          lineHeight: 1.1,
        }}>
          Skills &{" "}
          <span style={{ position: "relative", display: "inline-block" }}>
            <span style={{
              position: "absolute", inset: "-4px -8px",
              background: "#1D222E",
              borderRadius: "3px",
              transform: "rotate(-2deg)",
              zIndex: 0,
            }} />
            <span style={{ position: "relative", zIndex: 1, color: "#00cec9", padding: "0 8px" }}>Expertise</span>
          </span>
        </h2>

        {/* Subtle zigzag underline */}
        <svg width="72" height="10" viewBox="0 0 72 10" style={{
          display: "block", margin: "10px auto 0",
          opacity: 0.22, pointerEvents: "none",
        }}>
          <polyline points="0,5 9,1 18,9 27,1 36,9 45,1 54,9 63,1 72,5"
            fill="none" stroke="#1D222E" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* ── Three panels ── */}
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "24px",
        justifyContent: "center",
        alignItems: "stretch",
        width: "100%",
        maxWidth: "1200px",
        position: "relative",
        zIndex: 2,
      }}>
        <IDEPanel />
        <SimpleListPanel />
        <HumanPanel />
      </div>
    </section>
  );
}

export default Skills;