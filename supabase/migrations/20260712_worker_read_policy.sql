-- Enable RLS on workers table
alter table public.workers enable row level security;

-- Allow admins to view all workers
create policy "Admins can view all workers"
on public.workers
for select
using (
  exists (
    select 1 from public.profiles 
    where id = auth.uid() and role = 'admin'
  )
);

-- Allow authenticated users to view workers assigned to them
create policy "Users can view their own worker profile"
on public.workers
for select
using (auth.uid() = profile_id);