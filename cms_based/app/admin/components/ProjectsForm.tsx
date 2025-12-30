"use client";

import { useActionState, useState, useEffect } from "react";
import { updateProjects } from "@/app/actions/admin";
import { Trash2, Plus, GripVertical, ChevronDown, ChevronUp } from "lucide-react";

interface ProjectItem {
    id: string;
    title: string;
    description: string;
    images: string[];
    techStack: string[];
    liveUrl: string;
    repoUrl: string;
    audiences: string[];
    isVisible: boolean;
    useIframe: boolean;
}

interface ProjectsFormProps {
    initialData: {
        id: string;
        isVisible: boolean;
        projects: ProjectItem[];
        updatedAt: Date;
    } | null;
}

export default function ProjectsForm({ initialData }: ProjectsFormProps) {
    const [state, updateAction, updatePending] = useActionState(updateProjects, null);
    const [projects, setProjects] = useState<ProjectItem[]>([]);

    useEffect(() => {
        if (initialData?.projects) {
            setProjects(initialData.projects.map((p: any) => ({
                ...p,
                audiences: p.audiences || ['general', 'company', 'freelance'],
                images: p.images || [],
                techStack: p.techStack || [],
                liveUrl: p.liveUrl || '',
                repoUrl: p.repoUrl || ''
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

    const handleAudienceChange = (id: string, value: string) => {
        setProjects(current => current.map(p => {
            if (p.id !== id) return p;

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
            return { ...p, isVisible: newIsVisible, audiences: newAudiences };
        }));
    };

    const updateProject = (id: string, field: keyof ProjectItem, value: any) => {
        setProjects(current => current.map(p => {
            if (p.id !== id) return p;
            return { ...p, [field]: value };
        }));
    };

    const addProject = () => {
        const newProject: ProjectItem = {
            id: `proj-${Date.now()}`,
            title: "New Project",
            description: "",
            images: [],
            techStack: [],
            liveUrl: "",
            repoUrl: "",
            audiences: ['general', 'company', 'freelance'],
            isVisible: true,
            useIframe: false
        };
        setProjects([...projects, newProject]);
    };

    const removeProject = (id: string) => {
        if (confirm("Are you sure?")) {
            setProjects(projects.filter(p => p.id !== id));
        }
    };

    const moveProject = (index: number, direction: 'up' | 'down') => {
        const newProjects = [...projects];
        const swapIndex = direction === 'up' ? index - 1 : index + 1;
        if (swapIndex >= 0 && swapIndex < newProjects.length) {
            [newProjects[index], newProjects[swapIndex]] = [newProjects[swapIndex], newProjects[index]];
            setProjects(newProjects);
        }
    };

    return (
        <form action={updateAction} className="space-y-8">
            <input type="hidden" name="projects" value={JSON.stringify(projects)} />

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

            <div className="space-y-6">
                {projects.map((project, index) => (
                    <div key={project.id} className="bg-neutral-50 dark:bg-neutral-900/50 rounded-xl border border-neutral-200 dark:border-neutral-800 p-6 relative group">

                        {/* Actions */}
                        <div className="absolute right-4 top-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/50 dark:bg-neutral-900/50 backdrop-blur-sm rounded-lg p-1">
                            <button type="button" onClick={() => moveProject(index, 'up')} disabled={index === 0} className="p-1.5 text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 disabled:opacity-30">
                                <ChevronUp size={16} />
                            </button>
                            <button type="button" onClick={() => moveProject(index, 'down')} disabled={index === projects.length - 1} className="p-1.5 text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 disabled:opacity-30">
                                <ChevronDown size={16} />
                            </button>
                            <div className="w-px h-4 bg-neutral-200 dark:bg-neutral-800 mx-1" />
                            <button type="button" onClick={() => removeProject(project.id)} className="p-1.5 text-neutral-500 hover:text-red-500">
                                <Trash2 size={16} />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-medium text-neutral-500 mb-1">Title</label>
                                    <input
                                        type="text"
                                        value={project.title}
                                        onChange={(e) => updateProject(project.id, 'title', e.target.value)}
                                        className="w-full px-3 py-1.5 text-sm rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-neutral-500 mb-1">Description</label>
                                    <textarea
                                        rows={3}
                                        value={project.description}
                                        onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                                        className="w-full px-3 py-1.5 text-sm rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 resize-y"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-medium text-neutral-500 mb-1">Live URL</label>
                                        <input
                                            type="text"
                                            value={project.liveUrl}
                                            onChange={(e) => updateProject(project.id, 'liveUrl', e.target.value)}
                                            className="w-full px-3 py-1.5 text-sm rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950"
                                            placeholder="https://..."
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-neutral-500 mb-1">Repo URL</label>
                                        <input
                                            type="text"
                                            value={project.repoUrl}
                                            onChange={(e) => updateProject(project.id, 'repoUrl', e.target.value)}
                                            className="w-full px-3 py-1.5 text-sm rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950"
                                            placeholder="https://github.com/..."
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-medium text-neutral-500 mb-1">Tech Stack (comma separated)</label>
                                    <input
                                        type="text"
                                        value={project.techStack.join(", ")}
                                        onChange={(e) => updateProject(project.id, 'techStack', e.target.value.split(",").map(s => s.trim()))}
                                        className="w-full px-3 py-1.5 text-sm rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950"
                                        placeholder="React, Node.js, TypeScript"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-neutral-500 mb-1">Image URL (Currently supporting single main image)</label>
                                    <input
                                        type="text"
                                        value={project.images[0] || ''}
                                        onChange={(e) => updateProject(project.id, 'images', [e.target.value])}
                                        className="w-full px-3 py-1.5 text-sm rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950"
                                        placeholder="https://example.com/image.png"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-neutral-500 mb-1">Audience Visibility</label>
                                    <select
                                        value={getAudienceValue(project.audiences || [], project.isVisible)}
                                        onChange={(e) => handleAudienceChange(project.id, e.target.value)}
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
                        </div>
                    </div>
                ))}

                <button
                    type="button"
                    onClick={addProject}
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 text-sm font-medium text-neutral-600 bg-zinc-50 hover:bg-zinc-100 dark:bg-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 border-2 border-dashed border-neutral-200 dark:border-neutral-800 rounded-xl transition-colors"
                >
                    <Plus size={16} />
                    Add New Project
                </button>
            </div>

            <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800">
                <button
                    type="submit"
                    disabled={updatePending}
                    className="flex items-center justify-center w-full md:w-auto px-8 py-2.5 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 font-medium rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {updatePending ? "Saving Changes..." : "Save Projects"}
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
