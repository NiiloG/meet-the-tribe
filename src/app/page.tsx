"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useLocale } from "@/context/LocaleContext";
import LocationCard from "@/components/LocationCard";

const Globe = dynamic(() => import("@/components/Globe"), { ssr: false });

const HERO_SCENES = [
  {
    id: "canopy",
    gradient: "bg-gradient-to-br from-green via-green-light to-ink",
    label: "Amazon Canopy",
  },
  {
    id: "river",
    gradient: "bg-gradient-to-br from-ink via-green to-green-light",
    label: "River Passage",
  },
  {
    id: "ceremony",
    gradient: "bg-gradient-to-br from-terracotta via-terracotta-dark to-ink",
    label: "Night Ceremony",
  },
];

export default function HomePage() {
  const { t } = useLocale();

  return (
    <main className="pt-16">
      {/* ── Hero ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-green via-ink to-green-light">
        {/* Video slot */}
        {/* <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover opacity-50" /> */}

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-transparent to-ink/60" />

        <div className="relative z-10 text-center px-6 max-w-3xl">
          <p className="text-cream/70 text-sm uppercase tracking-[0.25em] font-medium mb-4">
            Meet the Tribe
          </p>
          <h1 className="text-cream text-5xl md:text-7xl font-bold leading-tight mb-6">
            {t.hero.tagline}
          </h1>
          <Link
            href="#destinations"
            className="inline-block bg-terracotta hover:bg-terracotta-dark text-cream font-semibold px-8 py-4 rounded-full text-lg transition-colors"
          >
            {t.hero.cta}
          </Link>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-cream/50">
          <span className="text-xs uppercase tracking-wider">scroll</span>
          <div className="w-px h-8 bg-cream/30 animate-pulse" />
        </div>
      </section>

      {/* ── Scene Strip ── */}
      <section className="flex h-40 overflow-hidden">
        {HERO_SCENES.map((scene) => (
          <div
            key={scene.id}
            className={`flex-1 ${scene.gradient} flex items-center justify-center`}
          >
            {/* <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover" /> */}
            <span className="text-cream/60 text-xs uppercase tracking-widest">{scene.label}</span>
          </div>
        ))}
      </section>

      {/* ── Globe + Destinations ── */}
      <section id="destinations" className="max-w-6xl mx-auto px-6 py-24">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Globe */}
          <Globe />

          {/* Text */}
          <div>
            <p className="text-terracotta text-sm font-semibold uppercase tracking-wider mb-3">
              Our World
            </p>
            <h2 className="text-ink text-4xl font-bold mb-4">{t.locations.title}</h2>
            <p className="text-ink-light leading-relaxed mb-8">
              We partner with indigenous communities to offer journeys that are led by the land
              and shaped by its people. Drag the globe to explore.
            </p>
            <div className="flex flex-col gap-3">
              <Link
                href="/amazonia"
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-cream-dark transition-colors group"
              >
                <span className="w-3 h-3 rounded-full bg-terracotta flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span className="font-medium text-ink">Amazonia, Ecuador</span>
              </Link>
              <Link
                href="/kenya"
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-cream-dark transition-colors group"
              >
                <span className="w-3 h-3 rounded-full bg-green flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span className="font-medium text-ink">Kenya, East Africa</span>
                <span className="ml-auto text-xs bg-cream-dark text-ink-light px-2 py-0.5 rounded-full">
                  {t.nav.comingSoon}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Location Cards ── */}
      <section className="max-w-4xl mx-auto px-6 pb-24">
        <div className="grid md:grid-cols-2 gap-8">
          <LocationCard
            slug="amazonia"
            gradient="bg-gradient-to-br from-green via-green-light to-ink"
          />
          <LocationCard
            slug="kenya"
            gradient="bg-gradient-to-br from-terracotta-dark via-ink to-green"
            comingSoon
          />
        </div>
      </section>
    </main>
  );
}
