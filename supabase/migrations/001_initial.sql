-- Meet the Tribe — initial schema + seed data

-- Communities
create table if not exists communities (
  id           uuid primary key default gen_random_uuid(),
  slug         text unique not null,
  name         text not null,
  country      text not null,
  region       text,
  description  text,
  lat          numeric,
  lng          numeric,
  active       boolean default true,
  created_at   timestamptz default now()
);

-- Tours / Experiences
create table if not exists tours (
  id             uuid primary key default gen_random_uuid(),
  community_id   uuid references communities(id) on delete cascade,
  slug           text unique not null,
  title          text not null,
  description    text,
  duration_hours numeric,
  max_guests     int,
  price_usd      numeric(10,2),
  active         boolean default true,
  created_at     timestamptz default now()
);

-- Stays
create table if not exists stays (
  id             uuid primary key default gen_random_uuid(),
  community_id   uuid references communities(id) on delete cascade,
  slug           text unique not null,
  name           text not null,
  description    text,
  capacity       int,
  price_usd      numeric(10,2),
  active         boolean default true,
  created_at     timestamptz default now()
);

-- Hosts
create table if not exists hosts (
  id             uuid primary key default gen_random_uuid(),
  community_id   uuid references communities(id) on delete cascade,
  name           text not null,
  role           text,
  bio            text,
  photo_url      text,
  created_at     timestamptz default now()
);

-- Bookings
create table if not exists bookings (
  id              uuid primary key default gen_random_uuid(),
  community_slug  text not null,
  guest_name      text not null,
  guest_email     text not null,
  travel_dates    text,
  num_guests      int default 2,
  notes           text,
  status          text default 'pending' check (status in ('pending','confirmed','cancelled')),
  created_at      timestamptz default now()
);

-- Enable RLS
alter table communities enable row level security;
alter table tours       enable row level security;
alter table stays       enable row level security;
alter table hosts       enable row level security;
alter table bookings    enable row level security;

-- Public read policies
create policy "public read communities" on communities for select using (true);
create policy "public read tours"       on tours       for select using (true);
create policy "public read stays"       on stays       for select using (true);
create policy "public read hosts"       on hosts       for select using (true);

-- Bookings: insert only (no read without auth)
create policy "public insert bookings"  on bookings    for insert with check (true);

-- ── Seed Data ────────────────────────────────────────────────────────────────

-- Communities
insert into communities (slug, name, country, region, description, lat, lng) values
  ('amazonia', 'Amazonia', 'Ecuador', 'Shuar & Achuar Territory',
   'Deep in the Ecuadorian Amazon, live alongside communities that have protected this forest for generations.',
   -2.5, -76.5),
  ('kenya', 'Kenya', 'Kenya', 'Maasai Mara',
   'Experience the rhythm of the savanna with Maasai guides.',
   -1.5, 35.1)
on conflict (slug) do nothing;

-- Tours — Amazonia
insert into tours (community_id, slug, title, description, duration_hours, max_guests, price_usd)
select id, 'amazonia-canoe', 'Canoe Navigation',
  'Navigate the river system at dawn with a Shuar guide.', 3, 6, 45.00
from communities where slug = 'amazonia'
on conflict (slug) do nothing;

insert into tours (community_id, slug, title, description, duration_hours, max_guests, price_usd)
select id, 'amazonia-plants', 'Medicinal Plants Walk',
  'A deep-forest walk led by a traditional healer.', 4, 8, 40.00
from communities where slug = 'amazonia'
on conflict (slug) do nothing;

insert into tours (community_id, slug, title, description, duration_hours, max_guests, price_usd)
select id, 'amazonia-ceremony', 'Shamanic Ceremony',
  'Evening ceremony; advance booking and preparation required.', 5, 4, 120.00
from communities where slug = 'amazonia'
on conflict (slug) do nothing;

insert into tours (community_id, slug, title, description, duration_hours, max_guests, price_usd)
select id, 'amazonia-birds', 'Bird Watching',
  'Pre-dawn start for the highest canopy diversity.', 2, 6, 35.00
from communities where slug = 'amazonia'
on conflict (slug) do nothing;

-- Tours — Kenya
insert into tours (community_id, slug, title, description, duration_hours, max_guests, price_usd)
select id, 'kenya-safari-walk', 'Safari Walk',
  'On-foot bush walk with a Maasai ranger.', 4, 8, 60.00
from communities where slug = 'kenya'
on conflict (slug) do nothing;

insert into tours (community_id, slug, title, description, duration_hours, max_guests, price_usd)
select id, 'kenya-beads', 'Bead Craft Workshop',
  'Learn traditional Maasai bead work with community artisans.', 3, 10, 30.00
from communities where slug = 'kenya'
on conflict (slug) do nothing;

-- Stays — Amazonia
insert into stays (community_id, slug, name, description, capacity, price_usd)
select id, 'amazonia-tambo', 'Tambo Achuar',
  'River-edge bungalow built in traditional style.', 2, 85.00
from communities where slug = 'amazonia'
on conflict (slug) do nothing;

insert into stays (community_id, slug, name, description, capacity, price_usd)
select id, 'amazonia-longhouse', 'Shuar Longhouse',
  'Shared traditional dwelling — family atmosphere.', 4, 55.00
from communities where slug = 'amazonia'
on conflict (slug) do nothing;

insert into stays (community_id, slug, name, description, capacity, price_usd)
select id, 'amazonia-canopy', 'Canopy Nest',
  'Elevated treetop platform with hammock sleeping.', 2, 95.00
from communities where slug = 'amazonia'
on conflict (slug) do nothing;

-- Stays — Kenya
insert into stays (community_id, slug, name, description, capacity, price_usd)
select id, 'kenya-manyatta', 'Manyatta Guesthouse',
  'Traditional Maasai compound with separate guest hut.', 2, 70.00
from communities where slug = 'kenya'
on conflict (slug) do nothing;

-- Hosts — Amazonia
insert into hosts (community_id, name, role, bio)
select id, 'Yankuam', 'Shuar Guide · 15 years experience',
  'Born in the upper Pastaza watershed, Yankuam has guided rivers and forest trails since he was 12.'
from communities where slug = 'amazonia';

insert into hosts (community_id, name, role, bio)
select id, 'Tsukanka', 'Achuar Healer',
  'Keeper of plant knowledge across three generations of her family.'
from communities where slug = 'amazonia';

insert into hosts (community_id, name, role, bio)
select id, 'Nayap', 'Bird Specialist',
  'Has identified over 340 species in his home territory.'
from communities where slug = 'amazonia';

-- Hosts — Kenya
insert into hosts (community_id, name, role, bio)
select id, 'Lemasolai', 'Maasai Ranger',
  'Conservation leader and traditional warrior initiated at 16.'
from communities where slug = 'kenya';
