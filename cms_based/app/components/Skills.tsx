import { prisma } from "@/app/lib/prisma";
import SkillsDisplay from "./SkillsDisplay";

export default async function Skills() {
    const skillsSection = await prisma.skillsSection.findFirst();
    return <SkillsDisplay section={skillsSection} />;
}

export function SkillsSkeleton() {
    return <div className="py-24 text-center">Loading Skills...</div>;
}
