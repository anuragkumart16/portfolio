"use client";

import { useAudience } from "../context/audience-context";
import { motion } from "framer-motion";
import Image from "next/image";

interface TestimonialItem {
    id: string;
    name: string;
    role: string;
    company: string | null;
    content: string;
    avatarUrl: string | null;
    isVisible: boolean;
}

interface TestimonialsDisplayProps {
    section: {
        isVisible: boolean;
        onlyFreelance: boolean;
        testimonials: TestimonialItem[];
    } | null;
}

export default function TestimonialsDisplay({ section }: TestimonialsDisplayProps) {
    const { audience } = useAudience();

    // 1. Section Visibility Check
    if (!section || !section.isVisible) return null;

    // 2. Audience Check: if "onlyFreelance" is true, show only if current audience is 'freelance'
    // Ensure strict check if audience is available
    if (section.onlyFreelance && audience && audience !== 'freelance') {
        return null;
    }

    // 3. Filter visible items
    const visibleTestimonials = (section.testimonials || []).filter(t => t.isVisible);

    if (visibleTestimonials.length === 0) return null;

    // Duplicate list for seamless infinite scroll
    // const marqueeItems = [...visibleTestimonials, ...visibleTestimonials, ...visibleTestimonials]; // Unused

    return (
        <section className="py-24 overflow-hidden bg-white dark:bg-black  dark:border-neutral-800">
            <div className="max-w-7xl mx-auto px-4 mb-12 text-center">
                <h2 className="text-3xl md:text-5xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight mb-4">
                    Client Words
                </h2>
                <p className="text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto text-lg">
                    Feedback from people I&apos;ve had the pleasure of working with.
                </p>
            </div>

            <div className="relative w-full">
                {/* Gradient Masks */}
                <div className="absolute left-0 top-0 bottom-0 w-24 bg-linear-to-r from-white dark:from-black to-transparent z-10" />
                <div className="absolute right-0 top-0 bottom-0 w-24 bg-linear-to-l from-white dark:from-black to-transparent z-10" />

                <div className="flex overflow-hidden">
                    <motion.div
                        className="flex gap-8 py-4"
                        animate={{
                            x: [0, -1000], // Adjust based on total width, or use percentage if confident
                        }}
                        transition={{
                            x: {
                                repeat: Infinity,
                                repeatType: "loop",
                                duration: 50, // More items -> slower duration needed
                                ease: "linear",
                            },
                        }}
                        style={{ width: "max-content" }}
                    >
                        {/* We use a different animation approach for strictly seamless CSS marquee if motion is tricky with variable width */}
                        {/* Let's try a standard CSS animation approach for robustness with variable widths */}
                        {/* Actually, framer motion x: ["0%", "-50%"] is better if we duplicate enough times */}
                    </motion.div>

                    {/* 
                       Alternative: CSS Animation 
                       Moving RIGHT means transform from -X to 0, or 0 to X.
                       Standard Marquee: Move Left (Translate X: 0 -> -50%)
                       Reverse Marquee (Move Right): Translate X: -50% -> 0
                     */}

                    <div className="flex animate-marquee-reverse hover:pause gap-8 w-max">
                        {[...visibleTestimonials, ...visibleTestimonials, ...visibleTestimonials, ...visibleTestimonials].map((item, idx) => (
                            <div
                                key={`${item.id}-${idx}`}
                                className="w-[350px] md:w-[450px] shrink-0 p-8 rounded-2xl bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800"
                            >
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="w-12 h-12 rounded-full bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center overflow-hidden shrink-0 relative">
                                        {item.avatarUrl ? (
                                            <Image
                                                src={item.avatarUrl}
                                                alt={item.name}
                                                fill
                                                className="object-cover"
                                            />
                                        ) : (
                                            <span className="text-xl font-bold text-neutral-500">{item.name[0]}</span>
                                        )}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-neutral-900 dark:text-neutral-100">{item.name}</h4>
                                        <p className="text-sm text-neutral-500 dark:text-neutral-400">{item.role} {item.company && `at ${item.company}`}</p>
                                    </div>
                                </div>
                                <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed italic">
                                    &quot;{item.content}&quot;
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style jsx global>{`
                @keyframes marquee-reverse {
                    0% { transform: translateX(-50%); }
                    100% { transform: translateX(0%); }
                }
                .animate-marquee-reverse {
                    animation: marquee-reverse 30s linear infinite;
                }
                .hover\\:pause:hover {
                    animation-play-state: paused;
                }
            `}</style>
        </section>
    );
}
