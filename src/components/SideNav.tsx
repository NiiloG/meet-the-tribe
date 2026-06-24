"use client";

import { useEffect, useState } from "react";
import { useLocale } from "@/context/LocaleContext";

const SECTION_IDS = ["land", "people", "stays", "tours", "hosts", "booking"] as const;

export default function SideNav() {
  const { t } = useLocale();
  const [active, setActive] = useState<string>("land");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { rootMargin: "-40% 0px -55% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const labels: Record<string, string> = {
    land: t.sections.land,
    people: t.sections.people,
    stays: t.sections.stays,
    tours: t.sections.tours,
    hosts: t.sections.hosts,
    booking: t.sections.booking,
  };

  return (
    <nav className="sticky top-24 self-start hidden lg:flex flex-col gap-1 w-44">
      {SECTION_IDS.map((id) => (
        <a
          key={id}
          href={`#${id}`}
          className={`text-sm px-3 py-2 rounded-lg transition-colors font-medium ${
            active === id
              ? "bg-terracotta text-cream"
              : "text-ink-light hover:text-ink hover:bg-cream-dark"
          }`}
        >
          {labels[id]}
        </a>
      ))}
    </nav>
  );
}
