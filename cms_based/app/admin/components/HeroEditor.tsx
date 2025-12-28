import { prisma } from "@/app/lib/prisma";
import { updateHero } from "@/app/actions/admin";
import HeroForm from "./HeroForm";

async function getHero() {
    return await prisma.hero.findFirst();
}

export default async function HeroEditor() {
    const hero = await getHero();

    return <HeroForm initialData={hero} />;
}
