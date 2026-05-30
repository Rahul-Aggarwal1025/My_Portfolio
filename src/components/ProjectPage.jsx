/* ─── Project detail data ─────────────────────────────────────────── */
const projectDetails = {
  1: {
    title: "Work Culture Index (WCI)",
    tag: "NLP / Analytics",
    emoji: "📊",
    sub: "NLP & Analytics Project",
    accentColor: "#fdcb6e",
    pinColor: "#E53935",
    overview: "An NLP pipeline analyzing employee sentiment across 6,600+ reviews from multiple organizations to map corporate culture.",
    sections: [
      {
        heading: "Sentiment Models",
        body: "Built an NLP pipeline combining RoBERTa and VADER sentiment models. Rather than relying on simple ratings, the system extracts five core theme-based dimensions to profile culture.",
      },
      {
        heading: "PCA & Standardization",
        body: "Designed a standardized 0-100 index using Principal Component Analysis (PCA). Validation revealed key discrepancies between traditional star ratings and deep organizational culture metrics.",
      },
      {
        heading: "Analytics Dashboard",
        body: "Launched a real-time Streamlit dashboard, enabling interactive filtering, multi-company comparisons, and structured semantic trend analysis.",
      },
    ],
    stack: ["Python", "RoBERTa", "VADER", "PCA", "Streamlit", "Pandas", "Scikit-Learn"],
    status: "Completed",
  },
  2: {
    title: "Solar Irradiance Prediction",
    tag: "ML / Data Eng",
    emoji: "☀️",
    sub: "ML & Data Engineering Project",
    accentColor: "#00cec9",
    pinColor: "#0984e3",
    overview: "A machine learning and data engineering pipeline forecasting solar energy across India by integrating climate and pollution datasets.",
    sections: [
      {
        heading: "Data Integration",
        body: "Merged CPCB air quality and ERA5 hourly weather data through high-precision geospatial-temporal alignment, handling over 2GB of heterogeneous spatial data.",
      },
      {
        heading: "Feature Engineering",
        body: "Engineered atmospheric and chemical feature variables to model external climate factors influencing photovoltaic energy generation constraints.",
      },
      {
        heading: "Large-Scale Pipeline",
        body: "Utilized xarray and pandas to construct high-performance station-by-timestamp data tables, streamlining preprocessing for neural forecasting algorithms.",
      },
    ],
    stack: ["Python", "xarray", "Pandas", "ERA5 weather", "CPCB air quality", "NetCDF"],
    status: "Completed",
  },
  3: {
    title: "Pharma Perception Tool",
    tag: "NLP / Analytics",
    emoji: "💊",
    sub: "NLP & Analytics Project",
    accentColor: "#ff7675",
    pinColor: "#6c5ce7",
    overview: "An NLP analytics platform mapping public sentiment of medications across 30,000 reviews and 4,000 drug databases.",
    sections: [
      {
        heading: "Review Extraction",
        body: "Processed thousands of unstructured reviews from WebMD, AskAPatient, Drugs.com, and PubMed using custom NLP text tokenizers.",
      },
      {
        heading: "Gap Analysis",
        body: "Analyzed gaps between documented clinical trial observations and consumer-reported side effects in real-world use.",
      },
      {
        heading: "Interactive Dashboard",
        body: "Built a therapeutic benchmarking engine in a web dashboard, allowing medical researchers to evaluate consumer perception at scale.",
      },
    ],
    stack: ["NLP", "Python", "React", "WebMD", "Drugs.com API", "NLTK", "D3.js"],
    status: "Completed",
  },
};

/* ─── Project Detail Page ─────────────────────────────────────────── */
export function ProjectPage({ projectId, onBack }) {
  const p = projectDetails[projectId];
  if (!p) return null;

  return (
    <div style={{
      minHeight: "100vh",
      background: "#FAF6EE",
      backgroundImage: "linear-gradient(to right, rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.03) 1px, transparent 1px)",
      backgroundSize: "45px 45px",
      position: "relative",
      overflowX: "hidden",
    }}>
      {/* Radial glow matching site */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.85) 0%, rgba(250,246,238,0.2) 100%)",
        pointerEvents: "none", zIndex: 0,
      }} />

      {/* ── Header bar ── */}
      <div style={{
        position: "sticky",
        top: 0,
        background: "rgba(250,246,238,0.82)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(29,34,46,0.07)",
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        padding: "0 32px",
        height: "56px",
        gap: "16px",
      }}>
        <button
          onClick={onBack}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            fontFamily: "'Outfit', sans-serif",
            fontSize: "14px",
            fontWeight: "700",
            color: "#1D222E",
            background: "#ffeaa7",
            border: "2px solid #1D222E",
            borderRadius: "6px",
            padding: "5px 14px",
            cursor: "pointer",
            transition: "background 0.2s ease, color 0.2s ease, transform 0.1s ease",
            boxShadow: "2px 2px 0px #1D222E",
          }}
          onMouseEnter={e => { e.currentTarget.style.background = "#1D222E"; e.currentTarget.style.color = "#FAF6EE"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "#ffeaa7"; e.currentTarget.style.color = "#1D222E"; }}
        >
          ← Back
        </button>

        <span style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: "13px",
          fontWeight: "600",
          color: "rgba(29,34,46,0.4)",
        }}>Projects /</span>
        <span style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: "13px",
          fontWeight: "800",
          color: "#1D222E",
        }}>{p.title}</span>
      </div>

      {/* ── Page content ── */}
      <div style={{
        maxWidth: "860px",
        margin: "0 auto",
        padding: "40px 32px 100px",
        position: "relative",
        zIndex: 1,
      }}>

        {/* Prominent top of content Go Back button */}
        <div style={{
          marginBottom: "28px",
          display: "flex",
          alignItems: "center",
        }}>
          <button
            onClick={onBack}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontFamily: "'Outfit', sans-serif",
              fontSize: "13px",
              fontWeight: "800",
              color: "#1D222E",
              background: "#ffeaa7",
              border: "1.5px solid #1D222E",
              borderRadius: "6px",
              padding: "6px 14px",
              cursor: "pointer",
              boxShadow: "2px 2px 0px #1D222E",
              transition: "transform 0.15s ease, box-shadow 0.15s ease",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "translateY(-1px)";
              e.currentTarget.style.boxShadow = "3px 3px 0px #1D222E";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "2px 2px 0px #1D222E";
            }}
          >
            ← Back to Portfolio
          </button>
        </div>

        {/* Hero block */}
        <div style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "24px",
          marginBottom: "36px",
        }}>
          {/* Big emoji on a coloured badge */}
          <div style={{
            width: "72px",
            height: "72px",
            borderRadius: "16px",
            background: p.accentColor,
            border: "2.5px solid #1D222E",
            boxShadow: "4px 4px 0px #1D222E",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "36px",
            flexShrink: 0,
          }}>{p.emoji}</div>

          <div>
            {/* Tag */}
            <span style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "10px",
              fontWeight: "800",
              color: p.pinColor,
              textTransform: "uppercase",
              letterSpacing: "1.5px",
              background: `${p.accentColor}55`,
              border: `1.5px solid ${p.accentColor}`,
              borderRadius: "4px",
              padding: "3px 10px",
              display: "inline-block",
              marginBottom: "10px",
            }}>{p.tag}</span>

            <h1 style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "clamp(28px,5vw,42px)",
              fontWeight: "900",
              color: "#1D222E",
              margin: "0 0 6px",
              lineHeight: 1.1,
            }}>{p.title}</h1>

            <span style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "13px",
              fontWeight: "600",
              color: "rgba(29,34,46,0.42)",
            }}>{p.sub}</span>
          </div>
        </div>

        {/* Status pill */}
        <div style={{ display: "flex", gap: "12px", marginBottom: "32px", flexWrap: "wrap" }}>
          <span style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: "11px",
            fontWeight: "800",
            color: p.status === "Completed" ? "#00cec9" : "#fdcb6e",
            background: p.status === "Completed" ? "rgba(0,206,201,0.1)" : "rgba(253,203,110,0.2)",
            border: `1.5px solid ${p.status === "Completed" ? "#00cec9" : "#fdcb6e"}`,
            borderRadius: "20px",
            padding: "4px 12px",
            display: "flex",
            alignItems: "center",
            gap: "5px",
          }}>
            <span style={{
              width: "6px", height: "6px", borderRadius: "50%",
              background: p.status === "Completed" ? "#00cec9" : "#fdcb6e",
              display: "inline-block",
            }} />
            {p.status}
          </span>
        </div>

        {/* Overview card */}
        <div style={{
          background: "#ffffff",
          border: "2px solid #1D222E",
          borderRadius: "8px",
          padding: "24px 28px",
          boxShadow: "5px 5px 0px #1D222E",
          marginBottom: "32px",
        }}>
          <p style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: "15px",
            fontWeight: "500",
            color: "rgba(29,34,46,0.78)",
            lineHeight: 1.7,
            margin: 0,
          }}>{p.overview}</p>
        </div>

        {/* Section cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginBottom: "36px" }}>
          {p.sections.map((sec, i) => (
            <div key={i} style={{
              background: "#FAF6EE",
              border: "2px solid #1D222E",
              borderRadius: "8px",
              padding: "22px 26px",
              boxShadow: "4px 4px 0px rgba(29,34,46,0.12)",
              borderLeft: `5px solid ${p.accentColor}`,
            }}>
              <h3 style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "14px",
                fontWeight: "900",
                color: "#1D222E",
                margin: "0 0 10px",
                textTransform: "uppercase",
                letterSpacing: "0.8px",
              }}>{sec.heading}</h3>
              <p style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "14px",
                fontWeight: "500",
                color: "rgba(29,34,46,0.65)",
                lineHeight: 1.7,
                margin: 0,
              }}>{sec.body}</p>
            </div>
          ))}
        </div>

        {/* Tech stack row */}
        <div>
          <h3 style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: "11px",
            fontWeight: "800",
            color: "rgba(29,34,46,0.4)",
            textTransform: "uppercase",
            letterSpacing: "1.5px",
            margin: "0 0 12px",
          }}>Tech Stack</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {p.stack.map(chip => (
              <span key={chip} style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "12px",
                fontWeight: "800",
                color: "#1D222E",
                background: p.accentColor,
                border: "2px solid #1D222E",
                borderRadius: "6px",
                padding: "5px 14px",
                boxShadow: "2px 2px 0px #1D222E",
              }}>{chip}</span>
            ))}
          </div>
        </div>

        {/* Big, beautiful visual Go Back button at the bottom */}
        <div style={{
          marginTop: "60px",
          paddingTop: "32px",
          borderTop: "1px dashed rgba(29,34,46,0.12)",
          display: "flex",
          justifyContent: "center",
        }}>
          <button
            onClick={onBack}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              fontFamily: "'Outfit', sans-serif",
              fontSize: "15px",
              fontWeight: "900",
              color: "#FAF6EE",
              background: "#1D222E",
              border: "2px solid #1D222E",
              borderRadius: "8px",
              padding: "12px 24px",
              cursor: "pointer",
              boxShadow: "4px 4px 0px rgba(0,0,0,0.15)",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = "#fdcb6e";
              e.currentTarget.style.color = "#1D222E";
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "6px 6px 0px #1D222E";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "#1D222E";
              e.currentTarget.style.color = "#FAF6EE";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "4px 4px 0px rgba(0,0,0,0.15)";
            }}
          >
            ← Return to Homepage
          </button>
        </div>

      </div>
    </div>
  );
}
