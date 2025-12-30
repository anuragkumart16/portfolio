"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function Navbar({ audience }: { audience: string }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    const navLinks = [
        { href: "#hero", label: "Home" },
        { href: "#story", label: "My Journey" },
        { href: "#skills", label: "Skills" },
        { href: "#projects", label: "Projects" },
        ...(audience === "freelance" ? [{ href: "#testimonials", label: "Testimonials" }] : []),
        { href: "#contact", label: "Contact" },
    ];

    return (
        <>
            {/* Desktop Navbar - Centered Pill */}
            <div className='fixed top-0 left-0 right-0 z-50 w-full hidden md:block'>
                <div className='flex items-center justify-center py-4'>
                    <motion.div
                        initial={{ y: -100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className='backdrop-blur-md border border-neutral-200 dark:border-zinc-800 rounded-full py-2 px-6 flex flex-row items-center gap-6 bg-white/80 dark:bg-zinc-950/80 shadow-lg mt-4'
                    >
                        <Link href="#hero" className="relative w-8 h-8 rounded-full overflow-hidden border border-neutral-200 dark:border-neutral-800 shrink-0">
                            <Image
                                src="/image.png"
                                alt="Profile"
                                fill
                                className="object-cover"
                                priority
                            />
                        </Link>
                        <div className="flex flex-row gap-6">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Mobile Navbar - Floating Hamburger */}
            <div className='fixed top-0 left-0 right-0 z-50 w-full md:hidden'>
                <div className='flex items-center justify-between p-4'>
                    <Link
                        href="#hero"
                        className="relative w-10 h-10 rounded-full overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-md"
                    >
                        <Image
                            src="/image.png"
                            alt="Profile"
                            fill
                            className="object-cover"
                            priority
                        />
                    </Link>

                    <button
                        onClick={toggleMenu}
                        className='p-3 rounded-full bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border border-neutral-200 dark:border-zinc-800 shadow-lg text-neutral-900 dark:text-neutral-100'
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className='fixed inset-0 z-40 bg-white dark:bg-zinc-950 pt-24 px-4 pb-4 md:hidden flex flex-col items-center gap-8'
                    >
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className="text-2xl font-bold text-neutral-900 dark:text-neutral-100"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

export default Navbar