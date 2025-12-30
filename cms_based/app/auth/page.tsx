'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Lock, AlertCircle } from 'lucide-react';
import { verifyPassword, storeAuth } from '@/app/lib/auth';
import { useAuth } from '@/app/context/AuthProvider';
import Threads from '@/app/components/bits/Threads';
import { motion, AnimatePresence } from 'framer-motion';

export default function AuthPage() {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { refreshAuth } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const isValid = await verifyPassword(password);

            if (isValid) {
                await storeAuth(password);
                await refreshAuth();
                router.push('/admin');
            } else {
                setError('Wrong password. Please try again.');
                setPassword('');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
            console.error('Auth error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden bg-white dark:bg-neutral-950">
            {/* Background Threads */}
            <div className="absolute inset-0 w-full h-full opacity-40 dark:opacity-100">
                <Threads
                    amplitude={1.5}
                    distance={0}
                    enableMouseInteraction={true}
                />
            </div>

            <main className="relative z-10 w-full max-w-md">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="text-center mb-10"
                >
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-neutral-900 dark:bg-neutral-100 mb-6 shadow-2xl transform hover:rotate-6 transition-transform duration-300">
                        <Lock className="w-10 h-10 text-white dark:text-neutral-900" />
                    </div>
                    <h1 className="text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-3 tracking-tight">
                        Admin Access
                    </h1>
                    <p className="text-neutral-500 dark:text-neutral-400 font-medium">
                        Please enter your password to continue.
                    </p>
                </motion.div>

                {/* Login Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="bg-white/40 dark:bg-neutral-900/40 backdrop-blur-2xl rounded-3xl shadow-[0_32px_64px_-15px_rgba(0,0,0,0.1)] border border-white/50 dark:border-neutral-800/50 p-8 md:p-10 relative overflow-hidden group"
                >
                    <div className="absolute inset-0 bg-linear-to-br from-white/10 to-transparent dark:from-white/5 pointer-events-none" />

                    <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                        <div className="space-y-2">
                            <label
                                htmlFor="password"
                                className="block text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-widest px-1"
                            >
                                Password
                            </label>
                            <div className="relative group/input">
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-5 py-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-950/50 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-neutral-100 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                                    placeholder="••••••••"
                                    required
                                    autoFocus
                                    disabled={isLoading}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
                                    tabIndex={-1}
                                >
                                    <AnimatePresence mode="wait">
                                        {showPassword ? (
                                            <motion.div
                                                key="eye-off"
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.8 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                <EyeOff className="w-5 h-5" />
                                            </motion.div>
                                        ) : (
                                            <motion.div
                                                key="eye"
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.8 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                <Eye className="w-5 h-5" />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </button>
                            </div>
                        </div>

                        {error && (
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex items-center gap-3 p-4 rounded-2xl bg-red-50/50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20 text-red-600 dark:text-red-400 text-sm font-medium"
                            >
                                <AlertCircle className="w-5 h-5 shrink-0" />
                                <span>{error}</span>
                            </motion.div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading || !password}
                            className="group relative w-full py-4 px-6 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 rounded-2xl font-bold hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] dark:hover:shadow-[0_20px_40px_-10px_rgba(255,255,255,0.1)] focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-neutral-100 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform active:scale-[0.98]"
                        >
                            <div className="absolute inset-0 flex items-center justify-center">
                                {isLoading ? (
                                    <svg className="animate-spin h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                ) : (
                                    <span className="flex items-center gap-2">
                                        Sign In
                                    </span>
                                )}
                            </div>
                            <span className="opacity-0">Sign In</span>
                        </button>
                    </form>
                </motion.div>

                {/* Footer Text */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="mt-10 text-center"
                >
                    <p className="text-sm font-medium text-neutral-400 dark:text-neutral-600 tracking-wide">
                        PROTECTED BY SECURE AUTHENTICATION
                    </p>
                </motion.div>
            </main>
        </div>
    );
}
