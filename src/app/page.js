"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// Typewriter animation for developer titles
const TITLES = [
  "an Android Developer",
  "a Game Developer",
  "an Embedded Systems Developer",
];

function TypewriterTitles() {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [blink, setBlink] = useState(true);
  const [pause, setPause] = useState(false);

  useEffect(() => {
    if (pause) {
      const timeout = setTimeout(() => setPause(false), 2000);
      return () => clearTimeout(timeout);
    }
    if (deleting) {
      if (subIndex === 0) {
        setDeleting(false);
        setIndex((prev) => (prev + 1) % TITLES.length);
        setPause(true);
      } else {
        const timeout = setTimeout(() => setSubIndex((prev) => prev - 1), 30);
        return () => clearTimeout(timeout);
      }
    } else {
      if (subIndex === TITLES[index].length) {
        setPause(true);
        setDeleting(true);
      } else {
        const timeout = setTimeout(() => setSubIndex((prev) => prev + 1), 80);
        return () => clearTimeout(timeout);
      }
    }
  }, [subIndex, index, deleting, pause]);

  useEffect(() => {
    const blinkInt = setInterval(() => setBlink((v) => !v), 500);
    return () => clearInterval(blinkInt);
  }, []);

  const text = TITLES[index].substring(0, subIndex);
  return (
    <div className="typewriter mx-auto mt-2" style={{ display: 'inline-block', whiteSpace: 'pre' }}>
      {text}
      <span style={{ opacity: blink ? 1 : 0 }}>|</span>
    </div>
  );
}

const sections = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "apps", label: "Mobile Apps" },
  { id: "contact", label: "Contact" },
];


export default function Home() {
  const [activeTab, setActiveTab] = useState("about");
  const sectionRefs = useRef({});

  useEffect(() => {
    const handleScroll = () => {
      let current = "about";
      let minDist = Infinity;
      const center = window.innerHeight / 2;
      for (const { id } of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          const sectionCenter = rect.top + rect.height / 2;
          const dist = Math.abs(center - sectionCenter);
          if (dist < minDist) {
            minDist = dist;
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
  useEffect(() => {
    const move = (e) => setCursor({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#f8fafc] to-[#e0e7ef] dark:from-[#0a0a0a] dark:to-[#23272f] flex flex-col items-center px-4">
      {/* Glowing cursor follower - moved to bottom layer */}
      <div
        className="cursor-glow"
        style={{ left: cursor.x, top: cursor.y, zIndex: 0, position: 'fixed', pointerEvents: 'none' }}
        aria-hidden="true"
      />
      {/* Page Header with Navigation */}
      <header className="w-full max-w-7xl flex flex-col sm:flex-row justify-between items-center gap-4 sticky top-0 z-50 bg-white/90 dark:bg-[#18181b]/90 backdrop-blur border-b border-gray-200 dark:border-gray-700" style={{marginTop:0}}>
        <nav className="vsc-tabs w-full">
          {sections.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              className={`vsc-tab${activeTab === id ? " active" : ""}`}
              aria-current={activeTab === id ? "page" : undefined}
              onClick={e => {
                e.preventDefault();
                const el = document.getElementById(id);
                if (el) {
                  const y =
                    el.getBoundingClientRect().top + window.scrollY - window.innerHeight / 2 + el.offsetHeight / 2;
                  window.scrollTo({ top: y, behavior: "smooth" });
                }
              }}
            >
              {label}
            </a>
          ))}
        </nav>
      </header>
      {/* Spacer at top for centering */}
      <div className="w-full max-w-7xl h-12 md:h-24 lg:h-32 flex-shrink-0" />
      {/* Modern Introduction Section */}
      <section className="w-full max-w-4xl flex flex-col items-center text-center mb-10">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold mb-2 vs-blue whitespace-nowrap">Hi, I&apos;m Nathan Espejo</h1>
        <TypewriterTitles />
      </section>



  {/* About Section */}
  <section id="about" className="w-full max-w-2xl bg-white/80 dark:bg-[#18181b]/80 rounded-xl shadow p-8 mb-12 panel-hover">
        <h2 className="text-2xl font-bold mb-4 vs-blue">About Me</h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
          I’m a <span className="vs-green">Software Engineering</span> student at <span className="vs-purple">Western University</span> passionate about blending hardware and software to build creative, human-focused tech. From VR glove games and wearable cyberpunk-inspired devices to AI-driven wellness apps, I turn ideas into functional, impactful solutions.
        </p>
        <div className="flex flex-wrap justify-center gap-6">
          <a href="mailto:nate.e.espejo@gmail.com" className="flex items-center gap-2 vs-blue hover:underline text-lg"><span>📧</span>Email</a>
          <a href="https://github.com/HasNate618" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 vs-blue hover:underline text-lg"><span>🐙</span>GitHub</a>
          <a href="https://linkedin.com/in/nathan-espejo" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 vs-blue hover:underline text-lg"><span>💼</span>LinkedIn</a>
          <a href="https://devpost.com/nate-e-espejo" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 vs-blue hover:underline text-lg"><span>🧑‍💻</span>Devpost</a>
        </div>
      </section>

  {/* Skills Section */}
  <section id="skills" className="w-full max-w-2xl bg-white/80 dark:bg-[#18181b]/80 rounded-xl shadow p-8 mb-12 panel-hover">
  <h2 className="text-2xl font-bold mb-4 vs-blue">Skills</h2>
        <ul className="flex flex-wrap gap-3 text-sm">
          <li className="bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 px-3 py-1 rounded">HTML</li>
          <li className="bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 px-3 py-1 rounded">CSS</li>
          <li className="bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 px-3 py-1 rounded">JavaScript</li>
          <li className="bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 px-3 py-1 rounded">React</li>
          <li className="bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 px-3 py-1 rounded">Next.js</li>
          <li className="bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 px-3 py-1 rounded">Tailwind CSS</li>
          <li className="bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 px-3 py-1 rounded">Firebase</li>
          <li className="bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 px-3 py-1 rounded">TypeScript</li>
        </ul>
      </section>

  {/* Projects Section */}
  <section id="projects" className="w-full max-w-4xl mx-auto mb-16">
  <h2 className="text-2xl font-bold mb-6 vs-blue">Projects</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Lumen */}
    <div className="bg-white/95 dark:bg-[#18181b]/95 rounded-lg shadow p-0 flex flex-col overflow-hidden border border-yellow-400 border-2 relative panel-hover">
            <span className="absolute top-3 left-3 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 z-10">👑 Hackathon Winner</span>
            <span className="absolute top-3 right-3 bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-200 text-xs font-semibold px-3 py-1 rounded-full z-10">Game Dev</span>
            <div className="relative w-full" style={{aspectRatio: '3/2', minHeight: 100}}>
              <img src="/lumen_card.png" alt="Project 1" className="object-cover rounded-t-lg w-full h-full" style={{width:'100%', height:'100%', objectFit:'cover', display:'block'}} />
            </div>
            <div className="p-6 flex flex-col flex-1">
              <h3 className="font-semibold text-lg mb-2">Lumen</h3>
              <p className="text-gray-600 dark:text-gray-400 flex-1">A calming companion that listens, understands, and responds with personalized mini-games.</p>
                <div className="mt-4 flex flex-row gap-6">
                  <a href="https://llumen.netlify.app/" target="_blank" rel="noopener noreferrer" className="text-green-600 dark:text-green-400 hover:underline underline-offset-2 transition">&gt; Live Demo</a>
                  <a href="https://devpost.com/software/lumen-qsgcn4" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline underline-offset-2 transition">&gt; Devpost</a>
                </div>
            </div>
          </div>
          {/* Careerly */}
    <div className="bg-white/95 dark:bg-[#18181b]/95 rounded-lg shadow p-0 flex flex-col overflow-hidden border border-yellow-400 border-2 relative panel-hover">
            <span className="absolute top-3 left-3 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 z-10">👑 Hackathon Winner</span>
            <span className="absolute top-3 right-3 bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-200 text-xs font-semibold px-3 py-1 rounded-full z-10">Game Dev</span>
            <div className="relative w-full" style={{aspectRatio: '3/2', minHeight: 100}}>
              <img src="/careerly_card.jpg" alt="Project 2" className="object-cover rounded-t-lg w-full h-full" style={{width:'100%', height:'100%', objectFit:'cover', display:'block'}} />
            </div>
            <div className="p-6 flex flex-col flex-1">
              <h3 className="font-semibold text-lg mb-2">Careerly</h3>
              <p className="text-gray-600 dark:text-gray-400 flex-1">Making career exploration fun and inclusive through an AI-powered virtual job fair.</p>
              <a href="https://devpost.com/software/career-fair-xz0f67" target="_blank" rel="noopener noreferrer" className="mt-4 text-blue-600 dark:text-blue-400 hover:underline underline-offset-2 transition">&gt; Devpost</a>
            </div>
          </div>
          {/* SafeRoute */}
    <div className="bg-white/95 dark:bg-[#18181b]/95 rounded-lg shadow p-0 flex flex-col overflow-hidden border border-gray-200 dark:border-gray-700 relative panel-hover">
            <span className="absolute top-3 right-3 bg-green-100 dark:bg-green-900/60 text-green-700 dark:text-green-200 text-xs font-semibold px-3 py-1 rounded-full z-10">Android</span>
            <div className="relative w-full" style={{aspectRatio: '3/2', minHeight: 100}}>
              <img src="/saferoute_card.png" alt="Project 3" className="object-cover rounded-t-lg w-full h-full" style={{width:'100%', height:'100%', objectFit:'cover', display:'block'}} />
            </div>
            <div className="p-6 flex flex-col flex-1">
              <h3 className="font-semibold text-lg mb-2">SafeRoute</h3>
              <p className="text-gray-600 dark:text-gray-400 flex-1">A real-time hazard reporting app with crowdsourced data, drone integration, and safe routing.</p>
              <a href="https://github.com/HasNate618/SafeRoute" className="mt-4 text-blue-600 dark:text-blue-400 hover:underline underline-offset-2 transition">&gt; GitHub</a>
            </div>
          </div>
          {/* Animarker */}
    <div className="bg-white/95 dark:bg-[#18181b]/95 rounded-lg shadow p-0 flex flex-col overflow-hidden border border-gray-200 dark:border-gray-700 relative panel-hover">
            <span className="absolute top-3 right-3 bg-green-100 dark:bg-green-900/60 text-green-700 dark:text-green-200 text-xs font-semibold px-3 py-1 rounded-full z-10">Android</span>
            <div className="relative w-full" style={{aspectRatio: '3/2', minHeight: 100}}>
              <img src="/animarker_card.png" alt="Project 4" className="object-cover rounded-t-lg w-full h-full" style={{width:'100%', height:'100%', objectFit:'cover', display:'block'}} />
            </div>
            <div className="p-6 flex flex-col flex-1">
              <h3 className="font-semibold text-lg mb-2">Animarker</h3>
              <p className="text-gray-600 dark:text-gray-400 flex-1">A crowdsourced wildlife tracker using computer vision to identify and map animal sightings worldwide.</p>
              <a href="https://devpost.com/software/endangered-animal-app" className="mt-4 text-blue-600 dark:text-blue-400 hover:underline">&gt; Devpost</a>
            </div>
          </div>
          {/* FLEXFIRE-X */}
    <div className="bg-white/95 dark:bg-[#18181b]/95 rounded-lg shadow p-0 flex flex-col overflow-hidden border border-gray-200 dark:border-gray-700 relative panel-hover">
            <span className="absolute top-3 right-3 bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-200 text-xs font-semibold px-3 py-1 rounded-full z-10">Hardware</span>
            <div className="relative w-full" style={{aspectRatio: '3/2', minHeight: 100}}>
              <img src="/flexfire-x_card.png" alt="Project 5" className="object-cover rounded-t-lg w-full h-full" style={{width:'100%', height:'100%', objectFit:'cover', display:'block'}} />
            </div>
            <div className="p-6 flex flex-col flex-1">
              <h3 className="font-semibold text-lg mb-2">FLEXFIRE-X</h3>
              <p className="text-gray-600 dark:text-gray-400 flex-1">A muscle activated wearable projectile launcher inspired by cyberpunk tech.</p>
              <a href="#" className="mt-4 text-blue-600 dark:text-blue-400 hover:underline">&gt; GitHub</a>
            </div>
          </div>
          {/* Rubber Band Turret */}
    <div className="bg-white/95 dark:bg-[#18181b]/95 rounded-lg shadow p-0 flex flex-col overflow-hidden border border-gray-200 dark:border-gray-700 relative panel-hover">
            <span className="absolute top-3 right-3 bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-200 text-xs font-semibold px-3 py-1 rounded-full z-10">Hardware</span>
            <div className="relative w-full" style={{aspectRatio: '3/2', minHeight: 100}}>
              <img src="/turret_card.png" alt="Project 6" className="object-cover rounded-t-lg w-full h-full" style={{width:'100%', height:'100%', objectFit:'cover', display:'block'}} />
            </div>
            <div className="p-6 flex flex-col flex-1">
              <h3 className="font-semibold text-lg mb-2">Rubber Band Turret</h3>
              <p className="text-gray-600 dark:text-gray-400 flex-1">Bluetooth-controlled rubber band turret with smooth servo movement and wireless app control.</p>
              <a href="https://github.com/HasNate618/Rubber-Band-Turret" className="mt-4 text-blue-600 dark:text-blue-400 hover:underline">&gt; GitHub</a>
            </div>
          </div>
        </div>
      </section>

  {/* Mobile Apps Section */}
  <section id="apps" className="w-full max-w-4xl mx-auto mb-16">
  <h2 className="text-2xl font-bold mb-6 vs-blue">Mobile Games</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Street Cleaner */}
          <div className="bg-white/80 dark:bg-[#18181b]/80 rounded-lg shadow p-4 flex flex-row items-center relative panel-hover border border-gray-200 dark:border-gray-700">
            <img src="/saferoute_icon.jpg" alt="App 1 Icon" className="w-20 h-20 rounded-2xl mr-4 shadow flex-shrink-0" />
            <div className="flex-1 flex flex-col items-start">
              <span className="mb-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 z-10">👑 Hackathon Winner</span>
              <h3 className="font-semibold text-base mb-1">MyApp One</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">A productivity app published on Google Play.</p>
              <a href="https://play.google.com/store/apps/details?id=com.example.myappone" target="_blank" rel="noopener noreferrer">
                <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Get it on Google Play" className="h-12 mt-2" />
              </a>
            </div>
          </div>
          {/* SafeRoute */}
          <div className="bg-white/80 dark:bg-[#18181b]/80 rounded-lg shadow p-4 flex flex-row items-center panel-hover border border-gray-200 dark:border-gray-700">
            <img src="/app2-icon.png" alt="App 2 Icon" className="w-20 h-20 rounded-2xl mr-4 shadow flex-shrink-0" />
            <div className="flex-1 flex flex-col items-start">
              <h3 className="font-semibold text-base mb-1">MyApp Two</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">A fun game for Android users. Fast and engaging.</p>
              <a href="https://play.google.com/store/apps/details?id=com.example.myapptwo" target="_blank" rel="noopener noreferrer">
                <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Get it on Google Play" className="h-12 mt-2" />
              </a>
            </div>
          </div>
          {/*  */}
          <div className="bg-white/80 dark:bg-[#18181b]/80 rounded-lg shadow p-4 flex flex-row items-center panel-hover border border-gray-200 dark:border-gray-700">
            <img src="/app3-icon.png" alt="App 3 Icon" className="w-20 h-20 rounded-2xl mr-4 shadow flex-shrink-0" />
            <div className="flex-1 flex flex-col items-start">
              <h3 className="font-semibold text-base mb-1">MyApp Three</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Another cool app for Android users.</p>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Get it on Google Play" className="h-12 mt-2" />
              </a>
            </div>
          </div>
          {/* App 4 */}
          <div className="bg-white/80 dark:bg-[#18181b]/80 rounded-lg shadow p-4 flex flex-row items-center panel-hover border border-gray-200 dark:border-gray-700">
            <img src="/app4-icon.png" alt="App 4 Icon" className="w-20 h-20 rounded-2xl mr-4 shadow flex-shrink-0" />
            <div className="flex-1 flex flex-col items-start">
              <h3 className="font-semibold text-base mb-1">MyApp Four</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">A health tracker for Android users.</p>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Get it on Google Play" className="h-12 mt-2" />
              </a>
            </div>
          </div>
        </div>
      </section>

  {/* Links Section removed, links are now in About section */}
  {/* Spacer at bottom for centering */}
  <div className="w-full max-w-7xl h-12 md:h-24 lg:h-64 flex-shrink-0" />

      <footer className="text-gray-500 text-sm mt-8">&copy; {new Date().getFullYear()} Nathan Espejo. All rights reserved.</footer>
    </main>
  );
}