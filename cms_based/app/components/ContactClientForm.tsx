"use client";

import { useActionState } from "react";
import { submitContactForm } from "../actions/contact";
import { Send, Mail, MessageSquare, User } from "lucide-react";

export default function ContactClientForm() {
    const [state, formAction, isPending] = useActionState(submitContactForm, null);

    return (
        <form action={formAction} className="space-y-6">
            <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium text-neutral-400 dark:text-neutral-400">
                    Name
                </label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="John Doe"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-400 dark:focus:ring-neutral-500 transition-all"
                />
            </div>

            <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-neutral-400 dark:text-neutral-400">
                    Email
                </label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="john@example.com"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-400 dark:focus:ring-neutral-500 transition-all"
                />
                {state?.errors?.email && (
                    <p className="text-red-500 text-sm mt-1">{state.errors.email[0]}</p>
                )}
            </div>

            <div className="space-y-2">
                <label htmlFor="message" className="block text-sm font-medium text-neutral-400 dark:text-neutral-400">
                    Message
                </label>
                <textarea
                    name="message"
                    id="message"
                    rows={4}
                    placeholder="Your thoughts..."
                    required
                    className="w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-400 dark:focus:ring-neutral-500 transition-all resize-none"
                />
                {state?.errors?.message && (
                    <p className="text-red-500 text-sm mt-1">{state.errors.message[0]}</p>
                )}
            </div>

            <button
                type="submit"
                disabled={isPending}
                className="w-full bg-neutral-900 dark:bg-neutral-200 text-white dark:text-neutral-900 font-bold py-4 rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
                {isPending ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin dark:border-neutral-900/30 dark:border-t-neutral-900" />
                ) : (
                    "Send Message"
                )}
            </button>

            <div className="h-6">
                {state?.success && (
                    <p className="text-green-600 dark:text-green-400 text-center text-sm font-medium animate-in fade-in slide-in-from-bottom-2">
                        {state.message}
                    </p>
                )}
                {state?.success === false && state.message && (
                    <p className="text-red-600 dark:text-red-400 text-center text-sm font-medium animate-in fade-in slide-in-from-bottom-2">
                        {state.message}
                    </p>
                )}
            </div>
        </form>
    );
}
