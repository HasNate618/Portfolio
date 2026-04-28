"use client";

import { useState, useCallback } from "react";
import ChatButton from "./ChatButton";
import ChatPanel from "./ChatPanel";

const FOLLOWUP_DELIMITER = "|||FOLLOWUPS|||";

function parseFollowups(content) {
  const idx = content.indexOf(FOLLOWUP_DELIMITER);
  if (idx !== -1) {
    const main = content.slice(0, idx).trim();
    const raw = content.slice(idx + FOLLOWUP_DELIMITER.length);
    const followups = raw
      .split("|||")
      .map((q) => q.trim())
      .filter((q) => q.length > 0 && q.endsWith("?"));
    return { main, followups };
  }

  // Fallback: look for question lines at the end of the response
  const lines = content.split("\n").map((l) => l.trim()).filter(Boolean);
  const questionLines = [];
  for (let i = lines.length - 1; i >= 0; i--) {
    const line = lines[i];
    if (/^\d+\./.test(line)) break; // stop at numbered lists
    if (line.endsWith("?")) {
      questionLines.unshift(line.replace(/^\d+\.\s*/, "").replace(/^[-•]\s*/, ""));
    } else if (questionLines.length > 0) {
      break; // stop once we hit non-question after questions
    }
  }
  if (questionLines.length >= 2) {
    const main = lines.slice(0, lines.length - questionLines.length).join("\n").trim();
    return { main, followups: questionLines.slice(0, 3) };
  }

  return { main: content, followups: [] };
}

export default function ChatBot({ isOpen, onOpenChange }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [followups, setFollowups] = useState([]);

  const handleOpen = () => onOpenChange?.(true);
  const handleClose = () => onOpenChange?.(false);

  const handleSendMessage = useCallback(
    async (content) => {
      const userMessage = { role: "user", content };
      const newMessages = [...messages, userMessage];
      setMessages(newMessages);
      setLoading(true);
      setFollowups([]);

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: content,
            history: messages,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to get response");
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let assistantContent = "";

        const assistantMessage = { role: "assistant", content: "" };
        const messagesWithAssistant = [...newMessages, assistantMessage];
        setMessages(messagesWithAssistant);

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          assistantContent += chunk;

          setMessages((prev) => {
            const updated = [...prev];
            updated[updated.length - 1] = {
              role: "assistant",
              content: assistantContent,
            };
            return updated;
          });
        }

        // Parse follow-ups from final content
        const { main, followups: extracted } = parseFollowups(assistantContent);
        if (extracted.length > 0) {
          setMessages((prev) => {
            const updated = [...prev];
            updated[updated.length - 1] = {
              role: "assistant",
              content: main,
            };
            return updated;
          });
          setFollowups(extracted.slice(0, 3));
        }
      } catch (err) {
        console.error("Chat error:", err);
        const errorMessage = {
          role: "assistant",
          content:
            "Sorry, I ran into a connection issue. Please try again!",
        };
        const finalMessages = [...newMessages, errorMessage];
        setMessages(finalMessages);
      } finally {
        setLoading(false);
      }
    },
    [messages]
  );

  return (
    <>
      <ChatButton onClick={handleOpen} isOpen={isOpen} />
      {isOpen && (
        <ChatPanel
          onClose={handleClose}
          messages={messages}
          onSendMessage={handleSendMessage}
          loading={loading}
          followups={followups}
        />
      )}
    </>
  );
}
