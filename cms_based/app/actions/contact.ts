"use server";

import { prisma } from "../lib/prisma";
import { revalidatePath } from "next/cache";

export async function submitContactForm(prevState: any, formData: FormData) {
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;
    // Add logic to save to DB and send email

    if (!email || !message) {
        return {
            success: false,
            message: "Please fill in all required fields.",
            errors: {
                email: !email ? ["Email is required"] : [],
                message: !message ? ["Message is required"] : []
            }
        };
    }

    try {
        await prisma.contactSubmission.create({
            data: {
                email,
                message,
                status: 'unread'
            }
        });

        // Retrieve receiver email setting
        const settings = await prisma.contactSection.findFirst();
        const receiver = settings?.receiverEmail || "anurag.tiwari@example.com";
        const emailToken = process.env.EMAIL_TOKEN;

        if (emailToken) {
            // New Portfolio Inquiry - Professional HTML Template
            const htmlBody = `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px; background-color: #fafafa;">
                    <div style="text-align: center; margin-bottom: 20px;">
                        <h2 style="color: #1a1a1a; margin: 0;">New Inquiry</h2>
                        <p style="color: #666; font-size: 14px; margin-top: 5px;">Portfolio Contact Form</p>
                    </div>
                    
                    <div style="background-color: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                        <p style="font-size: 16px; color: #333;"><strong>From:</strong> <a href="mailto:${email}" style="color: #0070f3; text-decoration: none;">${email}</a></p>
                        
                        <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #eee;">
                            <h3 style="font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; color: #888; margin-bottom: 10px;">Message</h3>
                            <p style="font-size: 16px; line-height: 1.6; color: #1a1a1a; white-space: pre-wrap;">${message}</p>
                        </div>
                    </div>
                    
                    <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
                        <a href="mailto:${email}" style="display: inline-block; background-color: #1a1a1a; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">Reply to Sender</a>
                    </div>
                    
                    <p style="text-align: center; font-size: 11px; color: #999; margin-top: 20px;">
                        Received via Portfolio CMS • ${new Date().toLocaleString()}
                    </p>
                </div>
            `;

            // Call Email Microservice
            try {
                await fetch('https://email-microservice-delusion.vercel.app/api/send-email', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-api-token': emailToken
                    },
                    body: JSON.stringify({
                        recipient: receiver,
                        subject: `New Inquiry from ${email}`,
                        body: htmlBody
                    })
                });
            } catch (emailError) {
                console.error("Failed to call email microservice:", emailError);
                // We don't throw here to ensure the user still gets a success message for the DB save
            }
        } else {
            console.warn("EMAIL_TOKEN not configured. Skipping email send.");
        }

        return { success: true, message: "Message sent! We'll stay in touch." };
    } catch (error) {
        console.error("Contact form error:", error);
        return { success: false, message: "Something went wrong. Please try again later." };
    }
}

export async function updateContactSettings(prevState: any, formData: FormData) {
    const isVisible = formData.get("isVisible") === "on";
    const title = formData.get("title") as string;
    const subtitle = formData.get("subtitle") as string;
    const receiverEmail = formData.get("receiverEmail") as string;

    try {
        const existing = await prisma.contactSection.findFirst();

        if (existing) {
            await prisma.contactSection.update({
                where: { id: existing.id },
                data: { isVisible, title, subtitle, receiverEmail }
            });
        } else {
            await prisma.contactSection.create({
                data: { isVisible, title, subtitle, receiverEmail }
            });
        }

        revalidatePath("/");
        return { success: true, message: "Contact settings updated successfully." };
    } catch (error) {
        console.error("Update contact settings error:", error);
        return { success: false, message: "Failed to update contact settings." };
    }
}
