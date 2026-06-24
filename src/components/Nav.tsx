"use client";

import Link from "next/link";
import { useLocale } from "@/context/LocaleContext";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Nav() {
  const { t } = useLocale();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-cream/90 backdrop-blur-sm border-b border-cream-dark">
      <Link href="/" className="text-ink font-bold text-lg tracking-tight hover:text-terracotta transition-colors">
        Meet the Tribe
      </Link>
      <nav className="flex items-center gap-6">
        <Link href="/amazonia" className="text-sm text-ink-light hover:text-terracotta transition-colors font-medium">
          {t.nav.amazonia}
        </Link>
        <Link href="/kenya" className="text-sm text-ink-light hover:text-terracotta transition-colors font-medium">
          {t.nav.kenya}
        </Link>
        <LanguageSwitcher />
      </nav>
    </header>
  );
}
