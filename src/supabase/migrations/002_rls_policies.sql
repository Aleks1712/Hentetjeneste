-- ============================================
-- HENTETJENESTE - ROW LEVEL SECURITY (RLS)
-- ============================================
-- This migration sets up RLS policies for GDPR compliance
-- Run this after 001_initial_schema.sql

-- ============================================
-- ENABLE RLS ON ALL TABLES
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

-- Users can view their own profile
CREATE POLICY "Users can view own profile"
  ON public.profiles
  FOR SELECT
  USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id);

-- Staff can view all profiles
CREATE POLICY "Staff can view all profiles"
  ON public.profiles
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('staff', 'admin')
    )
  );

-- New users can insert their own profile (on signup)
CREATE POLICY "Users can insert own profile"
  ON public.profiles
  FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Users can delete their own profile (GDPR Article 17)
CREATE POLICY "Users can delete own profile"
  ON public.profiles
  FOR DELETE
  USING (auth.uid() = id);

-- ============================================
-- CHILDREN POLICIES
-- ============================================

-- Parents can view their own children
CREATE POLICY "Parents can view own children"
  ON public.children
  FOR SELECT
  USING (parent_id = auth.uid());

-- Staff can view all children
CREATE POLICY "Staff can view all children"
  ON public.children
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('staff', 'admin')
    )
  );

-- Parents can insert children
CREATE POLICY "Parents can insert own children"
  ON public.children
  FOR INSERT
  WITH CHECK (parent_id = auth.uid());

-- Parents can update their own children
CREATE POLICY "Parents can update own children"
  ON public.children
  FOR UPDATE
  USING (parent_id = auth.uid());

-- Staff can update all children
CREATE POLICY "Staff can update all children"
  ON public.children
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('staff', 'admin')
    )
  );

-- Staff can delete children
CREATE POLICY "Staff can delete children"
  ON public.children
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('staff', 'admin')
    )
  );

-- ============================================
-- ATTENDANCE LOGS POLICIES
-- ============================================

-- Parents can view logs for their own children
CREATE POLICY "Parents can view own children logs"
  ON public.attendance_logs
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.children
      WHERE id = attendance_logs.child_id AND parent_id = auth.uid()
    )
  );

-- Staff can view all logs
CREATE POLICY "Staff can view all logs"
  ON public.attendance_logs
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('staff', 'admin')
    )
  );

-- Staff can insert logs
CREATE POLICY "Staff can insert logs"
  ON public.attendance_logs
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('staff', 'admin')
    )
  );

-- Parents can insert logs for their own children (check-in/out)
CREATE POLICY "Parents can insert logs for own children"
  ON public.attendance_logs
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.children
      WHERE id = attendance_logs.child_id AND parent_id = auth.uid()
    )
  );

-- ============================================
-- APPROVED PERSONS POLICIES
-- ============================================

-- Parents can view approved persons for their children
CREATE POLICY "Parents can view approved persons for own children"
  ON public.approved_persons
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.children
      WHERE id = approved_persons.child_id AND parent_id = auth.uid()
    )
  );

-- Staff can view all approved persons
CREATE POLICY "Staff can view all approved persons"
  ON public.approved_persons
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('staff', 'admin')
    )
  );

-- Parents can insert approved persons for their children
CREATE POLICY "Parents can insert approved persons for own children"
  ON public.approved_persons
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.children
      WHERE id = approved_persons.child_id AND parent_id = auth.uid()
    )
  );

-- Parents can update approved persons for their children
CREATE POLICY "Parents can update approved persons for own children"
  ON public.approved_persons
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.children
      WHERE id = approved_persons.child_id AND parent_id = auth.uid()
    )
  );

-- Staff can update all approved persons (to approve/reject)
CREATE POLICY "Staff can update all approved persons"
  ON public.approved_persons
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('staff', 'admin')
    )
  );

-- Parents can delete approved persons for their children
CREATE POLICY "Parents can delete approved persons for own children"
  ON public.approved_persons
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.children
      WHERE id = approved_persons.child_id AND parent_id = auth.uid()
    )
  );

-- ============================================
-- INCIDENTS POLICIES
-- ============================================

-- Parents can view incidents for their children
CREATE POLICY "Parents can view incidents for own children"
  ON public.incidents
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.children
      WHERE id = incidents.child_id AND parent_id = auth.uid()
    )
  );

-- Staff can view all incidents
CREATE POLICY "Staff can view all incidents"
  ON public.incidents
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('staff', 'admin')
    )
  );

-- Staff can insert incidents
CREATE POLICY "Staff can insert incidents"
  ON public.incidents
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('staff', 'admin')
    )
  );

-- Staff can update incidents
CREATE POLICY "Staff can update incidents"
  ON public.incidents
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('staff', 'admin')
    )
  );

-- ============================================
-- DAILY INFO POLICIES
-- ============================================

-- All authenticated users can view daily info
CREATE POLICY "All users can view daily info"
  ON public.daily_info
  FOR SELECT
  USING (auth.uid() IS NOT NULL);

-- Staff can insert daily info
CREATE POLICY "Staff can insert daily info"
  ON public.daily_info
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('staff', 'admin')
    )
  );

-- Staff can update daily info
CREATE POLICY "Staff can update daily info"
  ON public.daily_info
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('staff', 'admin')
    )
  );

-- Staff can delete daily info
CREATE POLICY "Staff can delete daily info"
  ON public.daily_info
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('staff', 'admin')
    )
  );

-- ============================================
-- MESSAGES POLICIES
-- ============================================

-- Users can view messages where they are sender or receiver
CREATE POLICY "Users can view own messages"
  ON public.messages
  FOR SELECT
  USING (
    sender_id = auth.uid() OR receiver_id = auth.uid()
  );

-- Users can insert messages where they are sender
CREATE POLICY "Users can send messages"
  ON public.messages
  FOR INSERT
  WITH CHECK (sender_id = auth.uid());

-- Users can update messages they received (mark as read)
CREATE POLICY "Users can update received messages"
  ON public.messages
  FOR UPDATE
  USING (receiver_id = auth.uid());

-- Users can delete messages they sent or received
CREATE POLICY "Users can delete own messages"
  ON public.messages
  FOR DELETE
  USING (
    sender_id = auth.uid() OR receiver_id = auth.uid()
  );

-- ============================================
-- HELPER FUNCTIONS
-- ============================================

-- Function to check if user is staff
CREATE OR REPLACE FUNCTION public.is_staff()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role IN ('staff', 'admin')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check if user is parent of child
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
-- COMMENTS
-- ============================================

COMMENT ON POLICY "Users can view own profile" ON public.profiles IS 'GDPR Article 15: Right to access';
COMMENT ON POLICY "Users can update own profile" ON public.profiles IS 'GDPR Article 16: Right to rectification';
COMMENT ON POLICY "Users can delete own profile" ON public.profiles IS 'GDPR Article 17: Right to erasure';
