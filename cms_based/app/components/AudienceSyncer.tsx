"use client";

import { useEffect } from "react";
import { useAudience } from "../context/audience-context";
import { Audience } from "../types";

export function AudienceSyncer({ audience }: { audience: Audience }) {
    const { setAudience } = useAudience();

    useEffect(() => {
        setAudience(audience);
    }, [audience, setAudience]);

    return null;
}
