import { useEffect, useState } from "react"
import avatar from "../assets/avatar.png" // Standard Vite relative asset import 1
import avatar2 from "../assets/avatar2.png" // Standard Vite relative asset import 2
import qrCode from "../assets/qr_code.png"
import lkIcon from "../assets/lk_icon.png"
import mailIcon from "../assets/mail_icon.png"

function Hero() {
  const [isHovered, setIsHovered] = useState(false);
  const [typedCommand, setTypedCommand] = useState("");
  const [terminalError, setTerminalError] = useState("");
  const [showInterests, setShowInterests] = useState(false);
  const [copiedMail, setCopiedMail] = useState(false);
  const [showMailTooltip, setShowMailTooltip] = useState(false);

  const handleCopyMail = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText("rahulaggarwal1025@gmail.com");
    setCopiedMail(true);
    setTimeout(() => setCopiedMail(false), 2000);
  };

  // Intentional funny backspace typing state machine
  useEffect(() => {
    let isCancelled = false;
    
    const script = [
      { action: "wait", ms: 1200 },
      { action: "type", text: "df.escribe()" }, // Intentional spelling typo
      { action: "wait", ms: 800 },
      { action: "error", text: "AttributeError: 'DataFrame' object has no attribute 'escribe'." },
      { action: "wait", ms: 500 },
      { action: "error", text: "AttributeError: 'DataFrame' object has no attribute 'escribe'.\nDid you mean: 'describe'?" },
      { action: "wait", ms: 3000 },
      { action: "clear-error" },
      { action: "backspace", count: 9 }, // Erases "escribe()" leaving "df."
      { action: "wait", ms: 750 },
      { action: "type", text: "describe()" }, // Run it correctly!
      { action: "wait", ms: 900 },
      { action: "show-interests", value: true },
      { action: "wait", ms: 10000 }, // Hold interests list active
      { action: "show-interests", value: false },
      { action: "wait", ms: 500 },
      { action: "backspace", count: 13 }, // Erases "df.describe()" leaving empty string
      { action: "wait", ms: 1200 }
    ];

    async function runScript() {
      while (!isCancelled) {
        setTypedCommand("");
        setTerminalError("");
        setShowInterests(false);

        for (const step of script) {
          if (isCancelled) break;
          
          if (step.action === "type") {
            for (let i = 0; i < step.text.length; i++) {
              if (isCancelled) break;
              setTypedCommand(prev => prev + step.text[i]);
              await new Promise(r => setTimeout(r, 65 + Math.random() * 45)); // Natural variable typing cadence
            }
          } 
          else if (step.action === "backspace") {
            for (let i = 0; i < step.count; i++) {
              if (isCancelled) break;
              setTypedCommand(prev => prev.slice(0, -1));
              await new Promise(r => setTimeout(r, 40)); // Rapid deletes
            }
          }
          else if (step.action === "wait") {
            await new Promise(r => setTimeout(r, step.ms));
          }
          else if (step.action === "error") {
            setTerminalError(step.text);
          }
          else if (step.action === "clear-error") {
            setTerminalError("");
          }
          else if (step.action === "show-interests") {
            setShowInterests(step.value);
          }
        }
      }
    }

    runScript();
    return () => { isCancelled = true; };
  }, []);

  return (
    <section style={{
      minHeight: "100vh",
      background: "#FAF6EE", // Premium warm cream color
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start", // Shift upwards to feel like a website header
      position: "relative",
      overflow: "hidden",
      padding: "20px",
      paddingTop: "9vh" // Clean upper vertical spacing, not stuck to top
    }}>
      {/* Soft warm radial gradient background */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "radial-gradient(circle at center, rgba(255, 255, 255, 0.8) 0%, rgba(250, 246, 238, 0.2) 100%)",
        pointerEvents: "none",
        zIndex: 0
      }} />
      
      {/* Soft elegant grid pattern overlay */}
      <div style={{
        position: "absolute",
        inset: 0,
        backgroundImage: "linear-gradient(to right, rgba(0, 0, 0, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 0, 0, 0.03) 1px, transparent 1px)",
        backgroundSize: "45px 45px",
        pointerEvents: "none",
        zIndex: 0
      }} />

      {/* Outer Responsive Row Stage surrounding the ID card with supplementary widgets */}
      <div style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: "45px",
        flexWrap: "wrap",
        width: "100%",
        maxWidth: "1200px",
        marginTop: "30px",
        zIndex: 5
      }}>
        
        {/* Left Side: Tiny Terminal Snippet Card Column */}
        <div style={{
          flex: "1",
          minWidth: "270px",
          maxWidth: "295px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "25px"
        }}>
          {/* Debug (Terminal) Card */}
          <div style={{
            width: "100%",
            background: "#131924",
            borderRadius: "16px",
            padding: "20px",
            boxShadow: "0 15px 35px rgba(0,0,0,0.15)",
            border: "1px solid rgba(255,255,255,0.05)",
            fontFamily: "var(--font-mono)",
            color: "#e2e8f0",
            fontSize: "12.5px",
            lineHeight: "1.6",
            textAlign: "left",
            transform: "rotate(-1.5deg)", // Slight organic rotation for soft look
            minHeight: "235px", // Prevents card layout jumping during state loops
            display: "flex",
            flexDirection: "column"
          }}>
            {/* Mac controls */}
            <div style={{ display: "flex", gap: "6px", marginBottom: "12px" }}>
              <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#ff5f56" }} />
              <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#ffbd2e" }} />
              <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#27c93f" }} />
            </div>
            
            {/* Terminal input stream */}
            <div style={{ display: "flex", alignItems: "center", color: "#74b9ff", fontWeight: "600" }}>
              <span>&gt;&gt;&gt;&nbsp;</span>
              <span>{typedCommand}</span>
              <span style={{ 
                width: "6px", 
                height: "14px", 
                background: "#74b9ff", 
                marginLeft: "2px",
                animation: "blink 1s step-end infinite"
              }} />
            </div>

            {/* Intentionally Funny Typo Error message */}
            {terminalError && (
              <div style={{ 
                color: "#ff7675", 
                fontSize: "11px", 
                marginTop: "8px", 
                whiteSpace: "pre-line",
                fontFamily: "var(--font-mono)",
                lineHeight: "1.4"
              }}>
                {terminalError}
              </div>
            )}

            {/* Interests variable values, fades in on successful correction */}
            <div style={{
              opacity: showInterests ? 1 : 0,
              transform: showInterests ? "translateY(0)" : "translateY(5px)",
              transition: "opacity 0.4s ease, transform 0.4s ease",
              marginTop: "12px"
            }}>
              <div style={{ color: "#a29bfe", fontWeight: "600" }}>interests = [</div>
              <div style={{ paddingLeft: "16px", color: "#55efc4" }}>
                "NLP & text mining",<br />
                "fintech & markets",<br />
                "human behavior in data",<br />
                "Designing and Editing"
              </div>
              <div style={{ color: "#a29bfe", fontWeight: "600" }}>]</div>
            </div>
          </div>

          {/* Floating LinkedIn Icon (Below Debug Card) */}
          <a 
            href="https://www.linkedin.com/in/rahul-aggarwal-28a281321/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textDecoration: "none",
              cursor: "pointer",
              zIndex: 10,
              transition: "filter 0.2s ease",
              transform: "rotate(-8deg)", // Random organic rotation direction & degree
              marginTop: "30px", // Slightly shifted down below terminal card
              filter: "drop-shadow(0 0 16px rgba(0, 119, 181, 0.45))" // Permanent Cobalt Glow!
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.filter = "drop-shadow(0 0 22px rgba(0, 119, 181, 0.75))"; // Stronger glow on hover
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.filter = "drop-shadow(0 0 16px rgba(0, 119, 181, 0.45))"; // Keep permanent default glow
            }}
          >
            <img 
              src={lkIcon} 
              alt="LinkedIn" 
              style={{ 
                width: "80px", 
                height: "80px", 
                objectFit: "contain",
                display: "block"
              }} 
            />
          </a>
        </div>

        {/* Center: ID Card and Hanger wrapper */}
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          zIndex: 6
        }}>
          {/* Stationary Metallic Nail Pin centered exactly on the swing axis */}
          <div style={{
            position: "absolute",
            top: "-7px", // positioned relative to the top center of this wrapper
            width: "14px",
            height: "14px",
            borderRadius: "50%",
            background: "radial-gradient(circle at 35% 35%, #ffffff 0%, #cbd5e1 30%, #64748b 75%, #334155 100%)",
            boxShadow: "0 3px 6px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.7)",
            zIndex: 15,
            pointerEvents: "none"
          }}>
            {/* Inner nail core pin */}
            <div style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "4px",
              height: "4px",
              borderRadius: "50%",
              background: "#1e293b"
            }} />
          </div>



          {/* Swinging Card Panel */}
          <div 
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
              transformOrigin: "top center",
              animation: "swing 3.2s cubic-bezier(0.445, 0.05, 0.55, 0.95) infinite",
              zIndex: 6,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              position: "relative" // Anchors absolute kids that swing along
            }}
          >

            {/* Straight Lanyard Strap matching the uploaded design (Perfect 80px size) */}
            <svg 
              width="40" 
              height="80" 
              viewBox="0 0 40 80" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              style={{
                display: "block",
                zIndex: 5,
                position: "relative",
                filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.2))"
              }}
            >
              {/* Strap Base (Dark Navy) */}
              <rect x="9" y="0" width="22" height="50" fill="#131924" rx="1.5" />
              
              {/* Diagonal Stripes (Teal, Sky Blue, White) */}
              <path d="M9 12 L31 24 L31 30 L9 18 Z" fill="#00cec9" />
              <path d="M9 18 L31 30 L31 36 L9 24 Z" fill="#90caf9" />
              <path d="M9 24 L31 36 L31 42 L9 30 Z" fill="#ffffff" />
              
              {/* Metal Ring */}
              <circle cx="20" cy="58" r="9" stroke="#2d3748" strokeWidth="2.5" fill="none" />
              
              {/* Lobster Clasp */}
              <rect x="16" y="66" width="8" height="5" rx="1.5" fill="#4a5568" />
              <path d="M15,71 C15,71 13,77 17,81 C19,83 21,83 23,81 C27,77 25,71 25,71 L23,71 C23,74 24,78 21,79 C20,80 20,80 19,79 C16,78 17,74 17,71 Z" fill="#2d3748" />
              <path d="M21,73 L25,75 L24,77 L21,75 Z" fill="#1a202c" />
            </svg>

            {/* Premium ID Card matching the reference wave layout, maximized for photo real-estate */}
            <div style={{
              width: "290px",
              height: "460px", // Shortened to remove dead space below name/tagline
              background: "#ffffff",
              borderRadius: "28px",
              overflow: "hidden",
              boxShadow: "0 25px 65px rgba(0, 0, 0, 0.65)",
              position: "relative",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: "-8px"
            }}>
              {/* Lanyard punch hole slot at the top center of the card (Cream theme) */}
              <div style={{
                position: "absolute",
                top: "10px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "28px",
                height: "7px",
                borderRadius: "4px",
                background: "#FAF6EE",
                border: "1px solid rgba(0, 0, 0, 0.08)",
                zIndex: 10
              }} />
              
              {/* Layered Wavy Diagonal SVGs on Top Block */}
              <svg 
                style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "200px", zIndex: 1 }} 
                viewBox="0 0 300 200" 
                preserveAspectRatio="none"
              >
                {/* Swoosh 3 (Deep Ocean Blue back layer) */}
                <path d="M0,0 L300,0 V180 C200,175 100,140 0,120 Z" fill="#0984e3" opacity="0.3" />
                {/* Swoosh 2 (Bright Vibrant Teal layer) */}
                <path d="M0,0 L300,0 V165 C200,160 100,125 0,105 Z" fill="#00cec9" />
                {/* Swoosh 1 (Main Dark Navy block) */}
                <path d="M0,0 L300,0 V150 C200,145 100,110 0,90 Z" fill="#1d212c" />
              </svg>

              {/* Maximized Portrait Photo Container with hover transition */}
              <div style={{
                position: "relative",
                zIndex: 4,
                marginTop: "30px", // Slips up inside the dark wave due to logo removal
                width: "238px",
                height: "315px", // Enlarge height to fit the bottom area comfortably
                background: "#ffffff",
                borderRadius: "32px",
                padding: "6px",
                boxShadow: "0 12px 30px rgba(0, 0, 0, 0.16)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                {/* Viewport Frame */}
                <div style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "26px",
                  overflow: "hidden",
                  background: "#f0f2f5",
                  position: "relative"
                }}>
                  {/* Slide 1: avatar.png (Visible by default) */}
                  <img 
                    src={avatar} 
                    alt="Rahul Aggarwal Slide 1" 
                    style={{ 
                      width: "100%", 
                      height: "100%", 
                      objectFit: "cover", 
                      objectPosition: "center top", // Crop bottom safely, keep head in focus
                      position: "absolute",
                      top: 0,
                      left: 0,
                      opacity: isHovered ? 0 : 1
                    }}
                  />
                  {/* Slide 2: avatar2.png (Visible on hover) */}
                  <img 
                    src={avatar2} 
                    alt="Rahul Aggarwal Slide 2" 
                    style={{ 
                      width: "100%", 
                      height: "100%", 
                      objectFit: "cover", 
                      objectPosition: "center top", // Crop bottom safely, keep head in focus
                      position: "absolute",
                      top: 0,
                      left: 0,
                      opacity: isHovered ? 1 : 0
                    }}
                  />
                </div>
              </div>

              {/* Bottom Card Base: Just Name & Subtitle */}
              <div style={{
                position: "relative",
                zIndex: 2,
                marginTop: "20px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center"
              }}>
                {/* Continuous Scrolling Live-Gradient Name (High Contrast, Deep Sapphire & Pine Teal) */}
                <div style={{
                  fontSize: "24px",
                  fontWeight: "900",
                  fontFamily: "'Outfit', sans-serif",
                  letterSpacing: "0.5px",
                  textTransform: "uppercase",
                  backgroundImage: "linear-gradient(90deg, #09477e 0%, #06727c 35%, #055e88 70%, #09477e 100%)",
                  backgroundSize: "200% 100%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  animation: "flow-gradient 5s linear infinite",
                  display: "inline-block"
                }}>
                  Rahul Aggarwal
                </div>
                
                {/* Enlarged Title Tagline with "Scientist" in quotes */}
                <div style={{
                  fontSize: "15px",
                  color: "#7f8c8d",
                  fontWeight: "600",
                  marginTop: "6px",
                  letterSpacing: "0.5px",
                  fontFamily: "'Outfit', sans-serif"
                }}>
                  Data "Scientist"
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Right Side: QR Code Card Column */}
        <div style={{
          flex: "1",
          minWidth: "160px",
          maxWidth: "185px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "25px"
        }}>
          {/* QR Code Card leading to documents folder */}
          <a 
            href="https://drive.google.com/drive/folders/1-DKzXdJtBB0JqcTNhFhv4bbE-7whR50h?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              width: "100%",
              background: "#ffffff",
              borderRadius: "20px",
              padding: "20px",
              boxShadow: "0 15px 35px rgba(0,0,0,0.06)",
              border: "1px solid rgba(0,0,0,0.05)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textDecoration: "none",
              transition: "transform 0.2s ease, boxShadow 0.2s ease",
              transform: "rotate(1.5deg)" // Slight organic rotation
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px) rotate(1.5deg)";
              e.currentTarget.style.boxShadow = "0 20px 45px rgba(0,0,0,0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0) rotate(1.5deg)";
              e.currentTarget.style.boxShadow = "0 15px 35px rgba(0,0,0,0.06)";
            }}
          >
            {/* High-Fidelity Dense Vector QR Code Container */}
            <div style={{
                background: "#ffffff",
                padding: "8px",
                borderRadius: "12px",
                boxShadow: "inset 0 1px 3px rgba(0,0,0,0.05)",
                border: "1px solid rgba(0,0,0,0.04)"
              }}>
                <img 
                  src={qrCode} 
                  alt="Documents QR Code" 
                  style={{ 
                    width: "115px", 
                     height: "115px", 
                     display: "block",
                     imageRendering: "pixelated"
                  }} 
                />
              </div>
            
            <div style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "12px",
              fontWeight: "700",
              color: "#06727c",
              textTransform: "uppercase",
              marginTop: "12px",
              letterSpacing: "0.5px",
              textAlign: "center"
            }}>
              Scan / click for Documents
            </div>
          </a>

          {/* Floating Mail Icon (Below QR Card) with instant Click-to-Copy interaction */}
          <div 
            onClick={handleCopyMail}
            onMouseEnter={() => setShowMailTooltip(true)}
            onMouseLeave={() => {
              setShowMailTooltip(false);
            }}
            style={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 10,
              cursor: "pointer",
              transform: "rotate(12deg)", // Random organic rotation direction & degree
              marginTop: "135px" // Pushed significantly more down to break horizontal alignment
            }}
          >
            <div 
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textDecoration: "none",
                transition: "filter 0.2s ease",
                filter: "drop-shadow(0 0 16px rgba(225, 112, 85, 0.45))" // Permanent Coral Glow!
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.filter = "drop-shadow(0 0 22px rgba(225, 112, 85, 0.75))"; // Stronger glow on hover
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.filter = "drop-shadow(0 0 16px rgba(225, 112, 85, 0.45))"; // Keep permanent default glow
              }}
            >
              <img 
                src={mailIcon} 
                alt="Email" 
                style={{ 
                  width: "80px", 
                  height: "80px", 
                  objectFit: "contain",
                  display: "block"
                }} 
              />
            </div>

            {/* Zero-Stress Click Copy Tooltip */}
            {(showMailTooltip || copiedMail) && (
              <div style={{
                position: "absolute",
                bottom: "88px",
                left: "50%",
                background: copiedMail ? "#10ac84" : "#131924", // Vibrant green when copied!
                color: "#ffffff",
                padding: "8px 14px",
                borderRadius: "12px",
                boxShadow: "0 10px 25px rgba(0,0,0,0.35)",
                border: copiedMail ? "1px solid #1dd1a1" : "1px solid rgba(255,255,255,0.15)",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                whiteSpace: "nowrap",
                fontSize: "12px",
                fontWeight: "600",
                fontFamily: "var(--font-mono)",
                zIndex: 20,
                transform: "translateX(-50%)",
                animation: "fadeInUp 0.2s ease",
                transition: "background 0.3s ease, border 0.3s ease"
              }}>
                {copiedMail ? (
                  <span>Copied to Clipboard! 🎉</span>
                ) : (
                  <span>Click to copy email</span>
                )}
                <div style={{
                  position: "absolute",
                  bottom: "-6px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "0",
                  height: "0",
                  borderLeft: "6px solid transparent",
                  borderRight: "6px solid transparent",
                  borderTop: copiedMail ? "6px solid #10ac84" : "6px solid #131924",
                  transition: "border-top-color 0.3s ease"
                }} />
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Row 2: Four Supplementary Info Cards Grid */}
      <div style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "stretch",
        justifyContent: "center",
        gap: "24px",
        flexWrap: "wrap",
        width: "100%",
        maxWidth: "1200px",
        marginTop: "35px",
        marginBottom: "20px",
        zIndex: 5
      }}>


        {/* Card 3 — Home */}
        <div 
          style={{
            flex: "1.2",
            minWidth: "260px",
            maxWidth: "320px",
            background: "#ffffff",
            borderRadius: "28px 4px 28px 4px", // Funky asymmetrical custom shape!
            padding: "22px",
            border: "3.5px solid #1D222E", // Bold high-contrast neo-brutalist border
            boxShadow: "8px 8px 0px #00cec9", // Vibrant flat cyan drop shadow!
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            transition: "transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275), boxShadow 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
            transform: "rotate(-1.5deg)",
            minHeight: "195px"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-6px) rotate(-1.5deg)";
            e.currentTarget.style.boxShadow = "12px 12px 0px #00cec9"; // Interactive tactile shadow expansion!
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0) rotate(-1.5deg)";
            e.currentTarget.style.boxShadow = "8px 8px 0px #00cec9";
          }}
        >
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", width: "100%" }}>
              <div>
                <span style={{ 
                  background: "#00cec9", 
                  color: "#1D222E", 
                  fontSize: "9.5px", 
                  fontWeight: "900", 
                  padding: "4px 10px", 
                  borderRadius: "8px", 
                  border: "2px solid #1D222E", // Nested neo-brutalist coordinate badge
                  textTransform: "uppercase",
                  letterSpacing: "0.8px",
                  fontFamily: "'Outfit', sans-serif"
                }}>
                  Coordinates
                </span>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "14px", fontWeight: "800", color: "#1D222E", marginTop: "12px", letterSpacing: "0.1px" }}>
                  31.1048° N &middot; 77.1734° E
                </div>
              </div>
              
              {/* Spinning vector compass in small circular light block */}
              <div style={{ 
                width: "42px", 
                height: "42px", 
                borderRadius: "50%", 
                background: "#FAF6EE", // Light cream background matching page theme
                border: "3px solid #1D222E", // Thick Neo-Brutalist outline
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center",
                boxShadow: "2px 2px 0px #1D222E", // Solid carbon shadow
                flexShrink: 0
              }}>
                <svg 
                  width="28" 
                  height="28" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ animation: "spin-slow 15s linear infinite" }}
                >
                  {/* Dial Tick Marks */}
                  <circle cx="12" cy="12" r="10" stroke="#1D222E" strokeWidth="1" strokeDasharray="2 2" opacity="0.15" />
                  <circle cx="12" cy="12" r="8" stroke="#1D222E" strokeWidth="0.75" opacity="0.08" />
                  
                  {/* Cardinal Tick Lines */}
                  <line x1="12" y1="2" x2="12" y2="4" stroke="#1D222E" strokeWidth="1.5" />
                  <line x1="12" y1="20" x2="12" y2="22" stroke="#1D222E" strokeWidth="1" opacity="0.5" />
                  <line x1="2" y1="12" x2="4" y2="12" stroke="#1D222E" strokeWidth="1" opacity="0.5" />
                  <line x1="20" y1="12" x2="22" y2="12" stroke="#1D222E" strokeWidth="1" opacity="0.5" />
                  
                  {/* Diagonal subtle ticks */}
                  <line x1="5" y1="5" x2="6.5" y2="6.5" stroke="#1D222E" strokeWidth="0.75" opacity="0.25" />
                  <line x1="19" y1="5" x2="17.5" y2="6.5" stroke="#1D222E" strokeWidth="0.75" opacity="0.25" />
                  <line x1="5" y1="19" x2="6.5" y2="17.5" stroke="#1D222E" strokeWidth="0.75" opacity="0.25" />
                  <line x1="19" y1="19" x2="17.5" y2="17.5" stroke="#1D222E" strokeWidth="0.75" opacity="0.25" />

                  {/* Tiny "N" Cardinal Label on north tick */}
                  <path d="M11 5.5 V7.5 L13 5.5 V7.5" stroke="#1D222E" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />

                  {/* Two-Tone Aviation-Style 3D Needle */}
                  {/* North Needle Pointing North (Vibrant Glowing Cyan Fill) */}
                  <path d="M12 4.5 L14.5 12 L12 10.5 Z" fill="#00cec9" stroke="#1D222E" strokeWidth="1" strokeLinejoin="round" />
                  <path d="M12 4.5 L9.5 12 L12 10.5 Z" fill="rgba(0, 206, 201, 0.5)" stroke="#1D222E" strokeWidth="1" strokeLinejoin="round" />
                  
                  {/* South Needle Pointing South (Clean Light-Themed White/Gray Fill) */}
                  <path d="M12 19.5 L14.5 12 L12 13.5 Z" fill="#ffffff" stroke="#1D222E" strokeWidth="1" strokeLinejoin="round" />
                  <path d="M12 19.5 L9.5 12 L12 13.5 Z" fill="#f0f2f5" stroke="#1D222E" strokeWidth="1" strokeLinejoin="round" />

                  {/* Central Pivot Bearing */}
                  <circle cx="12" cy="12" r="1.5" fill="#00cec9" stroke="#1D222E" strokeWidth="1" />
                </svg>
              </div>
            </div>

            {/* Hometown Shimla & Base Mohali */}
            <div style={{ marginTop: "18px", display: "flex", flexDirection: "column", gap: "10px" }}>
              {/* Hometown Shimla */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                <div style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "8px",
                  background: "rgba(6, 114, 124, 0.08)",
                  border: "2px solid #1D222E",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0
                }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#06727c" strokeWidth="2.5">
                    <path d="M12 3L2 12h3v8h14v-8h3L12 3z" />
                  </svg>
                </div>
                <div>
                  <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: "13.5px", color: "#1D222E", fontWeight: "800" }}>
                    Shimla, Himachal Pradesh
                  </div>
                  <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: "11px", color: "#7f8c8d", marginTop: "1px" }}>
                    Hometown &middot; altitude 2,276 m
                  </div>
                </div>
              </div>

              {/* Current Active Work Base Mohali with radar pulse */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                {/* Pulsing indicator */}
                <div style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "8px",
                  background: "rgba(39, 201, 63, 0.08)",
                  border: "2px solid #1D222E",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  flexShrink: 0
                }}>
                  <span style={{
                    position: "absolute",
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: "#27c93f"
                  }} />
                  <span style={{
                    position: "absolute",
                    width: "16px",
                    height: "16px",
                    borderRadius: "50%",
                    border: "1.5px solid #27c93f",
                    animation: "pulse-radar 2s infinite ease-in-out"
                  }} />
                </div>
                <div>
                  <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: "13.5px", color: "#1D222E", fontWeight: "800" }}>
                    Mohali, Punjab
                  </div>
                  <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: "11px", color: "#09477e", fontWeight: "700", marginTop: "1px" }}>
                    Currently Based
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 4 — Education */}
        <div 
          style={{
            flex: "1.5",
            minWidth: "300px",
            maxWidth: "400px",
            position: "relative",
            overflow: "visible", // Enable pop-out doodles
            transform: "rotate(1.5deg)",
            transition: "transform 0.2s ease",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-4px) rotate(1.5deg)";
            const shadow = e.currentTarget.querySelector(".neo-shadow-edu");
            if (shadow) shadow.style.transform = "translate(2px, 2px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0) rotate(1.5deg)";
            const shadow = e.currentTarget.querySelector(".neo-shadow-edu");
            if (shadow) shadow.style.transform = "translate(0, 0)";
          }}
        >
          {/* Flat 3D Shadow Layer (Clipped at Top-Right Corner) */}
          <div 
            className="neo-shadow-edu"
            style={{
              position: "absolute",
              top: "6px",
              left: "6px",
              width: "100%",
              height: "100%",
              background: "#1D222E",
              borderRadius: "4px",
              clipPath: "polygon(0 0, calc(100% - 34px) 0, 100% 34px, 100% 100%, 0 100%)",
              transition: "transform 0.2s ease",
              zIndex: 1
            }} 
          />

          {/* Ruled Paper Body (Clipped at Top-Right Corner) */}
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "repeating-linear-gradient(#fcfdfe, #fcfdfe 27px, #e2ecf4 27px, #e2ecf4 28px)",
            border: "2.5px solid #1D222E",
            borderRadius: "4px",
            clipPath: "polygon(0 0, calc(100% - 34px) 0, 100% 34px, 100% 100%, 0 100%)",
            zIndex: 2,
            pointerEvents: "none"
          }} />

          {/* Folded Paper Flap */}
          <div style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "34px",
            height: "34px",
            pointerEvents: "none",
            zIndex: 3
          }}>
            <svg width="34" height="34" viewBox="0 0 34 34" fill="none" style={{ display: "block" }}>
              {/* Crease/Fold line boundary */}
              <line x1="0" y1="0" x2="34" y2="34" stroke="#1D222E" strokeWidth="2.5" />
              {/* Folded paper flap */}
              <path d="M0 0 L34 34 L0 34 Z" fill="#e3ece9" />
              {/* Inner fold border lines */}
              <path d="M0 0 L0 34 L34 34" stroke="#1D222E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          {/* Absolute 3D Spiral Binder Coils (Clipped Vertically to Card Height) */}
          <div style={{
            position: "absolute",
            left: "-16px",
            top: "12px",
            bottom: "12px",
            width: "36px",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            gap: "22px",
            zIndex: 10,
            pointerEvents: "none"
          }}>
            {Array.from({ length: 15 }).map((_, i) => (
              <div key={i} style={{ position: "relative", width: "36px", height: "12px", flexShrink: 0 }}>
                {/* Punch Hole under the coil */}
                <div style={{
                  position: "absolute",
                  left: "25px",
                  top: "2px",
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "#1D222E",
                  opacity: 0.75
                }} />
                {/* Spiral Ring (curving outside left edge and into the punch hole) */}
                <div style={{
                  position: "absolute",
                  left: "4px",
                  top: "0px",
                  width: "22px",
                  height: "12px",
                  borderRadius: "6px",
                  border: "2.5px solid #1D222E",
                  borderRight: "none",
                  background: "linear-gradient(to bottom, #f1f2f6, #ced6e0)",
                  boxShadow: "2px 2px 4px rgba(0,0,0,0.15)"
                }} />
              </div>
            ))}
          </div>

          {/* Slanted Eraser at the top edge */}
          <svg width="45" height="22" viewBox="0 0 45 22" style={{
            position: "absolute",
            top: "-14px",
            right: "55px",
            transform: "rotate(16deg)",
            filter: "drop-shadow(2px 3px 2px rgba(0,0,0,0.15))",
            zIndex: 4,
            pointerEvents: "none"
          }}>
            {/* Red / Pink Rubber block */}
            <polygon points="2,18 20,18 20,4 5,4" fill="#ff7675" />
            {/* Blue Rubber block */}
            <polygon points="20,18 38,18 43,4 20,4" fill="#0984e3" />
            {/* Highlight overlay for 3D depth */}
            <polygon points="2,18 5,4 20,4 20,18" fill="rgba(255,255,255,0.18)" />
            {/* Sleek dotted center sleeve divider */}
            <line x1="20" y1="4" x2="20" y2="18" stroke="#1D222E" strokeWidth="1.5" strokeDasharray="2,2" />
            {/* Dark Ink outline */}
            <path d="M2,18 L5,4 L43,4 L38,18 Z" fill="none" stroke="#1D222E" strokeWidth="2.5" strokeLinejoin="round" />
          </svg>

          {/* Inner Content Wrapper */}
          <div style={{
            position: "relative",
            zIndex: 3,
            padding: "22px 22px 32px 55px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            height: "100%"
          }}>
            {/* Vertical Red/Coral Margin Line */}
            <div style={{
              position: "absolute",
              left: "45px",
              top: "0",
              bottom: "0",
              width: "2px",
              background: "#ff7675",
              opacity: 0.8
            }} />

            {/* Header Title with Custom Marker Highlighter Style */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", marginBottom: "18px" }}>
              <span style={{ 
                background: "rgba(9, 132, 227, 0.15)", 
                color: "#0984e3", 
                fontSize: "11px", 
                fontWeight: "900", 
                padding: "4px 10px", 
                borderRadius: "4px", 
                textTransform: "uppercase",
                letterSpacing: "1px",
                fontFamily: "'Outfit', sans-serif",
                border: "1.5px solid #0984e3",
                transform: "rotate(-2deg)",
                display: "inline-block"
              }}>
                Academics
              </span>
            </div>

            {/* Timeline Wrapper */}
            <div style={{ display: "flex", flexDirection: "column", gap: "18px", position: "relative" }}>
              {/* Hand-Drawn Dashed Timeline Path */}
              <div style={{ 
                position: "absolute", 
                left: "15px", 
                top: "16px", 
                bottom: "16px", 
                width: "0px", 
                borderLeft: "2.5px dashed #a4b0be",
                zIndex: 1
              }} />

              {/* Node 1: Plaksha University */}
              <div style={{ display: "flex", gap: "14px", zIndex: 2, alignItems: "flex-start" }}>
                {/* Sticker Badge */}
                <div style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  background: "#74b9ff",
                  border: "2px solid #1D222E",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "2px 2px 0px #1D222E",
                  zIndex: 2,
                  flexShrink: 0
                }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#1D222E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                    <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
                  </svg>
                </div>
                
                <div>
                  <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: "14.5px", fontWeight: "900", color: "#1D222E" }}>
                    Plaksha University
                  </div>
                  <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: "11px", color: "#4b5563", marginTop: "4px", display: "flex", flexWrap: "wrap", gap: "5px", alignItems: "center" }}>
                    <span style={{ fontWeight: "700" }}>2024–present &middot;</span>
                    <span style={{ 
                      background: "rgba(254, 211, 48, 0.4)", // Yellow Highlighter Marker
                      color: "#785f00", 
                      padding: "1px 6px", 
                      borderRadius: "4px",
                      fontSize: "10px",
                      fontWeight: "800",
                      fontFamily: "'Outfit', sans-serif",
                      border: "1px dashed rgba(120, 95, 0, 0.3)"
                    }}>
                      Merit Scholar &middot; B.Tech DSEB
                    </span>
                  </div>
                </div>
              </div>

              {/* Node 2: JCB School Shimla */}
              <div style={{ display: "flex", gap: "14px", zIndex: 2, alignItems: "flex-start" }}>
                {/* Sticker Badge */}
                <div style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  background: "#ffeaa7",
                  border: "2px solid #1D222E",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "2px 2px 0px #1D222E",
                  zIndex: 2,
                  flexShrink: 0
                }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#1D222E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </div>
                
                <div>
                  <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: "14.5px", fontWeight: "900", color: "#1D222E" }}>
                    JCB School Shimla
                  </div>
                  <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: "11px", color: "#4b5563", marginTop: "4px", display: "flex", flexWrap: "wrap", gap: "5px", alignItems: "center" }}>
                    <span style={{ fontWeight: "700" }}>Class XII &middot;</span>
                    <span style={{ 
                      background: "rgba(255, 118, 117, 0.25)", // Pink/Orange Highlighter Marker
                      color: "#b33939", 
                      padding: "1px 6px", 
                      borderRadius: "4px",
                      fontSize: "10px",
                      fontWeight: "800",
                      fontFamily: "'Outfit', sans-serif",
                      border: "1px dashed rgba(179, 57, 57, 0.3)"
                    }}>
                      JEE 95.01%ile &middot; 2023
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Classic Stationery Doodle: Hexagonal Pencil (Bottom-Left) */}
          <svg width="95" height="18" viewBox="0 0 95 18" style={{
            position: "absolute",
            bottom: "8px",
            left: "18px",
            transform: "rotate(-7deg)",
            filter: "drop-shadow(2px 3px 2px rgba(0,0,0,0.12))",
            zIndex: 4,
            pointerEvents: "none"
          }}>
            {/* Hexagonal Yellow Pencil Body */}
            <rect x="24" y="3" width="52" height="12" fill="#f39c12" rx="0.5" />
            <rect x="24" y="7" width="52" height="4" fill="#d35400" />
            {/* Shaved wood transition to lead tip */}
            <polygon points="24,3 12,9 24,15" fill="#f5cd79" />
            {/* Sharp Graphite Lead Tip */}
            <polygon points="17,6.5 12,9 17,11.5" fill="#2c3e50" />
            {/* Metal sleeve (Ferrule) */}
            <rect x="76" y="3" width="8" height="12" fill="#bdc3c7" />
            <rect x="79" y="3" width="2" height="12" fill="#7f8c8d" />
            {/* Pink rubber eraser tip */}
            <path d="M84,3 H89 C92,3 92,15 89,15 H84 Z" fill="#ff7675" />
            {/* Pencil black outlines */}
            <path d="M12,9 L24,3 L84,3 C87,3 92,3 92,9 C92,15 87,15 84,15 L24,15 Z" fill="none" stroke="#1D222E" strokeWidth="2" strokeLinejoin="round" />
            <line x1="24" y1="3" x2="24" y2="15" stroke="#1D222E" strokeWidth="2" />
            <line x1="76" y1="3" x2="76" y2="15" stroke="#1D222E" strokeWidth="2" />
          </svg>

          {/* Classic Stationery Doodle: Wooden Metric Ruler (Bottom-Right) */}
          <svg width="105" height="24" viewBox="0 0 105 24" style={{
            position: "absolute",
            bottom: "-4px",
            right: "-8px",
            transform: "rotate(-13deg)",
            filter: "drop-shadow(1px 2px 2px rgba(0,0,0,0.12))",
            zIndex: 4,
            pointerEvents: "none"
          }}>
            {/* Wood Ruler Body */}
            <rect x="2" y="2" width="101" height="20" fill="#eccc68" rx="1" />
            {/* Increment Tick Marks */}
            {Array.from({ length: 17 }).map((_, i) => {
              const x = 8 + i * 5.5;
              const isMajor = i % 4 === 0;
              const height = isMajor ? 7 : 4;
              return (
                <line
                  key={i}
                  x1={x}
                  y1="2"
                  x2={x}
                  y2={2 + height}
                  stroke="#1D222E"
                  strokeWidth={isMajor ? "1.5" : "1"}
                />
              );
            })}
            {/* Ruler border outline */}
            <rect x="2" y="2" width="101" height="20" rx="1" fill="none" stroke="#1D222E" strokeWidth="2.5" />
          </svg>
        </div>

      </div>

      {/* Smooth Card Swaying, Floating Icons, & Continuous Linear Gradient Flow Keyframes */}
      <style>{`
        @keyframes swing {
          0%   { transform: rotate(-4deg); }
          50%  { transform: rotate(4deg); }
          100% { transform: rotate(-4deg); }
        }
        @keyframes flow-gradient {
          0% { background-position: 0% 0%; }
          100% { background-position: 200% 0%; }
        }
        @keyframes blink {
          from, to { background-color: transparent }
          50% { background-color: #74b9ff }
        }
        @keyframes floatAround {
          0%   { transform: translateY(0px) rotate(0deg); }
          50%  { transform: translateY(-12px) rotate(3deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        @keyframes floatAroundMail {
          0%   { transform: translateY(0px) rotate(0deg); }
          50%  { transform: translateY(-10px) rotate(-3deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translate(-50%, 8px); }
          to { opacity: 1; transform: translate(-50%, 0px); }
        }
        @keyframes pulse-radar {
          0% { transform: scale(0.65); opacity: 1; }
          100% { transform: scale(1.3); opacity: 0; }
        }
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}

export default Hero;