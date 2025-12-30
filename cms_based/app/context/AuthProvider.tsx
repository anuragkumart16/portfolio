'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { isAuthenticated, logout as logoutUtil } from '@/app/lib/auth';

interface AuthContextType {
    isAuth: boolean;
    isLoading: boolean;
    logout: () => void;
    refreshAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isAuth, setIsAuth] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        checkAuth();
    }, [pathname]);

    const checkAuth = async () => {
        const authenticated = await isAuthenticated();
        setIsAuth(authenticated);
        setIsLoading(false);

        // Redirect to auth page if trying to access admin without authentication
        if (!authenticated && pathname?.startsWith('/admin')) {
            router.push('/auth');
        }

        // Redirect to admin if already authenticated and on auth page
        if (authenticated && pathname === '/auth') {
            router.push('/admin');
        }
    };

    const refreshAuth = async () => {
        setIsLoading(true);
        await checkAuth();
    };

    const logout = () => {
        logoutUtil();
        setIsAuth(false);
        router.push('/auth');
    };

    return (
        <AuthContext.Provider value={{ isAuth, isLoading, logout, refreshAuth }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
