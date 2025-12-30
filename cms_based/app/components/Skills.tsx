import { prisma } from "@/app/lib/prisma";
import { Skeleton } from "./ui/skeleton";
import { cn } from "@/app/lib/utils";
import SkillsVisualization from "./SkillsVisualization";

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
        <section className="py-20 relative overflow-hidden bg-neutral-50 dark:bg-neutral-950">
            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="text-center mb-10">
                    <h2 className="text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 mb-4">
                        Skills & Technologies
                    </h2>
                    <p className="text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto">
                        A dynamic overview of the tools that power my work.
                    </p>
                </div>

                {/* 
                   We render the client visualization.
                   Note: On mobile, the orbit might be too big. The component uses large dimensions.
                   We can scale it via CSS zoom or transform scaling for smaller screens 
                   if the component itself isn't fully fluid.
                   Or simply let the component handle its responsiveness (it scales radius?).
                */}
                <div className="scale-[0.6] md:scale-100 origin-center transition-transform duration-500 -my-20 md:my-0">
                    <SkillsVisualization skills={skills} />
                </div>
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
