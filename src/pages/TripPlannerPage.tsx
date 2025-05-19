import React from 'react';
import { useTrips } from '../context/TripsContext';

const TripPlannerPage = () => {
  const { trips } = useTrips();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Trip Planner</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-600">Plan your next adventure here!</p>
      </div>
    </div>
  );
};

export default TripPlannerPage;