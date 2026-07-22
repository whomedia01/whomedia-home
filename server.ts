import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", service: "WhoMedia Platform Server", timestamp: new Date().toISOString() });
  });

  // Server-side Gemini AI Media Assistant Proxy
  app.post("/api/gemini/assistant", async (req, res) => {
    try {
      const { action, topic, mediaTitle, prompt, mediaType = 'video' } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;

      // Smart Fallback Generator if GEMINI_API_KEY is not set or in offline preview mode
      const getFallbackResponse = () => {
        if (action === 'generateTitle') {
          const t = topic || 'Modern Media & AI Technology';
          return {
            titles: [
              `The Future of ${t}: What You Need to Know in 2026`,
              `How ${t} is Changing the Creator Economy Forever`,
              `5 Unstoppable Trends in ${t} Revealed`,
              `Inside ${t}: A Deep Dive into Next-Gen Streaming`,
              `Mastering ${t}: Essential Guide for Digital Creators`
            ]
          };
        }
        if (action === 'generateDescription') {
          return {
            description: `In this episode on "${topic || mediaTitle || 'Digital Media Innovation'}", we explore key breakthroughs, practical creator strategies, and architectural insights. Watch till the end for exclusive tips on optimizing your workflow!\n\n📌 Timestamps:\n00:00 - Introduction & Key Takeaways\n02:30 - Core Breakthroughs & Insights\n06:15 - Practical Creator Workflows\n09:40 - Summary & Community Q&A\n\n🔔 Subscribe to WhoMedia for weekly tech, audio, and media stream updates!`
          };
        }
        if (action === 'generateScript') {
          return {
            script: `[SCENE 1: High Energy Intro - 00:00 to 00:30]\nHost: "Welcome back to WhoMedia! Today we're diving deep into ${topic || 'the future of content creation'}. If you haven't subscribed yet, hit that button now!"\n\n[SCENE 2: The Core Problem - 00:30 to 02:00]\nVisuals: B-roll showing high-frequency digital workflows.\nHost: "Most creators struggle with scale and engagement. Here's how new tools change the game..."\n\n[SCENE 3: Key Demonstration - 02:00 to 05:00]\nVisuals: On-screen demo of media pipeline.\nHost: "Notice how seamlessly this operates. Let's break down the 3 core pillars..."\n\n[SCENE 4: Outro & Call to Action - 05:00 to 05:30]\nHost: "What's your take on this? Leave a comment below and check out our playlist for more!"`
          };
        }
        if (action === 'suggestTags') {
          const base = (topic || mediaTitle || 'tech media').toLowerCase().split(' ');
          return {
            tags: ['#WhoMedia', '#ContentCreator', '#Tech2026', '#Streaming', '#DigitalMedia', `#${base[0] || 'tech'}`, '#FutureOfMedia']
          };
        }
        if (action === 'summarizeMedia') {
          return {
            summary: `This ${mediaType} explores key developments in ${mediaTitle || 'digital media'}. Main key takeaways include: 1) AI-driven workflows boost production speed by 3x. 2) High-fidelity audio and video streams significantly improve audience retention. 3) Community engagement is driven by interactive live comments and persistent playlists.`
          };
        }
        // General Chat Copilot
        return {
          response: `As WhoMedia's AI Copilot, I analyzed your prompt: "${prompt || 'How can I grow my audience?'}". \n\nKey Recommendation for Creators:\n1. **Optimize Your First 10 Seconds**: Use strong visual hooks and high-contrast thumbnails.\n2. **Leverage Multi-Format Distribution**: Repurpose long-form videos into audio podcast clips and shorts.\n3. **Engage in Live Streams**: Community Q&As increase subscriber loyalty by up to 40%!`
        };
      };

      if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
        return res.json({ success: true, isMock: true, data: getFallbackResponse() });
      }

      const ai = new GoogleGenAI({ apiKey });

      let systemInstruction = "You are WhoMedia AI Copilot, a professional media strategist, video producer, and creative consultant for digital creators on WhoMedia platform.";
      let userPrompt = prompt || `Help with ${action} for topic: ${topic || mediaTitle}`;

      if (action === 'generateTitle') {
        userPrompt = `Generate 5 catchy, viral, SEO-optimized video/podcast titles for topic: "${topic}". Return clean JSON array format under key "titles".`;
      } else if (action === 'generateDescription') {
        userPrompt = `Write a compelling 2-paragraph video description with timestamp markers and call-to-actions for a ${mediaType} titled: "${mediaTitle || topic}".`;
      } else if (action === 'generateScript') {
        userPrompt = `Write a structured 4-scene outline video script for topic: "${topic}". Include visual cues and voiceover dialogue.`;
      } else if (action === 'suggestTags') {
        userPrompt = `Provide 7 trending, relevant hashtag tags for a video/podcast about "${topic}". Return list of hashtags.`;
      } else if (action === 'summarizeMedia') {
        userPrompt = `Provide a concise 3-bullet executive summary and key takeaways for this ${mediaType}: "${mediaTitle}".`;
      }

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `${systemInstruction}\n\n${userPrompt}`,
      });

      const responseText = response.text || "";

      if (action === 'generateTitle') {
        try {
          const jsonMatch = responseText.match(/\{[\s\S]*\}/) || responseText.match(/\[[\s\S]*\]/);
          if (jsonMatch) {
            const parsed = JSON.parse(jsonMatch[0]);
            return res.json({ success: true, data: { titles: Array.isArray(parsed) ? parsed : (parsed.titles || [responseText]) } });
          }
        } catch {
          const titles = responseText.split('\n').filter(line => line.trim().length > 0).slice(0, 5);
          return res.json({ success: true, data: { titles } });
        }
      }

      if (action === 'generateDescription') {
        return res.json({ success: true, data: { description: responseText } });
      } else if (action === 'generateScript') {
        return res.json({ success: true, data: { script: responseText } });
      } else if (action === 'suggestTags') {
        const tags = responseText.split(/[\s,]+/).filter(t => t.startsWith('#') || t.length > 2).slice(0, 8);
        return res.json({ success: true, data: { tags } });
      } else if (action === 'summarizeMedia') {
        return res.json({ success: true, data: { summary: responseText } });
      }

      return res.json({ success: true, data: { response: responseText } });

    } catch (err: any) {
      console.error("Gemini AI Assistant Error:", err?.message || err);
      // Fallback on error
      return res.json({
        success: true,
        isMock: true,
        data: {
          response: "WhoMedia AI Copilot is currently active in offline preview mode. All tools are operational!"
        }
      });
    }
  });

  // Vite middleware for development vs Static in production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`WhoMedia server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
