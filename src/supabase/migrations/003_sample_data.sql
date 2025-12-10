-- ============================================
-- HENTETJENESTE - SAMPLE DATA (DEMO)
-- ============================================
-- This migration inserts demo data for testing
-- IMPORTANT: Only use in development! Delete this file for production!

-- ============================================
-- SAMPLE PROFILES
-- ============================================
-- Note: In real production, these would be created via Supabase Auth signup

-- Insert sample parent (this assumes auth.users already has this UUID)
-- In reality, you'd create users via Supabase Dashboard or signUp API
INSERT INTO public.profiles (id, email, full_name, phone, role) VALUES
  ('00000000-0000-0000-0000-000000000001', 'parent1@example.com', 'Anne Nordmann', '+47 900 00 001', 'parent'),
  ('00000000-0000-0000-0000-000000000002', 'parent2@example.com', 'Per Hansen', '+47 900 00 002', 'parent'),
  ('00000000-0000-0000-0000-000000000003', 'staff1@example.com', 'Kari Pedagogsen', '+47 900 00 003', 'staff'),
  ('00000000-0000-0000-0000-000000000004', 'admin@example.com', 'Ola Styrer', '+47 900 00 004', 'admin')
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- SAMPLE CHILDREN
-- ============================================

INSERT INTO public.children (id, parent_id, name, date_of_birth, "group", status, notes, allergies) VALUES
  ('child-001', '00000000-0000-0000-0000-000000000001', 'Emma Nordmann', '2020-03-15', 'Blåklokka', 'present', 'Liker å leke ute', 'Nøtter'),
  ('child-002', '00000000-0000-0000-0000-000000000001', 'Lucas Nordmann', '2021-07-22', 'Solstråla', 'absent', 'Elsker å synge', NULL),
  ('child-003', '00000000-0000-0000-0000-000000000002', 'Sofie Hansen', '2019-11-10', 'Blåklokka', 'present', NULL, 'Laktose'),
  ('child-004', '00000000-0000-0000-0000-000000000002', 'Noah Hansen', '2022-01-05', 'Solstråla', 'present', NULL, NULL)
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- SAMPLE ATTENDANCE LOGS
-- ============================================

INSERT INTO public.attendance_logs (child_id, action, timestamp, verified_by) VALUES
  ('child-001', 'check_in', NOW() - INTERVAL '3 hours', '00000000-0000-0000-0000-000000000001'),
  ('child-003', 'check_in', NOW() - INTERVAL '2 hours', '00000000-0000-0000-0000-000000000002'),
  ('child-004', 'check_in', NOW() - INTERVAL '4 hours', '00000000-0000-0000-0000-000000000002'),
  ('child-001', 'check_out', NOW() - INTERVAL '1 day', '00000000-0000-0000-0000-000000000001'),
  ('child-002', 'check_in', NOW() - INTERVAL '2 days', '00000000-0000-0000-0000-000000000001'),
  ('child-002', 'check_out', NOW() - INTERVAL '2 days' + INTERVAL '6 hours', '00000000-0000-0000-0000-000000000001');

-- ============================================
-- SAMPLE APPROVED PERSONS
-- ============================================

INSERT INTO public.approved_persons (child_id, name, relation, phone, can_pick_up, status) VALUES
  ('child-001', 'Anne Nordmann', 'Mor', '+47 900 00 001', true, 'approved'),
  ('child-001', 'Erik Nordmann', 'Far', '+47 900 00 005', true, 'approved'),
  ('child-001', 'Berit Nordmann', 'Bestemor', '+47 900 00 006', true, 'approved'),
  ('child-002', 'Anne Nordmann', 'Mor', '+47 900 00 001', true, 'approved'),
  ('child-002', 'Erik Nordmann', 'Far', '+47 900 00 005', true, 'approved'),
  ('child-003', 'Per Hansen', 'Far', '+47 900 00 002', true, 'approved'),
  ('child-003', 'Lise Hansen', 'Mor', '+47 900 00 007', true, 'approved'),
  ('child-003', 'Arne Hansen', 'Onkel', '+47 900 00 008', true, 'pending'),
  ('child-004', 'Per Hansen', 'Far', '+47 900 00 002', true, 'approved'),
  ('child-004', 'Lise Hansen', 'Mor', '+47 900 00 007', true, 'approved');

-- ============================================
-- SAMPLE INCIDENTS
-- ============================================

INSERT INTO public.incidents (child_id, type, description, severity, action_taken, reported_by, notified_parents) VALUES
  ('child-001', 'injury', 'Falt og fikk ett skrubbsår på kneet under utelek', 'low', 'Renset såret og satte på plaster', '00000000-0000-0000-0000-000000000003', true),
  ('child-003', 'illness', 'Kvalm etter lunsj. Har hvilet inne.', 'medium', 'Foreldre kontaktet, barnet hviler', '00000000-0000-0000-0000-000000000003', true),
  ('child-004', 'behavior', 'Bit en annen i konfliktsituasjon', 'medium', 'Samtale med barnet, følges opp', '00000000-0000-0000-0000-000000000003', true);

-- ============================================
-- SAMPLE DAILY INFO
-- ============================================

INSERT INTO public.daily_info (date, type, title, description, target_group, created_by) VALUES
  (CURRENT_DATE, 'menu', 'Lunsj i dag', 'Fiskesuppe med grovbrød og smør. Dessert: Frukt og yoghurt.', NULL, '00000000-0000-0000-0000-000000000003'),
  (CURRENT_DATE, 'activity', 'Utetur til skogen', 'I dag skal vi på tur til skogen klokken 10:00. Husk ekstra klær og godt fottøy!', 'Blåklokka', '00000000-0000-0000-0000-000000000003'),
  (CURRENT_DATE, 'announcement', 'Julegranpynt neste uke', 'Neste uke skal vi pynte juletreet sammen. Alle er velkomne!', NULL, '00000000-0000-0000-0000-000000000003'),
  (CURRENT_DATE, 'activity', 'Forming i ettermiddag', 'Etter lunsj skal vi ha forming med leire. Barna får lage egne julefigurer!', 'Solstråla', '00000000-0000-0000-0000-000000000003'),
  (CURRENT_DATE + 1, 'menu', 'Lunsj i morgen', 'Pasta Bolognese med salat. Dessert: Eplekake.', NULL, '00000000-0000-0000-0000-000000000003'),
  (CURRENT_DATE + 3, 'announcement', 'Lucia-feiring', 'Torsdag 12. desember feirer vi Lucia med sang og lussekatter kl. 11:00. Foreldre er velkomne!', NULL, '00000000-0000-0000-0000-000000000003');

-- ============================================
-- SAMPLE MESSAGES
-- ============================================

INSERT INTO public.messages (sender_id, receiver_id, content, read) VALUES
  ('00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000003', 'Hei! Emma har litt vondt i halsen i dag. Kan dere holde ekstra øye med henne?', true),
  ('00000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000001', 'Absolutt! Vi følger med. Hun leker fint ute nå, men vi gir beskjed hvis noe endrer seg.', true),
  ('00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000003', 'Hei! Sofie skal hentes av bestemor i dag kl 15:00. Er det ok?', false),
  ('00000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000002', 'Det er helt fint! Vi har notert det.', false);

-- ============================================
-- VERIFICATION
-- ============================================

-- Verify data was inserted
DO $$
BEGIN
  RAISE NOTICE 'Sample data inserted successfully!';
  RAISE NOTICE 'Profiles: %', (SELECT COUNT(*) FROM public.profiles);
  RAISE NOTICE 'Children: %', (SELECT COUNT(*) FROM public.children);
  RAISE NOTICE 'Attendance logs: %', (SELECT COUNT(*) FROM public.attendance_logs);
  RAISE NOTICE 'Approved persons: %', (SELECT COUNT(*) FROM public.approved_persons);
  RAISE NOTICE 'Incidents: %', (SELECT COUNT(*) FROM public.incidents);
  RAISE NOTICE 'Daily info: %', (SELECT COUNT(*) FROM public.daily_info);
  RAISE NOTICE 'Messages: %', (SELECT COUNT(*) FROM public.messages);
END $$;
