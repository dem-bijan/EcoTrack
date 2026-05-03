-- EcoTrack Database Schema Reference

-- 1. USERS TABLE
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255),
    location JSONB, -- {city, country, coordinates}
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    is_active BOOLEAN DEFAULT TRUE,
    email_verified BOOLEAN DEFAULT FALSE
);

-- 2. USER PROFILES
CREATE TABLE user_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    housing_type VARCHAR(50), -- apartment, house, etc.
    household_size INTEGER,
    diet_type VARCHAR(50), -- omnivore, vegetarian, vegan
    vehicle_type VARCHAR(50), -- gas, electric, hybrid, none
    annual_mileage INTEGER,
    energy_source VARCHAR(50), -- grid, renewable, mixed
    preferences JSONB, -- flexible settings
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(user_id)
);

-- 3. CARBON FOOTPRINTS (Historical tracking)
CREATE TABLE carbon_footprints (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    total_co2_tons DECIMAL(10,2) NOT NULL,
    breakdown JSONB NOT NULL, -- {transportation: X, housing: Y, food: Z, shopping: W}
    calculation_date DATE NOT NULL,
    is_baseline BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW()
);

-- 4. ACTIVITIES (User actions that impact carbon)
CREATE TABLE activities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    activity_type VARCHAR(50) NOT NULL, -- flight, drive, meal, purchase, etc.
    activity_category VARCHAR(50) NOT NULL, -- transportation, food, housing, shopping
    description TEXT,
    co2_impact DECIMAL(10,3) NOT NULL, -- in tons
    activity_data JSONB, -- flexible data: {distance, vehicle_type, etc}
    activity_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- 5. RECOMMENDATIONS
CREATE TABLE recommendations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    action_type VARCHAR(50) NOT NULL, -- energy, transport, food, shopping
    estimated_impact DECIMAL(10,2), -- tons saved per year
    estimated_cost DECIMAL(10,2), -- monthly cost
    difficulty_level VARCHAR(20), -- easy, medium, hard
    priority_score INTEGER, -- ML-generated priority
    status VARCHAR(20) DEFAULT 'pending', -- pending, started, completed, dismissed
    metadata JSONB, -- local providers, links, etc.
    created_at TIMESTAMP DEFAULT NOW(),
    completed_at TIMESTAMP
);

-- 6. ACHIEVEMENTS
CREATE TABLE achievements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code VARCHAR(50) UNIQUE NOT NULL, -- energy_saver, first_week, etc.
    title VARCHAR(255) NOT NULL,
    description TEXT,
    icon_url VARCHAR(500),
    criteria JSONB, -- requirements to unlock
    points INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW()
);

-- 7. USER ACHIEVEMENTS
CREATE TABLE user_achievements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    achievement_id UUID REFERENCES achievements(id) ON DELETE CASCADE,
    earned_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(user_id, achievement_id)
);

-- 8. SOCIAL CONNECTIONS
CREATE TABLE social_connections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    follower_id UUID REFERENCES users(id) ON DELETE CASCADE,
    following_id UUID REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(follower_id, following_id),
    CHECK (follower_id != following_id)
);

-- 9. COMMUNITY CHALLENGES
CREATE TABLE challenges (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    challenge_type VARCHAR(50), -- individual, team, community
    target_value DECIMAL(10,2), -- target reduction in tons
    duration_days INTEGER,
    start_date DATE,
    end_date DATE,
    is_active BOOLEAN DEFAULT TRUE,
    rewards JSONB, -- badges, points, etc.
    created_at TIMESTAMP DEFAULT NOW()
);

-- 10. USER CHALLENGES
CREATE TABLE user_challenges (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    challenge_id UUID REFERENCES challenges(id) ON DELETE CASCADE,
    joined_at TIMESTAMP DEFAULT NOW(),
    completed_at TIMESTAMP,
    progress DECIMAL(10,2) DEFAULT 0,
    status VARCHAR(20) DEFAULT 'active', -- active, completed, failed
    UNIQUE(user_id, challenge_id)
);

-- 11. EXTERNAL INTEGRATIONS
CREATE TABLE integrations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    integration_type VARCHAR(50) NOT NULL,
    provider_name VARCHAR(100),
    access_token_encrypted TEXT,
    refresh_token_encrypted TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    last_sync TIMESTAMP,
    metadata JSONB,
    created_at TIMESTAMP DEFAULT NOW()
);

-- 12. CARBON OFFSET TRANSACTIONS
CREATE TABLE carbon_offsets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    amount_tons DECIMAL(10,2) NOT NULL,
    cost_usd DECIMAL(10,2) NOT NULL,
    provider VARCHAR(100),
    certificate_url VARCHAR(500),
    transaction_date TIMESTAMP DEFAULT NOW(),
    status VARCHAR(20) DEFAULT 'pending'
);

-- 13. NOTIFICATION PREFERENCES
CREATE TABLE notification_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    email_enabled BOOLEAN DEFAULT TRUE,
    push_enabled BOOLEAN DEFAULT TRUE,
    weekly_report BOOLEAN DEFAULT TRUE,
    achievement_alerts BOOLEAN DEFAULT TRUE,
    challenge_reminders BOOLEAN DEFAULT TRUE,
    recommendation_updates BOOLEAN DEFAULT TRUE,
    updated_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(user_id)
);
