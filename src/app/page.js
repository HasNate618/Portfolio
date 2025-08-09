"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

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
      {/* Glowing cursor follower */}
      <div
        className="cursor-glow"
        style={{ left: cursor.x, top: cursor.y }}
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
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold mb-4 vs-blue whitespace-nowrap">Hi, I&apos;m Nathan Espejo</h1>
      </section>

  {/* About Section */}
  <section id="about" className="w-full max-w-2xl bg-white/80 dark:bg-[#18181b]/80 rounded-xl shadow p-8 mb-12 panel-hover">
        <h2 className="text-2xl font-bold mb-4 vs-blue">About Me</h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
          I’m a <span className="vs-green">Software Engineering</span> student at <span className="vs-purple">Western University</span> passionate about blending hardware and software to build creative, human-focused tech. From VR glove games and wearable cyberpunk-inspired devices to AI-driven wellness apps, I turn ideas into functional, impactful solutions.
        </p>
        <div className="flex flex-wrap justify-center gap-6">
          <a href="mailto:your.email@example.com" className="flex items-center gap-2 vs-blue hover:underline text-lg"><span>📧</span>Email</a>
          <a href="https://github.com/HasNate618" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 vs-blue hover:underline text-lg"><span>🐙</span>GitHub</a>
          <a href="https://linkedin.com/in/your-linkedin" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 vs-blue hover:underline text-lg"><span>💼</span>LinkedIn</a>
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
  <section id="projects" className="w-full max-w-7xl mb-16">
  <h2 className="text-2xl font-bold mb-6 vs-blue">Web Projects</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Hackathon Winner Project */}
          <div className="bg-white/80 dark:bg-[#18181b]/80 rounded-lg shadow p-0 flex flex-col overflow-hidden border border-yellow-400 border-2 relative panel-hover">
            <span className="absolute top-3 left-3 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 z-10">👑 Hackathon Winner</span>
            <img src="/project1-card.png" alt="Project 1" className="w-full h-40 object-cover" />
            <div className="p-6 flex flex-col flex-1">
              <h3 className="font-semibold text-lg mb-2">Devpost Project</h3>
              <p className="text-gray-600 dark:text-gray-400 flex-1">A hackathon project featured on Devpost. Built with React and Firebase.</p>
              <a href="https://devpost.com/yourproject" target="_blank" rel="noopener noreferrer" className="mt-4 text-blue-600 dark:text-blue-400 hover:underline">View on Devpost</a>
            </div>
          </div>
          {/* Regular Project */}
          <div className="bg-white/80 dark:bg-[#18181b]/80 rounded-lg shadow p-0 flex flex-col overflow-hidden border border-gray-200 dark:border-gray-700 panel-hover">
            <img src="/project2-card.png" alt="Project 2" className="w-full h-40 object-cover" />
            <div className="p-6 flex flex-col flex-1">
              <h3 className="font-semibold text-lg mb-2">GitHub Project</h3>
              <p className="text-gray-600 dark:text-gray-400 flex-1">An open-source tool available on GitHub. Fast, modern, and easy to use.</p>
              <a href="https://github.com/yourusername/yourproject" target="_blank" rel="noopener noreferrer" className="mt-4 text-blue-600 dark:text-blue-400 hover:underline">View on GitHub</a>
            </div>
          </div>
          {/* Portfolio Website */}
          <div className="bg-white/80 dark:bg-[#18181b]/80 rounded-lg shadow p-0 flex flex-col overflow-hidden border border-gray-200 dark:border-gray-700 panel-hover">
            <img src="/project3-card.png" alt="Project 3" className="w-full h-40 object-cover" />
            <div className="p-6 flex flex-col flex-1">
              <h3 className="font-semibold text-lg mb-2">Portfolio Website</h3>
              <p className="text-gray-600 dark:text-gray-400 flex-1">This portfolio site, built with Next.js and Tailwind CSS.</p>
              <a href="#" className="mt-4 text-blue-600 dark:text-blue-400 hover:underline">View Project</a>
            </div>
          </div>
          {/* Extra Project 4 */}
          <div className="bg-white/80 dark:bg-[#18181b]/80 rounded-lg shadow p-0 flex flex-col overflow-hidden border border-gray-200 dark:border-gray-700 panel-hover">
            <img src="/project4-card.png" alt="Project 4" className="w-full h-40 object-cover" />
            <div className="p-6 flex flex-col flex-1">
              <h3 className="font-semibold text-lg mb-2">Weather App</h3>
              <p className="text-gray-600 dark:text-gray-400 flex-1">A weather dashboard using OpenWeatherMap API and React.</p>
              <a href="#" className="mt-4 text-blue-600 dark:text-blue-400 hover:underline">View Project</a>
            </div>
          </div>
          {/* Extra Project 5 */}
          <div className="bg-white/80 dark:bg-[#18181b]/80 rounded-lg shadow p-0 flex flex-col overflow-hidden border border-gray-200 dark:border-gray-700 panel-hover">
            <img src="/project5-card.png" alt="Project 5" className="w-full h-40 object-cover" />
            <div className="p-6 flex flex-col flex-1">
              <h3 className="font-semibold text-lg mb-2">Task Manager</h3>
              <p className="text-gray-600 dark:text-gray-400 flex-1">A productivity tool for managing daily tasks, built with Next.js.</p>
              <a href="#" className="mt-4 text-blue-600 dark:text-blue-400 hover:underline">View Project</a>
            </div>
          </div>
          {/* Extra Project 6 */}
          <div className="bg-white/80 dark:bg-[#18181b]/80 rounded-lg shadow p-0 flex flex-col overflow-hidden border border-gray-200 dark:border-gray-700 panel-hover">
            <img src="/project6-card.png" alt="Project 6" className="w-full h-40 object-cover" />
            <div className="p-6 flex flex-col flex-1">
              <h3 className="font-semibold text-lg mb-2">Finance Tracker</h3>
              <p className="text-gray-600 dark:text-gray-400 flex-1">Track your expenses and income with charts and analytics.</p>
              <a href="#" className="mt-4 text-blue-600 dark:text-blue-400 hover:underline">View Project</a>
            </div>
          </div>
        </div>
      </section>

  {/* Mobile Apps Section */}
  <section id="apps" className="w-full max-w-7xl mb-16">
  <h2 className="text-2xl font-bold mb-6 vs-blue">Mobile Apps</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Hackathon Winner App */}
          <div className="rounded-lg shadow p-4 flex flex-row items-center relative panel-hover">
            <img src="/app1-icon.png" alt="App 1 Icon" className="w-20 h-20 rounded-2xl mr-4 shadow flex-shrink-0" />
            <div className="flex-1 flex flex-col items-start">
              <span className="mb-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 z-10">👑 Hackathon Winner</span>
              <h3 className="font-semibold text-base mb-1">MyApp One</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">A productivity app published on Google Play.</p>
              <a href="https://play.google.com/store/apps/details?id=com.example.myappone" target="_blank" rel="noopener noreferrer">
                <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Get it on Google Play" className="h-12 mt-2" />
              </a>
            </div>
          </div>
          {/* Regular App */}
          <div className="rounded-lg shadow p-4 flex flex-row items-center panel-hover">
            <img src="/app2-icon.png" alt="App 2 Icon" className="w-20 h-20 rounded-2xl mr-4 shadow flex-shrink-0" />
            <div className="flex-1 flex flex-col items-start">
              <h3 className="font-semibold text-base mb-1">MyApp Two</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">A fun game for Android users. Fast and engaging.</p>
              <a href="https://play.google.com/store/apps/details?id=com.example.myapptwo" target="_blank" rel="noopener noreferrer">
                <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Get it on Google Play" className="h-12 mt-2" />
              </a>
            </div>
          </div>
          {/* App 3 */}
          <div className="bg-white/80 dark:bg-[#18181b]/80 rounded-lg shadow p-4 flex flex-row items-center panel-hover">
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
          <div className="bg-white/80 dark:bg-[#18181b]/80 rounded-lg shadow p-4 flex flex-row items-center panel-hover">
            <img src="/app4-icon.png" alt="App 4 Icon" className="w-20 h-20 rounded-2xl mr-4 shadow flex-shrink-0" />
            <div className="flex-1 flex flex-col items-start">
              <h3 className="font-semibold text-base mb-1">MyApp Four</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">A health tracker for Android users.</p>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Get it on Google Play" className="h-12 mt-2" />
              </a>
            </div>
          </div>
          {/* App 5 */}
          <div className="bg-white/80 dark:bg-[#18181b]/80 rounded-lg shadow p-4 flex flex-row items-center panel-hover">
            <img src="/app5-icon.png" alt="App 5 Icon" className="w-20 h-20 rounded-2xl mr-4 shadow flex-shrink-0" />
            <div className="flex-1 flex flex-col items-start">
              <h3 className="font-semibold text-base mb-1">MyApp Five</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">A finance app for Android users.</p>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Get it on Google Play" className="h-12 mt-2" />
              </a>
            </div>
          </div>
          {/* App 6 */}
          <div className="bg-white/80 dark:bg-[#18181b]/80 rounded-lg shadow p-4 flex flex-row items-center panel-hover">
            <img src="/app6-icon.png" alt="App 6 Icon" className="w-20 h-20 rounded-2xl mr-4 shadow flex-shrink-0" />
            <div className="flex-1 flex flex-col items-start">
              <h3 className="font-semibold text-base mb-1">MyApp Six</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">A notes app for Android users.</p>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Get it on Google Play" className="h-12 mt-2" />
              </a>
            </div>
          </div>
        </div>
      </section>

  {/* Links Section removed, links are now in About section */}
  {/* Spacer at bottom for centering */}
  <div className="w-full max-w-7xl h-12 md:h-24 lg:h-96 flex-shrink-0" />

      <footer className="text-gray-500 text-sm mt-8">&copy; {new Date().getFullYear()} [Your Name]. All rights reserved.</footer>
    </main>
  );
}