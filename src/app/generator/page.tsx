"use client"

import { useState, useMemo } from "react"
import { Copy, Code, Terminal, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"

export default function GeneratorPage() {
    const [topic, setTopic] = useState("")
    const [tone, setTone] = useState("Educational")
    const [platform, setPlatform] = useState("Facebook")
    const [targetAudience, setTargetAudience] = useState("นักเรียน")
    const [academicLevel, setAcademicLevel] = useState("ป.4 (Grade 4)")
    const [contentGoal, setContentGoal] = useState("Concept Explainer")
    const [length, setLength] = useState("ปานกลาง")
    const [cta, setCta] = useState("Comment")
    const [personality, setPersonality] = useState("")

    const [referenceType, setReferenceType] = useState("None") // New State
    const [referenceDesc, setReferenceDesc] = useState("") // New State
    const [includeHashtags, setIncludeHashtags] = useState(true) // New State
    const [includeImageGen, setIncludeImageGen] = useState(true) // New State

    // Article Mode specific states
    const [articleEmotion, setArticleEmotion] = useState("Fear/Urgency")
    const [authorViewpoint, setAuthorViewpoint] = useState("Teacher")

    const [isCopied, setIsCopied] = useState(false)

    const generatedPrompt = useMemo(() => {
        if (!topic) return ""

        // Define goal-specific constraints
        let goalConstraint = ""
        switch (contentGoal) {
            case "Concept Explainer":
                goalConstraint = "Focus on the 'Why' and 'How'. Explain the core concept clearly using analogies. Avoid just showing formulas without explanation."
                break;
            case "Problem Solving":
                goalConstraint = "Provide a sample problem and a detailed step-by-step solution. Break down the logic for each step."
                break;
            case "Math Myth/History":
                goalConstraint = "Tell a storytelling narrative about a mathematician or the history behind this concept. Make it intriguing and fun."
                break;
            case "Motivation":
                goalConstraint = "Focus on encouraging students who struggle with this topic. Use an empathetic tone and growth mindset language."
                break;
        }

        // Social Math Constraints
        const socialMathRules = `
STRICT SOCIAL MEDIA MATH RULES(CRITICAL):
        1. ** ABSOLUTELY NO LATEX OR MATH EQUATIONS **: Do not use $, \\, ^, \\times, \\frac, =, or any other math notation.
2. ** NO NUMBERS(DIGITS) **: Do not use digits(0 - 9) unless absolutely necessary(e.g., years, dates).
   - ❌ Bad: 5, 10, 50 %
            - ✅ Good: ห้า, สิบ, ห้าสิบเปอร์เซ็นต์
        3. ** PLAIN TEXT NARRATIVE **: Write everything as a story or narrative.
   - ❌ Bad: 5 + 5 = 10
            - ✅ Good: เมื่อเรานำเลขห้ามาบวกกับห้า ผลลัพธ์ที่ได้คือสิบ
        4. ** NO EQUATION BLOCKS **: Do not output independent lines of equations.Embed the logic into sentences.
5. ** Thai Language Priority **: Use Thai words for everything, including numbers and operations.`

        // Reference Material Instructions
        let referenceInstructions = ""
        if (referenceType !== "None") {
            const typeUpper = referenceType.toUpperCase();
            let specificRule = "";
            switch (referenceType) {
                case "Image":
                    specificRule = "Analyze lines, shapes, and numerical relationships in the image. Explain the visual concept simply.";
                    break;
                case "PDF":
                    specificRule = "Summarize Key Takeaways and teaching steps from the document. Do not omit core details.";
                    break;
                case "Video":
                    specificRule = "Decode the tone and storytelling sequence. Match the rhythm and style of the clip.";
                    break;
                case "Math Problem":
                    specificRule = `Constraint: DO NOT provide a step - by - step solution.We want understanding, not just the answer.
Focus strictly on:
        1. Key Concept / The 'Heart' of the problem(What is this testing ?).
2. Strategic Overview(How should one approach this ?).
3. Danger Zones / Traps(Where do students usually fail ?).
        Tone: Insightful, Strategic, Interesting.`;
                    break;
            }

            referenceInstructions = `
REFERENCE MATERIAL INSTRUCTIONS:
Strictly adhere to the provided ${typeUpper}: "${referenceDesc}".
- ${specificRule}
    - CONSTRAINT: Do not introduce external information that conflicts with this source.`
        }

        // Hashtag Instructions
        const hashtagInstructions = includeHashtags ? `
HASHTAG INSTRUCTIONS:
Generate exactly 5 hashtags at the end of the post, sorted by priority:
    1. Topic(e.g., #${topic.replace(/\s+/g, '')})
    2. Level(e.g., #${academicLevel.split(' ')[0]})
    3. Brand(#ครูฮีม)
    4. Concept(key concept from content)
    5. Popular Keyword
    Constraint: Use Thai primarily.Avoid overly broad tags.` : ""

        // ---------------------------------------------------------
        // New Article Mode Logic
        // ---------------------------------------------------------

        const roleDescription = authorViewpoint === "Teacher"
            ? "คุณคือผู้เชี่ยวชาญด้านการเขียน Content Marketing สำหรับการศึกษา (มุมมองครู) ที่มีจิตวิทยาในการสื่อสารกับผู้ปกครองและเด็ก เน้นการแนะนำเทคนิค"
            : "คุณคือผู้เชี่ยวชาญด้านการเขียน Content Marketing สำหรับการศึกษา (มุมมองผู้ปกครอง) ที่เข้าใจหัวอกพ่อแม่ แชร์ประสบการณ์ และมีความเข้าอกเข้าใจสูง"

        const emotionInstruction = `ในบทความนี้ ให้เน้นไปที่อารมณ์ ** ${articleEmotion}** โดยใช้ภาษาที่สื่อสารแล้วคนอ่านรู้สึกตามนั้นจริงๆ`

        return `Role: ${roleDescription}
    Task: Write a ${platform} post about "${topic}".

Target Audience: ${targetAudience}.
Academic Level: ${academicLevel}.
Content Goal: ${contentGoal}.
    Tone: ${tone}.
    Length: ${length}.
${referenceInstructions}

### Core Emotion
${emotionInstruction}

### Content Structure
Strictly follow this 1 - 2 - 3 - 4 - 5 structure:
    1. ** Hook(พาดหัว):** ต้องหยุดนิ้วคนอ่านด้วยอารมณ์ ${articleEmotion}.
    2. ** Pain Point / Need:** เล่าปัญหาที่ผู้ปกครองเจอ หรือเป้าหมายที่ต้องการให้เห็นภาพชัด.
3. ** Solution(The Math Technique):** แทรกเทคนิคการเรียนหรือการทำโจทย์คณิตศาสตร์เข้าไปเป็นทางออก.
4. ** Call to Action(CTA):** ${cta}.
    5. ** Hashtags:** เลือกมา 5 แฮชแท็กที่สำคัญและเกี่ยวข้องที่สุด.

        Constraints:
    - Content complexity and vocabulary to be suitable for ${academicLevel} level.
- ${goalConstraint}
    - Use relevant emojis.
- Language: Thai(Natural and engaging).
        ${socialMathRules}
${hashtagInstructions}

Format the output as:
    1. Hook Options(3 variants)
    2. Main Content(The 5 - step structure above)(IMPORTANT: Wrap this section inside a Markdown Code Block for easy copying)
${includeImageGen ? "3. Visual Idea (Image description)" : "Constraint: ไม่ต้องระบุรายละเอียดของภาพประกอบ"} `
    }, [
        topic,
        contentGoal,

        referenceType,
        referenceDesc,
        includeHashtags,
        personality,
        platform,
        targetAudience,
        academicLevel,
        tone,
        length,
        cta,
        includeImageGen,
        articleEmotion,
        authorViewpoint
    ])

    const handleCopy = () => {
        if (!generatedPrompt) return
        navigator.clipboard.writeText(generatedPrompt)
        setIsCopied(true)
        setTimeout(() => setIsCopied(false), 2000)
    }

    return (
        <div className="p-8 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">สร้างคำสั่ง AI (Prompt Builder)</h1>
                    <p className="text-muted-foreground mt-2">เตรียมชุดคำสั่งให้พร้อม แล้วก๊อปไปวางใน Gemini ได้เลย!</p>
                </div>

                <div className="bg-card border rounded-xl p-6 space-y-6 shadow-sm">
                    {/* Topic & Audience & Goal */}
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">หัวข้อ / คีย์เวิร์ด</label>
                            <input
                                value={topic}
                                onChange={(e) => setTopic(e.target.value)}
                                placeholder="เช่น ทฤษฎีบทพีทาโกรัส"
                                className="w-full h-10 px-3 rounded-md border bg-background focus:ring-2 focus:ring-primary focus:outline-none"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">กลุ่มเป้าหมาย</label>
                                <select
                                    value={targetAudience}
                                    onChange={(e) => setTargetAudience(e.target.value)}
                                    className="w-full h-10 px-3 rounded-md border bg-background"
                                >
                                    <option value="นักเรียนทั่วไป">นักเรียนทั่วไป</option>
                                    <option value="นักเรียนที่ไม่ชอบเลข">นักเรียนที่อ่อนเลข</option>
                                    <option value="ผู้ปกครอง">ผู้ปกครอง</option>
                                    <option value="ครู">เพื่อนครู</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">ระดับชั้น (Difficulty)</label>
                                <select
                                    value={academicLevel}
                                    onChange={(e) => setAcademicLevel(e.target.value)}
                                    className="w-full h-10 px-3 rounded-md border bg-background font-medium text-pink-600 focus:ring-2 focus:ring-pink-500"
                                >
                                    <option value="ป.4 (Grade 4)">ป.4 (Grade 4)</option>
                                    <option value="ป.5 (Grade 5)">ป.5 (Grade 5)</option>
                                    <option value="ป.6 (Grade 6)">ป.6 (Grade 6)</option>
                                    <option value="ม.1 (Grade 7)">ม.1 (Grade 7)</option>
                                    <option value="ม.2 (Grade 8)">ม.2 (Grade 8)</option>
                                    <option value="ม.3 (Grade 9)">ม.3 (Grade 9)</option>
                                    <option value="ม.4 (Grade 10)">ม.4 (Grade 10)</option>
                                    <option value="ม.5 (Grade 11)">ม.5 (Grade 11)</option>
                                    <option value="ม.6 (Grade 12)">ม.6 (Grade 12)</option>
                                    <option value="มหาวิทยาลัย (University)">มหาวิทยาลัย (University)</option>
                                    <option value="บุคคลทั่วไป (General Public)">บุคคลทั่วไป (General Public)</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-indigo-600">วัตถุประสงค์ (Content Goal)</label>
                            <select
                                value={contentGoal}
                                onChange={(e) => setContentGoal(e.target.value)}
                                className="w-full h-10 px-3 rounded-md border border-indigo-200 bg-indigo-50/50 text-indigo-700 focus:ring-indigo-500"
                            >
                                <option value="Concept Explainer">Concept Explainer (อธิบายที่มาที่ไป)</option>
                                <option value="Problem Solving">Problem Solving (ตะลุยโจทย์)</option>
                                <option value="Math Myth/History">Math Myth/History (เรื่องเล่า/ประวัติศาสตร์)</option>
                                <option value="Motivation">Motivation (ปลุกใจ/ให้กำลังใจ)</option>
                            </select>
                        </div>

                        {/* Article Mode Options (New) */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-pink-600">เลือกอารมณ์ (Emotion)</label>
                                <select
                                    value={articleEmotion}
                                    onChange={(e) => setArticleEmotion(e.target.value)}
                                    className="w-full h-10 px-3 rounded-md border border-pink-200 bg-pink-50/50 text-pink-700 focus:ring-pink-500"
                                >
                                    <optgroup label="ความกลัว (Fear/Urgency)">
                                        <option value="Fear/Urgency">กลัว (Fear/Urgency) - กลัวลูกเรียนไม่ทัน</option>
                                    </optgroup>
                                    <optgroup label="ความหวัง (Future Planning)">
                                        <option value="Future Planning">ความหวัง (Future Planning) - วางรากฐานสู่ความสำเร็จ</option>
                                    </optgroup>
                                    <optgroup label="ความเข้าอกเข้าใจ (Empathy)">
                                        <option value="Empathy">เข้าใจ (Empathy) - ปลอบประโลม/ลดความกดดัน</option>
                                    </optgroup>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-blue-600">มุมมอง (Point of View)</label>
                                <select
                                    value={authorViewpoint}
                                    onChange={(e) => setAuthorViewpoint(e.target.value)}
                                    className="w-full h-10 px-3 rounded-md border border-blue-200 bg-blue-50/50 text-blue-700 focus:ring-blue-500"
                                >
                                    <option value="Teacher">มุมมองครู (Teacher) - แนะนำเทคนิค</option>
                                    <option value="Parent">มุมมองผู้ปกครอง (Parent) - แชร์ประสบการณ์</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Reference Material (New Section) */}
                    <div className="space-y-3 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg border border-slate-200 dark:border-slate-800">
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                                📚 แหล่งข้อมูลอ้างอิง (Reference Source)
                            </label>
                            <select
                                value={referenceType}
                                onChange={(e) => setReferenceType(e.target.value)}
                                className="h-8 px-2 rounded-md border bg-background text-xs"
                            >
                                <option value="None">ไม่มี (None)</option>
                                <option value="Image">🖼️ รูปภาพ (Image)</option>
                                <option value="Math Problem">📸 รูปโจทย์เลข (Math Problem Strategy)</option>
                                <option value="PDF">📄 เอกสาร (PDF)</option>
                                <option value="Video">🎥 วิดีโอ (Video)</option>
                            </select>
                        </div>

                        {referenceType !== "None" && (
                            <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                                <input
                                    value={referenceDesc}
                                    onChange={(e) => setReferenceDesc(e.target.value)}
                                    placeholder={
                                        referenceType === "Image" ? "เช่น รูปจานดาวเทียม, กราฟพาราโบลา..." :
                                            referenceType === "Math Problem" ? "เช่น โจทย์แคลคูลัส 1 ข้อ, เรขาคณิต..." :
                                                referenceType === "PDF" ? "เช่น ชีทบทที่ 5, คู่มือครูหน้า 10..." :
                                                    "เช่น ลิงก์ YouTube, คลิปสอนเรื่อง..."
                                    }
                                    className="w-full h-9 px-3 rounded-md border bg-white focus:ring-2 focus:ring-slate-400 focus:outline-none text-sm"
                                />
                                <p className="text-[10px] text-muted-foreground mt-1 text-right">
                                    *อย่าลืมแนบไฟล์จริงเมื่อนำคำสั่งไปใช้ใน AI
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Tone & Platform */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">โทน</label>
                            <select
                                value={tone}
                                onChange={(e) => setTone(e.target.value)}
                                className="w-full h-10 px-3 rounded-md border bg-background"
                            >
                                <option value="Educational & Clear">วิชาการแต่เข้าใจง่าย</option>
                                <option value="Fun & Humorous">ตลกโปกฮา</option>
                                <option value="Inspirational">สร้างแรงบันดาลใจ</option>
                                <option value="Urgent / Promotional">เชิญชวนแกมบังคับ</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">แพลตฟอร์ม</label>
                            <select
                                value={platform}
                                onChange={(e) => setPlatform(e.target.value)}
                                className="w-full h-10 px-3 rounded-md border bg-background"
                            >
                                <option value="Facebook Post">Facebook Post</option>
                                <option value="TikTok Script">TikTok Script</option>
                                <option value="Instagram Caption">Instagram Caption</option>
                                <option value="Twitter Thread">Twitter Thread</option>
                            </select>
                        </div>
                    </div>

                    {/* Personality & Options */}
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">ตัวตนของคุณ (Persona)</label>
                            <input
                                value={personality}
                                onChange={(e) => setPersonality(e.target.value)}
                                placeholder="เช่น ครูพี่ฮีมผู้ใจดี, ติวเตอร์สายฮา..."
                                className="w-full h-10 px-3 rounded-md border bg-background"
                            />
                        </div>

                        <div className="space-y-2 p-3 bg-muted/20 rounded-lg border">

                            <div className="flex items-center space-x-2 mt-2">
                                <input
                                    type="checkbox"
                                    id="includeHashtags"
                                    checked={includeHashtags}
                                    onChange={(e) => setIncludeHashtags(e.target.checked)}
                                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                />
                                <label
                                    htmlFor="includeHashtags"
                                    className="text-sm font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer text-black"
                                >
                                    #️⃣ รวมแฮชแท็กอัตโนมัติ (Auto-Hashtags #ครูฮีม)
                                </label>
                            </div>
                            <div className="flex items-center space-x-2 mt-2">
                                <input
                                    type="checkbox"
                                    id="includeImageGen"
                                    checked={includeImageGen}
                                    onChange={(e) => setIncludeImageGen(e.target.checked)}
                                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                />
                                <label
                                    htmlFor="includeImageGen"
                                    className="text-sm font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer text-black"
                                >
                                    🖼️ รวมไอเดียภาพประกอบ (Include Visual Idea)
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* CTA & Length */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Call to Action (CTA)</label>
                            <select
                                value={cta}
                                onChange={(e) => setCta(e.target.value)}
                                className="w-full h-10 px-3 rounded-md border bg-background"
                            >
                                <option value="Comment answer below">เม้นตอบคำถาม</option>
                                <option value="Share to save">แชร์เก็บไว้ดู</option>
                                <option value="Click link in bio">คลิกลิงก์สมัคร</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">ความยาว</label>
                            <div className="flex bg-muted p-1 rounded-lg h-10 items-center">
                                {['สั้น (Short)', 'กลาง (Medium)', 'ยาว (Long detailed)'].map((l) => (
                                    <button
                                        key={l}
                                        onClick={() => setLength(l)}
                                        className={cn(
                                            "flex-1 py-1 text-[10px] font-medium rounded-md transition-all h-full whitespace-nowrap px-1",
                                            length === l ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                                        )}
                                    >
                                        {l.split(' ')[0]}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>


                </div>
            </div>

            <div className="space-y-6">
                <div className={cn(
                    "h-full border-2 border-dashed rounded-xl p-8 flex flex-col transition-all relative overflow-hidden",
                    generatedPrompt ? "bg-card border-solid border-border shadow-lg" : "bg-muted/10 border-muted justify-center items-center text-muted-foreground"
                )}>
                    {generatedPrompt ? (
                        <div className="h-full flex flex-col">
                            {/* Header with Title and Copy Button */}
                            <div className="flex items-center justify-between mb-4 border-b pb-4">
                                <div>
                                    <h2 className="text-lg font-bold flex items-center gap-2">
                                        <Code className="h-5 w-5 text-blue-500" />
                                        ชุดคำสั่งพร้อมใช้ (Ready-to-Use)
                                    </h2>
                                    <a
                                        href="https://gemini.google.com"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-xs flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors mt-1"
                                    >
                                        <ExternalLink className="h-3 w-3" /> เปิด Gemini
                                    </a>
                                </div>
                                <button
                                    onClick={handleCopy}
                                    className={cn(
                                        "h-9 px-4 rounded-full font-medium text-sm flex items-center gap-2 transition-all shadow-sm",
                                        isCopied ? "bg-green-600 text-white" : "bg-primary text-primary-foreground hover:bg-primary/90"
                                    )}
                                >
                                    {isCopied ? (
                                        <>✓ Copied!</>
                                    ) : (
                                        <><Copy className="h-4 w-4" /> Copy Prompt</>
                                    )}
                                </button>
                            </div>

                            {/* Prompt Content Box (Facebook-like) */}
                            <div className="flex-1 bg-white dark:bg-slate-950 p-6 rounded-lg font-sans text-base leading-relaxed overflow-y-auto max-h-[600px] whitespace-pre-wrap text-slate-800 dark:text-slate-200 border shadow-inner">
                                {generatedPrompt}
                            </div>
                        </div>
                    ) : (
                        <div className="text-center space-y-2">
                            <Terminal className="h-12 w-12 mx-auto opacity-20" />
                            <p className="font-medium">รอคำสั่ง...</p>
                            <p className="text-xs">กรอกข้อมูลฝั่งซ้ายแล้วกดปุ่มเพื่อเริ่มสร้าง</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
