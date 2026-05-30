import resumePdf from "../assets/resume_rahul.pdf";

function Navbar() {
  const menuItems = [
    { label: "Home", href: "#home" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" }
  ];

  return (
    <nav style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      height: "54px", // Sleek, reduced breadth
      background: "rgba(255, 255, 255, 0.75)",
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      borderBottom: "1px solid rgba(0, 0, 0, 0.06)",
      zIndex: 100,
      display: "flex",
      alignItems: "center",
      justifyContent: "center", // Perfectly center the menu links
      padding: "0 24px",
      transition: "all 0.3s ease"
    }}>
      {/* Centered Navigation Links */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "36px"
      }}>
        {menuItems.map((item, idx) => (
          <a 
            key={idx} 
            href={item.href} 
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "15px",
              fontWeight: "600",
              color: "#3D4350",
              textDecoration: "none",
              position: "relative",
              padding: "6px 0",
              transition: "color 0.2s ease"
            }}
            onMouseEnter={(e) => e.target.style.color = "#06727c"}
            onMouseLeave={(e) => e.target.style.color = "#3D4350"}
          >
            {item.label}
          </a>
        ))}
        
        {/* Specially Highlighted Resume Button */}
        <a 
          href={resumePdf} 
          target="_blank" 
          rel="noopener noreferrer"
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: "14px",
            fontWeight: "700",
            color: "#06727c",
            textDecoration: "none",
            border: "1.5px solid #06727c",
            borderRadius: "20px",
            padding: "5px 16px",
            background: "rgba(6, 114, 124, 0.03)",
            transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 2px 4px rgba(6, 114, 124, 0.05)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#06727c";
            e.currentTarget.style.color = "#ffffff";
            e.currentTarget.style.transform = "translateY(-1px)";
            e.currentTarget.style.boxShadow = "0 4px 12px rgba(6, 114, 124, 0.2)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(6, 114, 124, 0.03)";
            e.currentTarget.style.color = "#06727c";
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 2px 4px rgba(6, 114, 124, 0.05)";
          }}
        >
          Resume
        </a>
      </div>
    </nav>
  );
}

export default Navbar;