import { prisma } from "@/app/lib/prisma";
import SkillsForm from "./SkillsForm";

export default async function SkillsEditor() {
    const skillsSection = await prisma.skillsSection.findFirst();

    // Sanitize data: convert nulls to undefined or empty strings for components
    const sanitizedData = skillsSection ? {
        ...skillsSection,
        categories: skillsSection.categories.map(cat => ({
            ...cat,
            audiences: cat.audiences || [], // Ensure array
            skills: cat.skills.map(skill => ({
                ...skill,
                audiences: skill.audiences || [], // Ensure array
                iconName: skill.iconName || ""
            }))
        }))
    } : null;

    return <SkillsForm initialData={sanitizedData} />;
}
