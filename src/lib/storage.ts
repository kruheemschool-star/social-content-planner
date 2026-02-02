import { GeneratedContent } from "./gemini";

export interface SavedIdea extends GeneratedContent {
    id: string;
    savedAt: string;
    topic: string;
    inputs: {
        topic: string;
        tone: string;
        platform: string;
        targetAudience: string;
        length: string;
        cta: string;
        personality: string;
    }; // Store inputs for restoration
}

const STORAGE_KEY = "social-planner-ideas";

export const getSavedIdeas = (): SavedIdea[] => {
    if (typeof window === "undefined") return [];
    try {
        const item = localStorage.getItem(STORAGE_KEY);
        return item ? JSON.parse(item) : [];
    } catch (error) {
        console.error("Failed to load saved ideas", error);
        return [];
    }
};

export const saveIdea = (
    content: GeneratedContent,
    topic: string,
    inputParams: {
        tone: string;
        platform: string;
        targetAudience: string;
        length: string;
        cta: string;
        personality: string;
    }
): SavedIdea => {
    const ideas = getSavedIdeas();
    const newIdea: SavedIdea = {
        ...content,
        id: crypto.randomUUID(),
        savedAt: new Date().toISOString(),
        topic,
        inputs: { topic, ...inputParams }
    };

    // Add to beginning of array
    const updatedIdeas = [newIdea, ...ideas];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedIdeas));
    return newIdea;
};

export const deleteIdea = (id: string) => {
    const ideas = getSavedIdeas();
    const updatedIdeas = ideas.filter(idea => idea.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedIdeas));
}
