-- Hentetjeneste Database Schema
-- GDPR-compliant: Data stored in EU region

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (replaces auth.users in Supabase)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    name TEXT NOT NULL,
    phone TEXT,
    role TEXT NOT NULL CHECK (role IN ('PARENT', 'STAFF', 'ADMIN')),
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Children table
CREATE TABLE children (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    group_name TEXT NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('PRESENT', 'HOME')) DEFAULT 'HOME',
    check_in_time TIME,
    check_out_time TIME,
    pickup_status TEXT CHECK (pickup_status IN ('PENDING', 'APPROVED', NULL)),
    pickup_person TEXT,
    parent_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Approved persons table
CREATE TABLE approved_persons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    child_id UUID NOT NULL REFERENCES children(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    relation TEXT NOT NULL,
    phone TEXT NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('APPROVED', 'PENDING')) DEFAULT 'PENDING',
    approved_date DATE,
    blocked BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Incidents table
CREATE TABLE incidents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    child_id UUID NOT NULL REFERENCES children(id) ON DELETE CASCADE,
    type TEXT NOT NULL CHECK (type IN ('INJURY', 'ILLNESS', 'INFO', 'EMERGENCY')),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    severity TEXT NOT NULL CHECK (severity IN ('LOW', 'MEDIUM', 'HIGH')),
    action_taken TEXT,
    notified_parents BOOLEAN DEFAULT false,
    reported_by_id UUID NOT NULL REFERENCES users(id),
    reported_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Pickup logs table
CREATE TABLE pickup_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    child_id UUID NOT NULL REFERENCES children(id) ON DELETE CASCADE,
    picked_up_by TEXT NOT NULL,
    picked_up_at TIMESTAMPTZ NOT NULL,
    checked_out_time TIME NOT NULL,
    verified_by TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Daily info table
CREATE TABLE daily_info (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    date DATE NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('MENU', 'ACTIVITY', 'ANNOUNCEMENT')),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    target_group TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- GDPR: User consent table
CREATE TABLE user_consents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    consent_type TEXT NOT NULL,
    granted BOOLEAN DEFAULT false,
    granted_at TIMESTAMPTZ,
    revoked_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_children_parent_id ON children(parent_id);
CREATE INDEX idx_children_status ON children(status);
CREATE INDEX idx_approved_persons_child_id ON approved_persons(child_id);
CREATE INDEX idx_incidents_child_id ON incidents(child_id);
CREATE INDEX idx_pickup_logs_child_id ON pickup_logs(child_id);
CREATE INDEX idx_daily_info_date ON daily_info(date);
CREATE INDEX idx_user_consents_user_id ON user_consents(user_id);

-- Row Level Security (RLS) Policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE children ENABLE ROW LEVEL SECURITY;
ALTER TABLE approved_persons ENABLE ROW LEVEL SECURITY;
ALTER TABLE incidents ENABLE ROW LEVEL SECURITY;
ALTER TABLE pickup_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_consents ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Parents can only see their own children
CREATE POLICY "Parents see own children" ON children
    FOR SELECT
    USING (
        parent_id IN (
            SELECT id FROM users WHERE id = auth.uid() AND role = 'PARENT'
        )
    );

-- RLS Policy: Staff can see all children
CREATE POLICY "Staff see all children" ON children
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('STAFF', 'ADMIN')
        )
    );

-- RLS Policy: Users can see their own data
CREATE POLICY "Users see own data" ON users
    FOR SELECT
    USING (id = auth.uid());

-- Updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_children_updated_at BEFORE UPDATE ON children
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_approved_persons_updated_at BEFORE UPDATE ON approved_persons
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

