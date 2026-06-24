"use client";

import Link from "next/link";
import { useLocale } from "@/context/LocaleContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function KenyaPage() {
  const { t } = useLocale();

  return (
    <main className="pt-16 min-h-screen flex flex-col">
      {/* Sticky Top Bar */}
      <div className="sticky top-16 z-40 bg-cream/95 backdrop-blur-sm border-b border-cream-dark">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Link
              href="/amazonia"
              className="text-sm font-medium px-4 py-1.5 rounded-full text-ink-light hover:bg-cream-dark transition-colors"
            >
              {t.nav.amazonia}
            </Link>
            <Link
              href="/kenya"
              className="text-sm font-semibold px-4 py-1.5 rounded-full bg-terracotta text-cream"
            >
              {t.nav.kenya}
            </Link>
          </div>
          <LanguageSwitcher />
        </div>
      </div>

      {/* Coming Soon Hero */}
      <section className="flex-1 relative bg-gradient-to-br from-terracotta-dark via-ink to-green flex items-center justify-center text-center px-6">
        {/* <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover opacity-50" /> */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink/20 via-transparent to-ink/60" />
        <div className="relative max-w-2xl py-32">
          <span className="inline-block bg-terracotta text-cream text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-wider mb-6">
            {t.nav.comingSoon}
          </span>
          <h1 className="text-cream text-5xl md:text-7xl font-bold mb-4">{t.kenya.name}</h1>
          <p className="text-cream/80 text-lg mb-2">{t.kenya.subtitle}</p>
          <p className="text-cream/60 mb-10">{t.kenya.description}</p>

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {t.kenya.activities.map((a) => (
              <span key={a} className="text-sm bg-cream/10 border border-cream/20 text-cream px-4 py-2 rounded-full">
                {a}
              </span>
            ))}
          </div>

          {/* Notify form */}
          <NotifyForm />

          <Link href="/" className="mt-8 inline-block text-cream/60 hover:text-cream text-sm underline transition-colors">
            ← Back to destinations
          </Link>
        </div>
      </section>
    </main>
  );
}

function NotifyForm() {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const el = e.currentTarget.querySelector("input") as HTMLInputElement;
        el.value = "";
        alert("You're on the list!");
      }}
      className="flex gap-2 max-w-sm mx-auto"
    >
      <input
        type="email"
        placeholder="your@email.com"
        required
        className="flex-1 px-4 py-3 rounded-full bg-cream/10 border border-cream/20 text-cream placeholder:text-cream/40 focus:outline-none focus:ring-2 focus:ring-terracotta text-sm"
      />
      <button
        type="submit"
        className="bg-terracotta hover:bg-terracotta-dark text-cream font-semibold px-5 py-3 rounded-full text-sm transition-colors whitespace-nowrap"
      >
        Notify me
      </button>
    </form>
  );
}
