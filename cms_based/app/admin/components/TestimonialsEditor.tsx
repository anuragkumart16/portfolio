import { prisma } from "@/app/lib/prisma";
import TestimonialsForm from "./TestimonialsForm";

async function getTestimonialsData() {
    try {
        const data = await prisma.testimonialsSection.findFirst();
        return data;
    } catch (error) {
        console.error("Failed to fetch testimonials data:", error);
        return null;
    }
}

export default async function TestimonialsEditor() {
    const data = await getTestimonialsData();

    return (
        <div>
            <TestimonialsForm initialData={data} />
        </div>
    );
}
