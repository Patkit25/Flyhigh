import React, { createContext, useState, useContext, ReactNode } from 'react';

type Destination = {
  id: string;
  name: string;
  country: string;
  image: string;
  description: string;
};

type Accommodation = {
  id: string;
  name: string;
  type: string;
  price: number;
  location: string;
  image: string;
};

type Activity = {
  id: string;
  name: string;
  type: string;
  price: number;
  duration: string;
  location: string;
  image?: string;
};

type Flight = {
  id: string;
  airline: string;
  flightNumber: string;
  departureCity: string;
  arrivalCity: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
};

export type Trip = {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  destination: Destination;
  accommodations: Accommodation[];
  activities: Activity[];
  flights: Flight[];
  budget: number;
  notes?: string;
  createdAt: string;
};

type TripsContextType = {
  trips: Trip[];
  saveTrip: (trip: Omit<Trip, 'id' | 'createdAt'>) => void;
  updateTrip: (id: string, updates: Partial<Trip>) => void;
  deleteTrip: (id: string) => void;
  getTripById: (id: string) => Trip | undefined;
};

const TripsContext = createContext<TripsContextType | undefined>(undefined);

// Sample data
const sampleTrips: Trip[] = [
  {
    id: '1',
    name: 'Tokyo Adventure',
    startDate: '2025-05-15',
    endDate: '2025-05-25',
    destination: {
      id: '1',
      name: 'Tokyo',
      country: 'Japan',
      image: 'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      description: 'Tokyo, Japan\'s busy capital, mixes the ultramodern and the traditional, from neon-lit skyscrapers to historic temples.'
    },
    accommodations: [
      {
        id: 'a1',
        name: 'Shinjuku Grand Hotel',
        type: 'Hotel',
        price: 150,
        location: 'Shinjuku, Tokyo',
        image: 'https://images.pexels.com/photos/237371/pexels-photo-237371.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
      }
    ],
    activities: [
      {
        id: 'act1',
        name: 'Tokyo Tower Visit',
        type: 'Sightseeing',
        price: 30,
        duration: '3 hours',
        location: 'Minato, Tokyo',
        image: 'https://images.pexels.com/photos/5007442/pexels-photo-5007442.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
      }
    ],
    flights: [
      {
        id: 'f1',
        airline: 'ANA',
        flightNumber: 'NH105',
        departureCity: 'New York',
        arrivalCity: 'Tokyo',
        departureTime: '2025-05-15T10:00:00',
        arrivalTime: '2025-05-16T14:30:00',
        price: 1200
      }
    ],
    budget: 3000,
    createdAt: '2024-03-10T12:00:00'
  }
];

export const TripsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [trips, setTrips] = useState<Trip[]>(sampleTrips);

  const saveTrip = (trip: Omit<Trip, 'id' | 'createdAt'>) => {
    const newTrip: Trip = {
      ...trip,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    setTrips((prevTrips) => [...prevTrips, newTrip]);
  };

  const updateTrip = (id: string, updates: Partial<Trip>) => {
    setTrips((prevTrips) =>
      prevTrips.map((trip) =>
        trip.id === id ? { ...trip, ...updates } : trip
      )
    );
  };

  const deleteTrip = (id: string) => {
    setTrips((prevTrips) => prevTrips.filter((trip) => trip.id !== id));
  };

  const getTripById = (id: string) => {
    return trips.find((trip) => trip.id === id);
  };

  return (
    <TripsContext.Provider
      value={{
        trips,
        saveTrip,
        updateTrip,
        deleteTrip,
        getTripById,
      }}
    >
      {children}
    </TripsContext.Provider>
  );
};

export const useTrips = () => {
  const context = useContext(TripsContext);
  if (context === undefined) {
    throw new Error('useTrips must be used within a TripsProvider');
  }
  return context;
};