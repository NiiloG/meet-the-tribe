"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Locale, translations, Translations } from "@/lib/i18n";

interface LocaleContextValue {
  locale: Locale;
  t: Translations;
  setLocale: (l: Locale) => void;
}

const LocaleContext = createContext<LocaleContextValue>({
  locale: "en",
  t: translations.en,
  setLocale: () => {},
});

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    const stored = localStorage.getItem("mtt_locale") as Locale | null;
    if (stored === "en" || stored === "es") setLocaleState(stored);
  }, []);

  function setLocale(l: Locale) {
    setLocaleState(l);
    localStorage.setItem("mtt_locale", l);
  }

  return (
    <LocaleContext.Provider value={{ locale, t: translations[locale], setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  return useContext(LocaleContext);
}
