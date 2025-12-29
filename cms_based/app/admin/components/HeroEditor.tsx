import { prisma } from "@/app/lib/prisma";
import {createHero} from "@/app/actions/admin"
import HeroForm from "./HeroForm";
import { div } from "framer-motion/client";


async function getHero() {
    return await prisma.hero.findMany();
}

export default async function HeroEditor() {
    const hero = await getHero();

    return (
        <div>
            <div>
                <h1 className="text-2xl font-bold">Create Hero</h1>
                <HeroForm initialData={null}/>
            </div>
            <div className="mt-4 flex flex-col gap-4"> 
                {hero.map((hero) => (
                    <div className="p-4 border border-neutral-200 dark:border-neutral-800"><HeroForm key={hero.id} initialData={hero} /></div>
                ))}
            </div>
        </div>

    );
}
