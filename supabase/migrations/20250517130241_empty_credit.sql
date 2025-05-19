/*
  # Add hostels and flights tables

  1. New Tables
    - `hostels`
      - Basic hostel information
      - Location details
      - Pricing and amenities
    - `flights`
      - Flight route information
      - Schedule and pricing
      - Airline details
    
  2. Security
    - Enable RLS on new tables
    - Public read access
    - Admin-only write access
*/

CREATE TABLE IF NOT EXISTS hostels (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  location text NOT NULL,
  city text NOT NULL,
  country text NOT NULL,
  price_per_night numeric(10,2) NOT NULL,
  rating numeric(3,2) DEFAULT 0,
  total_beds integer NOT NULL,
  available_beds integer NOT NULL,
  amenities text[],
  images text[],
  latitude numeric(10,6),
  longitude numeric(10,6),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS flights (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  airline text NOT NULL,
  flight_number text NOT NULL,
  departure_city text NOT NULL,
  arrival_city text NOT NULL,
  departure_time timestamptz NOT NULL,
  arrival_time timestamptz NOT NULL,
  price numeric(10,2) NOT NULL,
  available_seats integer NOT NULL,
  class text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE hostels ENABLE ROW LEVEL SECURITY;
ALTER TABLE flights ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Public hostels access" ON hostels
  FOR SELECT TO public USING (true);

CREATE POLICY "Public flights access" ON flights
  FOR SELECT TO public USING (true);