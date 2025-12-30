import { prisma } from "@/app/lib/prisma";
import ContactClientForm from "./ContactClientForm";
import SocialLinksDisplay from "./SocialLinksDisplay";
import { cn } from "@/app/lib/utils";
import { GridPattern } from "./ui/GridPattern";

async function getContactData() {
    try {
        return await prisma.contactSection.findFirst({
            where: { isVisible: true }
        });
    } catch (e) {
        console.error(e);
        return null;
    }
}

export default async function Contact() {
    const data = await getContactData();

    if (!data) return null;

    // Cast socialLinks to ensure type compatibility with the client component
    // In Prisma, composite types arrays come back as the type defined in schema
    const socialLinks = data.socialLinks || [];

    return (
        <section id="contact" className="py-24 px-4 md:px-8 relative overflow-hidden bg-white dark:bg-black border-t border-neutral-200 dark:border-neutral-800">
            {/* Background Pattern */}
            {/* <div className="absolute inset-0 z-0 pointer-events-none opacity-50 dark:opacity-30">
                <GridPattern
                    width={50}
                    height={50}
                    x={-1}
                    y={-1}
                    className={cn(
                        "mask-[linear-gradient(to_bottom,white,transparent,transparent)] ",
                        "fill-neutral-200/50 stroke-neutral-200/50 dark:fill-neutral-800/50 dark:stroke-neutral-800/50"
                    )}
                />
            </div> */}

            <div className="max-w-6xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
                {/* Left Column: Info & Links */}
                <div className="flex flex-col gap-10">
                    <div className="space-y-6">
                        <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold bg-clip-text text-transparent bg-linear-to-b from-neutral-600 to-neutral-950 dark:from-neutral-100 dark:to-neutral-500 tracking-tight leading-[1.1]">
                            {data.title}
                        </h2>
                        <p className="text-xl md:text-2xl text-neutral-600 dark:text-neutral-400 font-medium max-w-lg">
                            {data.subtitle}
                        </p>
                        {data.description && (
                            <div className="prose prose-neutral dark:prose-invert text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-lg">
                                <p>{data.description}</p>
                            </div>
                        )}
                    </div>

                    <SocialLinksDisplay links={socialLinks as any[]} />
                </div>

                {/* Right Column: Form with Blobs */}
                <div className="relative w-full max-w-xl mx-auto lg:mr-0">
                    {/* Decorative Blobs */}
                    {/* <div className="absolute -top-20 -right-20 w-80 h-80 bg-purple-500/10 dark:bg-purple-500/20 rounded-full blur-[100px] pointer-events-none" />
                    <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-blue-500/10 dark:bg-blue-500/20 rounded-full blur-[100px] pointer-events-none" /> */}

                    <div className="relative z-10 bg-white/70 dark:bg-neutral-900/40 backdrop-blur-2xl p-8 md:p-10 rounded-[2.5rem] border border-neutral-200 dark:border-neutral-800 shadow-2xl shadow-neutral-200/50 dark:shadow-neutral-950/50">
                        <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-8">Send a message</h3>
                        <ContactClientForm />
                    </div>
                </div>
            </div>
        </section>
    );
}
