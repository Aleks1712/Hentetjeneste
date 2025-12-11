-- ============================================
-- HENTETJENESTE - ROW LEVEL SECURITY (RLS)
-- ============================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.children ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.approved_persons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.incidents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- PROFILES POLICIES
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Staff can view all profiles" ON public.profiles FOR SELECT USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('staff', 'admin')));
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can delete own profile" ON public.profiles FOR DELETE USING (auth.uid() = id);

-- CHILDREN POLICIES
CREATE POLICY "Parents can view own children" ON public.children FOR SELECT USING (parent_id = auth.uid());
CREATE POLICY "Staff can view all children" ON public.children FOR SELECT USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('staff', 'admin')));
CREATE POLICY "Parents can insert own children" ON public.children FOR INSERT WITH CHECK (parent_id = auth.uid());
CREATE POLICY "Parents can update own children" ON public.children FOR UPDATE USING (parent_id = auth.uid());
CREATE POLICY "Staff can update all children" ON public.children FOR UPDATE USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('staff', 'admin')));
CREATE POLICY "Staff can delete children" ON public.children FOR DELETE USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('staff', 'admin')));

-- ATTENDANCE LOGS POLICIES
CREATE POLICY "Parents can view own children logs" ON public.attendance_logs FOR SELECT USING (EXISTS (SELECT 1 FROM public.children WHERE id = attendance_logs.child_id AND parent_id = auth.uid()));
CREATE POLICY "Staff can view all logs" ON public.attendance_logs FOR SELECT USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('staff', 'admin')));
CREATE POLICY "Staff can insert logs" ON public.attendance_logs FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('staff', 'admin')));
CREATE POLICY "Parents can insert logs for own children" ON public.attendance_logs FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM public.children WHERE id = attendance_logs.child_id AND parent_id = auth.uid()));

-- APPROVED PERSONS POLICIES
CREATE POLICY "Parents can view approved persons for own children" ON public.approved_persons FOR SELECT USING (EXISTS (SELECT 1 FROM public.children WHERE id = approved_persons.child_id AND parent_id = auth.uid()));
CREATE POLICY "Staff can view all approved persons" ON public.approved_persons FOR SELECT USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('staff', 'admin')));
CREATE POLICY "Parents can insert approved persons for own children" ON public.approved_persons FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM public.children WHERE id = approved_persons.child_id AND parent_id = auth.uid()));
CREATE POLICY "Parents can update approved persons for own children" ON public.approved_persons FOR UPDATE USING (EXISTS (SELECT 1 FROM public.children WHERE id = approved_persons.child_id AND parent_id = auth.uid()));
CREATE POLICY "Staff can update all approved persons" ON public.approved_persons FOR UPDATE USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('staff', 'admin')));
CREATE POLICY "Parents can delete approved persons for own children" ON public.approved_persons FOR DELETE USING (EXISTS (SELECT 1 FROM public.children WHERE id = approved_persons.child_id AND parent_id = auth.uid()));

-- INCIDENTS POLICIES
CREATE POLICY "Parents can view incidents for own children" ON public.incidents FOR SELECT USING (EXISTS (SELECT 1 FROM public.children WHERE id = incidents.child_id AND parent_id = auth.uid()));
CREATE POLICY "Staff can view all incidents" ON public.incidents FOR SELECT USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('staff', 'admin')));
CREATE POLICY "Staff can insert incidents" ON public.incidents FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('staff', 'admin')));
CREATE POLICY "Staff can update incidents" ON public.incidents FOR UPDATE USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('staff', 'admin')));

-- DAILY INFO POLICIES
CREATE POLICY "All users can view daily info" ON public.daily_info FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Staff can insert daily info" ON public.daily_info FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('staff', 'admin')));
CREATE POLICY "Staff can update daily info" ON public.daily_info FOR UPDATE USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('staff', 'admin')));
CREATE POLICY "Staff can delete daily info" ON public.daily_info FOR DELETE USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('staff', 'admin')));

-- MESSAGES POLICIES
CREATE POLICY "Users can view own messages" ON public.messages FOR SELECT USING (sender_id = auth.uid() OR receiver_id = auth.uid());
CREATE POLICY "Users can send messages" ON public.messages FOR INSERT WITH CHECK (sender_id = auth.uid());
CREATE POLICY "Users can update received messages" ON public.messages FOR UPDATE USING (receiver_id = auth.uid());
CREATE POLICY "Users can delete own messages" ON public.messages FOR DELETE USING (sender_id = auth.uid() OR receiver_id = auth.uid());

-- CONSENT PREFERENCES POLICIES (GDPR)
CREATE POLICY "Users can view own consent preferences" ON public.consent_preferences FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Users can update own consent preferences" ON public.consent_preferences FOR UPDATE USING (user_id = auth.uid());
CREATE POLICY "Users can insert own consent preferences" ON public.consent_preferences FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "Users can delete own consent preferences" ON public.consent_preferences FOR DELETE USING (user_id = auth.uid());
CREATE POLICY "Staff can view all consent preferences" ON public.consent_preferences FOR SELECT USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('staff', 'admin')));

-- HELPER FUNCTIONS
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

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
