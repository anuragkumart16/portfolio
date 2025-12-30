import Link from "next/link";
import { Edit, CheckCircle, CircleDashed } from "lucide-react";
import { cn } from "@/app/lib/utils";

const sections = [
    { id: "hero", name: "Hero Section", status: "Active", description: "Main headline and introduction" },
    { id: "story", name: "Story Section", status: "Active", description: "Narrative tabs and content" },
    { id: "skills", name: "Skills", status: "Active", description: "Technological capabilities" },
    { id: "projects", name: "Projects", status: "Active", description: "Portfolio work items" },
    { id: "testimonials", name: "Testimonials", status: "Active", description: "Client reviews (Freelance only)" },
    { id: "contact", name: "Contact", status: "Active", description: "Contact form settings" }
];

export default function AdminDashboard() {
    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">Dashboard</h2>
                <p className="text-neutral-500 dark:text-neutral-400 mt-2">
                    Manage your portfolio content and visibility.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sections.map((section) => (
                    <div
                        key={section.id}
                        className="group relative bg-white dark:bg-neutral-950 rounded-xl border border-neutral-200 dark:border-neutral-800 p-6 shadow-sm hover:shadow-md transition-all hover:border-neutral-300 dark:hover:border-neutral-700"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2 bg-neutral-100 dark:bg-neutral-900 rounded-lg text-neutral-600 dark:text-neutral-400 group-hover:bg-neutral-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-neutral-900 transition-colors">
                                <Edit size={20} />
                            </div>
                            <span className={cn(
                                "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium",
                                section.status === "Active"
                                    ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                    : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                            )}>
                                {section.status === "Active" ? <CheckCircle size={12} /> : <CircleDashed size={12} />}
                                {section.status}
                            </span>
                        </div>

                        <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
                            {section.name}
                        </h3>
                        <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-6 min-h-[40px]">
                            {section.description}
                        </p>

                        <Link
                            href={`/admin/section/${section.id}`}
                            className="absolute inset-x-6 bottom-6 flex items-center justify-center py-2.5 rounded-lg bg-neutral-50 dark:bg-neutral-900 text-sm font-medium text-neutral-900 dark:text-neutral-100 hover:bg-neutral-900 hover:text-white dark:hover:bg-white dark:hover:text-neutral-900 transition-all opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0"
                        >
                            Edit Content
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
