"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Audience, AudienceContextType } from '../types';

const AudienceContext = createContext<AudienceContextType | undefined>(undefined);

export function AudienceProvider({ children }: { children: React.ReactNode }) {
    const [audience, setAudience] = useState<Audience>('general');

    // Persist audience selection if needed, or default to general
    // For now, simple state.

    return (
        <AudienceContext.Provider value={{ audience, setAudience }}>
            {children}
        </AudienceContext.Provider>
    );
}

export function useAudience() {
    const context = useContext(AudienceContext);
    if (context === undefined) {
        throw new Error('useAudience must be used within an AudienceProvider');
    }
    return context;
}
