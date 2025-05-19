import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Star } from 'lucide-react';
import Card from '../ui/Card';

type Destination = {
  id: string;
  name: string;
  location: string;
  image: string;
  rating: number;
  price: number;
};

const destinations: Destination[] = [
  {
    id: '1',
    name: 'Tokyo Cityscape',
    location: 'Tokyo, Japan',
    image: 'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: 4.8,
    price: 1200,
  },
  {
    id: '2',
    name: 'Eiffel Tower',
    location: 'Paris, France',
    image: 'https://images.pexels.com/photos/699466/pexels-photo-699466.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: 4.7,
    price: 950,
  },
  {
    id: '3',
    name: 'Santorini Sunset',
    location: 'Santorini, Greece',
    image: 'https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: 4.9,
    price: 1100,
  },
  {
    id: '4',
    name: 'Bali Paradise',
    location: 'Bali, Indonesia',
    image: 'https://images.pexels.com/photos/1802183/pexels-photo-1802183.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: 4.6,
    price: 800,
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.6 } },
};

const FeaturedDestinations: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Destinations</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our handpicked destinations that travelers love. From bustling cities to serene beaches, 
            discover your next unforgettable journey.
          </p>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {destinations.map((destination) => (
            <motion.div key={destination.id} variants={item}>
              <Card hoverable className="h-full">
                <Card.Image 
                  src={destination.image} 
                  alt={destination.name} 
                  className="h-64"
                  overlay={
                    <div className="p-4 w-full">
                      <div className="flex items-center space-x-1 mb-1">
                        <Star size={16} className="text-yellow-400 fill-yellow-400" />
                        <span className="text-white text-sm font-medium">{destination.rating}</span>
                      </div>
                    </div>
                  }
                />
                <Card.Content className="pt-4">
                  <Card.Title>{destination.name}</Card.Title>
                  <div className="flex items-center space-x-1 text-gray-500 mb-3">
                    <MapPin size={16} />
                    <span className="text-sm">{destination.location}</span>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <div>
                      <span className="text-gray-500 text-sm">Starting from</span>
                      <p className="text-blue-600 font-semibold">${destination.price}</p>
                    </div>
                    <button className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm transition-colors">
                      View Details
                    </button>
                  </div>
                </Card.Content>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center mt-12">
          <button className="px-6 py-3 rounded-full border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors font-medium">
            View All Destinations
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedDestinations;