import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#f8fafc] to-[#e0e7ef] dark:from-[#0a0a0a] dark:to-[#23272f] flex flex-col items-center px-4 py-12">
      {/* Hero Section */}
      <section className="w-full max-w-2xl text-center mb-16">
        <img src="/avatar.png" alt="Avatar" className="mx-auto rounded-full w-32 h-32 mb-6 border-4 border-white shadow-lg object-cover" />
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-foreground">Hi, I'm <span className="text-blue-600 dark:text-blue-400">[Your Name]</span></h1>
        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-6">Aspiring Web Developer & Designer</p>
        <a href="#contact" className="inline-block bg-blue-600 text-white px-6 py-2 rounded-full font-semibold shadow hover:bg-blue-700 transition">Contact Me</a>
      </section>

      {/* About Section */}
      <section className="w-full max-w-2xl bg-white/80 dark:bg-[#18181b]/80 rounded-xl shadow p-8 mb-16">
        <h2 className="text-2xl font-bold mb-4 text-foreground">About Me</h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          I'm passionate about building beautiful, accessible web experiences. I enjoy learning new technologies and turning ideas into reality through code. <br />
          <span className="font-semibold">Skills:</span> HTML, CSS, JavaScript, React, Next.js, Tailwind CSS
        </p>
      </section>

      {/* Projects Section */}
      <section className="w-full max-w-7xl mb-16">
        <h2 className="text-2xl font-bold mb-6 text-foreground">Web Projects</h2>
        <div className="flex overflow-x-auto gap-8 pb-2 hide-scrollbar">
          {/* Hackathon Winner Project */}
          <div className="min-w-[340px] bg-white/80 dark:bg-[#18181b]/80 rounded-lg shadow p-0 flex flex-col overflow-hidden border border-yellow-400 border-2 relative">
            <span className="absolute top-3 left-3 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 z-10">👑 Hackathon Winner</span>
            <img src="/project1-card.png" alt="Project 1" className="w-full h-40 object-cover" />
            <div className="p-6 flex flex-col flex-1">
              <h3 className="font-semibold text-lg mb-2">Devpost Project</h3>
              <p className="text-gray-600 dark:text-gray-400 flex-1">A hackathon project featured on Devpost. Built with React and Firebase.</p>
              <a href="https://devpost.com/yourproject" target="_blank" rel="noopener noreferrer" className="mt-4 text-blue-600 dark:text-blue-400 hover:underline">View on Devpost</a>
            </div>
          </div>
          {/* Regular Project */}
          <div className="min-w-[340px] bg-white/80 dark:bg-[#18181b]/80 rounded-lg shadow p-0 flex flex-col overflow-hidden border border-gray-200 dark:border-gray-700">
            <img src="/project2-card.png" alt="Project 2" className="w-full h-40 object-cover" />
            <div className="p-6 flex flex-col flex-1">
              <h3 className="font-semibold text-lg mb-2">GitHub Project</h3>
              <p className="text-gray-600 dark:text-gray-400 flex-1">An open-source tool available on GitHub. Fast, modern, and easy to use.</p>
              <a href="https://github.com/yourusername/yourproject" target="_blank" rel="noopener noreferrer" className="mt-4 text-blue-600 dark:text-blue-400 hover:underline">View on GitHub</a>
            </div>
          </div>
        </div>

        {/* Mobile Apps Section */}
        <h2 className="text-2xl font-bold mb-4 mt-12 text-foreground">Mobile Apps</h2>
        <div className="flex overflow-x-auto gap-8 pb-2 hide-scrollbar">
          {/* Hackathon Winner App */}
          <div className="min-w-[220px] bg-white/80 dark:bg-[#18181b]/80 rounded-lg shadow p-4 flex flex-col items-center border-2 border-yellow-400 relative">
            <span className="absolute top-3 left-3 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 z-10">👑 Hackathon Winner</span>
            <img src="/app1-icon.png" alt="App 1 Icon" className="w-16 h-16 rounded-2xl mb-3 shadow" />
            <h3 className="font-semibold text-base mb-1">MyApp One</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-2 text-center">A productivity app published on Google Play.</p>
            <a href="https://play.google.com/store/apps/details?id=com.example.myappone" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">View on Play Store</a>
          </div>
          {/* Regular App */}
          <div className="min-w-[220px] bg-white/80 dark:bg-[#18181b]/80 rounded-lg shadow p-4 flex flex-col items-center border border-gray-200 dark:border-gray-700">
            <img src="/app2-icon.png" alt="App 2 Icon" className="w-16 h-16 rounded-2xl mb-3 shadow" />
            <h3 className="font-semibold text-base mb-1">MyApp Two</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-2 text-center">A fun game for Android users. Fast and engaging.</p>
            <a href="https://play.google.com/store/apps/details?id=com.example.myapptwo" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">View on Play Store</a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="w-full max-w-2xl bg-white/80 dark:bg-[#18181b]/80 rounded-xl shadow p-8 mb-8">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Contact</h2>
        <form className="flex flex-col gap-4">
          <input type="text" placeholder="Your Name" className="px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <input type="email" placeholder="Your Email" className="px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <textarea placeholder="Your Message" rows={4} className="px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold shadow hover:bg-blue-700 transition">Send</button>
        </form>
      </section>

      <footer className="text-gray-500 text-sm mt-8">&copy; {new Date().getFullYear()} [Your Name]. All rights reserved.</footer>
    </main>
  );
}