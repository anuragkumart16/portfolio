"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../lib/utils";
import { Skeleton } from "./ui/skeleton";
import { useAudience } from "../context/audience-context";
import { Audience } from "../types";

interface StoryTab {
    id: string;
    title: string;
    content: string;
    isVisible: boolean;
    audiences: string[];
    year?: string;
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
    const [isExpanded, setIsExpanded] = useState(false);

    if (!story || !story.isVisible || story.tabs.length === 0) {
        return null;
    }

    // Filter tabs based on audience
    const visibleTabs = story.tabs.filter(tab => {
        // First check strict visibility
        if (tab.isVisible === false) return false;

        // If no audiences defined, assume visible to all (backward compatibility)
        const tabAudiences = tab.audiences || ['general', 'company', 'freelance'];

        return tabAudiences.includes(audience);
    });

    if (visibleTabs.length === 0) return null;

    const currentTabId = activeTabId || visibleTabs[0].id;
    // Verify activeTab is in visibleTabs. If not, reset to first visible.
    const validCurrentTabId = visibleTabs.find(t => t.id === currentTabId) ? currentTabId : visibleTabs[0].id;
    const tabIndex = visibleTabs.findIndex(t => t.id === validCurrentTabId);

    const activeTab = visibleTabs.find(t => t.id === validCurrentTabId);

    const prevTab = tabIndex > 0 ? visibleTabs[tabIndex - 1] : null;
    const nextTab = tabIndex < visibleTabs.length - 1 ? visibleTabs[tabIndex + 1] : null;

    const handleTabChange = (id: string) => {
        setActiveTabId(id);
        setIsExpanded(false); // Reset expansion on tab change
    };

    // Calculate word count
    const wordCount = activeTab?.content.split(/\s+/).length || 0;
    const isLongText = wordCount > 150;

    // Process content for display
    const getTruncatedContent = (text: string, limit: number) => {
        const paragraphs = text.split('\n\n');
        let currentWordCount = 0;
        const truncatedParagraphs: string[] = [];

        for (const p of paragraphs) {
            const pWords = p.split(/\s+/);
            if (currentWordCount + pWords.length <= limit) {
                truncatedParagraphs.push(p);
                currentWordCount += pWords.length;
            } else {
                const remaining = limit - currentWordCount;
                if (remaining > 0) {
                    // Start slice from 0, join with space, add ellipsis
                    truncatedParagraphs.push(pWords.slice(0, remaining).join(" ") + "...");
                }
                break;
            }
        }
        return truncatedParagraphs.join('\n\n');
    };

    const displayedContent = isLongText && !isExpanded
        ? getTruncatedContent(activeTab?.content || "", 150)
        : activeTab?.content;

    return (
        <section className="py-24 px-4 md:px-8 max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12 md:gap-20">

                {/* Left Column: Vertical Timeline Navigation */}
                <div className="flex flex-col">
                    <div className="mb-10 pl-2">
                        <h2 className="text-3xl md:text-5xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
                            My Journey
                        </h2>
                        <p className="text-neutral-500 dark:text-neutral-400 mt-2 text-sm md:text-base leading-relaxed max-w-xs">
                            Navigate the chapters of my professional story.
                        </p>
                    </div>

                    <div className="relative pl-6 space-y-10">
                        {/* The continuous vertical thread line */}
                        <div className="absolute left-[29px] top-4 bottom-4 w-[2px] bg-neutral-200 dark:bg-neutral-800" />

                        {/* Animated Progress Line */}
                        <motion.div
                            className="absolute left-[29px] top-4 w-[2px] bg-linear-to-b from-neutral-900 to-neutral-600 dark:from-neutral-100 dark:to-neutral-400 origin-top"
                            initial={{ height: "0%" }}
                            animate={{
                                height: `${(tabIndex / (visibleTabs.length - 1 || 1)) * 100}%`
                            }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                            style={{ maxHeight: 'calc(100% - 32px)' }}
                        />

                        {visibleTabs.map((tab, idx) => {
                            const isActive = validCurrentTabId === tab.id;
                            const isPast = idx < tabIndex;

                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => handleTabChange(tab.id)}
                                    className="group relative flex items-start text-left w-full outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-neutral-900 rounded-lg py-1"
                                >
                                    {/* Node / Bead */}
                                    <div className={cn(
                                        "relative z-10 shrink-0 w-3 h-3 mt-2 rounded-full border-2 transition-all duration-300",
                                        isActive
                                            ? "border-neutral-900 dark:border-neutral-100 bg-neutral-900 dark:bg-neutral-100 scale-125 shadow-[0_0_0_4px_rgba(0,0,0,0.05)] dark:shadow-[0_0_0_4px_rgba(255,255,255,0.05)]"
                                            : isPast
                                                ? "border-neutral-900 dark:border-neutral-100 bg-neutral-900 dark:bg-neutral-100" // Filled for past
                                                : "border-neutral-400 dark:border-neutral-600 bg-white dark:bg-neutral-950 group-hover:scale-110 group-hover:border-neutral-600"
                                    )}>
                                        {isActive && (
                                            <motion.div
                                                layoutId="activeNodeGlow"
                                                className="absolute -inset-3 rounded-full bg-neutral-900/10 dark:bg-neutral-100/10 blur-sm brightness-150"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ duration: 0.3 }}
                                            />
                                        )}
                                    </div>

                                    {/* Text Label */}
                                    <div className="ml-6 flex flex-col">
                                        <span className={cn(
                                            "text-xl md:text-2xl font-bold transition-colors duration-300",
                                            isActive
                                                ? "text-neutral-900 dark:text-neutral-100"
                                                : "text-neutral-400 dark:text-neutral-600 group-hover:text-neutral-600 dark:group-hover:text-neutral-400"
                                        )}>
                                            {tab.title}
                                        </span>
                                        {tab.year && (
                                            <span className={cn(
                                                "text-sm font-medium mt-1 transition-colors duration-300",
                                                isActive
                                                    ? "text-neutral-500 dark:text-neutral-400"
                                                    : "text-neutral-300 dark:text-neutral-700 group-hover:text-neutral-500 dark:group-hover:text-neutral-500"
                                            )}>
                                                {tab.year}
                                            </span>
                                        )}
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Right Column: Content Display */}
                <div className="relative min-h-[400px] md:sticky md:top-32 md:self-start md:h-fit flex flex-col justify-start pt-4">
                    <AnimatePresence mode="wait">
                        {activeTab && (
                            <motion.div
                                key={activeTab.id}
                                initial={{ opacity: 0, x: 20, filter: "blur(4px)" }}
                                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                                exit={{ opacity: 0, x: -20, filter: "blur(4px)" }}
                                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                className="w-full flex flex-col"
                            >
                                <div className="bg-white dark:bg-neutral-900/50 rounded-2xl p-8 md:p-12 border border-neutral-100 dark:border-neutral-800/50 shadow-sm relative overflow-hidden backdrop-blur-xl grow">
                                    {/* Subtle background decoration */}
                                    <div className="absolute -right-20 -top-20 w-64 h-64 bg-neutral-100 dark:bg-neutral-800 rounded-full blur-3xl opacity-50 pointer-events-none" />

                                    <div className="relative z-10 prose prose-lg dark:prose-invert max-w-none text-neutral-600 dark:text-neutral-300 leading-relaxed">
                                        {(displayedContent || "").split('\n\n').map((paragraph, idx) => (
                                            <p key={idx} className="mb-6 last:mb-0">
                                                {paragraph}
                                            </p>
                                        ))}
                                    </div>

                                    {isLongText && (
                                        <button
                                            onClick={() => setIsExpanded(!isExpanded)}
                                            className="mt-4 text-sm font-semibold text-neutral-900 dark:text-neutral-100 hover:underline decoration-neutral-400 underline-offset-4"
                                        >
                                            {isExpanded ? "Read Less" : "Read More"}
                                        </button>
                                    )}
                                </div>

                                {/* Navigation Buttons */}
                                <div className="flex justify-between mt-8">
                                    {prevTab ? (
                                        <button
                                            onClick={() => handleTabChange(prevTab.id)}
                                            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
                                        >
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                                            Previous: {prevTab.title || 'Previous'}
                                        </button>
                                    ) : <div />}

                                    {nextTab ? (
                                        <button
                                            onClick={() => handleTabChange(nextTab.id)}
                                            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
                                        >
                                            Next: {nextTab.title || 'Next'}
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                                        </button>
                                    ) : <div />}
                                </div>
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
        <section className="py-24 px-4 md:px-8 max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12">
                <div className="space-y-8">
                    <Skeleton className="h-12 w-48" />
                    <div className="space-y-6">
                        <Skeleton className="h-6 w-32" />
                        <Skeleton className="h-6 w-40" />
                        <Skeleton className="h-6 w-28" />
                    </div>
                </div>
                <div className="space-y-4">
                    <Skeleton className="h-80 w-full rounded-2xl" />
                </div>
            </div>
        </section>
    );
}
