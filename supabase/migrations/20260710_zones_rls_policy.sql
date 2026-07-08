-- Enable RLS on zones table
alter table public.zones enable row level security;

-- Allow all authenticated users to read zones
create policy "Authenticated users can read zones"
on public.zones
for select
using (auth.role() = 'authenticated');
