import resumePdf from "../assets/resume_rahul.pdf";

function Footer() {
  const navItems = [
    { label: "Home", href: "#home" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
  ];

  const socialItems = [
    { label: "GitHub", href: "https://github.com/Rahul-Aggarwal1025" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/rahul-aggarwal-28a281321/" },
  ];

  return (
    <footer
      style={{
        background: "#1D222E",
        color: "#FAF6EE",
        padding: "54px 24px 36px",
        fontFamily: "'Outfit', sans-serif",
        position: "relative",
        zIndex: 10,
        boxSizing: "border-box",
        width: "100%",
      }}
    >
      {/* Upper Grid Row */}
      <div
        style={{
          maxWidth: "940px",
          margin: "0 auto",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "36px",
        }}
      >
        {/* Left Side: Brand Column */}
        <div style={{ flex: "1 1 300px", display: "flex", flexDirection: "column", gap: "8px" }}>
          <h4
            style={{
              fontSize: "20px",
              fontWeight: "900",
              margin: 0,
              color: "#FAF6EE",
              letterSpacing: "-0.3px",
            }}
          >
            R<span style={{ color: "#a29bfe" }}>.</span>
          </h4>
          <p
            style={{
              fontSize: "13px",
              fontWeight: "500",
              color: "rgba(250, 246, 238, 0.65)",
              lineHeight: "1.6",
              margin: "4px 0 0",
              maxWidth: "280px",
            }}
          >
            Solving complex data puzzles, scraping review databases, and building structured insights out of unstructured text.
          </p>
          <a
            href="mailto:rahulaggarwal1025@gmail.com"
            style={{
              display: "inline-block",
              alignSelf: "flex-start",
              marginTop: "12px",
              fontSize: "13.5px",
              fontWeight: "700",
              color: "#a29bfe",
              textDecoration: "none",
              transition: "opacity 0.2s ease",
            }}
            onMouseEnter={(e) => (e.target.style.opacity = 0.85)}
            onMouseLeave={(e) => (e.target.style.opacity = 1)}
          >
            ✉️ rahulaggarwal1025@gmail.com
          </a>
        </div>

        {/* Right Side: Links Columns */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "48px" }}>
          {/* Navigation links */}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <h5
              style={{
                fontSize: "11px",
                fontWeight: "900",
                color: "#a29bfe",
                textTransform: "uppercase",
                letterSpacing: "0.8px",
                margin: "0 0 4px",
              }}
            >
              Explore
            </h5>
            {navItems.map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                style={{
                  fontSize: "13.5px",
                  fontWeight: "600",
                  color: "rgba(250, 246, 238, 0.75)",
                  textDecoration: "none",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) => (e.target.style.color = "#a29bfe")}
                onMouseLeave={(e) => (e.target.style.color = "rgba(250, 246, 238, 0.75)")}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Social / Contact Links */}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <h5
              style={{
                fontSize: "11px",
                fontWeight: "900",
                color: "#a29bfe",
                textTransform: "uppercase",
                letterSpacing: "0.8px",
                margin: "0 0 4px",
              }}
            >
              Connect
            </h5>
            {socialItems.map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: "13.5px",
                  fontWeight: "600",
                  color: "rgba(250, 246, 238, 0.75)",
                  textDecoration: "none",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) => (e.target.style.color = "#a29bfe")}
                onMouseLeave={(e) => (e.target.style.color = "rgba(250, 246, 238, 0.75)")}
              >
                {item.label}
              </a>
            ))}
            <a
              href={resumePdf}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: "13.5px",
                fontWeight: "600",
                color: "rgba(250, 246, 238, 0.75)",
                textDecoration: "none",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) => (e.target.style.color = "#a29bfe")}
              onMouseLeave={(e) => (e.target.style.color = "rgba(250, 246, 238, 0.75)")}
            >
              Resume PDF
            </a>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div
        style={{
          maxWidth: "940px",
          margin: "28px auto 20px",
          borderTop: "1px solid rgba(250, 246, 238, 0.08)",
        }}
      />

      {/* Bottom Copyright and Disclaimer */}
      <div
        style={{
          maxWidth: "940px",
          margin: "0 auto",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "12px",
          fontSize: "11.5px",
          fontWeight: "500",
          color: "rgba(250, 246, 238, 0.4)",
        }}
      >
        <span>© 2026 Rahul. Hand-crafted using React & Vite.</span>
        <span style={{ fontSize: "11px", fontStyle: "italic" }}>
          No cookies, just good vibes and lots of caffine
        </span>
      </div>
    </footer>
  );
}

export default Footer;
