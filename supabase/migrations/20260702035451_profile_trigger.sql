-- Create function
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin

  insert into public.profiles (
    id,
    first_name,
    last_name,
    email,
    role,
    status,
    created_at,
    updated_at
  )

  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'first_name', ''),
    coalesce(new.raw_user_meta_data ->> 'last_name', ''),
    new.email,
    'worker',
    'pending',
    now(),
    now()
  );

  return new;

end;
$$;


drop trigger if exists on_auth_user_created
on auth.users;

create trigger on_auth_user_created

after insert

on auth.users

for each row

execute function public.handle_new_user();