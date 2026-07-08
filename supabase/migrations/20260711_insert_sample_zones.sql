-- Insert sample zones
insert into public.zones (name, description, floor, risk_level)
values
  ('Zone A', 'Main production floor', 1, 'medium'),
  ('Zone B', 'Assembly line', 1, 'high'),
  ('Zone C', 'Storage area', 2, 'low'),
  ('Zone D', 'Quality control', 2, 'low'),
  ('Zone E', 'Maintenance bay', 1, 'critical');
