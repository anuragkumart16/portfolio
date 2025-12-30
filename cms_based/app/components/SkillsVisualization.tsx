"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/app/lib/utils";

interface Skill {
    id: string;
    name: string;
    category: string;
    isCore: boolean;
    description: string | null;
}

interface SkillsVisualizationProps {
    skills: Skill[];
}

export default function SkillsVisualization({ skills }: SkillsVisualizationProps) {
    // Separate skills into rings based on logic (e.g., Core inner, others outer)
    // or just alternating.
    const coreSkills = useMemo(() => skills.filter(s => s.isCore), [skills]);
    const otherSkills = useMemo(() => skills.filter(s => !s.isCore), [skills]);

    // If not enough core skills, mix them.
    const innerRingSkills = coreSkills.length > 0 ? coreSkills : skills.slice(0, Math.ceil(skills.length / 2));
    const outerRingSkills = coreSkills.length > 0 ? otherSkills : skills.slice(Math.ceil(skills.length / 2));

    // Ensure we have something to show if only one group
    const hasOuterRing = outerRingSkills.length > 0;

    return (
        <div className="relative w-full h-[600px] md:h-[700px] flex items-center justify-center overflow-hidden">
            {/* Background Decor - Gradient Orbs */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-neutral-200/30 dark:bg-neutral-900/30 rounded-full blur-3xl -z-10" />

            {/* Center Image */}
            <div className="relative z-10 w-32 h-32 md:w-48 md:h-48 rounded-full border-4 border-white/50 dark:border-neutral-800/50 shadow-2xl backdrop-blur-sm bg-neutral-100 dark:bg-neutral-900 overflow-hidden shrink-0">
                <Image
                    src="/image.png"
                    alt="Profile"
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            {/* Orbit Container */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">

                {/* Inner Ring */}
                {innerRingSkills.length > 0 && (
                    <OrbitRing
                        skills={innerRingSkills}
                        radius={160} // Mobile radius
                        radiusMd={240} // Desktop radius
                        duration={40}
                        direction={1}
                        className="opacity-90 z-20"
                    />
                )}

                {/* Outer Ring */}
                {hasOuterRing && (
                    <OrbitRing
                        skills={outerRingSkills}
                        radius={260}
                        radiusMd={380}
                        duration={55}
                        direction={-1}
                        className="opacity-70 z-10"
                    />
                )}

            </div>
        </div>
    );
}

interface OrbitRingProps {
    skills: Skill[];
    radius: number;
    radiusMd: number;
    duration: number;
    direction: 1 | -1;
    className?: string;
}

function OrbitRing({ skills, radiusMd, duration, direction, className }: OrbitRingProps) {
    // We need to handle responsive radius. 
    // Pure CSS orbit is easier for smoothness, but positioning items requires calc.
    // Let's use Framer Motion for the rotation of a container.

    // To differentiate mobile/desktop radius, simpler to use a CSS variable or dynamic style.
    // Or just use the larger one and scale the container down on mobile?
    // Scaling is cleaner.

    return (
        <motion.div
            animate={{ rotate: direction * 360 }}
            transition={{ repeat: Infinity, duration, ease: "linear" }}
            className={cn("absolute rounded-full flex items-center justify-center", className)}
            style={{
                width: radiusMd * 2,
                height: radiusMd * 2,
                // On mobile we scale it down using standard CSS media queries is hard with inline styles.
                // We'll trust the 'md:scale' classes on a parent or handle radius dynamically?
                // Actually, let's just make the container responsive via CSS classes if possible, 
                // but we need absolute positioning coordinates for children.
                // A better approach: Use a large size and scale down the wrapper in CSS.
            }}
        >
            {/* Ring Border (Optional visual guide) */}
            <div className="absolute inset-0 rounded-full border border-dashed border-neutral-300 dark:border-neutral-800 opacity-30" />

            {skills.map((skill, index) => {
                const angle = (index / skills.length) * 360;
                // Calculate position on circumference
                // angle in radians
                const rad = (angle * Math.PI) / 180;
                // x = r * cos(a), y = r * sin(a)
                // But since we are rotating the PARENT, the children are fixed relative to the ring.
                // We just place them at their fixed angle.

                // CSS Transform approach:
                // rotate(angle) translate(radius) rotate(-angle) basically?
                // No, simpler: 
                // absolute position: top: 50%, left: 50%.
                const x = 50 + 50 * Math.cos(rad); // percent
                const y = 50 + 50 * Math.sin(rad); // percent

                return (
                    <div
                        key={skill.id}
                        className="absolute w-max flex items-center justify-center pointer-events-auto cursor-pointer group"
                        style={{
                            left: `${x}%`,
                            top: `${y}%`,
                            transform: 'translate(-50%, -50%)' // Center the item on the point
                        }}
                    >
                        {/* Counter-rotate the text so it stays upright while the ring spins */}
                        <motion.div
                            animate={{ rotate: direction * -360 }}
                            transition={{ repeat: Infinity, duration, ease: "linear" }}
                            className="bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md px-4 py-2 rounded-full border border-neutral-200/50 dark:border-neutral-800/50 shadow-sm transition-all hover:scale-110 hover:bg-white dark:hover:bg-neutral-800 hover:shadow-md hover:border-neutral-300 dark:hover:border-neutral-700"
                        >
                            <span className="text-sm font-semibold text-neutral-800 dark:text-neutral-200 whitespace-nowrap">
                                {skill.name}
                            </span>

                            {/* Hover info popup? */}
                            {skill.description && (
                                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 p-2 bg-neutral-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                                    {skill.description}
                                </div>
                            )}
                        </motion.div>
                    </div>
                );
            })}
        </motion.div>
    );
}
