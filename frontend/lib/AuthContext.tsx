"use client";

import {
    createContext,
    useContext,
    useState,
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
    const [pembeli, setPembeli] = useState<PembeliSession | null>(() => {
        if (typeof window === "undefined") return null;
        return getPembeliSession();
    });

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
