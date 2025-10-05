import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(express.json());

// --- CORS (ouvert pendant les tests) ---
// Si tu as un domaine plus tard, remplace par:
// app.use(cors({ origin: ["https://ton-domaine.com"] }));
app.use(cors());

// --- Fichiers statiques du front ---
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, "public");
app.use(express.static(publicDir));

// --- Healthcheck ---
app.get("/health", (_, res) => res.send("OK"));

// --- Proxy /api/chat -> OpenAI Responses API (SSE) ---
app.post("/api/chat", async (req, res) => {
  try {
    const { messages, model, system, assistantId, sessionId } = req.body || {};

    const input = [
      system ? { role: "system", content: system } : null,
      ...(Array.isArray(messages) ? messages : [])
    ].filter(Boolean);

    const r = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: model || "gpt-4.1",
        input,
        stream: true,
        store: true,
        metadata: { assistantId, sessionId }
      })
    });

    if (!r.ok || !r.body) {
      const txt = await r.text().catch(()=> "");
      res.status(502).json({ error: "OpenAI upstream error", details: txt });
      return;
    }

    // Relais du flux vers le navigateur
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    r.body.pipe(res);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error", details: String(err) });
  }
});

// --- SPA fallback ---
app.get("*", (req, res, next) => {
  if (req.path.startsWith("/api/")) return next();
  res.sendFile(path.join(publicDir, "index.html"));
});

// --- Démarrage ---
const PORT = process.env.PORT || 8787;
app.listen(PORT, () => {
  console.log(`✅ API prête sur http://localhost:${PORT}`);
});
