import React from 'react';
import { Clock, MapPin, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import Card from '../ui/Card';
import Badge from '../ui/Badge';

type Experience = {
  id: string;
  title: string;
  location: string;
  duration: string;
  image: string;
  price: number;
  category: string;
};

const experiences: Experience[] = [
  {
    id: '1',
    title: 'Traditional Tea Ceremony',
    location: 'Kyoto, Japan',
    duration: '2 hours',
    image: 'https://images.pexels.com/photos/1417945/pexels-photo-1417945.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    price: 60,
    category: 'Cultural',
  },
  {
    id: '2',
    title: 'Sunset Catamaran Cruise',
    location: 'Santorini, Greece',
    duration: '4 hours',
    image: 'https://images.pexels.com/photos/163236/luxury-yacht-boat-speed-water-163236.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    price: 120,
    category: 'Adventure',
  },
  {
    id: '3',
    title: 'Tuscan Cooking Class',
    location: 'Florence, Italy',
    duration: '3 hours',
    image: 'https://images.pexels.com/photos/5865196/pexels-photo-5865196.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    price: 85,
    category: 'Food & Drink',
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

const PopularExperiences: React.FC = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Unforgettable Experiences</h2>
            <p className="text-gray-600 max-w-2xl">
              Immerse yourself in local culture with authentic experiences that will create memories to last a lifetime.
            </p>
          </div>
          <button className="mt-4 md:mt-0 text-blue-600 font-medium hover:underline flex items-center">
            View all experiences
            <ExternalLink size={16} className="ml-1" />
          </button>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {experiences.map((experience) => (
            <motion.div key={experience.id} variants={item}>
              <Card hoverable className="h-full flex flex-col">
                <Card.Image 
                  src={experience.image} 
                  alt={experience.title} 
                  className="h-56"
                />
                <Card.Content className="flex flex-col flex-grow">
                  <div className="mb-3">
                    <Badge variant="primary" rounded size="sm" className="mb-2">
                      {experience.category}
                    </Badge>
                    <Card.Title>{experience.title}</Card.Title>
                  </div>
                  <div className="flex items-center space-x-4 text-gray-500 text-sm mb-4">
                    <div className="flex items-center">
                      <MapPin size={14} className="mr-1" />
                      <span>{experience.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock size={14} className="mr-1" />
                      <span>{experience.duration}</span>
                    </div>
                  </div>
                  <div className="mt-auto flex justify-between items-center">
                    <span className="text-gray-900 font-bold">${experience.price} <span className="text-gray-500 text-sm font-normal">per person</span></span>
                    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm transition-colors">
                      Book Now
                    </button>
                  </div>
                </Card.Content>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PopularExperiences;