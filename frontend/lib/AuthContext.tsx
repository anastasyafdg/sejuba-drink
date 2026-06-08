"use client";

import {
    createContext,
    useContext,
    useState,
    useEffect,
    useCallback,
    ReactNode,
} from "react";
import {
    PembeliSession,
    getPembeliSession,
    setPembeliSession,
    clearPembeliSession,
} from "./auth";

// ============================================================
//  TYPES
// ============================================================

interface AuthContextValue {
    pembeli: PembeliSession | null;
    isLoggedIn: boolean;
    login: (data: PembeliSession) => void;
    logout: () => void;
}

// ============================================================
//  CONTEXT
// ============================================================

const AuthContext = createContext<AuthContextValue>({
    pembeli: null,
    isLoggedIn: false,
    login: () => {},
    logout: () => {},
});

// ============================================================
//  PROVIDER
// ============================================================

export function AuthProvider({ children }: { children: ReactNode }) {
    const [pembeli, setPembeli] = useState<PembeliSession | null>(null);

    // Hydrate dari localStorage saat mount (client-only)
    useEffect(() => {
        const session = getPembeliSession();
        if (session) setPembeli(session);
    }, []);

    const login = useCallback((data: PembeliSession) => {
        setPembeliSession(data);
        setPembeli(data);
    }, []);

    const logout = useCallback(() => {
        clearPembeliSession();
        setPembeli(null);
    }, []);

    return (
        <AuthContext.Provider
            value={{
                pembeli,
                isLoggedIn: pembeli !== null,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

// ============================================================
//  HOOK
// ============================================================

export function useAuth() {
    return useContext(AuthContext);
}
