"use client";

import { useState, useCallback } from "react";
import ChatButton from "./ChatButton";
import ChatPanel from "./ChatPanel";

function getStoredMessages() {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem("nexus-chat-history");
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function storeMessages(messages) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem("nexus-chat-history", JSON.stringify(messages));
  } catch {
    // Ignore storage errors
  }
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(getStoredMessages);
  const [loading, setLoading] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const handleSendMessage = useCallback(
    async (content) => {
      const userMessage = { role: "user", content };
      const newMessages = [...messages, userMessage];
      setMessages(newMessages);
      storeMessages(newMessages);
      setLoading(true);

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

        storeMessages(messagesWithAssistant);
      } catch (err) {
        console.error("Chat error:", err);
        const errorMessage = {
          role: "assistant",
          content:
            "Sorry, I ran into a connection issue. Please try again!",
        };
        const finalMessages = [...newMessages, errorMessage];
        setMessages(finalMessages);
        storeMessages(finalMessages);
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
        />
      )}
    </>
  );
}
