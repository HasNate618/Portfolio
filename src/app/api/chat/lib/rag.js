import { CohereClient } from "cohere-ai";
import { loadEmbeddings, cosineSimilarity } from "./embeddings.js";

export async function retrieveRelevantChunks(query, topK = 20) {
  const cohere = new CohereClient({ token: process.env.COHERE_API_KEY });

  const embeddings = loadEmbeddings();
  if (!embeddings || embeddings.length === 0) {
    throw new Error("No embeddings loaded. Run build-embeddings script first.");
  }

  const queryEmbed = await cohere.embed({
    texts: [query],
    model: "embed-english-v3.0",
    inputType: "search_query",
  });

  const queryVector = queryEmbed.embeddings[0];

  const scored = embeddings.map((doc) => ({
    ...doc,
    score: cosineSimilarity(queryVector, doc.embedding),
  }));

  scored.sort((a, b) => b.score - a.score);

  return scored.slice(0, topK);
}

export async function rerankChunks(query, chunks, topN = 5) {
  const cohere = new CohereClient({ token: process.env.COHERE_API_KEY });

  const response = await cohere.rerank({
    query,
    documents: chunks.map((c) => c.text),
    model: "rerank-english-v3.0",
    topN,
  });

  return response.results.map((r) => ({
    text: chunks[r.index]?.text ?? "",
    source: chunks[r.index]?.source ?? "",
    score: r.relevanceScore,
  }));
}
