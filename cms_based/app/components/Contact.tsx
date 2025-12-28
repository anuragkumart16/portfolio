"use client";

import { useActionState } from "react";
import { submitContactForm } from "../actions/contact";
import { cn } from "@/app/lib/utils";
import { Send } from "lucide-react";

export default function Contact() {
    const [state, formAction, isPending] = useActionState(submitContactForm, null);

    return (
        <section className="py-20 px-4 md:px-8 max-w-xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4 text-neutral-900 dark:text-neutral-100">
                Get in touch
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 mb-8">
                Have a project in mind or just want to say hi?
            </p>

            <form action={formAction} className="space-y-4 text-left">
                <div>
                    <label htmlFor="email" className="sr-only">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="your@email.com"
                        required
                        className="w-full px-4 py-3 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 focus:ring-2 focus:ring-neutral-900 dark:focus:ring-neutral-100 outline-none transition-all placeholder:text-neutral-400"
                    />
                    {state?.errors?.email && (
                        <p className="text-red-500 text-sm mt-1">{state.errors.email[0]}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="message" className="sr-only">Message</label>
                    <textarea
                        name="message"
                        id="message"
                        rows={4}
                        placeholder="How can I help you?"
                        required
                        className="w-full px-4 py-3 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 focus:ring-2 focus:ring-neutral-900 dark:focus:ring-neutral-100 outline-none transition-all placeholder:text-neutral-400 resize-none"
                    />
                    {state?.errors?.message && (
                        <p className="text-red-500 text-sm mt-1">{state.errors.message[0]}</p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={isPending}
                    className="w-full bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 font-medium py-3 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50"
                >
                    {isPending ? "Sending..." : "Send Message"}
                    {!isPending && <Send size={16} />}
                </button>

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
            </form>
        </section>
    );
}
