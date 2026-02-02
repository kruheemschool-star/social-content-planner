
// Hooks Type
export interface TripleHooks {
    challenging: string;
    beneficial: string;
    question: string;
}

export interface GeneratedContent {
    caption: string;
    body: string;
    cta: string;
    hashtags: string[]; // Deprecated, kept for compat
    coreHashtags?: string[]; // New: Content specific
    trendingHashtags?: string[]; // New: Lifestyle/Viral
    imagePrompt: string;
    imageUrl?: string; // New: generated image URL
    promptUsed: string;
    hooks: TripleHooks;
}

export async function generateSocialContent(
    topic: string,
    tone: string,
    platform: string,
    targetAudience: string,
    length: string,
    cta: string,
    personality: string
): Promise<GeneratedContent> {
    // Simulate network delay for mock
    // await new Promise(resolve => setTimeout(resolve, 1500));

    try {
        const response = await fetch('/api/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                topic, tone, platform, targetAudience, length, cta, personality
            }),
        });

        if (!response.ok) {
            console.warn("API Call failed, falling back to mock data:", await response.text());
            throw new Error("API Failed");
        }

        const data = await response.json();
        const fullCaption = `[เลือกหัวข้อด้านบน]\n\n${data.body}\n\n[Action]\n${data.cta}`;

        return {
            ...data,
            caption: fullCaption, // Ensure compatibility
            imageUrl: undefined // Start undefined
        };

    } catch (e) {
        console.warn("Using mock data due to error or missing key");

        // --- MOCK FALLBACK ---
        await new Promise(resolve => setTimeout(resolve, 1500));

        let platformInstruction = "";
        switch (platform) {
            case "TikTok": platformInstruction = "Focus on the first 3 seconds (Hook). Use short, punchy sentences. Add visual cues for text overlays."; break;
            case "Facebook": platformInstruction = "Focus on the first line and spacing for readability. Use relevant tags."; break;
            case "Instagram": platformInstruction = "Focus on aesthetic and mood. Use line breaks and a clean structure. Add engaging emojis."; break;
            case "YouTube Reels": platformInstruction = "Fast-paced script. Focus on visual storytelling and quick cuts."; break;
            default: platformInstruction = "Standard social media post format.";
        }

        const personalityInstruction = personality ? `Write with this personality/catchphrase: "${personality}"` : "Write with a friendly, helpful teacher vibe.";
        const prompt = `(MOCK) Create a ${length} content for ${platform} targeting ${targetAudience} about "${topic}" with a ${tone} tone...`;

        const hooks = {
            challenging: `รู้ไหมว่าถ้าพลาดบรรทัดเดียว คะแนนหายไปทั้งข้อ? เรื่อง ${topic} เนี่ยแหละตัวดี!`,
            beneficial: `สรุปสูตรลับ ${topic} ใน 3 บรรทัด อ่านจบทำข้อสอบได้ทันที!`,
            question: `เคยสงสัยไหมว่าทำไมเด็ก 80% ถึงตกม้าตายเรื่อง ${topic}? ความลับมันอยู่ที่ตรงนี้...`
        };

        const bodyContent = `[Interest] (Mock Data)\n${topic} อาจดูน่าปวดหัวสำหรับใครหลายคน... \n\n[Desire]\n(Tone: ${personality || "Friendly Teacher"})\nครูคัดเนื้อ ๆ เน้น ๆ มาให้แล้ว... \n\n[Platform Advice]\n${platformInstruction}`;

        let selectedCtaText = "";
        switch (cta) {
            case "Comment": selectedCtaText = `พิมพ์ "สนใจ" ไว้ใต้โพสต์เลยครับ!`; break;
            case "Share": selectedCtaText = `แชร์เก็บไว้ดูหน้าสอบรับรองไม่พลาด!`; break;
            case "Link": selectedCtaText = `จิ้มลิงก์หน้าโปรไฟล์ไปลุยกันต่อเลย!`; break;
            case "Send": selectedCtaText = `ส่งต่อนัดเพื่อนมาติวด่วน!`; break;
            default: selectedCtaText = `ติดตามทริคดีๆ ได้ใหม่ในโพสต์หน้าครับ`;
        }

        const fullCaption = `[เลือกหัวข้อด้านบน]\n\n${bodyContent}\n\n[Action]\n${selectedCtaText}`;

        return {
            caption: fullCaption,
            body: bodyContent,
            cta: selectedCtaText,
            hashtags: ["#คณิตศาสตร์", "#StudyGram", "#" + tone], // fallback
            coreHashtags: ["#" + topic.replace(/\s+/g, ''), "#คณิตศาสตร์"],
            trendingHashtags: ["#Dek68", "#StudyGram", "#ครูฮีมสอนเลข"],
            imagePrompt: `ภาพประกอบ 3D แบบมืออาชีพของ ${topic}, บริบทการศึกษาสำหรับ ${targetAudience} บน ${platform}, สไตล์ ${tone}, แสงนุ่มนวล, ความละเอียด 4k`,
            promptUsed: prompt,
            hooks: hooks
        };
    }
}
