"use client";

import { useAudience } from "../context/audience-context";
import * as FaIcons from "react-icons/fa";
import * as SiIcons from "react-icons/si";
import { motion } from "framer-motion";

// Simplified icon matching for demo.
const IconLibrary: any = { ...FaIcons, ...SiIcons };

interface SkillItem {
    id: string;
    name: string;
    iconName: string | null;
    isVisible: boolean;
    audiences: any[]; // Prisma Enum array
    isCore: boolean;
}

interface SkillCategory {
    id: string;
    title: string;
    isVisible: boolean;
    audiences: any[];
    skills: SkillItem[];
}

interface SkillsDisplayProps {
    section: {
        isVisible: boolean;
        categories: SkillCategory[];
    } | null;
}

export default function SkillsDisplay({ section }: SkillsDisplayProps) {
    const { audience } = useAudience();

    if (!section || !section.isVisible) return null;

    // Filter Categories
    const visibleCategories = (section.categories || []).filter(cat => {
        if (!cat.isVisible) return false;
        const catAudiences = cat.audiences || ['general', 'company', 'freelance'];
        return catAudiences.includes(audience);
    });

    if (visibleCategories.length === 0) return null;

    return (
        <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight mb-4">
                    Skills & Technologies
                </h2>
                <p className="text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto text-lg">
                    The tools and frameworks I use to build digital experiences.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                {visibleCategories.map((cat, index) => {
                    // Filter Skills within Category
                    const visibleSkills = (cat.skills || []).filter(skill => {
                        if (!skill.isVisible) return false;
                        const skillAudiences = skill.audiences || ['general', 'company', 'freelance'];
                        return skillAudiences.includes(audience);
                    });

                    if (visibleSkills.length === 0) return null;

                    return (
                        <motion.div
                            key={cat.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-white dark:bg-[#0a0a0a] rounded-3xl border border-neutral-200 dark:border-neutral-800 p-8 shadow-sm hover:shadow-md transition-shadow duration-300 backdrop-blur-sm flex flex-col h-full"
                        >
                            <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-6 flex items-center gap-3">
                                <span className="w-2 h-2 rounded-full bg-neutral-900 dark:bg-neutral-100" />
                                {cat.title}
                            </h3>

                            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                                {visibleSkills.map((skill, i) => {
                                    const IconComponent = skill.iconName && IconLibrary[skill.iconName]
                                        ? IconLibrary[skill.iconName]
                                        : null;

                                    return (
                                        <motion.div
                                            key={skill.id}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.3, delay: (index * 0.1) + (i * 0.05) }}
                                            className="group relative flex flex-col items-center justify-center gap-3 p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/40 hover:bg-white dark:hover:bg-neutral-800 border border-transparent hover:border-neutral-200 dark:hover:border-neutral-700 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:hover:shadow-neutral-900/50"
                                        >
                                            <div className="text-3xl text-neutral-600 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-neutral-100 transition-colors transform duration-300 relative z-10">
                                                {IconComponent ? <IconComponent /> : <span className="text-lg font-bold">?</span>}
                                            </div>

                                            <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-neutral-200 text-center relative z-10">
                                                {skill.name}
                                            </span>

                                            {/* Glow Effect */}
                                            <div className="absolute inset-0 rounded-2xl bg-linear-to-tr from-neutral-100/0 via-neutral-100/0 to-neutral-100/50 dark:from-neutral-800/0 dark:via-neutral-800/0 dark:to-neutral-700/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}
