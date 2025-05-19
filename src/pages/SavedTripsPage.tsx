import React from 'react';

const SavedTripsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Saved Trips</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Content will be populated from TripsContext */}
        <p className="text-gray-600">No saved trips yet. Start planning your next adventure!</p>
      </div>
    </div>
  );
};

export default SavedTripsPage;