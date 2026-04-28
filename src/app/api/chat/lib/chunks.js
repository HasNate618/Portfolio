import fs from "fs";
import path from "path";

const CHUNK_SIZE = 800;
const CHUNK_OVERLAP = 150;

function splitIntoChunks(text, source) {
  const chunks = [];
  const sentences = text
    .split(/\n+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 20);

  let currentChunk = "";
  let currentLength = 0;

  for (const sentence of sentences) {
    if (currentLength + sentence.length > CHUNK_SIZE && currentChunk.length > 0) {
      chunks.push({
        text: currentChunk.trim(),
        source,
        length: currentChunk.length,
      });
      const overlapSentences = currentChunk.split("\n").slice(-2).join("\n");
      currentChunk = overlapSentences + "\n" + sentence;
      currentLength = currentChunk.length;
    } else {
      currentChunk += (currentChunk ? "\n" : "") + sentence;
      currentLength += sentence.length;
    }
  }

  if (currentChunk.trim().length > 50) {
    chunks.push({
      text: currentChunk.trim(),
      source,
      length: currentChunk.length,
    });
  }

  return chunks;
}

export function loadKnowledgebase() {
  const kbPath = path.join(process.cwd(), "knowledgebase");
  const allChunks = [];

  function readDir(dir, prefix = "") {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        readDir(fullPath, path.join(prefix, entry.name));
      } else if (entry.name.endsWith(".md")) {
        const content = fs.readFileSync(fullPath, "utf-8");
        const source = path.join(prefix, entry.name).replace(/\\/g, "/");
        const chunks = splitIntoChunks(content, source);
        allChunks.push(...chunks);
      }
    }
  }

  readDir(kbPath);
  return allChunks;
}
