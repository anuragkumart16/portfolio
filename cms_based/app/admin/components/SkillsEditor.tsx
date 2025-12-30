import { prisma } from "@/app/lib/prisma";
import SkillsForm from "./SkillsForm";

export default async function SkillsEditor() {
    const skillsSection = await prisma.skillsSection.findFirst();
    return <SkillsForm initialData={skillsSection} />;
}
