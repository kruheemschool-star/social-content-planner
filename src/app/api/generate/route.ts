import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    // Fallback if no API key is set
    if (!apiKey) {
      return NextResponse.json(
        { error: "API Key not found. Please set GEMINI_API_KEY in .env.local" },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const body = await req.json();
    const { topic, tone, platform, targetAudience, length, cta, personality } = body;

    const prompt = `
      Act as a professional social media content creator and strategist.
      Create a ${length} post for ${platform} targeting ${targetAudience} about "${topic}".
      
      **Context & Constraints:**
      - Tone: ${tone}
      - Personality/Voice: ${personality || "Friendly, helpful, expert"}
      - Platform Best Practices: 
        ${platform === "TikTok" ? "- Short, visual, hook-heavy. Script format." : ""}
        ${platform === "Facebook" ? "- Conversational, community-focused. Use emojis." : ""}
        ${platform === "Instagram" ? "- Aesthetic, mood-based, clean spacing." : ""}
        ${platform === "YouTube Reels" ? "- Fast-paced script, visual storytelling." : ""}
      - Structure: AIDA (Attention, Interest, Desire, Action).

      **Required Output Format (JSON):**
      You must return valid JSON with the following structure:
      {
        "hooks": {
          "challenging": "Hook that challenges the reader or hits a pain point",
          "beneficial": "Hook that clearly states the benefit/value",
          "question": "Hook started with a question to spark curiosity"
        },
        "body": "The main content body (Interest & Desire sections). formatted with line breaks \\n\\n.",
        "cta": "The Call to Action text based on goal: ${cta}",
        "imagePrompt": "A highly detailed AI image generation prompt. MUST include: 1. Subject (what is happening), 2. Art Style (e.g. 3D Render, Minimalist, Watercolor), 3. Lighting/Mood (e.g. Soft lighting, Vibrant), 4. Technical specs (e.g. 4k resolution, high fidelity). Tone should be ${tone}.",
        "coreHashtags": ["#specific1", "#specific2"], // Generate 3-5 specific tags relevant to the topic
        "trendingHashtags": ["#viral1", "#lifestyle2"] // Generate 3-5 broad/trending tags relevant to the niche
      }
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();

    // Clean up markdown code blocks if present to parse JSON
    text = text.replace(/^```json\s*/, "").replace(/\s*```$/, "");

    const data = JSON.parse(text);

    return NextResponse.json({
      ...data,
      hashtags: [...(data.coreHashtags || []), ...(data.trendingHashtags || [])], // Backwards compat
      promptUsed: prompt
    });

  } catch (error) {
    console.error("Gemini API Error:", error);
    return NextResponse.json(
      { error: "Failed to generate content" },
      { status: 500 }
    );
  }
}
