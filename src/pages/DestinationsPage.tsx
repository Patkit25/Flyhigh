import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Star, Calendar } from 'lucide-react';
import Card from '../components/ui/Card';

type Destination = {
  id: string;
  name: string;
  country: string;
  description: string;
  image: string;
  rating: number;
  price: number;
  bestTimeToVisit: string;
};

const destinations: Destination[] = [
  {
    id: '1',
    name: 'Tokyo',
    country: 'Japan',
    description: 'Experience the perfect blend of tradition and innovation in Japan\'s vibrant capital.',
    image: 'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: 4.8,
    price: 1200,
    bestTimeToVisit: 'March-May (Spring)',
  },
  {
    id: '2',
    name: 'Paris',
    country: 'France',
    description: 'Discover the magic of the City of Light with its iconic landmarks and romantic atmosphere.',
    image: 'https://images.pexels.com/photos/699466/pexels-photo-699466.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: 4.7,
    price: 950,
    bestTimeToVisit: 'June-August (Summer)',
  },
  {
    id: '3',
    name: 'Santorini',
    country: 'Greece',
    description: 'Experience the stunning sunsets and white-washed architecture of this Mediterranean paradise.',
    image: 'https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: 4.9,
    price: 1100,
    bestTimeToVisit: 'April-October',
  },
  {
    id: '4',
    name: 'Bali',
    country: 'Indonesia',
    description: 'Immerse yourself in the spiritual and natural beauty of this tropical island.',
    image: 'https://images.pexels.com/photos/1802183/pexels-photo-1802183.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: 4.6,
    price: 800,
    bestTimeToVisit: 'April-October (Dry Season)',
  },
  {
    id: '5',
    name: 'New York City',
    country: 'United States',
    description: 'Explore the city that never sleeps with its iconic skyline and diverse culture.',
    image: 'https://images.pexels.com/photos/802024/pexels-photo-802024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: 4.7,
    price: 1500,
    bestTimeToVisit: 'September-November (Fall)',
  },
  {
    id: '6',
    name: 'Dubai',
    country: 'United Arab Emirates',
    description: 'Experience luxury and modernity in this futuristic desert metropolis.',
    image: 'https://images.pexels.com/photos/618079/pexels-photo-618079.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: 4.8,
    price: 1800,
    bestTimeToVisit: 'November-March',
  },
];

const DestinationsPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Destinations - FlyHigh Travel';
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero Section */}
      <div className="bg-blue-600 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Explore Amazing Destinations
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Discover breathtaking locations around the world and start planning your next adventure.
            </p>
            <div className="flex justify-center">
              <input
                type="text"
                placeholder="Search destinations..."
                className="w-full max-w-md px-6 py-3 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Destinations Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination) => (
            <motion.div
              key={destination.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
            >
              <Card hoverable className="h-full">
                <Card.Image
                  src={destination.image}
                  alt={destination.name}
                  className="h-64"
                  overlay={
                    <div className="p-4">
                      <div className="flex items-center space-x-1">
                        <Star size={16} className="text-yellow-400 fill-yellow-400" />
                        <span className="text-white font-medium">{destination.rating}</span>
                      </div>
                    </div>
                  }
                />
                <Card.Content>
                  <div className="flex items-center justify-between mb-2">
                    <Card.Title>{destination.name}</Card.Title>
                    <span className="text-blue-600 font-semibold">${destination.price}</span>
                  </div>
                  <div className="flex items-center text-gray-500 mb-4">
                    <MapPin size={16} className="mr-1" />
                    <span>{destination.country}</span>
                  </div>
                  <p className="text-gray-600 mb-4">{destination.description}</p>
                  <div className="flex items-center text-gray-500 text-sm mb-4">
                    <Calendar size={14} className="mr-1" />
                    <span>Best Time: {destination.bestTimeToVisit}</span>
                  </div>
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors">
                    View Details
                  </button>
                </Card.Content>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Get Travel Updates
            </h2>
            <p className="text-gray-400 mb-8">
              Subscribe to our newsletter and receive exclusive deals on these destinations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-6 py-3 rounded-lg text-gray-900 flex-grow max-w-md"
              />
              <button className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-lg transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationsPage;