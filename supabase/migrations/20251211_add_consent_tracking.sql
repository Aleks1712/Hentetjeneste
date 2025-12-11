-- ============================================
-- CONSENT TRACKING TABLE - GDPR COMPLIANCE
-- ============================================

CREATE TABLE IF NOT EXISTS public.consent_preferences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  data_sharing BOOLEAN NOT NULL DEFAULT false,
  analytics BOOLEAN NOT NULL DEFAULT true,
  email_notifications BOOLEAN NOT NULL DEFAULT true,
  push_notifications BOOLEAN NOT NULL DEFAULT true,
  consent_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_updated TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id)
);

-- RLS POLICIES FOR CONSENT PREFERENCES
ALTER TABLE public.consent_preferences ENABLE ROW LEVEL SECURITY;

-- Users can view their own consent preferences
CREATE POLICY "Users can view own consent preferences" ON public.consent_preferences 
  FOR SELECT USING (user_id = auth.uid());

-- Users can update their own consent preferences
CREATE POLICY "Users can update own consent preferences" ON public.consent_preferences 
  FOR UPDATE USING (user_id = auth.uid());

-- Users can insert their own consent preferences
CREATE POLICY "Users can insert own consent preferences" ON public.consent_preferences 
  FOR INSERT WITH CHECK (user_id = auth.uid());

-- Users can delete their own consent preferences
CREATE POLICY "Users can delete own consent preferences" ON public.consent_preferences 
  FOR DELETE USING (user_id = auth.uid());

-- Staff can view all consent preferences for data processing
CREATE POLICY "Staff can view all consent preferences" ON public.consent_preferences 
  FOR SELECT USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('staff', 'admin')));

-- INDEX FOR PERFORMANCE
CREATE INDEX IF NOT EXISTS idx_consent_preferences_user_id ON public.consent_preferences(user_id);
CREATE INDEX IF NOT EXISTS idx_consent_preferences_data_sharing ON public.consent_preferences(data_sharing);
CREATE INDEX IF NOT EXISTS idx_consent_preferences_analytics ON public.consent_preferences(analytics);

-- AUTO-CREATE CONSENT PREFERENCES WHEN USER SIGNS UP
CREATE OR REPLACE FUNCTION public.create_consent_preferences()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.consent_preferences (user_id, data_sharing, analytics)
  VALUES (NEW.id, false, true)
  ON CONFLICT (user_id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_profile_created ON public.profiles;
CREATE TRIGGER on_profile_created
  AFTER INSERT ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.create_consent_preferences();

-- COMMENT FOR DOCUMENTATION
COMMENT ON TABLE public.consent_preferences IS 'GDPR consent tracking for users - records what data sharing users have consented to';
