"use client";

import { useActionState, useState, useEffect } from "react";
import { updateContactSettings } from "@/app/actions/contact";
import * as LucideIcons from "lucide-react";
import * as FaIcons from "react-icons/fa";
import * as SiIcons from "react-icons/si";
import { formatDistanceToNow } from "date-fns";

const IconLibrary: any = { ...FaIcons, ...SiIcons };
const { Mail, MessageSquare, Clock, Plus, Trash2, GripVertical, Link: LinkIcon } = LucideIcons;

interface SocialLink {
    id: string;
    platform: string;
    url: string;
    iconName: string | null;
    label: string;
    isVisible: boolean;
    audiences: string[];
}

interface ContactSettingsFormProps {
    initialData: {
        id: string;
        isVisible: boolean;
        title: string;
        subtitle: string;
        description: string | null;
        receiverEmail: string;
        socialLinks: SocialLink[];
    } | null;
    submissions: any[];
}

export default function ContactSettingsForm({ initialData, submissions }: ContactSettingsFormProps) {
    const [state, updateAction, updatePending] = useActionState(updateContactSettings, null);
    const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);

    useEffect(() => {
        if (initialData?.socialLinks) {
            setSocialLinks(initialData.socialLinks.map((l: any) => ({
                ...l,
                audiences: l.audiences || ['general', 'company', 'freelance']
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

    const addLink = () => {
        setSocialLinks([...socialLinks, {
            id: `link-${Date.now()}`,
            platform: "Custom",
            url: "",
            iconName: null,
            label: "New Link",
            isVisible: true,
            audiences: ['general', 'company', 'freelance']
        }]);
    };

    const updateLink = (id: string, field: keyof SocialLink | 'audience_select', value: any) => {
        setSocialLinks(links => links.map(link => {
            if (link.id !== id) return link;
            if (field === 'audience_select') {
                const { audiences, isVisible } = getAudiencesFromValue(value);
                return { ...link, audiences, isVisible };
            }
            return { ...link, [field]: value };
        }));
    };

    const removeLink = (id: string) => {
        setSocialLinks(links => links.filter(link => link.id !== id));
    };

    return (
        <div className="space-y-12">

            {/* Settings Section */}
            <form action={updateAction} className="space-y-8 bg-neutral-50 dark:bg-neutral-900/50 p-6 rounded-xl border border-neutral-200 dark:border-neutral-800">
                <input type="hidden" name="socialLinks" value={JSON.stringify(socialLinks)} />

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
                    <div className="md:col-span-2">
                        <label className="block text-xs font-medium text-neutral-500 mb-1">Section Title</label>
                        <input
                            type="text"
                            name="title"
                            defaultValue={initialData?.title || "Get in touch"}
                            className="w-full px-3 py-2 text-sm rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950"
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-xs font-medium text-neutral-500 mb-1">Subtitle</label>
                        <input
                            type="text"
                            name="subtitle"
                            defaultValue={initialData?.subtitle || "Have a project in mind or just want to say hi?"}
                            className="w-full px-3 py-2 text-sm rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950"
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-xs font-medium text-neutral-500 mb-1">Description (Short Paragraph)</label>
                        <textarea
                            name="description"
                            rows={3}
                            defaultValue={initialData?.description || ""}
                            className="w-full px-3 py-2 text-sm rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 resize-y"
                            placeholder="Write a short paragraph to display on mobile/tablet..."
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-xs font-medium text-neutral-500 mb-1">Receiver Email</label>
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

                {/* Social Links Management */}
                <div className="space-y-4 pt-4 border-t border-neutral-200 dark:border-neutral-700">
                    <div className="flex items-center justify-between">
                        <label className="block text-sm font-medium text-neutral-900 dark:text-neutral-100">Social Links</label>
                        <button type="button" onClick={addLink} className="text-xs flex items-center gap-1 text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100">
                            <Plus size={14} /> Add Link
                        </button>
                    </div>

                    <div className="space-y-3">
                        {socialLinks.map((link) => (
                            <div key={link.id} className="flex gap-4 items-start bg-white dark:bg-neutral-950 p-3 rounded-lg border border-neutral-200 dark:border-neutral-800">
                                {/* Icon Preview */}
                                <div className="w-12 h-12 flex items-center justify-center bg-neutral-100 dark:bg-neutral-900 rounded-md shrink-0 text-2xl text-neutral-600 dark:text-neutral-400">
                                    {link.iconName && IconLibrary[link.iconName]
                                        ? IconLibrary[link.iconName]({})
                                        : <LinkIcon size={24} />
                                    }
                                </div>

                                {/* Inputs */}
                                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                                    <div>
                                        <label className="block text-[10px] text-neutral-500 mb-1">Label (@handle)</label>
                                        <input
                                            value={link.label}
                                            onChange={(e) => updateLink(link.id, 'label', e.target.value)}
                                            className="w-full px-2 py-1 text-sm rounded border border-neutral-300 dark:border-neutral-700 bg-transparent"
                                            placeholder="@username"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] text-neutral-500 mb-1">URL</label>
                                        <input
                                            value={link.url}
                                            onChange={(e) => updateLink(link.id, 'url', e.target.value)}
                                            className="w-full px-2 py-1 text-sm rounded border border-neutral-300 dark:border-neutral-700 bg-transparent"
                                            placeholder="https://..."
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] text-neutral-500 mb-1">Icon Name (Lucide)</label>
                                        <input
                                            value={link.iconName || ''}
                                            onChange={(e) => updateLink(link.id, 'iconName', e.target.value)}
                                            className="w-full px-2 py-1 text-sm rounded border border-neutral-300 dark:border-neutral-700 bg-transparent"
                                            placeholder="FaGithub"
                                        />
                                        <a href="https://react-icons.github.io/react-icons/" target="_blank" className="text-[10px] text-blue-500 hover:underline">Pick icon</a>
                                    </div>
                                    <div>
                                        <label className="block text-[10px] text-neutral-500 mb-1">Visibility</label>
                                        <select
                                            value={getAudienceValue(link.audiences || [], link.isVisible)}
                                            onChange={(e) => updateLink(link.id, 'audience_select', e.target.value)}
                                            className="w-full px-2 py-1 text-sm rounded border border-neutral-300 dark:border-neutral-700 bg-transparent"
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

                                <button type="button" onClick={() => removeLink(link.id)} className="mt-1 text-neutral-400 hover:text-red-500 p-2">
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        ))}
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
