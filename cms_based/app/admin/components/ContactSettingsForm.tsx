"use client";

import { useActionState, useEffect, useState } from "react";
import { updateContactSettings } from "@/app/actions/contact";
import { Mail, MessageSquare, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface ContactSettingsFormProps {
    initialData: {
        id: string;
        isVisible: boolean;
        title: string;
        subtitle: string;
        receiverEmail: string;
    } | null;
    submissions: any[];
}

export default function ContactSettingsForm({ initialData, submissions }: ContactSettingsFormProps) {
    const [state, updateAction, updatePending] = useActionState(updateContactSettings, null);

    return (
        <div className="space-y-12">

            {/* Settings Section */}
            <form action={updateAction} className="space-y-8 bg-neutral-50 dark:bg-neutral-900/50 p-6 rounded-xl border border-neutral-200 dark:border-neutral-800">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
                        <Mail className="w-5 h-5" />
                        Configuration
                    </h3>
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            name="isVisible"
                            id="isVisible"
                            defaultChecked={initialData?.isVisible ?? true}
                            className="w-4 h-4 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900"
                        />
                        <label htmlFor="isVisible" className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                            Section Visible
                        </label>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-xs font-medium text-neutral-500 mb-1">Section Title</label>
                        <input
                            type="text"
                            name="title"
                            defaultValue={initialData?.title || "Get in touch"}
                            className="w-full px-3 py-2 text-sm rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-neutral-500 mb-1">Subtitle</label>
                        <input
                            type="text"
                            name="subtitle"
                            defaultValue={initialData?.subtitle || "Have a project in mind or just want to say hi?"}
                            className="w-full px-3 py-2 text-sm rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950"
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-xs font-medium text-neutral-500 mb-1">Receiver Email (Where submissions go)</label>
                        <input
                            type="email"
                            name="receiverEmail"
                            defaultValue={initialData?.receiverEmail || "me@example.com"}
                            className="w-full px-3 py-2 text-sm rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950"
                        />
                        <p className="text-[10px] text-neutral-400 mt-1">
                            Note: Actual email sending integration required. Currently submissions are stored in database below.
                        </p>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={updatePending}
                    className="flex items-center justify-center w-full md:w-auto px-6 py-2 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 font-medium rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                    {updatePending ? "Saving..." : "Save Settings"}
                </button>
                {state?.success && <p className="text-green-600 text-sm mt-2">{state.message}</p>}
            </form>

            {/* Submissions List */}
            <div>
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-6 flex items-center gap-2">
                    <MessageSquare className="w-5 h-5" />
                    Recent Messages ({submissions.length})
                </h3>

                {submissions.length === 0 ? (
                    <div className="text-center py-12 border-2 border-dashed border-neutral-200 dark:border-neutral-800 rounded-xl text-neutral-500">
                        No messages yet.
                    </div>
                ) : (
                    <div className="space-y-4">
                        {submissions.map((sub) => (
                            <div key={sub.id} className="bg-white dark:bg-neutral-950 p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-sm transition-shadow hover:shadow-md">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h4 className="font-medium text-neutral-900 dark:text-neutral-100">{sub.email}</h4>
                                        <p className="text-xs text-neutral-500 flex items-center gap-1 mt-1">
                                            <Clock size={12} />
                                            {formatDistanceToNow(new Date(sub.createdAt), { addSuffix: true })}
                                        </p>
                                    </div>
                                    <span className={`px-2 py-0.5 text-xs font-medium rounded-full uppercase ${sub.status === 'unread' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' : 'bg-neutral-100 text-neutral-600'}`}>
                                        {sub.status}
                                    </span>
                                </div>
                                <p className="text-neutral-600 dark:text-neutral-400 text-sm whitespace-pre-wrap mt-3 bg-neutral-50 dark:bg-neutral-900/50 p-3 rounded-lg border border-neutral-100 dark:border-neutral-800/50">
                                    {sub.message}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>

        </div>
    );
}
