import { prisma } from "@/app/lib/prisma";
import ContactSettingsForm from "./ContactSettingsForm";

export default async function ContactEditor() {
    const settings = await prisma.contactSection.findFirst();
    const submissions = await prisma.contactSubmission.findMany({
        orderBy: { createdAt: 'desc' },
        take: 50
    });

    return <ContactSettingsForm initialData={settings as any} submissions={submissions} />;
}
