"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { translations } from "./translations";

type Language = "id" | "en";

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextValue>({
  language: "id",
  setLanguage: () => {},
  t: (key) => key,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("id");
  const [mounted, setMounted] = useState(false);

  // Load language from localStorage after mount
  useEffect(() => {
    try {
      const savedLang = localStorage.getItem("sejuba_lang");
      if (savedLang === "id" || savedLang === "en") {
        setLanguageState(savedLang);
      }
    } catch (e) {
      console.error("Failed to load language from localStorage", e);
    }
    setMounted(true);
  }, []);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("sejuba_lang", lang);
    } catch (e) {
      console.error("Failed to save language to localStorage", e);
    }
  }, []);

  const t = useCallback(
    (key: string): string => {
      const dict = translations[language];
      if (dict && dict[key] !== undefined) {
        return dict[key];
      }
      // Fallback to ID translation if key not found in active language
      const fallbackDict = translations["id"];
      if (fallbackDict && fallbackDict[key] !== undefined) {
        return fallbackDict[key];
      }
      return key;
    },
    [language]
  );

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
      }}
    >
      {/* Avoid rendering content until mounted to prevent hydration mismatches */}
      {mounted ? children : <div className="invisible">{children}</div>}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
