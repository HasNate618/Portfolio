"use client";

export default function ChatMessage({ message }) {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4 animate-fade-in`}
    >
      <div
        className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
          isUser
            ? "bg-cyan-500/20 text-cyan-100 border border-cyan-500/30 rounded-br-md"
            : "bg-white/5 text-gray-200 border border-white/10 rounded-bl-md"
        }`}
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
