"use client";

import Link from "next/link";
import { useLocale } from "@/context/LocaleContext";
import SideNav from "@/components/SideNav";
import PhotoCard from "@/components/PhotoCard";
import BookingForm from "@/components/BookingForm";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const STAYS = [
  { title: "Tambo Achuar", subtitle: "River-edge bungalow · 2 guests" },
  { title: "Shuar Longhouse", subtitle: "Shared dwelling · 4 guests" },
  { title: "Canopy Nest", subtitle: "Treetop platform · 2 guests" },
];

const TOURS = [
  { title: "Canoe Navigation", subtitle: "3 hrs · Dawn departure", gradient: "bg-gradient-to-br from-green to-ink" },
  { title: "Medicinal Plants Walk", subtitle: "4 hrs · Elder-led", gradient: "bg-gradient-to-br from-green-light to-green" },
  { title: "Shamanic Ceremony", subtitle: "Evening · Advance booking required", gradient: "bg-gradient-to-br from-ink to-terracotta-dark" },
  { title: "Bird Watching", subtitle: "2 hrs · 5 am start", gradient: "bg-gradient-to-br from-green to-green-light" },
];

const HOSTS = [
  { name: "Yankuam", role: "Shuar guide · 15 yrs", gradient: "bg-gradient-to-br from-terracotta-dark to-ink" },
  { name: "Tsukanka", role: "Achuar healer", gradient: "bg-gradient-to-br from-ink to-green" },
  { name: "Nayap", role: "Bird specialist", gradient: "bg-gradient-to-br from-green to-ink" },
];

export default function AmazoniaPage() {
  const { t } = useLocale();

  return (
    <main className="pt-16">
      {/* ── Sticky Top Bar ── */}
      <div className="sticky top-16 z-40 bg-cream/95 backdrop-blur-sm border-b border-cream-dark">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between gap-4">
          {/* Location pills */}
          <div className="flex items-center gap-2">
            <Link
              href="/amazonia"
              className="text-sm font-semibold px-4 py-1.5 rounded-full bg-terracotta text-cream"
            >
              {t.nav.amazonia}
            </Link>
            <Link
              href="/kenya"
              className="text-sm font-medium px-4 py-1.5 rounded-full text-ink-light hover:bg-cream-dark transition-colors"
            >
              {t.nav.kenya}
            </Link>
          </div>
          {/* Section quick-links (mobile) */}
          <nav className="lg:hidden flex items-center gap-3 overflow-x-auto text-xs font-medium text-ink-light">
            {(["land","people","stays","tours","hosts","booking"] as const).map((s) => (
              <a key={s} href={`#${s}`} className="whitespace-nowrap hover:text-terracotta transition-colors">
                {t.sections[s]}
              </a>
            ))}
          </nav>
          <LanguageSwitcher />
        </div>
      </div>

      {/* ── Hero ── */}
      <section className="relative h-96 bg-gradient-to-br from-green via-green-light to-ink flex items-end p-10">
        {/* <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover" /> */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
        <div className="relative">
          <p className="text-cream/70 text-xs uppercase tracking-widest mb-2">Ecuador · Shuar &amp; Achuar Territory</p>
          <h1 className="text-cream text-5xl font-bold mb-2">{t.amazonia.name}</h1>
          <p className="text-cream/80 max-w-lg">{t.amazonia.description}</p>
        </div>
      </section>

      {/* ── Body: Side nav + Content ── */}
      <div className="max-w-6xl mx-auto px-6 py-16 flex gap-12">
        <SideNav />

        <div className="flex-1 space-y-24 min-w-0">
          {/* Land */}
          <section id="land">
            <SectionHeading label={t.sections.land} />
            <p className="text-ink-light leading-relaxed mb-8 max-w-prose">
              The Ecuadorian Amazon spans over 2 million hectares of primary rainforest,
              home to thousands of species found nowhere else on Earth. The Shuar and Achuar
              communities have been its guardians for millennia — their land rights and
              ecological knowledge are inseparable from the forest's survival.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <PhotoCard title="Primary Rainforest" subtitle="~2M hectares" gradient="bg-gradient-to-br from-green to-ink" tall />
              <PhotoCard title="River Systems" subtitle="600+ waterways" gradient="bg-gradient-to-br from-green-light to-green" />
              <PhotoCard title="Canopy Layer" subtitle="40 m overhead" gradient="bg-gradient-to-br from-ink to-green" />
            </div>
          </section>

          {/* People */}
          <section id="people">
            <SectionHeading label={t.sections.people} />
            <p className="text-ink-light leading-relaxed mb-8 max-w-prose">
              The Shuar are a warrior people whose oral tradition is encoded in song, ritual,
              and plant knowledge. The Achuar, their neighbors to the south, live in a world
              where dreams are treated as real events and the forest speaks. You will stay
              with families, eat what they eat, and learn their language's words for things
              that don't yet have names in Spanish.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <PhotoCard title="Shuar Community" subtitle="~80,000 people" gradient="bg-gradient-to-br from-terracotta-dark to-ink" tall />
              <PhotoCard title="Achuar Territory" subtitle="Remote river villages" gradient="bg-gradient-to-br from-ink to-terracotta-dark" tall />
            </div>
          </section>

          {/* Stays */}
          <section id="stays">
            <SectionHeading label={t.sections.stays} />
            <p className="text-ink-light leading-relaxed mb-8 max-w-prose">
              Accommodation is within or adjacent to community homes — built in traditional
              style with local materials. Electricity is solar, water is river-filtered.
              Mosquito nets, hammocks, and lanterns are provided.
            </p>
            <div className="grid md:grid-cols-3 gap-5">
              {STAYS.map((s) => (
                <PhotoCard
                  key={s.title}
                  title={s.title}
                  subtitle={s.subtitle}
                  gradient="bg-gradient-to-br from-terracotta-dark via-ink to-green"
                />
              ))}
            </div>
          </section>

          {/* Tours */}
          <section id="tours">
            <SectionHeading label={t.sections.tours} />
            <p className="text-ink-light leading-relaxed mb-8 max-w-prose">
              Every experience is led by a community member. Revenue flows directly to the
              guide, their family, and a community fund for education and land defense.
            </p>
            <div className="grid sm:grid-cols-2 gap-5">
              {TOURS.map((tour) => (
                <PhotoCard
                  key={tour.title}
                  title={tour.title}
                  subtitle={tour.subtitle}
                  gradient={tour.gradient}
                />
              ))}
            </div>
          </section>

          {/* Hosts */}
          <section id="hosts">
            <SectionHeading label={t.sections.hosts} />
            <p className="text-ink-light leading-relaxed mb-8 max-w-prose">
              Your journey is shaped by real people with names and stories.
              These are some of the guides and families you may meet.
            </p>
            <div className="grid sm:grid-cols-3 gap-5">
              {HOSTS.map((h) => (
                <div key={h.name} className="flex flex-col items-center text-center gap-3">
                  <div className={`w-24 h-24 rounded-full ${h.gradient} flex items-center justify-center text-cream text-2xl font-bold shadow-md`}>
                    {/* <img src="..." alt={h.name} className="w-full h-full object-cover rounded-full" /> */}
                    {h.name[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-ink">{h.name}</p>
                    <p className="text-xs text-ink-light">{h.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Booking */}
          <section id="booking">
            <SectionHeading label={t.sections.booking} />
            <p className="text-ink-light leading-relaxed mb-8 max-w-prose">
              Journeys run in groups of 2–8. We confirm availability within 48 hours
              and guide you through the preparation process personally.
            </p>
            <BookingForm communitySlug="amazonia" />
          </section>
        </div>
      </div>
    </main>
  );
}

function SectionHeading({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <h2 className="text-ink text-2xl font-bold">{label}</h2>
      <div className="flex-1 h-px bg-cream-dark" />
    </div>
  );
}
