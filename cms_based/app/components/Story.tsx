"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../lib/utils";
import { Skeleton } from "./ui/skeleton";
import { useAudience } from "../context/audience-context";

interface StoryTab {
    id: string;
    title: string;
    content: string; // Markdown or text
    isVisible: boolean;
}

interface StoryProps {
    story: {
        isVisible: boolean;
        tabs: StoryTab[];
    } | null;
}

export default function Story({ story }: StoryProps) {
    const { audience } = useAudience();
    const [activeTabId, setActiveTabId] = useState<string | null>(null);

    // Audience Rules: Hidden for company by default (unless overridden or specific logic applied here)
    // PRD says: "Character limits enforced. Audience Rules: Visible to general and freelance. Hidden for company by default"
    // If no story logic in parent, we handle here.

    if (audience === 'company') {
        return null;
    }

    if (!story || !story.isVisible || story.tabs.length === 0) {
        return null;
    }

    // Set initial tab
    if (!activeTabId && story.tabs.length > 0) {
        // Avoid state update during render in a way that causes loops, but initial null is fine.
        // We can just derive it.
    }

    const currentTabId = activeTabId || story.tabs[0].id;
    const activeTab = story.tabs.find(t => t.id === currentTabId);

    return (
        <section className="py-12 px-4 md:px-8 max-w-4xl mx-auto">
            <div className="flex flex-col gap-6">
                <div className="flex space-x-4 border-b border-neutral-200 dark:border-neutral-800 pb-2 overflow-x-auto">
                    {story.tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTabId(tab.id)}
                            className={cn(
                                "pb-2 text-sm md:text-base font-medium transition-colors whitespace-nowrap",
                                currentTabId === tab.id
                                    ? "text-neutral-900 dark:text-neutral-100 border-b-2 border-neutral-900 dark:border-neutral-100 -mb-2.5"
                                    : "text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
                            )}
                        >
                            {tab.title}
                        </button>
                    ))}
                </div>

                <div className="min-h-[200px]">
                    <AnimatePresence mode="wait">
                        {activeTab && (
                            <motion.div
                                key={activeTab.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                                className="prose dark:prose-invert max-w-none"
                            >
                                <p className="text-lg leading-relaxed text-neutral-700 dark:text-neutral-300">
                                    {activeTab.content}
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}

export function StorySkeleton() {
    return (
        <section className="py-12 px-4 md:px-8 max-w-4xl mx-auto">
            <div className="flex flex-col gap-6">
                <div className="flex space-x-4 border-b pb-2">
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-6 w-20" />
                </div>
                <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                </div>
            </div>
        </section>
    )
}
