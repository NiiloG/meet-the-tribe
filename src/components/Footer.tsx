"use client";

import { useLocale } from "@/context/LocaleContext";

export default function Footer() {
  const { t } = useLocale();

  return (
    <footer className="bg-ink text-cream py-10 px-6 text-center text-sm mt-20">
      <p className="font-semibold text-lg mb-1">Meet the Tribe</p>
      <p className="text-cream/70">{t.footer.tagline}</p>
      <p className="mt-4 text-cream/40">
        © {new Date().getFullYear()} Meet the Tribe. {t.footer.rights}
      </p>
    </footer>
  );
}
