"use client";

import { useLocale } from "@/context/LocaleContext";

export default function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { locale, setLocale } = useLocale();

  return (
    <div className={`flex items-center gap-1 rounded-full border border-cream-dark bg-cream px-1 py-0.5 text-xs font-semibold ${className}`}>
      <button
        onClick={() => setLocale("en")}
        className={`px-2 py-1 rounded-full transition-colors ${
          locale === "en" ? "bg-terracotta text-cream" : "text-ink-light hover:text-ink"
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLocale("es")}
        className={`px-2 py-1 rounded-full transition-colors ${
          locale === "es" ? "bg-terracotta text-cream" : "text-ink-light hover:text-ink"
        }`}
      >
        ES
      </button>
    </div>
  );
}
