"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Analytics } from '@vercel/analytics/next';
import ThreeModel from "../components/ThreeModel";
import dynamic from 'next/dynamic';
const DynamicUnity = dynamic(() => import('../components/UnityEmbed').then(m => m.default), { ssr: false });

// Typewriter animation for developer titles
const TITLES = [
  "an Android Developer",
  "a Game Developer",
  "an Embedded Systems Developer",
];

const MOBILE_TITLES = [
  "an Android Developer",
  "a Game Developer", 
  "an Embedded Systems Dev",
];

function TypewriterTitles() {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [blink, setBlink] = useState(true);
  const [pause, setPause] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const currentTitles = isMobile ? MOBILE_TITLES : TITLES;

  useEffect(() => {
    if (pause) {
      // If just finished typing, pause for 3s. If just finished deleting, pause for 0.8s.
      const isFull = !deleting && subIndex === currentTitles[index].length;
      const isBlank = deleting && subIndex === 0;
      const duration = isFull ? 3000 : isBlank ? 800 : 0;
      if (duration > 0) {
        const timeout = setTimeout(() => setPause(false), duration);
        return () => clearTimeout(timeout);
      }
    }
    if (deleting) {
      if (subIndex === 0) {
        setDeleting(false);
        setIndex((prev) => (prev + 1) % currentTitles.length);
        setPause(true);
      } else {
        const timeout = setTimeout(() => setSubIndex((prev) => prev - 1), 30);
        return () => clearTimeout(timeout);
      }
    } else {
      if (subIndex === currentTitles[index].length) {
        setPause(true);
        setDeleting(true);
      } else {
        const timeout = setTimeout(() => setSubIndex((prev) => prev + 1), 80);
        return () => clearTimeout(timeout);
      }
    }
  }, [subIndex, index, deleting, pause, currentTitles]);

  useEffect(() => {
    const blinkInt = setInterval(() => setBlink((v) => !v), 500);
    return () => clearInterval(blinkInt);
  }, []);

  const text = currentTitles[index].substring(0, subIndex);
  return (
    <div className="typewriter mx-auto mt-2 max-w-full overflow-hidden" style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
      {text}
      <span style={{ opacity: blink ? 1 : 0 }}>|</span>
    </div>
  );
}

const baseSections = [
  { id: "about", label: "About", mobileLabel: "About" },
  { id: "skills", label: "Skills", mobileLabel: "Skills" },
  { id: "projects", label: "Projects", mobileLabel: "Projects" },
  { id: "apps", label: "Mobile Games", mobileLabel: "Games" },
];

const desktopOnlySections = [
  { id: "unity", label: "Interactive Demo"}
];


export default function Home() {
  const [activeTab, setActiveTab] = useState("about");
  const sectionRefs = useRef({});
  const [showThreeModel, setShowThreeModel] = useState(true);
  const [modelDroppedOnUnity, setModelDroppedOnUnity] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [portalLoading, setPortalLoading] = useState(false);
  const [gameLoaded, setGameLoaded] = useState(false);
  const [modelFlyingIntoGame, setModelFlyingIntoGame] = useState(false);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Dynamic sections based on screen size
  const sections = isMobile ? baseSections : [...baseSections, ...desktopOnlySections];

  useEffect(() => {
    const handleScroll = () => {
      let current = "about";
      let minDist = Infinity;
      const headerHeight = 80; // Account for fixed header
      const triggerPoint = headerHeight + 100; // Point where section becomes active
      
      for (const { id } of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          const sectionTop = rect.top;
          const sectionBottom = rect.bottom;
          
          // Section is active if it's in the viewport accounting for header
          if (sectionTop <= triggerPoint && sectionBottom > triggerPoint) {
            current = id;
            break;
          }
          
          // Fallback: find closest section to trigger point
          const distToTop = Math.abs(sectionTop - triggerPoint);
          if (distToTop < minDist) {
            minDist = distToTop;
            current = id;
          }
        }
      }
      setActiveTab(current);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Glowing cursor state
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [isDraggingModel, setIsDraggingModel] = useState(false);
  useEffect(() => {
    const move = (e) => setCursor({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <main className="min-h-screen text-white relative overflow-hidden">
      <Analytics />
      {/* Glowing cursor follower - continues during model drag */}
      <div
        className="cursor-glow"
        style={{ left: cursor.x, top: cursor.y, zIndex: 0, position: 'fixed', pointerEvents: 'none' }}
        aria-hidden="true"
      />
      
      {/* 3D model that can be dragged into Unity */}
      <ThreeModel 
        className="w-[300px] h-[300px]"
        modelUrl="/models/model.glb" 
        modelScale={4}
        modelPosition={[0, 0, 0]}
        modelRotation={[0, 0, 0]}
        transparent={true}
        visible={showThreeModel}
        flyingIntoGame={modelFlyingIntoGame}
        onDragStart={() => {
          setIsDraggingModel(true);
        }}
        onDragEnd={() => {
          setIsDraggingModel(false);
        }}
        onCursorUpdate={(x, y) => {
          // Update global cursor position during drag
          setCursor({ x, y });
        }}
        onDropStarted={() => {
          // Start rotation immediately when drop begins
          setModelFlyingIntoGame(true);
        }}
        onDropOnUnity={() => {
          // Complete the drop sequence after animation
          setShowThreeModel(false);
          setModelDroppedOnUnity(true);
          setPortalLoading(true);
          setModelFlyingIntoGame(false);
          
          // Add game parameter to URL
          const currentUrl = new URL(window.location);
          currentUrl.searchParams.set('game', 'balancingact');
          window.history.pushState({}, '', currentUrl);
        }}
      />

      <div className="relative z-10 flex flex-col items-center px-4">
        {/* Enhanced Header with Navigation */}
        <header className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 mb-8 w-full max-w-5xl px-4">
          <div className="backdrop-blur-lg border border-cyan-400/20 rounded-lg shadow-lg bg-black/80 p-3">
            <div className="flex items-center justify-between w-full">
              <nav className="vsc-tabs flex-1">
                {sections.map(({ id, label, mobileLabel }) => (
                  <a
                    key={id}
                    href={`#${id}`}
                    className={`vsc-tab${activeTab === id ? " active" : ""}`}
                    aria-current={activeTab === id ? "page" : undefined}
                    onClick={e => {
                      e.preventDefault();
                      const el = document.getElementById(id);
                      if (el) {
                        const headerHeight = 80; // Account for fixed header
                        const offset = 20; // Additional offset for better positioning
                        const y = el.getBoundingClientRect().top + window.scrollY - headerHeight - offset;
                        window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
                      }
                    }}
                  >
                    <span className="hidden sm:inline">{label}</span>
                    <span className="sm:hidden">{mobileLabel}</span>
                  </a>
                ))}
              </nav>
              {/* Desktop Resume Download Button */}
              <div className="hidden sm:block ml-4">
                <a
                  href="/Nathan_Espejo_Resume.pdf"
                  target="_blank" rel="noopener noreferrer"
                  className="cyber-button inline-flex items-center rounded-lg text-sm font-medium"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  View Resume
                </a>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="w-full max-w-4xl mx-auto flex flex-col items-center text-center mb-16 sm:mb-32 pt-24 sm:pt-50 pb-4 sm:pb-8">
          <div className="relative">
            {/* Background glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-green-400 to-cyan-600 rounded-full blur-3xl opacity-30 scale-150"></div>

            {/* Main content */}
            <div className="relative">
              <p className="text-2xl sm:text-3xl font-light cyber-cyan mb-2 tracking-wide">Hi, I&apos;m</p>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold mb-4 sm:mb-6 text-white leading-tight cyber-glitch-name" data-text="Nathan Espejo">
                Nathan Espejo
              </h1>
              
              <div className="text-2xl sm:text-3xl lg:text-4xl font-light mb-4 sm:mb-8 h-12 sm:h-16 flex items-center justify-center w-full">
                <div style={{ minWidth: '320px', textAlign: 'center' }} className="sm:min-w-[480px]">
                  <TypewriterTitles />
                </div>
              </div>
              
              <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-10">
                Passionate <span className="font-semibold cyber-cyan">Software Engineering</span> student crafting innovative solutions that bridge hardware and software, from VR experiences to AI-driven applications.
              </p>
              
              {/* Social Links */}
              <div className="flex justify-center gap-6 mb-10">
                <a href="mailto:nate.e.espejo@gmail.com" className="flex items-center justify-center w-12 h-12 bg-cyan-400/10 hover:bg-cyan-400/20 border border-cyan-400/30 hover:border-cyan-400/60 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-cyan-400/25">
                  <svg className="w-6 h-6 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                </a>
                <a href="https://github.com/HasNate618" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-12 h-12 bg-cyan-400/10 hover:bg-cyan-400/20 border border-cyan-400/30 hover:border-cyan-400/60 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-cyan-400/25">
                  <svg className="w-6 h-6 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a href="https://linkedin.com/in/nathan-espejo" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-12 h-12 bg-cyan-400/10 hover:bg-cyan-400/20 border border-cyan-400/30 hover:border-cyan-400/60 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-cyan-400/25">
                  <svg className="w-6 h-6 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a href="https://devpost.com/nate-e-espejo" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-12 h-12 bg-cyan-400/10 hover:bg-cyan-400/20 border border-cyan-400/30 hover:border-cyan-400/60 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-cyan-400/25">
                  <svg className="w-6 h-6 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.002 1.61L0 12.004L6.002 22.39h11.996L24 12.004L17.998 1.61H6.002zm1.593 4.084h3.947c3.605 0 6.276 1.695 6.276 6.31c0 4.436-3.21 6.302-6.456 6.302H7.595V5.694zm2.517 2.449v7.714h1.241c2.646 0 3.862-1.55 3.862-3.861.009-2.569-1.096-3.853-3.767-3.853H10.112z"/>
                  </svg>
                </a>
              </div>
              
              {/* CTA Button */}
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                <a
                  href="#projects"
                  className="cyber-button inline-flex items-center rounded-xl font-semibold transform hover:scale-105 transition-all duration-200 w-[280px] justify-center text-lg"
                  onClick={e => {
                    e.preventDefault();
                    const el = document.getElementById('projects');
                    if (el) {
                      const headerHeight = 80; // Account for fixed header
                      const offset = 20; // Additional offset for better positioning
                      const y = el.getBoundingClientRect().top + window.scrollY - headerHeight - offset;
                      window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
                    }
                  }}
                >
                  <span>View My Work</span>
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
                
                {/* Mobile Resume Download Button */}
                <div className="sm:hidden">
                  <a
                    href="/Nathan_Espejo_Resume.pdf"
                    target="_blank" rel="noopener noreferrer"
                    className="cyber-button inline-flex items-center rounded-xl font-semibold transform hover:scale-105 transition-all duration-200 w-[280px] justify-center"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span>View Resume</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="w-full max-w-4xl mx-auto mb-16 sm:mb-38 relative mt-20 sm:mt-32">
          <div className="cyber-card">
            <h2 className="text-3xl font-bold mb-6 cyber-cyan cyber-section-title" data-text="About Me">About Me</h2>
            
            <div className="space-y-4">
              <p className="text-gray-300 leading-relaxed text-lg">
                I&apos;m a <span className="cyber-green font-semibold">Software Engineering</span> student at <span className="cyber-purple font-semibold">Western University</span> with strong skills in game development, Android app creation, and hardware prototyping. I enjoy building immersive VR games, crafting intuitive Android apps, and designing wearable devices that merge software with physical interaction.
              </p>
              <p className="text-gray-300 leading-relaxed">
                My multidisciplinary approach blends full-stack development, embedded systems, and artificial intelligence to create technology that feels like a natural extension of the body and mind. Passionate about mental health, accessibility, and ethical design, I&apos;m excited to explore how AI and emerging technologies can shape the future of human-computer interaction.
              </p>
            </div>
          </div>
        </section>

  {/* Skills Section */}
  <section id="skills" className="w-full max-w-4xl mx-auto mb-16 sm:mb-40 relative">
    <div className="cyber-card">
      <h2 className="text-3xl font-bold mb-6 cyber-cyan cyber-section-title" data-text="Skills">Skills</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2"><span className="text-cyan-400">💻</span><span className="font-semibold cyber-cyan skill-title">Programming Languages</span></div>
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="badge badge-blue">Java</span>
            <span className="badge badge-blue">C#</span>
            <span className="badge badge-blue">Python</span>
            <span className="badge badge-blue">JavaScript</span>
            <span className="badge badge-blue">C++</span>
            <span className="badge badge-blue">Kotlin</span>
            <span className="badge badge-blue">SQL</span>
            <span className="badge badge-blue">HTML</span>
            <span className="badge badge-blue">CSS</span>
            <span className="badge badge-blue">XML</span>
          </div>
          <div className="flex items-center gap-2 mb-2"><span className="text-yellow-500">🔗</span><span className="font-semibold cyber-yellow skill-title">APIs & SDKs</span></div>
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="badge badge-yellow">OpenAI API</span>
            <span className="badge badge-yellow">Google Maps API</span>
            <span className="badge badge-yellow">HERE Maps SDK</span>
            <span className="badge badge-yellow">JsonBin API</span>
            <span className="badge badge-yellow">REST APIs</span>
          </div>
          <div className="flex items-center gap-2 mb-2"><span className="text-pink-500">🚀</span><span className="font-semibold cyber-pink skill-title">Development Areas</span></div>
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="badge badge-pink">Full-Stack Development</span>
            <span className="badge badge-pink">Game Development</span>
            <span className="badge badge-pink">Virtual Reality</span>
            <span className="badge badge-pink">AI (CNN, LLMs)</span>
            <span className="badge badge-pink">Computer Vision</span>
            <span className="badge badge-pink">Android Development</span>
            <span className="badge badge-pink">API Integration</span>
            <span className="badge badge-pink">UI/UX Design Principles</span>
            <span className="badge badge-pink">Chrome Extensions</span>
          </div>
        </div>
        <div>
          <div className="flex items-center gap-2 mb-2"><span className="text-green-600">🧰</span><span className="font-semibold cyber-green skill-title">Tools & Platforms</span></div>
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="badge badge-green">GitHub</span>
            <span className="badge badge-green">Unity3D</span>
            <span className="badge badge-green">Android Studio</span>
            <span className="badge badge-green">Arduino IDE</span>
            <span className="badge badge-green">React</span>
            <span className="badge badge-green">Blender (3D Modeling)</span>
            <span className="badge badge-green">OnShape (CAD)</span>
            <span className="badge badge-green">MySQL</span>
            <span className="badge badge-green">TensorFlow</span>
          </div>
          <div className="flex items-center gap-2 mb-2"><span className="text-orange-500">🔌</span><span className="font-semibold cyber-orange skill-title">Hardware & Embedded</span></div>
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="badge badge-orange">Arduino</span>
            <span className="badge badge-orange">ESP32</span>
            <span className="badge badge-orange">M5Stack</span>
            <span className="badge badge-orange">3D Printing (Design & Prototyping)</span>
            <span className="badge badge-orange">Bluetooth Low Energy (BLE)</span>
          </div>
          <div className="flex items-center gap-2 mb-2"><span className="text-gray-500">🤝</span><span className="font-semibold cyber-gray skill-title">Professional Skills</span></div>
          <div className="flex flex-wrap gap-2">
            <span className="badge badge-gray">Team Collaboration & Agile Workflow</span>
            <span className="badge badge-gray">Problem Solving & Rapid Prototyping</span>
            <span className="badge badge-gray">Technical Instruction & Mentorship</span>
            <span className="badge badge-gray">Project Management</span>
            <span className="badge badge-gray">Time Management</span>
          </div>
        </div>
      </div>
      <style jsx>{`
        /* Ensure neon style applies to all skill titles with respective colors */
        .cyber-pink {
          color: #ff1493 !important;
          text-shadow: 0 0 8px rgba(255, 20, 147, 0.6) !important;
        }
        .cyber-orange {
          color: #ff8c00 !important;
          text-shadow: 0 0 8px rgba(255, 140, 0, 0.6) !important;
        }
        .badge {
          display: inline-block;
          border-radius: 9999px;
          padding: 0.25rem 0.75rem;
          font-size: 0.97em;
          font-family: inherit;
          margin-bottom: 0.15rem;
          margin-right: 0.1rem;
          font-weight: 500;
          transition: background 0.2s, border 0.2s;
        }
        .badge-blue {
          background: #60a5fa33; /* lighter blue background */
          color: #3b82f6;       /* brighter blue text */
        }
        .group-blue {
          color: #3b82f6;
        }
        .group-yellow {
          color: #fbbf24;
        }
        .group-pink {
          color: #f472b6;
        }
        .group-green {
          color: #22c55e;
        }
        .group-orange {
          color: #fb923c;
        }
        .group-gray {
          color: #cbd5e1;
        }
        .badge-purple {
          background: #6d28d922;
          color: #a78bfa;
        }
        .badge-green {
          background: #16653422;
          color: #22c55e;
        }
        .badge-yellow {
          background: #f59e0b22;
          color: #fbbf24;
        }
        .badge-orange {
          background: #ea580c22;
          color: #fb923c;
        }
        .badge-pink {
          background: #be185d22;
          color: #f472b6;
        }
        .badge-gray {
          background: #64748b22;
          color: #cbd5e1;
        }
        .badge:hover {
          filter: brightness(1.15);
          box-shadow: 0 0 0 2px #2563eb33;
        }
      `}</style>
    <style jsx>{`
      .badge-blue {
        @apply bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-200 px-3 py-1 rounded font-medium;
      }
      .badge-purple {
        @apply bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-200 px-3 py-1 rounded font-medium;
      }
      .badge-green {
        @apply bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-200 px-3 py-1 rounded font-medium;
      }
      .badge-yellow {
        @apply bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-800 px-3 py-1 rounded font-medium;
      }
      .badge-orange {
        @apply bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-200 px-3 py-1 rounded font-medium;
      }
      .badge-pink {
        @apply bg-pink-100 dark:bg-pink-900/40 text-pink-700 dark:text-pink-200 px-3 py-1 rounded font-medium;
      }
      .badge-gray {
        @apply bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded font-medium;
      }
    `}</style>
    </div>
  </section>

  {/* Projects Section */}
  <section id="projects" className="w-full max-w-4xl mx-auto mb-16 sm:mb-32">
     <h2 className="text-3xl font-bold mb-6 sm:mb-8 cyber-cyan text-center cyber-section-title" data-text="Projects I'm Proud Of">
      <span className="sm:hidden">Projects</span>
      <span className="hidden sm:inline">Projects I&apos;m Proud Of</span>
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Lumen */}
    <div className="cyber-card flex flex-col overflow-hidden relative hover:transform hover:scale-105 transition-all duration-300 cursor-pointer">
            <div className="relative w-full" style={{aspectRatio: '3/2', minHeight: 100}}>
              <Image src="/lumen_card.png" alt="Lumen Project" fill className="object-cover rounded-t-lg" />
            </div>
            <div className="p-4 flex flex-col flex-1">
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="badge badge-yellow flex items-center gap-1">🥇 Hackathon Winner</span>
                <span className="badge badge-cyan">Game Dev</span>
              </div>
              <h3 className="font-semibold text-xl mb-2 cyber-cyan">Lumen</h3>
              <p className="text-gray-600 dark:text-gray-400 flex-1">A calming companion that listens, understands, and responds with personalized mini-games.</p>
                <div className="mt-4 flex flex-row gap-6">
                  <a href="https://llumen.netlify.app/" target="_blank" rel="noopener noreferrer" className="hidden sm:inline text-green-600 dark:text-green-400 hover:underline underline-offset-2 transition">&gt; Live Demo</a>
                  <a href="https://devpost.com/software/lumen-qsgcn4" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline underline-offset-2 transition">&gt; Devpost</a>
                  <a href="https://github.com/Dawgsrlife/lumen" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline underline-offset-2 transition">&gt; GitHub</a>
                </div>
            </div>
          </div>
          {/* Eyecandy */}
    <div className="cyber-card flex flex-col overflow-hidden relative hover:transform hover:scale-105 transition-all duration-300 cursor-pointer">
            <div className="relative w-full" style={{aspectRatio: '3/2', minHeight: 100}}>
              <Image src="/eyecandy_card.jpg" alt="Lumen Project" fill className="object-cover rounded-t-lg" />
            </div>
            <div className="p-4 flex flex-col flex-1">
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="badge badge-yellow flex items-center gap-1">🥇 Hackathon Winner</span>
                <span className="badge badge-cyan">Game Dev</span>
              </div>
              <h3 className="font-semibold text-xl mb-2 cyber-cyan">Eyecandy</h3>
              <p className="text-gray-600 dark:text-gray-400 flex-1">An AR shopping experience that turns any product photo into a virtual try-on.</p>
                <div className="mt-4 flex flex-row gap-6">
                  <a href="https://devpost.com/software/eye-candy" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline underline-offset-2 transition">&gt; Devpost</a>
                  <a href="https://github.com/Duck-luv-pie/eyecandy" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline underline-offset-2 transition">&gt; GitHub</a>
                </div>
            </div>
          </div>
          {/* Careerly */}
    <div className="cyber-card flex flex-col overflow-hidden relative hover:transform hover:scale-105 transition-all duration-300 cursor-pointer">
            <div className="relative w-full" style={{aspectRatio: '3/2', minHeight: 100}}>
              <Image src="/careerly_card.jpg" alt="Project 2" fill className="object-cover rounded-t-lg" />
            </div>
            <div className="p-4 flex flex-col flex-1">
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="badge badge-yellow flex items-center gap-1">🥇 Hackathon Winner</span>
                <span className="badge badge-cyan">Game Dev</span>
              </div>
              <h3 className="font-semibold text-xl mb-2 cyber-cyan">Careerly</h3>
              <p className="text-gray-600 dark:text-gray-400 flex-1">Making career exploration fun and inclusive through an AI-powered virtual job fair.</p>
              <div className="mt-4 flex flex-row gap-6">
                <a href="https://devpost.com/software/career-fair-xz0f67" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline underline-offset-2 transition">&gt; Devpost</a>
                <a href="https://github.com/she11fish/careerly" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline underline-offset-2 transition">&gt; GitHub</a>
              </div>
            </div>
          </div>
          {/* SafeRoute */}
    <div className="cyber-card flex flex-col overflow-hidden relative hover:transform hover:scale-105 transition-all duration-300 cursor-pointer">
            <div className="relative w-full" style={{aspectRatio: '3/2', minHeight: 100}}>
              <Image src="/saferoute_card.png" alt="Project 3" fill className="object-cover rounded-t-lg" />
            </div>
            <div className="p-4 flex flex-col flex-1">
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="badge badge-green">Android</span>
              </div>
              <h3 className="font-semibold text-xl mb-2 cyber-cyan">SafeRoute</h3>
              <p className="text-gray-600 dark:text-gray-400 flex-1">A real-time hazard reporting app with crowdsourced data, drone integration, and safe routing.</p>
              <a href="https://github.com/HasNate618/SafeRoute" target="_blank" rel="noopener noreferrer" className="mt-4 text-blue-600 dark:text-blue-400 hover:underline underline-offset-2 transition">&gt; GitHub</a>
            </div>
          </div>
          {/* Nude Donations */}
    <div className="cyber-card flex flex-col overflow-hidden relative hover:transform hover:scale-105 transition-all duration-300 cursor-pointer">
            <div className="relative w-full" style={{aspectRatio: '3/2', minHeight: 100}}>
              <Image src="/nude_donations_card.jpg" alt="Project 3" fill className="object-cover rounded-t-lg" />
            </div>
            <div className="p-4 flex flex-col flex-1">
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="badge badge-green">Android</span>
              </div>
              <h3 className="font-semibold text-xl mb-2 cyber-cyan">Nude Donations</h3>
              <p className="text-gray-600 dark:text-gray-400 flex-1">A transparent charity platform using blockchain technology to track donations with full accountability.</p>
                <div className="mt-4 flex flex-row gap-6">
                  <a href="https://taikai.network/hackbox/hackathons/hawkhacks/projects/clwdievy80fcez901sgpemwxf/idea" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline underline-offset-2 transition">&gt; Taikai</a>
                  <a href="https://github.com/danielyousif1/HawkHacks24" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline underline-offset-2 transition">&gt; GitHub</a>
                </div>            
              </div>
          </div>
          {/* Animarker */}
    <div className="cyber-card flex flex-col overflow-hidden relative hover:transform hover:scale-105 transition-all duration-300 cursor-pointer">
            <div className="relative w-full" style={{aspectRatio: '3/2', minHeight: 100}}>
              <Image src="/animarker_card.png" alt="Project 4" fill className="object-cover rounded-t-lg" />
            </div>
            <div className="p-4 flex flex-col flex-1">
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="badge badge-green">Android</span>
              </div>
              <h3 className="font-semibold text-xl mb-2 cyber-cyan">Animarker</h3>
              <p className="text-gray-600 dark:text-gray-400 flex-1">A crowdsourced wildlife tracker using computer vision to identify and map animal sightings worldwide.</p>
              <div className="mt-4 flex flex-row gap-6">
                <a href="https://devpost.com/software/endangered-animal-app" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">&gt; Devpost</a>
                <a href="https://github.com/HasNate618/Animarker" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline underline-offset-2 transition">&gt; GitHub</a>
              </div>
            </div>
          </div>
          {/* FLEXFIRE-X */}
    <div className="cyber-card flex flex-col overflow-hidden relative hover:transform hover:scale-105 transition-all duration-300 cursor-pointer">
            <div className="relative w-full" style={{aspectRatio: '3/2', minHeight: 100}}>
              <Image src="/flexfire-x_card.png" alt="Project 5" fill className="object-cover rounded-t-lg" />
            </div>
            <div className="p-4 flex flex-col flex-1">
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="badge badge-purple">Hardware</span>
              </div>
              <h3 className="font-semibold text-xl mb-2 cyber-cyan">FLEXFIRE-X</h3>
              <p className="text-gray-600 dark:text-gray-400 flex-1">A collaborative robot platform with adaptive mechanics for versatile autonomous mission execution.</p>
              <a href="https://github.com/HasNate618/FLEXFIRE-X" target="_blank" rel="noopener noreferrer" className="mt-4 text-blue-600 dark:text-blue-400 hover:underline">&gt; GitHub</a>
            </div>
          </div>
          {/* Rubber Band Turret */}
    <div className="cyber-card flex flex-col overflow-hidden relative hover:transform hover:scale-105 transition-all duration-300 cursor-pointer">
            <div className="relative w-full" style={{aspectRatio: '3/2', minHeight: 100}}>
              <Image src="/turret_card.png" alt="Project 6" fill className="object-cover rounded-t-lg" />
            </div>
            <div className="p-4 flex flex-col flex-1">
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="badge badge-purple">Hardware</span>
              </div>
              <h3 className="font-semibold text-xl mb-2 cyber-cyan">Rubber Band Turret</h3>
              <p className="text-gray-600 dark:text-gray-400 flex-1">Bluetooth-controlled rubber band turret with smooth servo movement and wireless app control.</p>
              <a href="https://github.com/HasNate618/Rubber-Band-Turret" target="_blank" rel="noopener noreferrer" className="mt-4 text-blue-600 dark:text-blue-400 hover:underline">&gt; GitHub</a>
            </div>
          </div>
        </div>
  </section>

  {/* Mobile Apps Section */}
  <section id="apps" className="w-full max-w-4xl mx-auto mb-16 sm:mb-32">
    <h2 className="text-3xl font-bold mb-6 sm:mb-8 cyber-cyan text-center cyber-section-title" data-text="Mobile Games">Mobile Games</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Street Cleaner */}
          <div className="cyber-card flex flex-row items-center relative hover:transform hover:scale-105 transition-all duration-300 cursor-pointer p-4">
            <Image src="/street_cleaner_icon.png" alt="App 1 Icon" width={128} height={128} className="w-28 h-28 md:w-32 md:h-32 rounded-3xl mr-4 shadow flex-shrink-0" style={{borderRadius: '30%'}} />
            <div className="flex-1 flex flex-col items-start">
              <div className="w-full flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-lg md:text-xl cyber-cyan">
                  <span className="md:hidden">Street Cleaner</span>
                  <span className="hidden md:inline">Street Cleaner&nbsp;</span>
                </h3>
                <span className="badge badge-yellow flex items-center gap-1">🥇</span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Drag litter into the correct bin to win!</p>
              <div className="flex flex-row gap-4 items-center mt-2">
                <a href="https://play.google.com/store/apps/details?id=com.NathanEspejo.StreetCleaner" target="_blank" rel="noopener noreferrer">
                  <Image src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Get it on Google Play" width={140} height={48} className="h-12" />
                </a>
                <a href="https://devpost.com/software/street-cleaner" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-12 h-12 bg-black/80 hover:bg-black/60 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-cyan-400/30 border border-cyan-400/30 hover:border-cyan-400/60 backdrop-blur-sm">
                  <svg className="w-6 h-6 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.002 1.61L0 12.004L6.002 22.39h11.996L24 12.004L17.998 1.61H6.002zm1.593 4.084h3.947c3.605 0 6.276 1.695 6.276 6.31c0 4.436-3.21 6.302-6.456 6.302H7.595V5.694zm2.517 2.449v7.714h1.241c2.646 0 3.862-1.55 3.862-3.861.009-2.569-1.096-3.853-3.767-3.853H10.112z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          {/* Zenith Tower */}
          <div className="cyber-card flex flex-row items-center relative hover:transform hover:scale-105 transition-all duration-300 cursor-pointer p-4">
            <Image src="/zenith_tower_icon.png" alt="App 2 Icon" width={128} height={128} className="w-28 h-28 md:w-32 md:h-32 rounded-3xl mr-4 shadow flex-shrink-0" style={{borderRadius: '30%'}} />
            <div className="flex-1 flex flex-col items-start">
              <h3 className="font-semibold text-lg md:text-xl mb-1 cyber-cyan">Zenith Tower</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Ascend the tower in a futuristic dungeon crawler.</p>
              <a href="https://play.google.com/store/apps/details?id=com.NathanEspejo.ZenithTower" target="_blank" rel="noopener noreferrer">
                <Image src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Get it on Google Play" width={140} height={48} className="h-12 mt-2" />
              </a>
            </div>
          </div>
          {/* Mōtaru */}
          <div className="cyber-card flex flex-row items-center relative hover:transform hover:scale-105 transition-all duration-300 cursor-pointer p-4">
            <Image src="/motaru_icon.png" alt="App 3 Icon" width={128} height={128} className="w-28 h-28 md:w-32 md:h-32 rounded-3xl mr-4 shadow flex-shrink-0" style={{borderRadius: '30%'}} />
            <div className="flex-1 flex flex-col items-start">
              <h3 className="font-semibold text-lg md:text-xl mb-1 cyber-cyan">Mōtaru</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Take down ninjas using quick reflexes!</p>
              <a href="https://play.google.com/store/apps/details?id=com.NathanEspejo.Mtaru" target="_blank" rel="noopener noreferrer">
                <Image src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Get it on Google Play" width={140} height={48} className="h-12 mt-2" />
              </a>
            </div>
          </div>
          {/* Tic Tac Toe Ultimate */}
          <div className="cyber-card flex flex-row items-center relative hover:transform hover:scale-105 transition-all duration-300 cursor-pointer p-4">
            <Image src="/tttu_icon.png" alt="App 4 Icon" width={128} height={128} className="w-28 h-28 md:w-32 md:h-32 rounded-3xl mr-4 shadow flex-shrink-0" style={{borderRadius: '30%'}} />
            <div className="flex-1 flex flex-col items-start">
              <h3 className="font-semibold text-lg md:text-xl mb-1 cyber-cyan">Tic Tac Toe Ultimate</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">The Ultimate Tic Tac Toe experience.</p>
              <a href="https://play.google.com/store/apps/details?id=com.NathanEspejo.TicTacToeUltimate" target="_blank" rel="noopener noreferrer">
                <Image src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Get it on Google Play" width={140} height={48} className="h-12 mt-2" />
              </a>
            </div>
          </div>
        </div>
  </section>

  {/* Links Section removed, links are now in About section */}
  {/* Spacer at bottom for centering */}
  <div className="w-full max-w-7xl h-8 sm:h-12 md:h-24 lg:h-24 flex-shrink-0" />

  {/* Unity Interactive Section */}
  <section id="unity" className="w-full max-w-4xl mx-auto mb-20 hidden lg:block">
    <h2 className="text-3xl font-bold mb-6 cyber-cyan text-center cyber-section-title" data-text="Interactive Demo">Interactive Demo</h2>
    <div className="portal-container" style={{ height: '540px', position: 'relative' }}>
      {/* Portal overlay - hidden when game is loaded */}
      {!gameLoaded && (
        <div className="portal-overlay" style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 2,
          background: 'radial-gradient(circle at center, #001122 0%, #000811 50%, #000000 100%)',
          borderRadius: '0.75rem',
          transition: 'opacity 0.5s ease'
        }}>
          {/* Portal background effects */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '300px',
            height: '300px',
            background: 'radial-gradient(circle, rgba(0, 255, 255, 0.3) 0%, rgba(0, 255, 255, 0.1) 30%, rgba(138, 43, 226, 0.1) 60%, transparent 100%)',
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
            animation: 'portalSpin 8s linear infinite',
            zIndex: 1
          }}></div>
          
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '200px',
            height: '200px',
            background: 'radial-gradient(circle, rgba(0, 255, 255, 0.4) 0%, rgba(138, 43, 226, 0.2) 50%, transparent 70%)',
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
            animation: 'portalSpin 6s linear infinite reverse',
            zIndex: 2
          }}></div>
          
          {/* Tech grid background */}
          <div className="tech-grid"></div>
          
          {/* Portal rings */}
          <div className="portal-rings">
            <div className="portal-ring"></div>
            <div className="portal-ring"></div>
            <div className="portal-ring"></div>
          </div>
          
          {/* Portal text */}
          <div className="portal-text">
            {portalLoading ? (
              <>
                <div style={{ fontSize: '18px', marginBottom: '8px' }}>
                  DIMENSIONAL GATEWAY
                </div>
                <div style={{ fontSize: '14px', opacity: 0.8, marginBottom: '16px' }}>
                  Initializing portal matrix...
                </div>
                <div className="loading-bar" style={{
                  width: '200px',
                  height: '4px',
                  backgroundColor: 'rgba(0, 255, 255, 0.2)',
                  borderRadius: '2px',
                  overflow: 'hidden',
                  margin: '0 auto'
                }}>
                  <div className="loading-progress" style={{
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(90deg, transparent, #00ffff, transparent)',
                    animation: 'loading-scan 2s linear infinite'
                  }}></div>
                </div>
                <div style={{ fontSize: '12px', opacity: 0.6, marginTop: '12px' }}>
                  [ PORTAL STATUS: LOADING ]
                </div>
              </>
            ) : (
              <>
                <div style={{ fontSize: '18px', marginBottom: '8px' }}>
                  DIMENSIONAL GATEWAY
                </div>
                <div style={{ fontSize: '14px', opacity: 0.8 }}>
                  Drop Nexus here to activate
                </div>
                <div style={{ fontSize: '12px', opacity: 0.6, marginTop: '8px' }}>
                  [ PORTAL STATUS: STANDBY ]
                </div>
              </>
            )}
          </div>
        </div>
      )}
      
      {/* Unity component */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
        <DynamicUnity 
          buildName="build"
          buildSubPath=""
          fileBase="build"
          compression="none"
          height={540}
          style={{ background: 'transparent', borderRadius: '0.75rem' }}
          startButtonText=""
          modelDropped={modelDroppedOnUnity}
          onDropEffectComplete={() => {
            // Portal activation effect complete
          }}
          onUnityLoaded={() => {
            setPortalLoading(false);
            setGameLoaded(true);
          }}
        />
      </div>
    </div>
    
    {/* Interactive Demo Disclaimer */}
    <div className="mt-8 text-center">
      <div className="cyber-card max-w-2xl mx-auto p-4 bg-gradient-to-r from-cyan-400/5 via-purple-500/5 to-cyan-400/5 border border-cyan-400/20">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
          <span className="text-cyan-400 font-semibold text-sm uppercase tracking-wider">Work in Progress</span>
          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed">
          Please imagine some cool game where you control Nexus. In the meantime, you can play with some rocks (one of the games I created for Lumen).
        </p>
      </div>
    </div>
  </section>

  <footer className="text-gray-500 text-sm mt-16 sm:mt-24">&copy; {new Date().getFullYear()} Nathan Espejo. All rights reserved.</footer>
  </div>
</main>
);
}
