"use client";

import { useState, useEffect } from "react";

export default function ChatButton({ onClick, isOpen }) {
  const [pulse, setPulse] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setPulse(false);
    } else {
      const timer = setTimeout(() => setPulse(true), 500);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

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
        className={`relative w-14 h-14 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 ${
          pulse ? "animate-pulse" : ""
        }`}
        style={{
          background: "linear-gradient(135deg, #00ffff 0%, #3b82f6 50%, #8b5cf6 100%)",
          boxShadow: "0 0 20px rgba(0, 255, 255, 0.4), 0 0 40px rgba(59, 130, 246, 0.2)",
        }}
      >
        <svg
          className="w-7 h-7 text-white"
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
        <div
          className="absolute inset-0 rounded-full animate-ping opacity-20"
          style={{
            background:
              "linear-gradient(135deg, #00ffff 0%, #3b82f6 50%, #8b5cf6 100%)",
          }}
        />
      </div>
    </button>
  );
}
