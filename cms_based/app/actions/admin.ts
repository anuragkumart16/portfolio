"use server";

import { prisma } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateHero(prevState: any, formData: FormData) {
    const title = formData.get("title") as string;
    const subtitle = formData.get("subtitle") as string;
    const isVisible = formData.get("isVisible") === "on";
    const id = formData.get("id") as string; // if exist

    console.log({title,subtitle,isVisible,id})

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
