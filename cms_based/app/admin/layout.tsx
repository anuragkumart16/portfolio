'use client';

import Link from "next/link";
import { LayoutDashboard, FileText, Users, Eye, LogOut } from "lucide-react";
import { useAuth } from "@/app/context/AuthProvider";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { isAuth, isLoading, logout } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && !isAuth) {
            router.push('/auth');
        }
    }, [isAuth, isLoading, router]);

    // Show loading state while checking authentication
    if (isLoading) {
        return (
            <div className="min-h-screen bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-neutral-900 dark:border-neutral-100"></div>
                    <p className="mt-4 text-neutral-600 dark:text-neutral-400">Loading...</p>
                </div>
            </div>
        );
    }

    // Don't render admin content if not authenticated
    if (!isAuth) {
        return null;
    }

    return (
        <div className="min-h-screen bg-neutral-100 dark:bg-neutral-900 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white dark:bg-neutral-950 border-r border-neutral-200 dark:border-neutral-800 hidden md:flex flex-col">
                <div className="p-6 border-b border-neutral-200 dark:border-neutral-800">
                    <h1 className="text-xl font-bold bg-clip-text text-transparent bg-linear-to-r from-neutral-800 to-neutral-600 dark:from-neutral-100 dark:to-neutral-400">
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
                <div className="p-4 border-t border-neutral-200 dark:border-neutral-800 space-y-2">
                    <Link href="/" className="flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100">
                        <Eye size={16} /> View Production
                    </Link>
                    <button
                        onClick={logout}
                        className="w-full flex items-center gap-2 text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors"
                    >
                        <LogOut size={16} /> Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                <header className="h-16 bg-white dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800 md:hidden flex items-center justify-between px-4">
                    <span className="font-bold">Admin</span>
                    <button
                        onClick={logout}
                        className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400"
                    >
                        <LogOut size={16} /> Logout
                    </button>
                </header>
                <div className="p-8 max-w-5xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
