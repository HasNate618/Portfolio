"use client";

export default function ChatButton({ onClick, isOpen }) {
  if (isOpen) return null;

  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-[60] flex items-center gap-2 group"
      aria-label="Open Nexus Chat"
    >
      <span className="hidden group-hover:inline-block text-xs text-cyan-300 bg-black/80 px-2 py-1 rounded border border-cyan-500/30 whitespace-nowrap animate-fade-in">
        Ask Nexus!
      </span>
      <div
        className="relative w-14 h-14 rounded-xl flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-[0_0_30px_rgba(0,255,255,0.6)]"
        style={{
          background: "rgba(0, 255, 255, 0.08)",
          border: "2px solid rgba(0, 255, 255, 0.7)",
          boxShadow: "0 0 15px rgba(0, 255, 255, 0.4), inset 0 0 10px rgba(0, 255, 255, 0.05)",
        }}
      >
        <svg
          className="w-7 h-7 text-cyan-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      </div>
    </button>
  );
}
