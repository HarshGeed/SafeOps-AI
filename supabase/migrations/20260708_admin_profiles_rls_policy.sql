-- Enable RLS on profiles table
alter table public.profiles enable row level security;

-- Create a helper function to check if user is admin (security definer to avoid recursion)
create or replace function public.is_user_admin()
returns boolean as $$
declare
  user_role text;
begin
  select role into user_role from public.profiles where id = auth.uid();
  return user_role = 'admin';
end;
$$ language plpgsql security definer set search_path = public;

-- Allow users to view their own profile
create policy "Users can view their own profile"
on public.profiles
for select
using (auth.uid() = id);

-- Allow admins to view all profiles
create policy "Admins can view all profiles"
on public.profiles
for select
using (public.is_user_admin());

-- Allow admins to update profiles
create policy "Admins can update profiles"
on public.profiles
for update
using (public.is_user_admin());
