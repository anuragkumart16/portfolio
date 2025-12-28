export default function Footer() {
    return (
        <footer className="py-8 border-t border-neutral-200 dark:border-neutral-800 mt-20">
            <div className="max-w-4xl mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-neutral-500 dark:text-neutral-400">
                <p>
                    © {new Date().getFullYear()} Anurag. All rights reserved.
                </p>
                <nav className="flex gap-6">
                    <a href="#" className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">Home</a>
                    <a href="#" className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">Story</a>
                    <a href="#" className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">Work</a>
                    <a href="#" className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">Contact</a>
                </nav>
            </div>
        </footer>
    );
}
