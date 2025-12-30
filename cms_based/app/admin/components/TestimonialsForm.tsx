"use client";

import { useActionState, useState, useEffect } from "react";
import { updateTestimonials } from "@/app/actions/admin";
import { Trash2, Plus, GripVertical } from "lucide-react";

interface TestimonialItem {
    id: string;
    name: string;
    role: string;
    company: string | null;
    content: string;
    avatarUrl: string | null;
    isVisible: boolean;
}

interface TestimonialsFormProps {
    initialData: {
        id: string;
        isVisible: boolean;
        onlyFreelance: boolean;
        testimonials: TestimonialItem[];
        updatedAt: Date;
    } | null;
}

export default function TestimonialsForm({ initialData }: TestimonialsFormProps) {
    const [state, updateAction, updatePending] = useActionState(updateTestimonials, null);
    const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);

    useEffect(() => {
        if (initialData?.testimonials) {
            setTestimonials(initialData.testimonials.map((t: any) => ({
                id: t.id,
                name: t.name || "",
                role: t.role || "",
                company: t.company || "",
                content: t.content || "",
                avatarUrl: t.avatarUrl || "",
                isVisible: t.isVisible ?? true
            })));
        }
    }, [initialData]);

    const addTestimonial = () => {
        const newTestimonial: TestimonialItem = {
            id: `test-${Date.now()}`,
            name: "John Doe",
            role: "CEO",
            company: "Tech Corp",
            content: "Amazing work! Highly recommended.",
            avatarUrl: "",
            isVisible: true
        };
        setTestimonials([...testimonials, newTestimonial]);
    };

    const removeTestimonial = (id: string) => {
        if (confirm("Are you sure?")) {
            setTestimonials(testimonials.filter(t => t.id !== id));
        }
    };

    const updateTestimonial = (id: string, field: keyof TestimonialItem, value: any) => {
        setTestimonials(testimonials.map(t => t.id === id ? { ...t, [field]: value } : t));
    };

    const moveTestimonial = (index: number, direction: 'up' | 'down') => {
        if (direction === 'up' && index === 0) return;
        if (direction === 'down' && index === testimonials.length - 1) return;

        const newTestimonials = [...testimonials];
        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        [newTestimonials[index], newTestimonials[targetIndex]] = [newTestimonials[targetIndex], newTestimonials[index]];
        setTestimonials(newTestimonials);
    };

    return (
        <form action={updateAction} className="space-y-8">
            <input type="hidden" name="testimonials" value={JSON.stringify(testimonials)} />

            <div className="flex flex-col gap-4 p-4 bg-neutral-50 dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800">
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

                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        name="onlyFreelance"
                        id="onlyFreelance"
                        defaultChecked={initialData?.onlyFreelance ?? false}
                        className="w-4 h-4 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900"
                    />
                    <label htmlFor="onlyFreelance" className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                        Show only to Freelance Audience
                    </label>
                </div>
                <p className="text-xs text-neutral-500">If checked, this section will effectively be hidden for General and Company audiences.</p>
            </div>

            <div className="space-y-6">
                {testimonials.length === 0 && (
                    <p className="text-center text-neutral-500 py-8 border-2 border-dashed border-neutral-200 dark:border-neutral-800 rounded-xl">
                        No testimonials yet. Add one to build trust.
                    </p>
                )}

                {testimonials.map((item, index) => (
                    <div key={item.id} className="relative bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 shadow-sm group">

                        <div className="absolute right-4 top-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/50 dark:bg-neutral-900/50 backdrop-blur-sm rounded-lg p-1">
                            <button type="button" onClick={() => moveTestimonial(index, 'up')} disabled={index === 0} className="p-1.5 text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 disabled:opacity-30">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6" /></svg>
                            </button>
                            <button type="button" onClick={() => moveTestimonial(index, 'down')} disabled={index === testimonials.length - 1} className="p-1.5 text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 disabled:opacity-30">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                            </button>
                            <div className="w-px h-4 bg-neutral-200 dark:bg-neutral-800 mx-1" />
                            <button type="button" onClick={() => removeTestimonial(item.id)} className="p-1.5 text-neutral-500 hover:text-red-600">
                                <Trash2 size={16} />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-medium text-neutral-500 mb-1">Name</label>
                                    <input
                                        type="text"
                                        value={item.name}
                                        onChange={(e) => updateTestimonial(item.id, 'name', e.target.value)}
                                        className="w-full px-3 py-1.5 text-sm rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-medium text-neutral-500 mb-1">Role</label>
                                        <input
                                            type="text"
                                            value={item.role}
                                            onChange={(e) => updateTestimonial(item.id, 'role', e.target.value)}
                                            className="w-full px-3 py-1.5 text-sm rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-neutral-500 mb-1">Company</label>
                                        <input
                                            type="text"
                                            value={item.company || ''}
                                            onChange={(e) => updateTestimonial(item.id, 'company', e.target.value)}
                                            className="w-full px-3 py-1.5 text-sm rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-neutral-500 mb-1">Avatar URL (Optional)</label>
                                    <input
                                        type="text"
                                        value={item.avatarUrl || ''}
                                        onChange={(e) => updateTestimonial(item.id, 'avatarUrl', e.target.value)}
                                        className="w-full px-3 py-1.5 text-sm rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950"
                                        placeholder="https://..."
                                    />
                                </div>
                                <div className="flex items-center gap-2 pt-2">
                                    <input
                                        type="checkbox"
                                        checked={item.isVisible}
                                        onChange={(e) => updateTestimonial(item.id, 'isVisible', e.target.checked)}
                                        id={`visible-${item.id}`}
                                        className="w-4 h-4 rounded border-neutral-300"
                                    />
                                    <label htmlFor={`visible-${item.id}`} className="text-xs text-neutral-600 dark:text-neutral-400">Show this testimonial</label>
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-neutral-500 mb-1">Content</label>
                                <textarea
                                    rows={5}
                                    value={item.content}
                                    onChange={(e) => updateTestimonial(item.id, 'content', e.target.value)}
                                    className="w-full px-3 py-1.5 text-sm rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 resize-y"
                                />
                            </div>
                        </div>
                    </div>
                ))}

                <button
                    type="button"
                    onClick={addTestimonial}
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 text-sm font-medium text-neutral-600 bg-zinc-50 hover:bg-zinc-100 dark:bg-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 border-2 border-dashed border-neutral-200 dark:border-neutral-800 rounded-xl transition-colors"
                >
                    <Plus size={16} />
                    Add New Testimonial
                </button>
            </div>

            <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800">
                <button
                    type="submit"
                    disabled={updatePending}
                    className="flex items-center justify-center w-full md:w-auto px-8 py-2.5 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 font-medium rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {updatePending ? "Saving Changes..." : "Save Testimonials"}
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
