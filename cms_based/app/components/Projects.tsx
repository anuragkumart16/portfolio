import { prisma } from "@/app/lib/prisma";
import ProjectsDisplay from "./ProjectsDisplay";

export default async function Projects() {
    const projectsSection = await prisma.projectsSection.findFirst();
    return <ProjectsDisplay section={projectsSection} />;
}

export function ProjectsSkeleton() {
    return <div className="py-24 text-center">Loading Projects...</div>;
}
