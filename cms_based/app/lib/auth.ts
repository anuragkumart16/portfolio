/**
 * Authentication utility functions for admin panel
 */

const AUTH_STORAGE_KEY = 'admin_auth_hash';

/**
 * Hash a password using SHA-256
 */
export async function hashPassword(password: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

/**
 * Verify if the provided password matches the environment variable
 */
export async function verifyPassword(password: string): Promise<boolean> {
    const envPassword = process.env.NEXT_PUBLIC_PASSWORD;
    if (!envPassword) {
        console.error('NEXT_PUBLIC_PASSWORD environment variable is not set');
        return false;
    }
    return password === envPassword;
}

/**
 * Check if user is authenticated by verifying stored hash
 */
export async function isAuthenticated(): Promise<boolean> {
    if (typeof window === 'undefined') return false;

    const storedHash = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!storedHash) return false;

    const envPassword = process.env.NEXT_PUBLIC_PASSWORD;
    if (!envPassword) return false;

    const expectedHash = await hashPassword(envPassword);
    return storedHash === expectedHash;
}

/**
 * Store authentication hash in localStorage
 */
export async function storeAuth(password: string): Promise<void> {
    if (typeof window === 'undefined') return;

    const hash = await hashPassword(password);
    localStorage.setItem(AUTH_STORAGE_KEY, hash);
}

/**
 * Clear authentication data from localStorage
 */
export function logout(): void {
    if (typeof window === 'undefined') return;

    localStorage.removeItem(AUTH_STORAGE_KEY);
}
