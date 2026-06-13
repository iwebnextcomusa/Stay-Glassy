import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for Chatbot securely powered by server-side Gemini API
  app.post("/api/chatbot", async (req, res) => {
    try {
      const { message } = req.body;
      const key = process.env.GEMINI_API_KEY || "AIzaSyCLKX2tohQTHF9Gk06XqqlT-tXUjVSOYBU"; // default fallback or preset from instructions
      
      const ai = new GoogleGenAI({
        apiKey: key,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          }
        }
      });

      const systemInstruction = 
        "You are 'GlassyGPT', the virtual assistant for StayGlassy.ca, based in Sacramento, CA (Phone: 408-431-2665, Email: dakota@stayglassy.ca). " +
        "You represent StayGlassy, a company that makes fun, engaging, and innovative educational card games " +
        "specifically designed to cultivate critical thinking, logic, scientific reflection, and emotional intelligence. " +
        "Your target audience includes teachers, parents, students, schools, and educational game enthusiasts. " +
        "Be helpful, polite, family-friendly, and highly encouraging! " +
        "Guide prospective buyers to our Shop, FAQ, or Contact forms, and suggest school volume pricing if they mentions being an educator. " +
        "Keep your responses concise, highly informative, and warm.";

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: message,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7,
        }
      });

      res.json({ text: response.text });
    } catch (e: any) {
      console.error("Chatbot API Error:", e);
      res.status(500).json({ error: e.message || "An error occurred with Gemini API." });
    }
  });

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", company: "StayGlassy.ca", location: "Sacramento, CA" });
  });

  // Integrate Vite for dev, or static asset serving for prod
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
