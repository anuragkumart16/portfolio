import { prisma } from "@/app/lib/prisma";
import { Skeleton } from "./ui/skeleton";
import { Audience } from "@/app/types";
import { cn } from "@/app/lib/utils";
import { Github, Globe } from "lucide-react";

async function getProjectsData(audience: Audience) {
    try {
        const projects = await prisma.project.findMany({
            where: {
                isVisible: true,
                audiences: { has: audience }
            },
            orderBy: { order: 'asc' },
        });
        return projects;
    } catch (error) {
        console.error("Failed to fetch projects:", error);
        return [];
    }
}

export default async function Projects({ audience }: { audience: Audience }) {
    const projects = await getProjectsData(audience);

    if (projects.length === 0) return null;

    return (
        <section className="py-20 px-4 md:px-8 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-neutral-900 dark:text-neutral-100">
                Selected Work
            </h2>

            <div className="flex flex-col gap-16">
                {projects.map((project) => (
                    <article key={project.id} className="group">
                        <div className="space-y-4">
                            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
                                <h3 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                                    {project.title}
                                </h3>
                                <div className="flex gap-4">
                                    {project.linkLive && (
                                        <a
                                            href={project.linkLive}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm font-medium text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 flex items-center gap-1 transition-colors"
                                        >
                                            <Globe size={14} /> Live
                                        </a>
                                    )}
                                    {project.linkRepo && (
                                        <a
                                            href={project.linkRepo}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm font-medium text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 flex items-center gap-1 transition-colors"
                                        >
                                            <Github size={14} /> Code
                                        </a>
                                    )}
                                </div>
                            </div>
                            <p className="text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed max-w-2xl">
                                {project.description}
                            </p>
                            {/* Tags or other metadata could go here */}
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}

export function ProjectsSkeleton() {
    return (
        <section className="py-20 px-4 md:px-8 max-w-4xl mx-auto">
            <Skeleton className="h-10 w-48 mb-12" />
            <div className="flex flex-col gap-16">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="space-y-4">
                        <div className="flex justify-between">
                            <Skeleton className="h-8 w-64" />
                            <div className="flex gap-4">
                                <Skeleton className="h-5 w-16" />
                                <Skeleton className="h-5 w-16" />
                            </div>
                        </div>
                        <Skeleton className="h-20 w-full max-w-2xl" />
                    </div>
                ))}
            </div>
        </section>
    );
}
