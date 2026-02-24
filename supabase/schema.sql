create table if not exists public.dreams (
  id bigserial primary key,
  slug text not null unique,
  title text not null,
  excerpt text not null,
  themes text[] not null default '{}'::text[],
  quick_meaning text[] not null default '{}'::text[],
  sections jsonb not null default '[]'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.dreams enable row level security;

create policy "Public read dreams"
on public.dreams
for select
to public
using (true);

