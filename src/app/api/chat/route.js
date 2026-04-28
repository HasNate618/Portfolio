import { CohereClient } from "cohere-ai";
import { retrieveRelevantChunks, rerankChunks } from "./lib/rag.js";
import { buildSystemPrompt } from "./lib/system-prompt.js";

export async function POST(req) {
  try {
    const { message, history = [] } = await req.json();

    if (!message || typeof message !== "string") {
      return new Response(JSON.stringify({ error: "Message is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const topChunks = await retrieveRelevantChunks(message, 20);
    const reranked = await rerankChunks(message, topChunks, 5);
    const systemPrompt = buildSystemPrompt(reranked);

    const cohere = new CohereClient({ token: process.env.COHERE_API_KEY });

    const chatHistory = history.map((m) => ({
      role: m.role === "user" ? "USER" : "CHATBOT",
      message: m.content,
    }));

    const stream = await cohere.chatStream({
      model: "command-r-plus",
      message,
      preamble: systemPrompt,
      chatHistory,
      temperature: 0.3,
    });

    return new Response(
      new ReadableStream({
        async start(controller) {
          try {
            for await (const chunk of stream) {
              if (chunk.eventType === "text-generation") {
                controller.enqueue(new TextEncoder().encode(chunk.text));
              }
            }
            controller.close();
          } catch (err) {
            console.error("Stream error:", err);
            controller.error(err);
          }
        },
      }),
      {
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Cache-Control": "no-cache",
        },
      }
    );
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process request" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
