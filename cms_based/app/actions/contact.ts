"use server";

import { prisma } from "@/app/lib/prisma";
import { z } from "zod";

const contactSchema = z.object({
    email: z.string().email(),
    message: z.string().min(1, "Message is required"),
});

export async function submitContactForm(prevState: any, formData: FormData) {
    const email = formData.get("email");
    const message = formData.get("message");

    const validatedFields = contactSchema.safeParse({
        email,
        message,
    });

    if (!validatedFields.success) {
        return {
            success: false,
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Please fix the errors below.",
        };
    }

    try {
        // 1. Save to DB (Backup)
        await prisma.contactSubmission.create({
            data: {
                email: validatedFields.data.email,
                message: validatedFields.data.message,
                meta: { source: "portfolio-contact" },
            },
        });

        // 2. Send email via Resend/Nodemailer (TODO: Implement provider)
        // For now, just logging or DB storage is enough for MVP/preview.
        console.log("Contact form submitted:", validatedFields.data);

        return {
            success: true,
            message: "Message sent successfully!",
        };
    } catch (error) {
        console.error("Contact submission error:", error);
        return {
            success: false,
            message: "Something went wrong. Please try again.",
        };
    }
}
