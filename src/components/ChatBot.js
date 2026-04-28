"use client";

import { useState, useCallback } from "react";
import ChatButton from "./ChatButton";
import ChatPanel from "./ChatPanel";

export default function ChatBot({ isOpen, onOpenChange }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleOpen = () => onOpenChange?.(true);
  const handleClose = () => onOpenChange?.(false);

  const handleSendMessage = useCallback(
    async (content) => {
      const userMessage = { role: "user", content };
      const newMessages = [...messages, userMessage];
      setMessages(newMessages);
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
        />
      )}
    </>
  );
}
