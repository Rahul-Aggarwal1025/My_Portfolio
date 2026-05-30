import { useState, useRef } from 'react'
import Hero from './components/Hero'
import CreativeBridge from './components/CreativeBridge'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import { ProjectPage } from './components/ProjectPage'

function App() {
  const [activeProject, setActiveProject] = useState(null);
  const savedScrollY = useRef(0);

  const handleProjectOpen = (id) => {
    // Save current scroll position before navigating away
    savedScrollY.current = window.scrollY;
    setActiveProject(id);
    window.scrollTo(0, 0); // go to top of project page
  };

  const handleBack = () => {
    setActiveProject(null);
    // Restore scroll position on next paint
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        window.scrollTo(0, savedScrollY.current);
      });
    });
  };

  // When a project is open, show only its detail page (no navbar/hero)
  if (activeProject !== null) {
    return (
      <ProjectPage
        projectId={activeProject}
        onBack={handleBack}
      />
    );
  }

  return (
    <>
      <Navbar />
      <Hero />
      <CreativeBridge />
      <Skills />
      <Projects onProjectOpen={handleProjectOpen} />
      <Experience />
      <Footer />
    </>
  )
}


export default App