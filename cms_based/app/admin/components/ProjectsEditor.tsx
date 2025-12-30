import { prisma } from "@/app/lib/prisma";
import ProjectsForm from "./ProjectsForm";

export default async function ProjectsEditor() {
    const projectsSection = await prisma.projectsSection.findFirst();
    return <ProjectsForm initialData={projectsSection} />;
}
