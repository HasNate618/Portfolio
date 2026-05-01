import { CohereClient } from "cohere-ai";

export async function POST(req) {
  try {
    const { userMessage, aiResponse } = await req.json();

    if (!userMessage || !aiResponse) {
      return Response.json({ error: "userMessage and aiResponse required" }, { status: 400 });
    }

    const cohere = new CohereClient({ token: process.env.COHERE_API_KEY });

    const prompt = `Given this conversation about Nathan Espejo's portfolio:
User: ${userMessage}
Assistant: ${aiResponse.slice(0, 800)}

Generate 3 short follow-up questions the user could ask next about Nathan's projects, skills, or experience. Each question must be a single, focused question (no "and" or "or" joining two questions). No markdown formatting. Keep each under 10 words. Return ONLY a JSON array of 3 plain-text strings, each ending with "?".`;

    const response = await cohere.chat({
      model: "command-r-plus-08-2024",
      message: prompt,
      temperature: 0.7,
      maxTokens: 150,
    });

    const raw = response.text.trim();
    let followups;
    try {
      followups = JSON.parse(raw);
    } catch {
      const matches = raw.match(/"([^"]+\?)"/g);
      if (matches && matches.length >= 3) {
        followups = matches.slice(0, 3).map((m) => m.replace(/"/g, ""));
      } else {
        followups = [];
      }
    }

    if (!Array.isArray(followups) || followups.length < 3) {
      followups = [];
    }

    return Response.json({ followups: followups.slice(0, 3) });
  } catch (error) {
    console.error("Followups API error:", error);
    return Response.json({ followups: [] });
  }
}
