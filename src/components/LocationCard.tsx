"use client";

import Link from "next/link";
import { useLocale } from "@/context/LocaleContext";

interface Props {
  slug: "amazonia" | "kenya";
  gradient: string;
  comingSoon?: boolean;
}

export default function LocationCard({ slug, gradient, comingSoon }: Props) {
  const { t } = useLocale();
  const info = t[slug];
  const href = `/${slug}`;

  return (
    <div className="group relative rounded-card overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col">
      {/* Photo slot / gradient backdrop */}
      <div className={`relative h-56 ${gradient} flex items-end p-4`}>
        {/* <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover" /> */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
        {comingSoon && (
          <span className="absolute top-3 right-3 bg-terracotta text-cream text-xs font-semibold px-3 py-1 rounded-full">
            {t.nav.comingSoon}
          </span>
        )}
        <div className="relative">
          <p className="text-cream/80 text-xs font-medium uppercase tracking-wider mb-1">
            {info.subtitle}
          </p>
          <h3 className="text-cream text-2xl font-bold">{info.name}</h3>
        </div>
      </div>

      <div className="bg-cream p-5 flex flex-col flex-1">
        <p className="text-ink-light text-sm leading-relaxed mb-4">{info.description}</p>

        <div className="mb-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-terracotta mb-2">
            {t.locations.activities}
          </p>
          <ul className="flex flex-wrap gap-2">
            {info.activities.map((a) => (
              <li key={a} className="text-xs bg-cream-dark text-ink px-2 py-1 rounded-full">
                {a}
              </li>
            ))}
          </ul>
        </div>

        <Link
          href={href}
          className="mt-auto inline-block text-center bg-terracotta hover:bg-terracotta-dark text-cream font-semibold text-sm px-5 py-2.5 rounded-full transition-colors"
        >
          {comingSoon ? t.locations.learnMore : t.locations.bookNow}
        </Link>
      </div>
    </div>
  );
}
