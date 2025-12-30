"use client";

import { useActionState } from "react";
import { submitContactForm } from "../actions/contact";
import { cn } from "@/app/lib/utils";
import { Send, Mail, MessageSquare } from "lucide-react";
import { GridPattern } from "./ui/GridPattern";

export default function Contact() {
    const [state, formAction, isPending] = useActionState(submitContactForm, null);

    return (
        <section id="contact" className="py-24 px-4 md:px-8 relative overflow-hidden bg-white dark:bg-black border-t border-neutral-200 dark:border-neutral-800">

            {/* Cleaner Grid Background */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-50 dark:opacity-30">
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
            </div>

            <div className="max-w-2xl mx-auto relative z-10 text-center mb-12">
                <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-linear-to-b from-neutral-600 to-neutral-900 dark:from-neutral-100 dark:to-neutral-500 tracking-tight mb-4">
                    Get in touch
                </h2>
                <p className="text-neutral-500 dark:text-neutral-400 text-lg">
                    Have a project in mind or just want to say hi?
                </p>
            </div>

            <div className="max-w-xl mx-auto relative z-10">
                <form action={formAction} className="space-y-6">
                    <div className="relative group">
                        <div className="absolute left-4 top-3.5 text-neutral-400 group-focus-within:text-neutral-900 dark:group-focus-within:text-neutral-100 transition-colors">
                            <Mail size={18} />
                        </div>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="your@email.com"
                            required
                            className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/50 dark:bg-neutral-900/50 backdrop-blur-sm border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-neutral-100 transition-all shadow-sm group-hover:border-neutral-300 dark:group-hover:border-neutral-700"
                        />
                        {state?.errors?.email && (
                            <p className="text-red-500 text-sm mt-1 text-left ml-1">{state.errors.email[0]}</p>
                        )}
                    </div>

                    <div className="relative group">
                        <div className="absolute left-4 top-4 text-neutral-400 group-focus-within:text-neutral-900 dark:group-focus-within:text-neutral-100 transition-colors">
                            <MessageSquare size={18} />
                        </div>
                        <textarea
                            name="message"
                            id="message"
                            rows={5}
                            placeholder="How can I help you?"
                            required
                            className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/50 dark:bg-neutral-900/50 backdrop-blur-sm border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-neutral-100 transition-all shadow-sm group-hover:border-neutral-300 dark:group-hover:border-neutral-700 resize-none"
                        />
                        {state?.errors?.message && (
                            <p className="text-red-500 text-sm mt-1 text-left ml-1">{state.errors.message[0]}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isPending}
                        className="w-full bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 font-bold py-4 rounded-xl hover:opacity-90 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl relative overflow-hidden"
                    >
                        {/* Button shimmer effect could go here */}
                        {isPending ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin dark:border-neutral-900/30 dark:border-t-neutral-900" />
                        ) : (
                            <>
                                Send Message
                                <Send size={18} />
                            </>
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
            </div>
        </section>
    );
}
