import { OpenAI } from "openai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const apiKey = process.env.OPENAI_API_KEY;

        // Mock Fallback if no key
        if (!apiKey) {
            console.warn("No OPENAI key found, returning mock image");
            await new Promise(r => setTimeout(r, 2000)); // Simulate delay
            return NextResponse.json({
                url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
            });
        }

        const openai = new OpenAI({ apiKey });

        const body = await req.json();
        const { prompt } = body;

        const response = await openai.images.generate({
            model: "dall-e-3",
            prompt: prompt,
            n: 1,
            size: "1024x1024",
        });

        if (!response.data || !response.data[0].url) {
            throw new Error("No image data returned from OpenAI");
        }

        return NextResponse.json({ url: response.data[0].url });

    } catch (error) {
        console.error("OpenAI API Error:", error);
        return NextResponse.json(
            { error: "Failed to generate image" },
            { status: 500 }
        );
    }
}
