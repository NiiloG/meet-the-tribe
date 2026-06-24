# meet-the-tribe

Immersive, community-led travel to indigenous territories — starting in Amazonia, Ecuador and Kenya.

## Stack

- **Next.js 15** (App Router, Turbopack) + TypeScript
- **Tailwind CSS v4** (CSS-first config)
- **Supabase** (browser + server clients via `@supabase/ssr`)
- Full **EN/ES bilingual i18n** persisted to `localStorage`

## Routes

| Path | Description |
|------|-------------|
| `/` | Homepage — hero, draggable 3D globe, location cards |
| `/amazonia` | Full location page — Land, People, Stays, Tours, Hosts, Booking |
| `/kenya` | Coming-soon stub with notify form |

## Getting Started

```bash
cp .env.local.example .env.local
# fill in your Supabase URL and keys

npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Database

Run the migration against your Supabase project:

```bash
supabase db push
# or paste supabase/migrations/001_initial.sql into the Supabase SQL editor
```

The migration creates `communities`, `tours`, `stays`, `hosts`, and `bookings` tables with RLS policies and seeds Amazonia + Kenya data.

## Colors

| Name | Hex |
|------|-----|
| Terracotta | `#BE5A38` |
| Green | `#2F6B4A` |
| Cream | `#F4EFE6` |
| Ink | `#2A2723` |

## Photo / Video Slots

Hero scenes and photo cards have `/* <video> */` comments where real media goes. Search for `Video slot` in the source to find all placeholder locations.
