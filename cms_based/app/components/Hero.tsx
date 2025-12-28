import { prisma } from "@/app/lib/prisma";
import { Skeleton } from "./ui/skeleton";

async function getHeroData() {
    try {
        const hero = await prisma.hero.findFirst({
            where: { isVisible: true }
        });
        return hero;
    } catch (error) {
        console.error("Failed to fetch hero data:", error);
        return null;
    }
}

export default async function Hero() {
    const hero = await getHeroData();

    if (!hero) {
        // Fallback or empty state if no hero content is defined yet
        return (
            <section className="py-20 px-4 md:px-8 max-w-4xl mx-auto flex flex-col gap-6">
                <div className="space-y-4">
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
                        Hi, I'm <span className="opacity-50">Anurag</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-neutral-600 dark:text-neutral-400 max-w-2xl">
                        Building adaptive digital experiences.
                    </p>
                </div>
            </section>
        );
    }

    return (
        <section className="py-20 px-4 md:px-8 max-w-4xl mx-auto flex flex-col gap-6">
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
                    {hero.title}
                </h1>
                {hero.subtitle && (
                    <p className="text-xl md:text-2xl text-neutral-600 dark:text-neutral-400 max-w-2xl">
                        {hero.subtitle}
                    </p>
                )}
            </div>
        </section>
    );
}

export function HeroSkeleton() {
    return (
        <section className="py-20 px-4 md:px-8 max-w-4xl mx-auto flex flex-col gap-6">
            <div className="space-y-4">
                <Skeleton className="h-20 w-3/4 max-w-lg" />
                <Skeleton className="h-8 w-1/2 max-w-md" />
            </div>
        </section>
    )
}
