insert into storage.buckets (id, name, public)
values ('oneirova', 'oneirova', true)
on conflict (id) do nothing;

create policy "Public read oneirova bucket"
on storage.objects
for select
to public
using (bucket_id = 'oneirova');

