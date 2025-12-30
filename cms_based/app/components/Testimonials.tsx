import { prisma } from "@/app/lib/prisma";
import TestimonialsDisplay from "./TestimonialsDisplay";

async function getTestimonialsData() {
    try {
        const data = await prisma.testimonialsSection.findFirst();
        return data;
    } catch (error) {
        console.error("Failed to fetch testimonials data:", error);
        return null;
    }
}

export default async function Testimonials() {
    const data = await getTestimonialsData();

    return <TestimonialsDisplay section={data} />;
}

export function TestimonialsSkeleton() {
    return (
        <section className="py-24 overflow-hidden bg-white dark:bg-black">
            <div className="max-w-7xl mx-auto px-4 mb-12 text-center">
                <div className="h-10 w-64 bg-neutral-200 dark:bg-neutral-800 rounded-lg mx-auto mb-4 animate-pulse" />
                <div className="h-6 w-96 bg-neutral-200 dark:bg-neutral-800 rounded-lg mx-auto animate-pulse" />
            </div>
            <div className="flex gap-8 overflow-hidden opacity-50">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="w-[450px] shrink-0 p-8 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 h-[200px] animate-pulse" />
                ))}
            </div>
        </section>
    );
}
