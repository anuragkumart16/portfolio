"use client";

import { useSyncExternalStore } from "react";
import { WifiOff } from "lucide-react";

function subscribe(callback: () => void) {
    window.addEventListener("online", callback);
    window.addEventListener("offline", callback);
    return () => {
        window.removeEventListener("online", callback);
        window.removeEventListener("offline", callback);
    };
}

function getSnapshot() {
    return navigator.onLine;
}

function getServerSnapshot() {
    return true;
}

export default function OfflineBanner() {
    const isOnline = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
    const isOffline = !isOnline;

    if (!isOffline) return null;

    return (
        <div className="fixed bottom-4 right-4 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 px-4 py-2 rounded-full shadow-lg flex items-center gap-2 text-sm font-medium z-50 animate-in slide-in-from-bottom-4">
            <WifiOff size={16} />
            <span>You are currently offline.</span>
        </div>
    );
}
