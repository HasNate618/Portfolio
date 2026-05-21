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
    const reranked = await rerankChunks(message, topChunks, 6);
    const systemPrompt = buildSystemPrompt(reranked);

    const cohere = new CohereClient({ token: process.env.COHERE_API_KEY });

    const safeHistory = history.filter((m) => m.content && m.content.trim().length > 0);

    const stream = await cohere.v2.chatStream({
      model: "command-a-plus-05-2026",
      messages: [
        { role: "system", content: systemPrompt },
        ...safeHistory.map((m) => ({
          role: m.role === "user" ? "user" : "assistant",
          content: m.content,
        })),
        { role: "user", content: message },
      ],
      temperature: 0.7,
      maxTokens: 32000,
      thinking: { type: "disabled" },
    });

    return new Response(
      new ReadableStream({
        async start(controller) {
          let totalChars = 0;
          const MAX_CHARS = 32000;
          try {
            for await (const chunk of stream) {
              if (chunk.type === "content-delta") {
                const text = chunk.delta?.message?.content?.text ?? "";
                totalChars += text.length;
                if (totalChars > MAX_CHARS) {
                  controller.close();
                  return;
                }
                controller.enqueue(new TextEncoder().encode(text));
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
