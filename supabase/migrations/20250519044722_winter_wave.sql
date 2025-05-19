/*
  # Flight Search System Setup

  1. New Tables
    - `airports`
      - Airport information and locations
    - `flight_routes`
      - Available flight routes
    - `flight_schedules`
      - Detailed flight schedules and pricing
    - `flight_bookings`
      - User flight bookings

  2. Security
    - Enable RLS on all tables
    - Public read access for airports and routes
    - Authenticated access for bookings
*/

-- Create airports table
CREATE TABLE IF NOT EXISTS airports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  iata_code text UNIQUE NOT NULL,
  name text NOT NULL,
  city text NOT NULL,
  country text NOT NULL,
  latitude numeric(10,6),
  longitude numeric(10,6),
  timezone text,
  created_at timestamptz DEFAULT now()
);

-- Create flight routes table
CREATE TABLE IF NOT EXISTS flight_routes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  departure_airport uuid REFERENCES airports(id),
  arrival_airport uuid REFERENCES airports(id),
  airline text NOT NULL,
  base_price numeric(10,2) NOT NULL,
  flight_duration interval NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(departure_airport, arrival_airport, airline)
);

-- Create flight schedules table
CREATE TABLE IF NOT EXISTS flight_schedules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  route_id uuid REFERENCES flight_routes(id) ON DELETE CASCADE,
  flight_number text NOT NULL,
  departure_time timestamptz NOT NULL,
  arrival_time timestamptz NOT NULL,
  available_seats integer NOT NULL,
  price_multiplier numeric(3,2) DEFAULT 1.0,
  status text DEFAULT 'scheduled',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create flight bookings table
CREATE TABLE IF NOT EXISTS flight_bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  schedule_id uuid REFERENCES flight_schedules(id),
  booking_reference text UNIQUE NOT NULL,
  passenger_count integer NOT NULL,
  total_price numeric(10,2) NOT NULL,
  status text DEFAULT 'confirmed',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE airports ENABLE ROW LEVEL SECURITY;
ALTER TABLE flight_routes ENABLE ROW LEVEL SECURITY;
ALTER TABLE flight_schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE flight_bookings ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Public airports access"
  ON airports FOR SELECT TO public
  USING (true);

CREATE POLICY "Public flight routes access"
  ON flight_routes FOR SELECT TO public
  USING (true);

CREATE POLICY "Public flight schedules access"
  ON flight_schedules FOR SELECT TO public
  USING (true);

CREATE POLICY "Users can manage their flight bookings"
  ON flight_bookings FOR ALL TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);