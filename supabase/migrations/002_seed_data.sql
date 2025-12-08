-- Seed data from mockData.ts
-- This will be run after initial schema

-- Insert test users
INSERT INTO users (id, email, password_hash, name, phone, role, active) VALUES
('00000000-0000-0000-0000-000000000001', 'parent@example.com', '$2a$10$example_hash_parent', 'Oda Forelder', '+47 4000 0001', 'PARENT', true),
('00000000-0000-0000-0000-000000000002', 'staff@example.com', '$2a$10$example_hash_staff', 'Eirik Ansatt', '+47 4000 0002', 'STAFF', true);

-- Insert children (matching mockData.ts)
INSERT INTO children (id, name, group_name, status, check_in_time, pickup_status, pickup_person, parent_id) VALUES
('10000000-0000-0000-0000-000000000001', 'Emma Hansen', 'Blåklokka', 'PRESENT', '08:24', NULL, NULL, '00000000-0000-0000-0000-000000000001'),
('10000000-0000-0000-0000-000000000002', 'Lucas Berg', 'Blåklokka', 'PRESENT', '08:15', NULL, NULL, '00000000-0000-0000-0000-000000000001'),
('10000000-0000-0000-0000-000000000003', 'Olivia Andersen', 'Solstråla', 'HOME', NULL, NULL, NULL, '00000000-0000-0000-0000-000000000001'),
('10000000-0000-0000-0000-000000000004', 'Noah Nilsen', 'Blåklokka', 'PRESENT', '07:45', NULL, NULL, '00000000-0000-0000-0000-000000000001'),
('10000000-0000-0000-0000-000000000005', 'Sofia Larsen', 'Solstråla', 'PRESENT', '08:30', 'PENDING', 'Bestemor', '00000000-0000-0000-0000-000000000001'),
('10000000-0000-0000-0000-000000000006', 'William Olsen', 'Blåklokka', 'HOME', NULL, NULL, NULL, '00000000-0000-0000-0000-000000000001'),
('10000000-0000-0000-0000-000000000007', 'Maja Johansen', 'Solstråla', 'PRESENT', '08:00', 'APPROVED', 'Mamma', '00000000-0000-0000-0000-000000000001'),
('10000000-0000-0000-0000-000000000008', 'Filip Pedersen', 'Blåklokka', 'PRESENT', '07:50', NULL, NULL, '00000000-0000-0000-0000-000000000001'),
('10000000-0000-0000-0000-000000000009', 'Ella Kristiansen', 'Solstråla', 'HOME', NULL, NULL, NULL, '00000000-0000-0000-0000-000000000001'),
('10000000-0000-0000-0000-000000000010', 'Oskar Jensen', 'Blåklokka', 'PRESENT', '08:20', NULL, NULL, '00000000-0000-0000-0000-000000000001'),
('10000000-0000-0000-0000-000000000011', 'Lea Hansen', 'Solstråla', 'PRESENT', '08:10', NULL, NULL, '00000000-0000-0000-0000-000000000001'),
('10000000-0000-0000-0000-000000000012', 'Oliver Berg', 'Blåklokka', 'HOME', NULL, NULL, NULL, '00000000-0000-0000-0000-000000000001'),
('10000000-0000-0000-0000-000000000013', 'Nora Andersen', 'Solstråla', 'PRESENT', '07:55', NULL, NULL, '00000000-0000-0000-0000-000000000001'),
('10000000-0000-0000-0000-000000000014', 'Jakob Nilsen', 'Blåklokka', 'PRESENT', '08:05', NULL, NULL, '00000000-0000-0000-0000-000000000001'),
('10000000-0000-0000-0000-000000000015', 'Ingrid Larsen', 'Solstråla', 'PRESENT', '08:25', NULL, NULL, '00000000-0000-0000-0000-000000000001'),
('10000000-0000-0000-0000-000000000016', 'Magnus Olsen', 'Blåklokka', 'HOME', NULL, NULL, NULL, '00000000-0000-0000-0000-000000000001');

-- Insert approved persons (for child-1 / Emma Hansen)
INSERT INTO approved_persons (id, child_id, name, relation, phone, status, approved_date, blocked) VALUES
('20000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000001', 'Kari Nordmann', 'Mor', '+47 123 45 678', 'APPROVED', '2025-11-27', false),
('20000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000001', 'Ola Nordmann', 'Far', '+47 987 65 432', 'APPROVED', '2025-11-27', false),
('20000000-0000-0000-0000-000000000003', '10000000-0000-0000-0000-000000000001', 'Mormor Anne', 'Besteforelder', '+47 555 12 345', 'APPROVED', '2025-11-20', false),
('20000000-0000-0000-0000-000000000004', '10000000-0000-0000-0000-000000000001', 'Tante Lisa', 'Tante', '+47 444 55 666', 'APPROVED', '2025-11-15', false),
('20000000-0000-0000-0000-000000000005', '10000000-0000-0000-0000-000000000001', 'Stine Henting', 'Annen', '+47 333 22 111', 'PENDING', NULL, false);

-- Insert incidents
INSERT INTO incidents (id, child_id, type, title, description, severity, action_taken, notified_parents, reported_by_id, reported_at) VALUES
('30000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000001', 'INJURY', 'Mindre fall på lekeplassen', 'Emma falt og skrapte kneet sitt mens hun lekte på klatreutstyret. Såret ble rengjort og plaster ble påført.', 'LOW', 'Rengjort sår, påført plaster, observert i 30 min', true, '00000000-0000-0000-0000-000000000002', '2025-11-29 10:15:00+00'),
('30000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000001', 'INFO', 'Glemt matboks', 'Emma hadde glemt matboksen sin hjemme. Hun fikk mat fra barnehagen.', 'LOW', NULL, true, '00000000-0000-0000-0000-000000000002', '2025-11-28 11:30:00+00'),
('30000000-0000-0000-0000-000000000003', '10000000-0000-0000-0000-000000000002', 'ILLNESS', 'Kvalm etter lunsj', 'Lucas følte seg kvalm etter lunsj og la seg ned. Temperatur: 37.2°C. Foreldre varslet.', 'MEDIUM', 'Hvile i grupperom, temperatur målt, foreldre kontaktet', true, '00000000-0000-0000-0000-000000000002', '2025-11-27 13:00:00+00');

-- Insert pickup logs
INSERT INTO pickup_logs (id, child_id, picked_up_by, picked_up_at, checked_out_time, verified_by) VALUES
('40000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000001', 'Kari Nordmann', '2025-11-28 15:30:00+00', '15:30', 'Pedagog Anna Berg'),
('40000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000001', 'Ola Nordmann', '2025-11-27 16:15:00+00', '16:15', 'Pedagog Maria Lund'),
('40000000-0000-0000-0000-000000000003', '10000000-0000-0000-0000-000000000001', 'Mormor Anne', '2025-11-26 14:45:00+00', '14:45', 'Pedagog Anna Berg');

-- Insert daily info
INSERT INTO daily_info (id, date, type, title, description, target_group) VALUES
('50000000-0000-0000-0000-000000000001', '2025-12-01', 'MENU', 'Lunsj i dag', 'Fiskesuppe med grovbrød og smør. Dessert: Frukt og yoghurt.', NULL),
('50000000-0000-0000-0000-000000000002', '2025-12-01', 'ACTIVITY', 'Utetur til skogen', 'I dag skal vi på tur til skogen klokken 10:00. Husk ekstra klær og godt fottøy!', 'Blåklokka'),
('50000000-0000-0000-0000-000000000003', '2025-12-01', 'ANNOUNCEMENT', 'Adventsstund', 'På fredag skal vi ha adventsstund med kakao og pepperkaker. Velkommen!', NULL),
('50000000-0000-0000-0000-000000000004', '2025-12-02', 'MENU', 'Lunsj i morgen', 'Pasta Bolognese med salat. Dessert: Eplekake.', NULL);

