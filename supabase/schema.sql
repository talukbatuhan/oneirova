create table if not exists public.dreams (
  id bigserial primary key,
  slug text not null unique,
  title text not null,
  excerpt text not null,
  themes text[] not null default '{}'::text[],
  quick_meaning text[] not null default '{}'::text[],
  sections jsonb not null default '[]'::jsonb,
  status text not null default 'published',
  published_at timestamptz,
  cover_image_url text,
  og_image_url text,
  seo jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.dreams add column if not exists status text not null default 'published';
alter table public.dreams add column if not exists published_at timestamptz;
alter table public.dreams add column if not exists cover_image_url text;
alter table public.dreams add column if not exists og_image_url text;
alter table public.dreams add column if not exists seo jsonb not null default '{}'::jsonb;

do $
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'dreams_status_check'
      and conrelid = 'public.dreams'::regclass
  ) then
    alter table public.dreams
      add constraint dreams_status_check check (status in ('draft','published'));
  end if;
end $;

alter table public.dreams enable row level security;

drop policy if exists "Public read dreams" on public.dreams;

create policy "Public read dreams"
on public.dreams
for select
to public
using (status = 'published');

