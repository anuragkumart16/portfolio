"use client";

import { cn } from "@/app/lib/utils";
import * as Icons from "lucide-react";
import * as FaIcons from "react-icons/fa";
import * as SiIcons from "react-icons/si";
import { useAudience } from "@/app/context/audience-context";

const IconLibrary: any = { ...FaIcons, ...SiIcons };

interface SocialLink {
    id: string;
    platform: string;
    url: string;
    iconName: string | null;
    label: string;
    isVisible: boolean;
    audiences: string[];
}

interface SocialLinksDisplayProps {
    links: SocialLink[];
}

export default function SocialLinksDisplay({ links }: SocialLinksDisplayProps) {
    const { audience } = useAudience();
    if (!links || links.length === 0) return null;

    // Filter by visibility AND audience targeting
    const filteredLinks = links.filter(l => {
        // Basic visibility toggle
        if (l.isVisible === false) return false;

        // If no audiences array, assume visible for all (compat)
        if (!l.audiences || l.audiences.length === 0) return true;

        // Check if current context is allowed
        return l.audiences.includes(audience);
    });

    if (filteredLinks.length === 0) return null;

    return (
        <div className="flex flex-col gap-4">
            {filteredLinks.map(link => {
                return (
                    <a
                        key={link.id}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 group"
                    >
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-neutral-100 dark:bg-neutral-900/50 text-neutral-500 dark:text-neutral-400 group-hover:bg-neutral-200 dark:group-hover:bg-neutral-800 group-hover:text-neutral-900 dark:group-hover:text-neutral-100 transition-colors">
                            {link.iconName && IconLibrary[link.iconName]
                                ? IconLibrary[link.iconName]({ size: 18 })
                                : <Icons.Link size={18} />
                            }
                        </div>
                        <span className="text-base font-medium text-neutral-600 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-neutral-100 transition-colors">
                            {link.label}
                        </span>
                    </a>
                );
            })}
        </div>
    );
}
