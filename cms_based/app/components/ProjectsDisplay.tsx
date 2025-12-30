"use client";

import { useAudience } from "../context/audience-context";
import { motion } from "framer-motion";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import Image from "next/image";

interface ProjectItem {
    id: string;
    title: string;
    description: string;
    images: string[];
    techStack: string[];
    liveUrl: string;
    repoUrl: string;
    audiences: any[];
    isVisible: boolean;
    useIframe?: boolean;
}

interface ProjectsDisplayProps {
    section: {
        isVisible: boolean;
        projects: ProjectItem[];
    } | null;
}

export default function ProjectsDisplay({ section }: ProjectsDisplayProps) {
    const { audience } = useAudience();

    if (!section || !section.isVisible) return null;

    const visibleProjects = (section.projects || []).filter(project => {
        if (!project.isVisible) return false;
        const projectAudiences = project.audiences || ['general', 'company', 'freelance'];
        return projectAudiences.includes(audience);
    });

    if (visibleProjects.length === 0) return null;

    return (
        <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight mb-4">
                    Selected Work
                </h2>
                <p className="text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto text-lg">
                    A showcase of projects that demonstrate my technical capabilities and creative problem-solving.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-12 sm:gap-16">
                {visibleProjects.map((project, index) => {
                    const hasLink = project.liveUrl || project.repoUrl;
                    const mainImage = project.images?.[0] || null;

                    return (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="group relative grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center"
                        >
                            {/* Order check: Alternate layout for visual interest if index is odd */}
                            <div className={`relative rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-sm transition-all duration-500 group-hover:shadow-xl group-hover:scale-[1.02] ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                                <div className="aspect-16/10 bg-neutral-100 dark:bg-neutral-900 relative">
                                    {project.useIframe && project.liveUrl ? (
                                        <div className="absolute inset-0 w-[400%] h-[400%] origin-top-left scale-[0.25] bg-white">
                                            <iframe
                                                src={project.liveUrl}
                                                title={project.title}
                                                className="w-full h-full border-0"
                                                loading="lazy"
                                                style={{ pointerEvents: 'none' }}
                                            />
                                        </div>
                                    ) : mainImage ? (
                                        <>
                                            <Image
                                                src={mainImage}
                                                alt={project.title}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                            {/* Overlay Gradient only for Image */}
                                            <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                                        </>
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center text-neutral-400 dark:text-neutral-600">
                                            <span className="text-sm font-medium">No Preview Available</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className={`space-y-6 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                                <div className="space-y-4">
                                    <h3 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-neutral-100">
                                        {project.title}
                                    </h3>
                                    <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed text-lg">
                                        {project.description}
                                    </p>
                                </div>

                                {project.techStack && project.techStack.length > 0 && (
                                    <div className="flex flex-wrap gap-2">
                                        {project.techStack.map(tech => (
                                            <span
                                                key={tech}
                                                className="px-3 py-1 text-xs font-semibold tracking-wider uppercase text-neutral-600 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-900 rounded-md"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                {hasLink && (
                                    <div className="flex items-center gap-4 pt-2">
                                        {project.liveUrl && (
                                            <a
                                                href={project.liveUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 font-semibold text-sm transition-all duration-300 hover:opacity-90 hover:translate-x-1"
                                            >
                                                Live Demo
                                                <ArrowRight size={16} />
                                            </a>
                                        )}
                                        {project.repoUrl && (
                                            <a
                                                href={project.repoUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 font-medium text-sm transition-colors duration-300 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-800"
                                            >
                                                <Github size={18} />
                                                Code
                                            </a>
                                        )}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    );
                })}


            </div>
        </section>
    );
}
