-- GDPR Compliance Functions

-- Function: Export user data (GDPR Article 15 - Right of access)
CREATE OR REPLACE FUNCTION export_user_data(user_uuid UUID)
RETURNS JSON AS $$
DECLARE
    result JSON;
BEGIN
    SELECT json_build_object(
        'user', (SELECT row_to_json(u) FROM users u WHERE id = user_uuid),
        'children', (SELECT json_agg(row_to_json(c)) FROM children c WHERE parent_id = user_uuid),
        'approved_persons', (
            SELECT json_agg(row_to_json(ap)) 
            FROM approved_persons ap 
            WHERE child_id IN (SELECT id FROM children WHERE parent_id = user_uuid)
        ),
        'incidents', (
            SELECT json_agg(row_to_json(i)) 
            FROM incidents i 
            WHERE child_id IN (SELECT id FROM children WHERE parent_id = user_uuid)
        ),
        'pickup_logs', (
            SELECT json_agg(row_to_json(pl)) 
            FROM pickup_logs pl 
            WHERE child_id IN (SELECT id FROM children WHERE parent_id = user_uuid)
        ),
        'consents', (SELECT json_agg(row_to_json(uc)) FROM user_consents uc WHERE user_id = user_uuid)
    ) INTO result;
    
    RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function: Delete user data (GDPR Article 17 - Right to erasure)
CREATE OR REPLACE FUNCTION delete_user_data(user_uuid UUID)
RETURNS BOOLEAN AS $$
BEGIN
    -- Delete user and cascade will handle related data
    DELETE FROM users WHERE id = user_uuid;
    RETURN TRUE;
EXCEPTION
    WHEN OTHERS THEN
        RETURN FALSE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function: Anonymize user data (for data retention)
CREATE OR REPLACE FUNCTION anonymize_user_data(user_uuid UUID)
RETURNS BOOLEAN AS $$
BEGIN
    UPDATE users 
    SET 
        email = 'deleted_' || id::text || '@deleted.local',
        name = 'Deleted User',
        phone = NULL,
        active = false
    WHERE id = user_uuid;
    
    RETURN TRUE;
EXCEPTION
    WHEN OTHERS THEN
        RETURN FALSE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function: Record user consent
CREATE OR REPLACE FUNCTION record_consent(user_uuid UUID, consent_type_param TEXT, granted_param BOOLEAN)
RETURNS BOOLEAN AS $$
BEGIN
    INSERT INTO user_consents (user_id, consent_type, granted, granted_at)
    VALUES (user_uuid, consent_type_param, granted_param, NOW())
    ON CONFLICT DO NOTHING;
    
    RETURN TRUE;
EXCEPTION
    WHEN OTHERS THEN
        RETURN FALSE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function: Revoke consent
CREATE OR REPLACE FUNCTION revoke_consent(user_uuid UUID, consent_type_param TEXT)
RETURNS BOOLEAN AS $$
BEGIN
    UPDATE user_consents
    SET granted = false, revoked_at = NOW()
    WHERE user_id = user_uuid AND consent_type = consent_type_param;
    
    RETURN TRUE;
EXCEPTION
    WHEN OTHERS THEN
        RETURN FALSE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

