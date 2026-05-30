export const portfolioData = {
  personalInfo: {
    name: "Alex Sterling",
    title: "Quantum Full-Stack Engineer & Interaction Designer",
    subtitle: "Forging the future of web ecosystems through high-performance code, immersive visual engineering, and bulletproof software architecture.",
    email: "alex.sterling@quantumdev.io",
    location: "San Francisco, CA (Available for Remote Work)",
    socialLinks: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      resume: "#"
    }
  },
  
  stats: [
    { label: "Years Experience", value: "6+" },
    { label: "Completed Projects", value: "48+" },
    { label: "GitHub Commits", value: "2.4k" },
    { label: "Client Satisfaction", value: "100%" }
  ],

  about: {
    bio: "I am a full-stack engineer and digital architect specializing in high-performance web applications, interactive web interfaces, and distributed system architectures. With over 6 years of experience, I bridge the gap between creative visual designs and rock-solid software engineering. My mission is to engineer web solutions that are not only blazingly fast and structurally sound, but also visually captivating and deeply engaging.",
    philosophy: "I believe software development is a form of digital craftsmanship. Excellence requires robust engineering standards, extreme performance optimization, and deep empathy for the user's micro-interactions. Every line of code should have a purpose, and every interface should feel alive.",
    
    // Recharts Data structure for specialized engineering dimensions (Radar Chart)
    radarStats: [
      { subject: 'Frontend Systems', A: 95, B: 90, fullMark: 100 },
      { subject: 'Backend & APIs', A: 88, B: 85, fullMark: 100 },
      { subject: 'UI/UX Interaction', A: 92, B: 95, fullMark: 100 },
      { subject: 'DevOps & Cloud', A: 78, B: 75, fullMark: 100 },
      { subject: 'Database Design', A: 85, B: 80, fullMark: 100 },
      { subject: 'Performance Opt.', A: 94, B: 90, fullMark: 100 }
    ]
  },

  skills: {
    frontend: [
      { name: "React 19 / Next.js", level: 95, category: "Core Framework" },
      { name: "TypeScript / ESNext", level: 92, category: "Language" },
      { name: "Tailwind / Vanilla CSS 3", level: 90, category: "Styling" },
      { name: "Framer Motion", level: 88, category: "Animation" },
      { name: "Redux Toolkit / Zustand", level: 85, category: "State" }
    ],
    backend: [
      { name: "Node.js / Express", level: 90, category: "Runtime" },
      { name: "Python / FastAPI", level: 80, category: "APIs" },
      { name: "PostgreSQL / Prisma", level: 85, category: "Relational DB" },
      { name: "MongoDB / Mongoose", level: 82, category: "NoSQL DB" },
      { name: "RESTful & GraphQL APIs", level: 88, category: "Design Patterns" }
    ],
    devops: [
      { name: "Docker Containerization", level: 80, category: "DevOps" },
      { name: "AWS (S3, EC2, Lambda)", level: 78, category: "Cloud" },
      { name: "CI/CD Pipelines (GitHub Actions)", level: 82, category: "Automation" },
      { name: "Vercel / Netlify / Railway", level: 92, category: "Deployments" },
      { name: "Jest / Cypress / Vitest", level: 85, category: "Testing" }
    ]
  },

  projects: [
    {
      id: 1,
      title: "Solana DeFi Trading Hub",
      category: "Fullstack",
      description: "A high-performance real-time decentralized finance trading terminal featuring interactive canvas-based charting, wallet integrations, automated swap pools, and lightning-fast state synchronization.",
      tags: ["React 19", "Node.js", "Web3.js", "Recharts", "Framer Motion"],
      githubLink: "https://github.com",
      liveLink: "https://google.com",
      color: "from-cyan-500 to-blue-600",
      themeColor: "hsla(180, 100%, 50%, 0.15)"
    },
    {
      id: 2,
      title: "Collaborative Design Matrix",
      category: "Frontend",
      description: "An interactive, web-based workspace allowing real-time multi-user document design. Engineered with absolute visual precision, custom vector canvas tools, and WebSocket conflicts resolution.",
      tags: ["TypeScript", "React", "WebSockets", "CSS Variables", "Zustand"],
      githubLink: "https://github.com",
      liveLink: "https://google.com",
      color: "from-purple-500 to-pink-500",
      themeColor: "hsla(263, 90%, 50%, 0.15)"
    },
    {
      id: 3,
      title: "Quantum Distributed Storage Engine",
      category: "Backend",
      description: "A secure, peer-to-peer cloud file distribution system. Utilizes chunk-level cryptographic hashing, multi-threaded worker uploads, and high-frequency cluster consensus nodes.",
      tags: ["Node.js", "FastAPI", "Docker", "PostgreSQL", "Redis"],
      githubLink: "https://github.com",
      liveLink: "https://google.com",
      color: "from-orange-500 to-red-600",
      themeColor: "hsla(15, 100%, 50%, 0.15)"
    },
    {
      id: 4,
      title: "Aura AI Analytics Dashboard",
      category: "Frontend",
      description: "An AI-powered performance auditor dashboard that processes massive metrics files and compiles interactive flow diagrams, performance recommendations, and forecasting models.",
      tags: ["Next.js", "TailwindCSS", "Recharts", "Framer Motion", "AWS Lambda"],
      githubLink: "https://github.com",
      liveLink: "https://google.com",
      color: "from-teal-400 to-emerald-600",
      themeColor: "hsla(160, 100%, 50%, 0.15)"
    },
    {
      id: 5,
      title: "NeoCommerce Headless Engine",
      category: "Fullstack",
      description: "An ultra-fast e-commerce backend built with custom GraphQL APIs, multi-region database replication, complex inventory lock mechanisms, and Stripe payment gateways.",
      tags: ["Node.js", "GraphQL", "PostgreSQL", "Stripe API", "Docker"],
      githubLink: "https://github.com",
      liveLink: "https://google.com",
      color: "from-pink-500 to-rose-600",
      themeColor: "hsla(322, 80%, 58%, 0.15)"
    },
    {
      id: 6,
      title: "VibeSync Interactive Music System",
      category: "Frontend",
      description: "An audio-interactive web application that links Web Audio API oscillators with Canvas 2D render loops to construct responsive spatial visual landscapes.",
      tags: ["React 19", "Web Audio API", "HTML5 Canvas", "CSS3 Grid"],
      githubLink: "https://github.com",
      liveLink: "https://google.com",
      color: "from-indigo-500 to-purple-600",
      themeColor: "hsla(245, 90%, 50%, 0.15)"
    }
  ],

  testimonials: [
    {
      id: 1,
      name: "Marcus Vance",
      role: "VP of Engineering",
      company: "SynthTech Systems",
      feedback: "Alex is an exceptional engineer. He took our highly complex frontend architecture and completely overhauled it in record time, improving our Lighthouse scores from 45 to 98. His grasp of responsive styling and animation is phenomenal.",
      rating: 5,
      avatarInitials: "MV",
      avatarGlow: "rgba(180, 100%, 50%, 0.3)"
    },
    {
      id: 2,
      name: "Elena Rostova",
      role: "Technical Co-Founder",
      company: "Apex Ledger",
      feedback: "We hired Alex to build our blockchain-based analytics dashboard from scratch. Not only is the application incredibly robust under load, but the user experience is visually breathtaking. Clients consistently praise the dashboard UI.",
      rating: 5,
      avatarInitials: "ER",
      avatarGlow: "rgba(263, 90%, 50%, 0.3)"
    },
    {
      id: 3,
      name: "Devon Miller",
      role: "Product Lead",
      company: "Hyperion Interactive",
      feedback: "Alex stands out because of his design empathy. He doesn't just execute spec sheets; he refines the interactions, designs smooth fluid motion layers, and thinks deeply about transition experiences. Absolutely outstanding work.",
      rating: 5,
      avatarInitials: "DM",
      avatarGlow: "rgba(322, 80%, 58%, 0.3)"
    }
  ]
};
