"use client";

import { useActionState } from "react";
import { updateHero, deleteHero } from "@/app/actions/admin";
import { cn } from "@/app/lib/utils";

interface HeroFormProps {
    initialData: {
        id: string;
        title: string;
        subtitle: string | null;
        tone: string;
        isVisible: boolean;
        audience: string;
    } | null;
}

export default function HeroForm({ initialData }: HeroFormProps) {
    const [state, updateAction, updatePending] = useActionState(updateHero, null);
    const [deleteState, deleteAction, deletePending] = useActionState(deleteHero, null);

    return (
        <form action={updateAction} className="space-y-6">
            {initialData?.id && <input type="hidden" name="id" value={initialData.id} />}

            <div>
                <label htmlFor="title" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    Headline
                </label>
                <input
                    type="text"
                    name="title"
                    id="title"
                    defaultValue={initialData?.title || ""}
                    required
                    className="w-full px-4 py-2 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700"
                    placeholder="Main headline"
                />
            </div>

            <div>
                <label htmlFor="subtitle" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    Subtitle
                </label>
                <textarea
                    name="subtitle"
                    id="subtitle"
                    rows={2}
                    defaultValue={initialData?.subtitle || ""}
                    className="w-full px-4 py-2 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 resize-none"
                    placeholder="Optional introduction"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="githubUrl" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                        GitHub URL
                    </label>
                    <input
                        type="text"
                        name="githubUrl"
                        id="githubUrl"
                        defaultValue={(initialData as any)?.githubUrl || ""}
                        className="w-full px-4 py-2 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700"
                        placeholder="https://github.com/..."
                    />
                </div>
                <div>
                    <label htmlFor="resumeUrl" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                        Resume / CV URL
                    </label>
                    <input
                        type="text"
                        name="resumeUrl"
                        id="resumeUrl"
                        defaultValue={(initialData as any)?.resumeUrl || ""}
                        className="w-full px-4 py-2 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700"
                        placeholder="https://..."
                    />
                </div>
            </div>

            <div>
                <select
                    name="audience"
                    defaultValue={initialData?.audience || "company"}
                    className="w-full px-4 py-2 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700"
                >
                    <option value="company">Company</option>
                    <option value="freelance">Freelance</option>
                    <option value="general">General</option>
                </select>
            </div>

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

            <div className="pt-4 flex gap-2">
                <button
                    type="submit"
                    disabled={updatePending}
                    formAction={updateAction}
                    className="px-6 py-2 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                    {updatePending ? "Saving..." : "Save Changes"}
                </button>
                <button
                    type="submit"
                    disabled={deletePending}
                    formAction={deleteAction}
                    className="px-6 py-2 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                    {deletePending ? "Deleting..." : "Delete"}
                </button>
            </div>

            {state?.success && (
                <p className="text-green-600 dark:text-green-400 text-sm">{state.message}</p>
            )}
            {state?.success === false && (
                <p className="text-red-600 dark:text-red-400 text-sm">{state.message}</p>
            )}
            {deleteState?.success && (
                <p className="text-green-600 dark:text-green-400 text-sm">{deleteState.message}</p>
            )}
            {deleteState?.success === false && (
                <p className="text-red-600 dark:text-red-400 text-sm">{deleteState.message}</p>
            )}
        </form>
    );
}
