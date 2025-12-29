import { prisma } from "@/app/lib/prisma";
import { Skeleton } from "./ui/skeleton";
import Threads from "./bits/Threads";
import { Audience } from "../types";

async function getHeroData({audience}: {audience: Audience}) {
    console.log(audience);
    try {
        const hero = await prisma.hero.findFirst({
            where: { isVisible: true, audience }
        });
        return hero;
    } catch (error) {
        console.error("Failed to fetch hero data:", error);
        return null;
    }
}

export default async function Hero({audience}: {audience: Audience}) {
    const hero = await getHeroData({audience});

    return (
        <section className="relative w-full min-h-[100vh] flex flex-col justify-center overflow-hidden">
            <div className="absolute inset-0 w-full h-full opacity-50 dark:opacity-100">
                <Threads
                    amplitude={1}
                    distance={0}
                    enableMouseInteraction={false}
                />
            </div>

            <div className="relative z-10 py-20 px-4 md:px-8 max-w-4xl mx-auto flex flex-col gap-6">
                {!hero ? (
                    <div className="space-y-4">
                        <p className="text-xl md:text-2xl text-neutral-600 dark:text-neutral-400 max-w-2xl">
                            Building adaptive digital experiences.
                        </p>
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
                            Hi, I'm <span className="opacity-50">Anurag</span>
                        </h1>
                    </div>
                ) : (
                    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        {hero.subtitle && (
                            <p className="text-xl md:text-2xl text-neutral-600 dark:text-neutral-400 max-w-2xl">
                                {hero.subtitle}
                            </p>
                        )}
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
                            {hero.title}
                        </h1>
                    </div>
                )}
            </div>
        </section>
    );
}

export function HeroSkeleton() {
    return (
        <section className="relative w-full min-h-[50vh] flex flex-col justify-center overflow-hidden">
            <div className="absolute inset-0 w-full h-full bg-neutral-100 dark:bg-neutral-900" />
            <div className="relative z-10 py-20 px-4 md:px-8 max-w-4xl mx-auto flex flex-col gap-6">
                <div className="space-y-4">
                    <Skeleton className="h-20 w-3/4 max-w-lg" />
                    <Skeleton className="h-8 w-1/2 max-w-md" />
                </div>
            </div>
        </section>
    )
}
