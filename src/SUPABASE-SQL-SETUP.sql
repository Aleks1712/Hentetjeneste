-- ============================================
-- HENTETJENESTE - COMPLETE DATABASE SCHEMA
-- ============================================
-- React Native + Supabase Implementation
-- Run this in Supabase SQL Editor
-- ============================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- TABLES
-- ============================================

-- PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  phone TEXT,
  role TEXT NOT NULL DEFAULT 'parent' CHECK (role IN ('parent', 'staff', 'admin')),
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- CHILDREN TABLE
CREATE TABLE IF NOT EXISTS public.children (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  parent_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  date_of_birth DATE,
  "group" TEXT,
  status TEXT NOT NULL DEFAULT 'absent' CHECK (status IN ('present', 'absent')),
  check_in_time TIMESTAMPTZ,
  check_out_time TIMESTAMPTZ,
  notes TEXT,
  allergies TEXT,
  emergency_contact TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ATTENDANCE LOGS TABLE
CREATE TABLE IF NOT EXISTS public.attendance_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  child_id UUID REFERENCES public.children(id) ON DELETE CASCADE NOT NULL,
  action TEXT NOT NULL CHECK (action IN ('check_in', 'check_out')),
  timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  verified_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- APPROVED PERSONS TABLE
CREATE TABLE IF NOT EXISTS public.approved_persons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  child_id UUID REFERENCES public.children(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  relation TEXT NOT NULL,
  phone TEXT NOT NULL,
  can_pick_up BOOLEAN NOT NULL DEFAULT true,
  photo_url TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('approved', 'pending', 'rejected')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- INCIDENTS TABLE
CREATE TABLE IF NOT EXISTS public.incidents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  child_id UUID REFERENCES public.children(id) ON DELETE CASCADE NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('injury', 'illness', 'behavior', 'other')),
  description TEXT NOT NULL,
  severity TEXT NOT NULL CHECK (severity IN ('low', 'medium', 'high')),
  action_taken TEXT,
  reported_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  notified_parents BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- DAILY INFO TABLE
CREATE TABLE IF NOT EXISTS public.daily_info (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  date DATE NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('menu', 'activity', 'announcement')),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  target_group TEXT,
  created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- MESSAGES TABLE
CREATE TABLE IF NOT EXISTS public.messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sender_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  receiver_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- INDEXES
-- ============================================

CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);
CREATE INDEX IF NOT EXISTS idx_children_parent_id ON public.children(parent_id);
CREATE INDEX IF NOT EXISTS idx_children_status ON public.children(status);
CREATE INDEX IF NOT EXISTS idx_children_group ON public.children("group");
CREATE INDEX IF NOT EXISTS idx_attendance_logs_child_id ON public.attendance_logs(child_id);
CREATE INDEX IF NOT EXISTS idx_attendance_logs_timestamp ON public.attendance_logs(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_attendance_logs_action ON public.attendance_logs(action);
CREATE INDEX IF NOT EXISTS idx_approved_persons_child_id ON public.approved_persons(child_id);
CREATE INDEX IF NOT EXISTS idx_approved_persons_status ON public.approved_persons(status);
CREATE INDEX IF NOT EXISTS idx_incidents_child_id ON public.incidents(child_id);
CREATE INDEX IF NOT EXISTS idx_incidents_created_at ON public.incidents(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_incidents_severity ON public.incidents(severity);
CREATE INDEX IF NOT EXISTS idx_daily_info_date ON public.daily_info(date DESC);
CREATE INDEX IF NOT EXISTS idx_daily_info_type ON public.daily_info(type);
CREATE INDEX IF NOT EXISTS idx_messages_sender_id ON public.messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_messages_receiver_id ON public.messages(receiver_id);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON public.messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_messages_read ON public.messages(read);

-- ============================================
-- TRIGGERS & FUNCTIONS
-- ============================================

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.children FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.approved_persons FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.incidents FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.daily_info FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Auto-create profile when user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, phone, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'phone', ''),
    COALESCE(NEW.raw_user_meta_data->>'role', 'parent')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.children ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.approved_persons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.incidents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- ============================================
-- PROFILES POLICIES
-- ============================================

CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Staff can view all profiles"
  ON public.profiles FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('staff', 'admin')
    )
  );

CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can delete own profile"
  ON public.profiles FOR DELETE
  USING (auth.uid() = id);

-- ============================================
-- CHILDREN POLICIES
-- ============================================

CREATE POLICY "Parents can view own children"
  ON public.children FOR SELECT
  USING (parent_id = auth.uid());

CREATE POLICY "Staff can view all children"
  ON public.children FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('staff', 'admin')
    )
  );

CREATE POLICY "Parents can insert own children"
  ON public.children FOR INSERT
  WITH CHECK (parent_id = auth.uid());

CREATE POLICY "Parents can update own children"
  ON public.children FOR UPDATE
  USING (parent_id = auth.uid());

CREATE POLICY "Staff can update all children"
  ON public.children FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('staff', 'admin')
    )
  );

CREATE POLICY "Staff can delete children"
  ON public.children FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('staff', 'admin')
    )
  );

-- ============================================
-- ATTENDANCE LOGS POLICIES
-- ============================================

CREATE POLICY "Parents can view own children logs"
  ON public.attendance_logs FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.children
      WHERE id = attendance_logs.child_id AND parent_id = auth.uid()
    )
  );

CREATE POLICY "Staff can view all logs"
  ON public.attendance_logs FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('staff', 'admin')
    )
  );

CREATE POLICY "Staff can insert logs"
  ON public.attendance_logs FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('staff', 'admin')
    )
  );

CREATE POLICY "Parents can insert logs for own children"
  ON public.attendance_logs FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.children
      WHERE id = attendance_logs.child_id AND parent_id = auth.uid()
    )
  );

-- ============================================
-- APPROVED PERSONS POLICIES
-- ============================================

CREATE POLICY "Parents can view approved persons for own children"
  ON public.approved_persons FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.children
      WHERE id = approved_persons.child_id AND parent_id = auth.uid()
    )
  );

CREATE POLICY "Staff can view all approved persons"
  ON public.approved_persons FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('staff', 'admin')
    )
  );

CREATE POLICY "Parents can insert approved persons for own children"
  ON public.approved_persons FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.children
      WHERE id = approved_persons.child_id AND parent_id = auth.uid()
    )
  );

CREATE POLICY "Parents can update approved persons for own children"
  ON public.approved_persons FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.children
      WHERE id = approved_persons.child_id AND parent_id = auth.uid()
    )
  );

CREATE POLICY "Staff can update all approved persons"
  ON public.approved_persons FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('staff', 'admin')
    )
  );

CREATE POLICY "Parents can delete approved persons for own children"
  ON public.approved_persons FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.children
      WHERE id = approved_persons.child_id AND parent_id = auth.uid()
    )
  );

-- ============================================
-- INCIDENTS POLICIES
-- ============================================

CREATE POLICY "Parents can view incidents for own children"
  ON public.incidents FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.children
      WHERE id = incidents.child_id AND parent_id = auth.uid()
    )
  );

CREATE POLICY "Staff can view all incidents"
  ON public.incidents FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('staff', 'admin')
    )
  );

CREATE POLICY "Staff can insert incidents"
  ON public.incidents FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('staff', 'admin')
    )
  );

CREATE POLICY "Staff can update incidents"
  ON public.incidents FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('staff', 'admin')
    )
  );

-- ============================================
-- DAILY INFO POLICIES
-- ============================================

CREATE POLICY "All users can view daily info"
  ON public.daily_info FOR SELECT
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Staff can insert daily info"
  ON public.daily_info FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('staff', 'admin')
    )
  );

CREATE POLICY "Staff can update daily info"
  ON public.daily_info FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('staff', 'admin')
    )
  );

CREATE POLICY "Staff can delete daily info"
  ON public.daily_info FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('staff', 'admin')
    )
  );

-- ============================================
-- MESSAGES POLICIES
-- ============================================

CREATE POLICY "Users can view own messages"
  ON public.messages FOR SELECT
  USING (sender_id = auth.uid() OR receiver_id = auth.uid());

CREATE POLICY "Users can send messages"
  ON public.messages FOR INSERT
  WITH CHECK (sender_id = auth.uid());

CREATE POLICY "Users can update received messages"
  ON public.messages FOR UPDATE
  USING (receiver_id = auth.uid());

CREATE POLICY "Users can delete own messages"
  ON public.messages FOR DELETE
  USING (sender_id = auth.uid() OR receiver_id = auth.uid());

-- ============================================
-- HELPER FUNCTIONS
-- ============================================

CREATE OR REPLACE FUNCTION public.is_staff()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role IN ('staff', 'admin')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.is_parent_of(child_uuid UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.children
    WHERE id = child_uuid AND parent_id = auth.uid()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- SAMPLE DATA (DEMO)
-- ============================================

INSERT INTO public.profiles (id, email, full_name, phone, role) VALUES
  ('00000000-0000-0000-0000-000000000001', 'parent1@example.com', 'Anne Nordmann', '+47 900 00 001', 'parent'),
  ('00000000-0000-0000-0000-000000000002', 'parent2@example.com', 'Per Hansen', '+47 900 00 002', 'parent'),
  ('00000000-0000-0000-0000-000000000003', 'staff1@example.com', 'Kari Pedagogsen', '+47 900 00 003', 'staff'),
  ('00000000-0000-0000-0000-000000000004', 'admin@example.com', 'Ola Styrer', '+47 900 00 004', 'admin')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.children (id, parent_id, name, date_of_birth, "group", status, notes, allergies) VALUES
  ('child-001', '00000000-0000-0000-0000-000000000001', 'Emma Nordmann', '2020-03-15', 'Blåklokka', 'present', 'Liker å leke ute', 'Nøtter'),
  ('child-002', '00000000-0000-0000-0000-000000000001', 'Lucas Nordmann', '2021-07-22', 'Solstråla', 'absent', 'Elsker å synge', NULL),
  ('child-003', '00000000-0000-0000-0000-000000000002', 'Sofie Hansen', '2019-11-10', 'Blåklokka', 'present', NULL, 'Laktose'),
  ('child-004', '00000000-0000-0000-0000-000000000002', 'Noah Hansen', '2022-01-05', 'Solstråla', 'present', NULL, NULL)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.attendance_logs (child_id, action, timestamp, verified_by) VALUES
  ('child-001', 'check_in', NOW() - INTERVAL '3 hours', '00000000-0000-0000-0000-000000000001'),
  ('child-003', 'check_in', NOW() - INTERVAL '2 hours', '00000000-0000-0000-0000-000000000002'),
  ('child-004', 'check_in', NOW() - INTERVAL '4 hours', '00000000-0000-0000-0000-000000000002');

INSERT INTO public.approved_persons (child_id, name, relation, phone, can_pick_up, status) VALUES
  ('child-001', 'Anne Nordmann', 'Mor', '+47 900 00 001', true, 'approved'),
  ('child-001', 'Erik Nordmann', 'Far', '+47 900 00 005', true, 'approved'),
  ('child-003', 'Per Hansen', 'Far', '+47 900 00 002', true, 'approved'),
  ('child-003', 'Lise Hansen', 'Mor', '+47 900 00 007', true, 'approved');

INSERT INTO public.incidents (child_id, type, description, severity, action_taken, reported_by, notified_parents) VALUES
  ('child-001', 'injury', 'Falt og fikk ett skrubbsår på kneet', 'low', 'Renset såret og satte på plaster', '00000000-0000-0000-0000-000000000003', true),
  ('child-003', 'illness', 'Kvalm etter lunsj', 'medium', 'Barnet hviler', '00000000-0000-0000-0000-000000000003', true);

INSERT INTO public.daily_info (date, type, title, description, target_group, created_by) VALUES
  (CURRENT_DATE, 'menu', 'Lunsj i dag', 'Fiskesuppe med grovbrød', NULL, '00000000-0000-0000-0000-000000000003'),
  (CURRENT_DATE, 'activity', 'Utetur', 'Tur til skogen kl 10:00', 'Blåklokka', '00000000-0000-0000-0000-000000000003');

INSERT INTO public.messages (sender_id, receiver_id, content, read) VALUES
  ('00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000003', 'Hei! Emma har vondt i halsen', true),
  ('00000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000001', 'Vi følger med!', true);

-- ============================================
-- SUCCESS! 🎉
-- ============================================
-- Database schema is complete!
-- 
-- Run these to verify:
-- SELECT * FROM public.profiles;
-- SELECT * FROM public.children;
-- SELECT * FROM public.daily_info;
-- ============================================
