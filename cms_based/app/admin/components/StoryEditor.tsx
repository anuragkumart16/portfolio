import { prisma } from "@/app/lib/prisma";
import StoryForm from "./StoryForm"; // We will create this next
import { Suspense } from "react";

async function getStoryData() {
    try {
        const story = await prisma.story.findFirst();
        return story;
    } catch (error) {
        console.error("Failed to fetch story data:", error);
        return null;
    }
}

export default async function StoryEditor() {
    const story = await getStoryData();

    // If no story exists, we pass null, form should handle defaults
    // Sanitize data to match expected types (convert nulls to undefined)
    const sanitizedStory = story ? {
        ...story,
        tabs: story.tabs.map(tab => ({
            ...tab,
            year: tab.year || undefined
        }))
    } : null;

    return (
        <div>
            <StoryForm initialData={sanitizedStory} />
        </div>
    );
}
