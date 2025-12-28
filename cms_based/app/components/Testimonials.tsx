import { prisma } from "@/app/lib/prisma";
import { Skeleton } from "./ui/skeleton";
import { Audience } from "@/app/types";

async function getTestimonialsData() {
    try {
        const testimonials = await prisma.testimonial.findMany({
            where: { isVisible: true },
            orderBy: { updatedAt: 'desc' }, // or specific order
        });
        return testimonials;
    } catch (error) {
        console.error("Failed to fetch testimonials:", error);
        return [];
    }
}

export default async function Testimonials({ audience }: { audience: Audience }) {
    if (audience !== 'freelance') return null;

    const testimonials = await getTestimonialsData();

    if (testimonials.length === 0) return null;

    return (
        <section className="py-20 px-4 md:px-8 max-w-4xl mx-auto bg-neutral-50 dark:bg-neutral-900/50 rounded-2xl my-20">
            <h2 className="text-3xl font-bold mb-12 text-neutral-900 dark:text-neutral-100">
                What Clients Say
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {testimonials.map((testimonial) => (
                    <div key={testimonial.id} className="p-6 bg-white dark:bg-neutral-950 rounded-xl shadow-sm border border-neutral-100 dark:border-neutral-800">
                        <blockquote className="space-y-4">
                            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed italic">
                                "{testimonial.content}"
                            </p>
                            <footer>
                                <div className="font-semibold text-neutral-900 dark:text-neutral-100">
                                    {testimonial.clientName}
                                </div>
                                {(testimonial.role || testimonial.company) && (
                                    <div className="text-sm text-neutral-500">
                                        {testimonial.role}{testimonial.role && testimonial.company && ", "}{testimonial.company}
                                    </div>
                                )}
                            </footer>
                        </blockquote>
                    </div>
                ))}
            </div>
        </section>
    );
}

export function TestimonialsSkeleton() {
    return (
        <section className="py-20 px-4 md:px-8 max-w-4xl mx-auto my-20">
            <Skeleton className="h-10 w-64 mb-12" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[1, 2].map((i) => (
                    <div key={i} className="h-48 rounded-xl border border-neutral-200 dark:border-neutral-800 p-6 space-y-4">
                        <Skeleton className="h-24 w-full" />
                        <div className="space-y-2">
                            <Skeleton className="h-5 w-32" />
                            <Skeleton className="h-4 w-48" />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
