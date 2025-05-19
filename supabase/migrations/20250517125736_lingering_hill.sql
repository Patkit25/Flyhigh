/*
  # Initial Schema Setup for FlyHigh Travel Planner

  1. New Tables
    - `profiles`
      - User profile information
      - Extended from auth.users
    - `destinations`
      - Travel destinations catalog
    - `trips`
      - User trip plans
    - `trip_activities`
      - Activities within trips
    - `trip_accommodations`
      - Accommodations for trips
    - `reviews`
      - User reviews for destinations

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name text,
  avatar_url text,
  location text,
  travel_preferences text[],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create destinations table
CREATE TABLE IF NOT EXISTS destinations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  country text NOT NULL,
  description text,
  image_url text,
  average_rating numeric(3,2) DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create trips table
CREATE TABLE IF NOT EXISTS trips (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  destination_id uuid REFERENCES destinations(id),
  name text NOT NULL,
  start_date date NOT NULL,
  end_date date NOT NULL,
  budget numeric(10,2),
  notes text,
  status text DEFAULT 'planning',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create trip_activities table
CREATE TABLE IF NOT EXISTS trip_activities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id uuid REFERENCES trips(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  date date,
  duration interval,
  location text,
  price numeric(10,2),
  created_at timestamptz DEFAULT now()
);

-- Create trip_accommodations table
CREATE TABLE IF NOT EXISTS trip_accommodations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id uuid REFERENCES trips(id) ON DELETE CASCADE,
  name text NOT NULL,
  type text,
  check_in date NOT NULL,
  check_out date NOT NULL,
  price_per_night numeric(10,2),
  location text,
  booking_reference text,
  created_at timestamptz DEFAULT now()
);

-- Create reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  destination_id uuid REFERENCES destinations(id) ON DELETE CASCADE,
  rating integer CHECK (rating >= 1 AND rating <= 5),
  comment text,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE destinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE trips ENABLE ROW LEVEL SECURITY;
ALTER TABLE trip_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE trip_accommodations ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Public destinations access" ON destinations
  FOR SELECT TO public USING (true);

CREATE POLICY "Users can read own profile" ON profiles
  FOR SELECT TO authenticated USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE TO authenticated USING (auth.uid() = id);

CREATE POLICY "Users can read own trips" ON trips
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own trips" ON trips
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own trips" ON trips
  FOR UPDATE TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own trips" ON trips
  FOR DELETE TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own trip activities" ON trip_activities
  FOR ALL TO authenticated USING (
    auth.uid() IN (
      SELECT user_id FROM trips WHERE id = trip_activities.trip_id
    )
  );

CREATE POLICY "Users can manage own trip accommodations" ON trip_accommodations
  FOR ALL TO authenticated USING (
    auth.uid() IN (
      SELECT user_id FROM trips WHERE id = trip_accommodations.trip_id
    )
  );

CREATE POLICY "Users can manage own reviews" ON reviews
  FOR ALL TO authenticated USING (auth.uid() = user_id);