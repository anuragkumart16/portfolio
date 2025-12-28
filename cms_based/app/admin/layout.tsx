import Link from "next/link";
import { LayoutDashboard, FileText, Users, Eye } from "lucide-react";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-neutral-100 dark:bg-neutral-900 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white dark:bg-neutral-950 border-r border-neutral-200 dark:border-neutral-800 hidden md:flex flex-col">
                <div className="p-6 border-b border-neutral-200 dark:border-neutral-800">
                    <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neutral-800 to-neutral-600 dark:from-neutral-100 dark:to-neutral-400">
                        Portfolio Admin
                    </h1>
                </div>
                <nav className="flex-1 p-4 space-y-1">
                    <Link
                        href="/admin"
                        className="flex items-center gap-3 px-4 py-3 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-900 rounded-lg transition-colors font-medium hover:text-neutral-900 dark:hover:text-neutral-100"
                    >
                        <LayoutDashboard size={20} />
                        Dashboard
                    </Link>
                    <div className="pt-4 pb-2">
                        <p className="px-4 text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                            Previews
                        </p>
                    </div>
                    <Link
                        href="/?audience=general"
                        target="_blank"
                        className="flex items-center gap-3 px-4 py-2 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-900 rounded-lg transition-colors text-sm"
                    >
                        <Users size={16} />
                        General Audience
                    </Link>
                    <Link
                        href="/?audience=company"
                        target="_blank"
                        className="flex items-center gap-3 px-4 py-2 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-900 rounded-lg transition-colors text-sm"
                    >
                        <Users size={16} />
                        Company Audience
                    </Link>
                    <Link
                        href="/?audience=freelance"
                        target="_blank"
                        className="flex items-center gap-3 px-4 py-2 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-900 rounded-lg transition-colors text-sm"
                    >
                        <Users size={16} />
                        Freelance Audience
                    </Link>
                </nav>
                <div className="p-4 border-t border-neutral-200 dark:border-neutral-800">
                    <Link href="/" className="flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100">
                        <Eye size={16} /> View Production
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                <header className="h-16 bg-white dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800 md:hidden flex items-center px-4">
                    <span className="font-bold">Admin</span>
                </header>
                <div className="p-8 max-w-5xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
