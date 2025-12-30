"use server";

import { prisma } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateHero(prevState: any, formData: FormData) {
    const title = formData.get("title") as string;
    const subtitle = formData.get("subtitle") as string;
    const isVisible = formData.get("isVisible") === "on";
    const githubUrl = formData.get("githubUrl") as string;
    const resumeUrl = formData.get("resumeUrl") as string;
    const id = formData.get("id") as string; // if exist

    try {
        if (id) {
            await prisma.hero.update({
                where: { id },
                data: {
                    title,
                    subtitle: subtitle || undefined,
                    isVisible,
                    githubUrl: githubUrl || undefined,
                    resumeUrl: resumeUrl || undefined
                }
            });
        } else {
            await prisma.hero.create({
                data: {
                    title,
                    subtitle: subtitle || undefined,
                    isVisible,
                    githubUrl: githubUrl || undefined,
                    resumeUrl: resumeUrl || undefined
                }
            });
        }

        revalidatePath("/");
        return { success: true, message: "Hero updated successfully" };
    } catch (error) {
        console.error("Update hero error:", error);
        return { success: false, message: "Failed to update hero" };
    }
}

export async function deleteHero(prevState: any, formData: FormData) {
    const id = formData.get("id") as string;

    try {
        await prisma.hero.delete({
            where: { id }
        });

        revalidatePath("/");
        return { success: true, message: "Hero deleted successfully" };
    } catch (error) {
        console.error("Delete hero error:", error);
        return { success: false, message: "Failed to delete hero" };
    }
}


export async function createHero(formData: FormData) {
    const title = formData.get("title") as string;
    const subtitle = formData.get("subtitle") as string;
    const isVisible = formData.get("isVisible") === "on";
    const audience = formData.get("audience") as "company" | "freelance" | "general";
    const githubUrl = formData.get("githubUrl") as string;
    const resumeUrl = formData.get("resumeUrl") as string;

    try {
        await prisma.hero.create({
            data: { title, subtitle, isVisible, audience, githubUrl, resumeUrl }
        });

        revalidatePath("/");
        return { success: true, message: "Hero created successfully" };
    } catch (error) {
        console.error("Create hero error:", error);
        return { success: false, message: "Failed to create hero" };
    }
}

export async function updateStory(prevState: any, formData: FormData) {
    const isVisible = formData.get("isVisible") === "on";
    const tabsJson = formData.get("tabs") as string;

    let tabs = [];
    try {
        tabs = JSON.parse(tabsJson);
    } catch (e) {
        console.error("Failed to parse tabs JSON", e);
        return { success: false, message: "Invalid tabs data" };
    }

    try {
        // Upsert logic: find the first one, if exists update, else create
        // MongoDB allows upsert with where. But for singletons without a known ID, 
        // we can do findFirst -> update or create.

        const existing = await prisma.story.findFirst();

        if (existing) {
            await prisma.story.update({
                where: { id: existing.id },
                data: { isVisible, tabs }
            });
        } else {
            await prisma.story.create({
                data: { isVisible, tabs }
            });
        }

        revalidatePath("/");
        return { success: true, message: "Story updated successfully" };
    } catch (error) {
        console.error("Update story error:", error);
        return { success: false, message: "Failed to update story" };
    }
}

export async function updateSkills(prevState: any, formData: FormData) {
    const isVisible = formData.get("isVisible") === "on";
    const categoriesJson = formData.get("categories") as string;

    let categories = [];
    try {
        categories = JSON.parse(categoriesJson);
    } catch (e) {
        console.error("Failed to parse categories JSON", e);
        return { success: false, message: "Invalid categories data" };
    }

    try {
        const existing = await prisma.skillsSection.findFirst();

        if (existing) {
            await prisma.skillsSection.update({
                where: { id: existing.id },
                data: { isVisible, categories }
            });
        } else {
            await prisma.skillsSection.create({
                data: { isVisible, categories }
            });
        }

        revalidatePath("/");
        return { success: true, message: "Skills updated successfully" };
    } catch (error) {
        console.error("Update skills error:", error);
        return { success: false, message: "Failed to update skills" };
    }
}

export async function updateProjects(prevState: any, formData: FormData) {
    const isVisible = formData.get("isVisible") === "on";
    const projectsJson = formData.get("projects") as string;

    let projects = [];
    try {
        projects = JSON.parse(projectsJson);
    } catch (e) {
        console.error("Failed to parse projects JSON", e);
        return { success: false, message: "Invalid projects data" };
    }

    try {
        const existing = await prisma.projectsSection.findFirst();

        if (existing) {
            await prisma.projectsSection.update({
                where: { id: existing.id },
                data: { isVisible, projects }
            });
        } else {
            await prisma.projectsSection.create({
                data: { isVisible, projects }
            });
        }

        revalidatePath("/");
        return { success: true, message: "Projects updated successfully" };
    } catch (error) {
        console.error("Update projects error:", error);
        return { success: false, message: "Failed to update projects" };
    }
}

export async function updateTestimonials(prevState: any, formData: FormData) {
    const isVisible = formData.get("isVisible") === "on";
    const onlyFreelance = formData.get("onlyFreelance") === "on";
    const testimonialsJson = formData.get("testimonials") as string;

    let testimonials = [];
    try {
        testimonials = JSON.parse(testimonialsJson);
    } catch (e) {
        console.error("Failed to parse testimonials JSON", e);
        return { success: false, message: "Invalid testimonials data" };
    }

    try {
        const existing = await prisma.testimonialsSection.findFirst();

        if (existing) {
            await prisma.testimonialsSection.update({
                where: { id: existing.id },
                data: { isVisible, onlyFreelance, testimonials }
            });
        } else {
            await prisma.testimonialsSection.create({
                data: { isVisible, onlyFreelance, testimonials }
            });
        }

        revalidatePath("/");
        return { success: true, message: "Testimonials updated successfully" };
    } catch (error) {
        console.error("Update testimonials error:", error);
        return { success: false, message: "Failed to update testimonials" };
    }
}

export async function updateContact(prevState: any, formData: FormData) {
    const isVisible = formData.get("isVisible") === "on";
    const title = formData.get("title") as string;
    const subtitle = formData.get("subtitle") as string;
    const description = formData.get("description") as string;
    const receiverEmail = formData.get("receiverEmail") as string;
    const socialLinksJson = formData.get("socialLinks") as string;

    let socialLinks = [];
    try {
        socialLinks = JSON.parse(socialLinksJson);
    } catch (e) {
        console.error("Failed to parse socialLinks JSON", e);
        return { success: false, message: "Invalid socialLinks data" };
    }

    try {
        const existing = await prisma.contactSection.findFirst();

        if (existing) {
            await prisma.contactSection.update({
                where: { id: existing.id },
                data: {
                    isVisible,
                    title,
                    subtitle,
                    description: description || null,
                    receiverEmail,
                    socialLinks: socialLinks as any
                }
            });
        } else {
            await prisma.contactSection.create({
                data: {
                    isVisible,
                    title,
                    subtitle,
                    description: description || null,
                    receiverEmail,
                    socialLinks: socialLinks as any
                }
            });
        }

        revalidatePath("/");
        return { success: true, message: "Contact updated successfully" };
    } catch (error) {
        console.error("Update contact error:", error);
        return { success: false, message: "Failed to update contact" };
    }
}