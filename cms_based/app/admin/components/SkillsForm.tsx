"use client";

import { useActionState, useState, useEffect } from "react";
import { updateSkills } from "@/app/actions/admin";
import { Trash2, Plus, GripVertical, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/app/lib/utils";
import * as FaIcons from "react-icons/fa";
import * as SiIcons from "react-icons/si";

// Simplified icon matching for demo. In production, consider a better picker.
const IconLibrary: any = { ...FaIcons, ...SiIcons };

interface SkillItem {
    id: string;
    name: string;
    iconName: string; // The specific key from react-icons (e.g. FaReact)
    isVisible: boolean;
    audiences: string[];
    isCore: boolean;
}

interface SkillCategory {
    id: string;
    title: string;
    isVisible: boolean;
    audiences: string[];
    skills: SkillItem[];
}

interface SkillsFormProps {
    initialData: {
        id: string;
        categories: SkillCategory[];
        isVisible: boolean;
        updatedAt: Date;
    } | null;
}

export default function SkillsForm({ initialData }: SkillsFormProps) {
    const [state, updateAction, updatePending] = useActionState(updateSkills, null);
    const [categories, setCategories] = useState<SkillCategory[]>([]);

    useEffect(() => {
        if (initialData?.categories) {
            setCategories(initialData.categories.map((c: any) => ({
                ...c,
                audiences: c.audiences || ['general', 'company', 'freelance'],
                skills: (c.skills || []).map((s: any) => ({
                    ...s,
                    audiences: s.audiences || ['general', 'company', 'freelance'],
                    iconName: s.iconName || ''
                }))
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
        return 'everyone';
    };

    const getAudiencesFromValue = (value: string): { audiences: string[], isVisible: boolean } => {
        let newAudiences: string[] = [];
        let newIsVisible = true;

        switch (value) {
            case 'everyone': newAudiences = ['general', 'company', 'freelance']; break;
            case 'gen_comp': newAudiences = ['general', 'company']; break;
            case 'gen_free': newAudiences = ['general', 'freelance']; break;
            case 'comp_free': newAudiences = ['company', 'freelance']; break;
            case 'only_gen': newAudiences = ['general']; break;
            case 'only_comp': newAudiences = ['company']; break;
            case 'only_free': newAudiences = ['freelance']; break;
            case 'hidden': newIsVisible = false; newAudiences = []; break;
            default: newAudiences = ['general', 'company', 'freelance'];
        }
        return { audiences: newAudiences, isVisible: newIsVisible };
    };

    // --- Category Actions ---

    const addCategory = () => {
        const newCat: SkillCategory = {
            id: `cat-${Date.now()}`,
            title: "New Batch",
            isVisible: true,
            audiences: ['general', 'company', 'freelance'],
            skills: []
        };
        setCategories([...categories, newCat]);
    };

    const removeCategory = (catId: string) => {
        if (confirm("Are you sure you want to delete this specific batch? All skills inside will be lost.")) {
            setCategories(categories.filter(c => c.id !== catId));
        }
    };

    const updateCategory = (catId: string, field: keyof SkillCategory, value: any) => {
        setCategories(categories.map(c => {
            if (c.id !== catId) return c;
            // Handle audience special case
            if (field === 'audiences') { // passed from select
                const { audiences, isVisible } = getAudiencesFromValue(value);
                return { ...c, audiences, isVisible };
            }
            return { ...c, [field]: value };
        }));
    };

    // --- Skill Actions ---

    const addSkill = (catId: string) => {
        setCategories(categories.map(c => {
            if (c.id !== catId) return c;
            const newSkill: SkillItem = {
                id: `skill-${Date.now()}`,
                name: "New Skill",
                iconName: "",
                isVisible: true,
                audiences: ['general', 'company', 'freelance'],
                isCore: false
            };
            return { ...c, skills: [...c.skills, newSkill] };
        }));
    };

    const removeSkill = (catId: string, skillId: string) => {
        setCategories(categories.map(c => {
            if (c.id !== catId) return c;
            return { ...c, skills: c.skills.filter(s => s.id !== skillId) };
        }));
    };

    const updateSkill = (catId: string, skillId: string, field: keyof SkillItem | 'audience_select', value: any) => {
        setCategories(categories.map(c => {
            if (c.id !== catId) return c;
            return {
                ...c,
                skills: c.skills.map(s => {
                    if (s.id !== skillId) return s;
                    if (field === 'audience_select') {
                        const { audiences, isVisible } = getAudiencesFromValue(value);
                        return { ...s, audiences, isVisible };
                    }
                    return { ...s, [field]: value };
                })
            }
        }));
    };

    return (
        <form action={updateAction} className="space-y-8">
            <input type="hidden" name="categories" value={JSON.stringify(categories)} />

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
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">Batches (Categories)</h3>
                </div>

                <div className="space-y-8">
                    {categories.map((cat, index) => (
                        <div key={cat.id} className="bg-neutral-50 dark:bg-neutral-900/40 rounded-xl border border-neutral-200 dark:border-neutral-800 p-6">
                            {/* Category Header */}
                            <div className="flex items-start justify-between mb-6">
                                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-medium text-neutral-500 mb-1">Batch Name</label>
                                        <input
                                            type="text"
                                            value={cat.title}
                                            onChange={(e) => updateCategory(cat.id, 'title', e.target.value)}
                                            className="w-full px-3 py-1.5 text-sm rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950"
                                            placeholder="e.g. Frontend"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-neutral-500 mb-1">Batch Visibility</label>
                                        <select
                                            value={getAudienceValue(cat.audiences || [], cat.isVisible)}
                                            onChange={(e) => updateCategory(cat.id, 'audiences', e.target.value)}
                                            className="w-full px-3 py-1.5 text-sm rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950"
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
                                <button type="button" onClick={() => removeCategory(cat.id)} className="ml-4 p-2 text-red-500 hover:bg-red-50 rounded-lg">
                                    <Trash2 size={18} />
                                </button>
                            </div>

                            {/* Skills List */}
                            <div className="space-y-3 pl-4 border-l-2 border-neutral-200 dark:border-neutral-800">
                                {cat.skills.map((skill) => (
                                    <div key={skill.id} className="flex gap-4 items-start bg-white dark:bg-neutral-950 p-3 rounded-lg border border-neutral-200 dark:border-neutral-800">

                                        {/* Icon Pick */}
                                        <div className="w-12 h-12 flex items-center justify-center bg-neutral-100 dark:bg-neutral-900 rounded-md shrink-0 text-2xl">
                                            {skill.iconName && IconLibrary[skill.iconName]
                                                ? IconLibrary[skill.iconName]({})
                                                : <span className="text-xs text-neutral-400">?</span>
                                            }
                                        </div>

                                        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3">
                                            <div>
                                                <label className="block text-[10px] font-medium text-neutral-400 mb-0.5">Skill Name</label>
                                                <input
                                                    type="text"
                                                    value={skill.name}
                                                    onChange={(e) => updateSkill(cat.id, skill.id, 'name', e.target.value)}
                                                    className="w-full px-2 py-1 text-sm rounded border border-neutral-200 dark:border-neutral-700 bg-transparent"
                                                    placeholder="React"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-[10px] font-medium text-neutral-400 mb-0.5">Icon Key (react-icons)</label>
                                                <input
                                                    type="text"
                                                    value={skill.iconName}
                                                    onChange={(e) => updateSkill(cat.id, skill.id, 'iconName', e.target.value)}
                                                    className="w-full px-2 py-1 text-sm rounded border border-neutral-200 dark:border-neutral-700 bg-transparent"
                                                    placeholder="SiReact"
                                                />
                                                <a href="https://react-icons.github.io/react-icons/" target="_blank" className="text-[10px] text-blue-500 hover:underline">Find keys here</a>
                                            </div>
                                            <div>
                                                <label className="block text-[10px] font-medium text-neutral-400 mb-0.5">Visibility</label>
                                                <select
                                                    value={getAudienceValue(skill.audiences || [], skill.isVisible)}
                                                    onChange={(e) => updateSkill(cat.id, skill.id, 'audience_select', e.target.value)}
                                                    className="w-full px-2 py-1 text-sm rounded border border-neutral-200 dark:border-neutral-700 bg-transparent"
                                                >
                                                    <option value="everyone">Everyone</option>
                                                    <option value="gen_comp">Gen & Comp</option>
                                                    <option value="gen_free">Gen & Free</option>
                                                    <option value="comp_free">Comp & Free</option>
                                                    <option value="only_gen">Only General</option>
                                                    <option value="only_comp">Only Comp</option>
                                                    <option value="only_free">Only Free</option>
                                                    <option value="hidden">Hidden</option>
                                                </select>
                                            </div>
                                        </div>
                                        <button type="button" onClick={() => removeSkill(cat.id, skill.id)} className="mt-4 text-neutral-400 hover:text-red-500">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                ))}

                                <button
                                    type="button"
                                    onClick={() => addSkill(cat.id)}
                                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-neutral-600 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700 rounded-lg transition-colors mt-2"
                                >
                                    <Plus size={14} />
                                    Add Skill
                                </button>
                            </div>

                        </div>
                    ))}

                    <button
                        type="button"
                        onClick={addCategory}
                        className="flex items-center justify-center gap-2 w-full px-4 py-3 text-sm font-medium text-neutral-600 bg-zinc-50 hover:bg-zinc-100 dark:bg-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 border-2 border-dashed border-neutral-200 dark:border-neutral-800 rounded-xl transition-colors"
                    >
                        <Plus size={16} />
                        Add New Batch
                    </button>
                </div>
            </div>

            <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800">
                <button
                    type="submit"
                    disabled={updatePending}
                    className="flex items-center justify-center w-full md:w-auto px-8 py-2.5 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 font-medium rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {updatePending ? "Saving Changes..." : "Save Skills Settings"}
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
