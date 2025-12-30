"use client";

import { useActionState, useState, useEffect } from "react";
import { updateStory } from "@/app/actions/admin";
import { Trash2, Plus, GripVertical } from "lucide-react";
import { cn } from "@/app/lib/utils";

interface StoryTab {
    id: string;
    title: string;
    content: string;
    isVisible: boolean;
    audiences: string[];
    year?: string;
}

interface StoryFormProps {
    initialData: {
        id: string;
        tabs: StoryTab[];
        isVisible: boolean;
        updatedAt: Date;
    } | null;
}

export default function StoryForm({ initialData }: StoryFormProps) {
    const [state, updateAction, updatePending] = useActionState(updateStory, null);

    const [tabs, setTabs] = useState<StoryTab[]>(() => {
        return (initialData?.tabs || []).map((t: any) => ({
            ...t,
            // Backfill missing fields for existing data
            audiences: t.audiences || ['general', 'company', 'freelance'],
            year: t.year || ''
        }));
    });

    useEffect(() => {
        if (initialData?.tabs) {
            setTabs(initialData.tabs.map((t: any) => ({
                ...t,
                audiences: t.audiences || ['general', 'company', 'freelance'],
                year: t.year || ''
            })));
        }
    }, [initialData]);

    const getAudienceValue = (audiences: string[], isVisible: boolean): string => {
        if (!isVisible) return 'hidden';

        const set = new Set(audiences);
        if (set.has('general') && set.has('company') && set.has('freelance')) return 'everyone';
        if (set.has('general') && set.has('company')) return 'gen_comp';
        if (set.has('general') && set.has('freelance')) return 'gen_free';
        if (set.has('company') && set.has('freelance')) return 'comp_free';
        if (set.has('general')) return 'only_gen';
        if (set.has('company')) return 'only_comp';
        if (set.has('freelance')) return 'only_free';

        return 'everyone'; // Default fallback
    };

    const handleAudienceChange = (id: string, value: string) => {
        setTabs(currentTabs => currentTabs.map(t => {
            if (t.id !== id) return t;

            let newAudiences: string[] = [];
            let newIsVisible = true;

            switch (value) {
                case 'everyone':
                    newAudiences = ['general', 'company', 'freelance'];
                    break;
                case 'gen_comp':
                    newAudiences = ['general', 'company'];
                    break;
                case 'gen_free':
                    newAudiences = ['general', 'freelance'];
                    break;
                case 'comp_free':
                    newAudiences = ['company', 'freelance'];
                    break;
                case 'only_gen':
                    newAudiences = ['general'];
                    break;
                case 'only_comp':
                    newAudiences = ['company'];
                    break;
                case 'only_free':
                    newAudiences = ['freelance'];
                    break;
                case 'hidden':
                    newIsVisible = false;
                    newAudiences = [];
                    break;
                default:
                    newAudiences = ['general', 'company', 'freelance'];
            }

            return { ...t, isVisible: newIsVisible, audiences: newAudiences };
        }));
    };

    const moveTab = (index: number, direction: 'up' | 'down') => {
        if (direction === 'up' && index === 0) return;
        if (direction === 'down' && index === tabs.length - 1) return;

        const newTabs = [...tabs];
        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        [newTabs[index], newTabs[targetIndex]] = [newTabs[targetIndex], newTabs[index]];
        setTabs(newTabs);
    };

    const addTab = () => {
        const newTab: StoryTab = {
            id: `tab-${Date.now()}`,
            title: "New Chapter",
            content: "",
            isVisible: true,
            audiences: ["general", "company", "freelance"],
            year: new Date().getFullYear().toString()
        };
        setTabs([...tabs, newTab]);
    };

    const removeTab = (id: string) => {
        setTabs(tabs.filter(t => t.id !== id));
    };

    const updateTabField = (id: string, field: keyof StoryTab, value: any) => {
        setTabs(tabs.map(t => t.id === id ? { ...t, [field]: value } : t));
    };

    return (
        <form action={updateAction} className="space-y-8">
            <input type="hidden" name="tabs" value={JSON.stringify(tabs)} />

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

            <div className="border-t border-neutral-200 dark:border-neutral-800 pt-6">
                <div className="space-y-4">
                    {tabs.length === 0 && (
                        <p className="text-neutral-500 italic text-sm text-center py-8 bg-neutral-50 dark:bg-neutral-900 rounded-lg border border-dashed border-neutral-200 dark:border-neutral-800">
                            No chapters yet. Add one to tell your story.
                        </p>
                    )}

                    {tabs.map((tab, index) => (
                        <div
                            key={tab.id}
                            className="group relative bg-neutral-50 dark:bg-neutral-900/50 rounded-xl border border-neutral-200 dark:border-neutral-800 p-4 transition-all hover:border-neutral-300 dark:hover:border-neutral-700"
                        >
                            <div className="absolute right-4 top-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/50 dark:bg-neutral-900/50 backdrop-blur-sm rounded-lg p-1">
                                <button
                                    type="button"
                                    onClick={() => moveTab(index, 'up')}
                                    disabled={index === 0}
                                    className="p-1.5 text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 disabled:opacity-30 disabled:hover:text-neutral-500"
                                    title="Move up"
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6" /></svg>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => moveTab(index, 'down')}
                                    disabled={index === tabs.length - 1}
                                    className="p-1.5 text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 disabled:opacity-30 disabled:hover:text-neutral-500"
                                    title="Move down"
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                                </button>
                                <div className="w-px h-4 bg-neutral-200 dark:bg-neutral-800 mx-1" />
                                <button
                                    type="button"
                                    onClick={() => removeTab(tab.id)}
                                    className="p-1.5 text-neutral-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors"
                                    title="Remove chapter"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>

                            <div className="grid gap-4">
                                <div className="grid grid-cols-[2fr_1fr] gap-4">
                                    <div>
                                        <label className="block text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-1">
                                            Chapter Title
                                        </label>
                                        <input
                                            type="text"
                                            value={tab.title}
                                            onChange={(e) => updateTabField(tab.id, 'title', e.target.value)}
                                            className="w-full px-3 py-1.5 text-sm rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 focus:ring-1 focus:ring-neutral-900 dark:focus:ring-neutral-100 outline-none"
                                            placeholder="e.g. The Beginning"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-1">
                                            Year (Optional)
                                        </label>
                                        <input
                                            type="text"
                                            value={tab.year || ''}
                                            onChange={(e) => updateTabField(tab.id, 'year', e.target.value)}
                                            className="w-full px-3 py-1.5 text-sm rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 focus:ring-1 focus:ring-neutral-900 dark:focus:ring-neutral-100 outline-none"
                                            placeholder="e.g. 2023"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-1">
                                        Content
                                    </label>
                                    <textarea
                                        rows={4}
                                        value={tab.content}
                                        onChange={(e) => updateTabField(tab.id, 'content', e.target.value)}
                                        className="w-full px-3 py-1.5 text-sm rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 focus:ring-1 focus:ring-neutral-900 dark:focus:ring-neutral-100 outline-none resize-y min-h-[100px]"
                                        placeholder="Tell your story..."
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-1">
                                        Audience Visibility
                                    </label>
                                    <select
                                        value={getAudienceValue(tab.audiences || [], tab.isVisible)}
                                        onChange={(e) => handleAudienceChange(tab.id, e.target.value)}
                                        className="w-full px-3 py-1.5 text-sm rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 focus:ring-1 focus:ring-neutral-900 dark:focus:ring-neutral-100 outline-none"
                                    >
                                        <option value="everyone">Everyone (General + Company + Freelance)</option>
                                        <option value="gen_comp">General & Company</option>
                                        <option value="gen_free">General & Freelance</option>
                                        <option value="comp_free">Company & Freelance</option>
                                        <option value="only_gen">Only General</option>
                                        <option value="only_comp">Only Company</option>
                                        <option value="only_free">Only Freelance</option>
                                        <option value="hidden">Hidden (No One)</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    ))}

                    <button
                        type="button"
                        onClick={addTab}
                        className="flex items-center justify-center gap-2 w-full px-4 py-3 text-sm font-medium text-neutral-600 bg-zinc-50 hover:bg-zinc-100 dark:bg-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 border-2 border-dashed border-neutral-200 dark:border-neutral-800 rounded-xl transition-colors"
                    >
                        <Plus size={16} />
                        Add New Chapter
                    </button>
                </div>
            </div>

            <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800">
                <button
                    type="submit"
                    disabled={updatePending}
                    className="flex items-center justify-center w-full md:w-auto px-8 py-2.5 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 font-medium rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {updatePending ? "Saving Changes..." : "Save Story Settings"}
                </button>
                {state?.success && (
                    <p className="mt-2 text-green-600 dark:text-green-400 text-sm font-medium">{state.message}</p>
                )}
                {state?.success === false && (
                    <p className="mt-2 text-red-600 dark:text-red-400 text-sm font-medium">{state.message}</p>
                )}
            </div>
        </form>
    );
}
