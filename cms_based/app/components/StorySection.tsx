import { prisma } from "@/app/lib/prisma";
import Story, { StorySkeleton } from "./Story";

async function getStoryData() {
    try {
        const story = await prisma.story.findFirst({
            where: { isVisible: true },
        });
        // Prisma mongo composite types come back as object/array, should match interface
        return story;
    } catch (error) {
        console.error("Failed to fetch story data:", error);
        return null;
    }
}

export default async function StorySection() {
    const story = await getStoryData();

    // cast Prisma result to match StoryProps if needed, or rely on duck typing
    // Prisma types for composite fields might not strictly match if not manually typed in TS sometimes, but usually fine.

    // We pass data to Client Component
    return <Story story={story as any} />;
}

export { StorySkeleton };
