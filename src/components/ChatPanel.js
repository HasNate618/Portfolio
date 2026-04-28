"use client";

import { useState, useRef, useEffect } from "react";
import ChatMessage from "./ChatMessage";

const EXAMPLE_PROMPTS = [
  "How does this chat work?",
  "What are Nathan's top AI projects?",
  "Tell me about his homelab infrastructure",
  "What hackathons has he won?",
];

export default function ChatPanel({ onClose, messages, onSendMessage, loading, followups }) {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const prevMessagesLengthRef = useRef(messages.length);

  // Auto-scroll only when a new message is added, not on every content update
  useEffect(() => {
    if (messages.length > prevMessagesLengthRef.current) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
      prevMessagesLengthRef.current = messages.length;
    }
  }, [messages.length]);

  // Scroll to bottom when loading starts (user just sent a message)
  useEffect(() => {
    if (loading) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [loading]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Lock body scroll when chat is open
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;
    onSendMessage(input.trim());
    setInput("");
  };

  const handlePromptClick = (prompt) => {
    onSendMessage(prompt);
  };

  return (
    <div className="fixed inset-0 z-[55] flex">
      {/* Left side: Dark overlay (click to close) */}
      <div
        className="hidden lg:block w-1/2 bg-black/60 backdrop-blur-sm cursor-pointer"
        onClick={onClose}
      />

      {/* Right side: Chat panel - 50% width */}
      <div className="w-full lg:w-1/2 h-full flex flex-col bg-black/80 relative overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/40 relative z-10 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{
                background:
                  "linear-gradient(135deg, #00ffff 0%, #3b82f6 50%, #8b5cf6 100%)",
              }}
            >
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-cyan-300 font-bold text-sm tracking-wider">
                NEXUS // KNOWLEDGE BASE
              </h2>
              <p className="text-gray-500 text-xs">Ask me anything about Nathan</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-white/5"
            aria-label="Close chat"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div
          ref={messagesContainerRef}
          className="flex-1 overflow-y-auto px-4 lg:px-6 py-4 relative z-10 chat-scrollbar"
        >
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mb-2"
                style={{
                  background:
                    "linear-gradient(135deg, #00ffff 0%, #3b82f6 50%, #8b5cf6 100%)",
                  boxShadow: "0 0 30px rgba(0, 255, 255, 0.3)",
                }}
              >
                <svg
                  className="w-8 h-8 text-white"
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
              <div>
                <h3 className="text-cyan-300 font-bold text-lg mb-1">Nexus Online</h3>
                <p className="text-gray-400 text-sm max-w-md">
                  I&apos;m Nathan&apos;s AI assistant. Ask me about his projects, skills, experience, or
                  anything in his portfolio.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 justify-center max-w-lg">
                {EXAMPLE_PROMPTS.map((prompt, i) => (
                  <button
                    key={i}
                    onClick={() => handlePromptClick(prompt)}
                    className="text-xs px-3 py-2 rounded-full bg-white/5 border border-cyan-500/20 text-cyan-300 hover:bg-cyan-500/10 hover:border-cyan-500/40 transition-all duration-200"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg, i) => (
            <ChatMessage key={i} message={msg} />
          ))}

          {loading && (
            <div className="flex justify-start mb-4">
              <div className="bg-white/5 border border-white/10 rounded-2xl rounded-bl-md px-4 py-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                  <span className="text-gray-500 text-xs ml-1">Nexus is thinking...</span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Follow-up suggestions */}
        {!loading && followups.length > 0 && (
          <div className="px-4 lg:px-6 py-2 flex flex-wrap gap-2 relative z-10">
            {followups.map((q, i) => (
              <button
                key={i}
                onClick={() => handlePromptClick(q)}
                className="text-xs px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/20 hover:border-cyan-500/50 transition-all duration-200"
              >
                {q}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="px-4 lg:px-6 py-4 border-t border-white/10 bg-black/40 relative z-10 flex-shrink-0">
          <form onSubmit={handleSubmit} className="flex items-center gap-3">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Nexus anything about Nathan..."
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed hover:scale-105"
              style={{
                background:
                  input.trim() && !loading
                    ? "linear-gradient(135deg, #00ffff 0%, #3b82f6 100%)"
                    : "rgba(255,255,255,0.05)",
              }}
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
