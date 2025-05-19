import React from 'react';
import { Link } from 'react-router-dom';
import { PlaneTakeoff, Instagram, Twitter, Facebook, Youtube, MapPin, Mail, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-6">
              <PlaneTakeoff size={28} className="text-white" />
              <span className="text-xl font-bold">FlyHigh</span>
            </Link>
            <p className="text-gray-400 mb-6">
              Your ultimate companion for planning perfect travel experiences. Discover destinations, 
              create itineraries, and book your dream trips all in one place.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/destinations" className="text-gray-400 hover:text-white transition-colors">Destinations</Link>
              </li>
              <li>
                <Link to="/planner" className="text-gray-400 hover:text-white transition-colors">Trip Planner</Link>
              </li>
              <li>
                <Link to="/saved-trips" className="text-gray-400 hover:text-white transition-colors">My Trips</Link>
              </li>
              <li>
                <Link to="/profile" className="text-gray-400 hover:text-white transition-colors">My Profile</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Popular Destinations</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Tokyo, Japan</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Bali, Indonesia</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Paris, France</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Santorini, Greece</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">New York, USA</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin size={20} className="text-gray-400 mt-1 flex-shrink-0" />
                <span className="text-gray-400">123 Travel Street, City, Country</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={20} className="text-gray-400 flex-shrink-0" />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={20} className="text-gray-400 flex-shrink-0" />
                <span className="text-gray-400">contact@flyhigh.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} FlyHigh Travel. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-500 hover:text-white text-sm">Privacy Policy</a>
              <a href="#" className="text-gray-500 hover:text-white text-sm">Terms of Service</a>
              <a href="#" className="text-gray-500 hover:text-white text-sm">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;