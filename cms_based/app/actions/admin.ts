"use server";

import { prisma } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateHero(prevState: any, formData: FormData) {
    const title = formData.get("title") as string;
    const subtitle = formData.get("subtitle") as string;
    const isVisible = formData.get("isVisible") === "on";
    const id = formData.get("id") as string; // if exist

    try {
        if (id) {
            await prisma.hero.update({
                where: { id },
                data: { title, subtitle, isVisible }
            });
        } else {
            await prisma.hero.create({
                data: { title, subtitle, isVisible }
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

    try {
        await prisma.hero.create({
            data: { title, subtitle, isVisible, audience }
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