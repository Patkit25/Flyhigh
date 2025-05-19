import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Users } from 'lucide-react';
import SearchBar from '../ui/SearchBar';
import Button from '../ui/Button';

const destinations = [
  'Tokyo, Japan',
  'Paris, France',
  'New York, USA',
  'Rome, Italy',
  'Bali, Indonesia',
  'Barcelona, Spain',
  'London, UK',
  'Sydney, Australia',
  'Cairo, Egypt',
  'Rio de Janeiro, Brazil',
];

const HeroSection: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('flights');

  const handleSearch = (query: string) => {
    console.log('Searching for:', query);
    // In a real app, this would trigger a search API call
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image with parallax effect */}
      <div 
        className="absolute inset-0 z-0" 
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/2325446/pexels-photo-2325446.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 pt-28 pb-20 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center text-white mb-12"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Discover Your Next Adventure
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
            Plan your perfect trip with ease. Find flights, hotels, and unforgettable experiences around the world.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden"
        >
          {/* Search Tabs */}
          <div className="flex border-b">
            {['flights', 'hotels', 'packages', 'activities'].map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`px-6 py-4 text-sm md:text-base font-medium flex-1 md:flex-none md:min-w-[120px] capitalize transition-colors ${
                  selectedTab === tab
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Search Form */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              <div className="col-span-1 md:col-span-2 lg:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Where are you going?"
                    className="pl-10 pr-4 py-3 rounded-lg border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Check-in Date</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="date"
                    className="pl-10 pr-4 py-3 rounded-lg border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Check-out Date</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="date"
                    className="pl-10 pr-4 py-3 rounded-lg border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Travelers</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Users size={18} className="text-gray-400" />
                  </div>
                  <select
                    className="pl-10 pr-4 py-3 rounded-lg border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors appearance-none"
                  >
                    <option value="1">1 Adult</option>
                    <option value="2">2 Adults</option>
                    <option value="3">3 Adults</option>
                    <option value="4">4 Adults</option>
                    <option value="family">2 Adults, 2 Children</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <Button 
                size="lg"
                className="px-10"
              >
                Search {selectedTab.charAt(0).toUpperCase() + selectedTab.slice(1)}
              </Button>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="max-w-md mx-auto mt-12 text-center text-white"
        >
          <p className="uppercase tracking-wide font-light text-sm mb-2">Popular Searches</p>
          <div className="flex flex-wrap justify-center gap-2">
            {['Tokyo', 'Paris', 'Bali', 'New York', 'Rome'].map((city) => (
              <div key={city} className="px-3 py-1 rounded-full bg-white/20 text-white backdrop-blur-sm">
                {city}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;