import { prisma } from "@/app/lib/prisma";
import { Skeleton } from "./ui/skeleton";
import { cn } from "@/app/lib/utils";

async function getSkillsData() {
    try {
        const skills = await prisma.skill.findMany({
            where: { isVisible: true },
            orderBy: { order: 'asc' },
        });
        return skills;
    } catch (error) {
        console.error("Failed to fetch skills:", error);
        return [];
    }
}

export default async function Skills() {
    const skills = await getSkillsData();

    if (skills.length === 0) return null;

    // Group by category
    const groupedSkills = skills.reduce((acc, skill) => {
        if (!acc[skill.category]) {
            acc[skill.category] = [];
        }
        acc[skill.category].push(skill);
        return acc;
    }, {} as Record<string, typeof skills>);

    return (
        <section className="py-20 px-4 md:px-8 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-neutral-900 dark:text-neutral-100">
                Skills & Technologies
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {Object.entries(groupedSkills).map(([category, categorySkills]) => (
                    <div key={category} className="space-y-4">
                        <h3 className="text-xl font-semibold text-neutral-700 dark:text-neutral-300 border-b border-neutral-200 dark:border-neutral-800 pb-2">
                            {category}
                        </h3>
                        <ul className="space-y-3">
                            {categorySkills.map((skill) => (
                                <li key={skill.id} className="flex flex-col">
                                    <div className="flex items-center gap-2">
                                        <span className={cn(
                                            "font-medium",
                                            skill.isCore ? "text-neutral-900 dark:text-neutral-100" : "text-neutral-600 dark:text-neutral-400"
                                        )}>
                                            {skill.name}
                                        </span>
                                        {skill.isCore && (
                                            <span className="px-1.5 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-[10px] uppercase font-bold text-neutral-500 tracking-wider">
                                                Core
                                            </span>
                                        )}
                                    </div>
                                    {skill.description && (
                                        <span className="text-sm text-neutral-500 dark:text-neutral-500 line-clamp-1">
                                            {skill.description}
                                        </span>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </section>
    );
}

export function SkillsSkeleton() {
    return (
        <section className="py-20 px-4 md:px-8 max-w-4xl mx-auto">
            <Skeleton className="h-10 w-48 mb-12" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {[1, 2].map((i) => (
                    <div key={i} className="space-y-4">
                        <Skeleton className="h-8 w-32 border-b pb-2" />
                        <div className="space-y-3">
                            {[1, 2, 3, 4].map((j) => (
                                <div key={j} className="space-y-1">
                                    <Skeleton className="h-5 w-24" />
                                    <Skeleton className="h-3 w-40" />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
