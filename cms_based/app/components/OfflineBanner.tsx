"use client";

import { useState, useEffect } from "react";
import { WifiOff } from "lucide-react";

export default function OfflineBanner() {
    const [isOffline, setIsOffline] = useState(false);

    useEffect(() => {
        // Initial check to sync state, only update if different to avoid unnecessary render
        if (navigator.onLine === isOffline) {
            setIsOffline(!navigator.onLine);
        }

        const handleOnline = () => setIsOffline(false);
        const handleOffline = () => setIsOffline(true);

        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);

        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
        };
    }, []);

    if (!isOffline) return null;

    return (
        <div className="fixed bottom-4 right-4 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 px-4 py-2 rounded-full shadow-lg flex items-center gap-2 text-sm font-medium z-50 animate-in slide-in-from-bottom-4">
            <WifiOff size={16} />
            <span>You are currently offline.</span>
        </div>
    );
}
