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