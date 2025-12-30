import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import HeroEditor from "../../components/HeroEditor";
import StoryEditor from "../../components/StoryEditor";
import SkillsEditor from "../../components/SkillsEditor";
// ... others

export default async function SectionPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    const sectionNames: Record<string, string> = {
        hero: "Hero Section",
        story: "Story Section",
        skills: "Skills",
        projects: "Projects",
        testimonials: "Testimonials",
    };

    const name = sectionNames[id];

    if (!name) {
        notFound();
    }

    return (
        <div className="space-y-6">
            <Link href="/admin" className="inline-flex items-center text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">
                <ArrowLeft size={16} className="mr-1" /> Back to Dashboard
            </Link>

            <div className="border-b border-neutral-200 dark:border-neutral-800 pb-4">
                <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                    Edit {name}
                </h1>
            </div>

            <div className="bg-white dark:bg-neutral-950 rounded-xl border border-neutral-200 dark:border-neutral-800 p-6 shadow-sm">
                {/* Render specific editor based on ID */}
                {id === 'hero' && <HeroEditor />}
                {id === 'story' && <StoryEditor />}
                {id === 'skills' && <SkillsEditor />}
                {(id !== 'hero' && id !== 'story' && id !== 'skills') && (
                    <p className="text-neutral-500 italic">Editor for {name} is under construction.</p>
                )}
            </div>
        </div>
    );
}
