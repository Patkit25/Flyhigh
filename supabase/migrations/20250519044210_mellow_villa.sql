/*
  # Add user preferences and settings

  1. New Tables
    - `user_preferences`
      - Store user-specific settings and preferences
    - `travel_categories`
      - Predefined travel categories/types
    
  2. Security
    - Enable RLS on new tables
    - Add policies for authenticated users
*/

CREATE TABLE IF NOT EXISTS user_preferences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  currency text DEFAULT 'USD',
  language text DEFAULT 'en',
  notification_preferences jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS travel_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  icon text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE travel_categories ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can manage their own preferences"
ON user_preferences FOR ALL TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Public travel categories access"
ON travel_categories FOR SELECT TO public
USING (true);