"use client";

export default function ChatMessage({ message }) {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4 animate-fade-in`}
    >
      <div
        className={`max-w-[85%] px-5 py-3.5 rounded-2xl text-sm leading-relaxed shadow-lg ${
          isUser
            ? "bg-cyan-500/10 text-cyan-100 border border-cyan-400/20 rounded-br-md backdrop-blur-md"
            : "bg-white/5 text-gray-200 border border-white/10 rounded-bl-md backdrop-blur-md hover:bg-white/8 transition-colors"
        }`}
        style={{
          boxShadow: isUser
            ? "0 4px 24px rgba(0, 255, 255, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.05)"
            : "0 4px 24px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.03)",
        }}
      >
        {isUser ? (
          message.content
        ) : (
          <div className="prose prose-invert prose-sm max-w-none">
            <div dangerouslySetInnerHTML={{ __html: formatMarkdown(message.content) }} />
          </div>
        )}
      </div>
    </div>
  );
}

function formatMarkdown(text) {
  if (!text) return "";
  return text
    .replace(/\*\*(.+?)\*\*/g, "<strong class='text-cyan-300'>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/`(.+?)`/g, "<code class='bg-black/50 px-1 py-0.5 rounded text-cyan-300 text-xs'>$1</code>")
    .replace(/\n/g, "<br />");
}
