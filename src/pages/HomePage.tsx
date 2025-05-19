import React, { useEffect } from 'react';
import HeroSection from '../components/home/HeroSection';
import FeaturedDestinations from '../components/home/FeaturedDestinations';
import PopularExperiences from '../components/home/PopularExperiences';

const HomePage: React.FC = () => {
  useEffect(() => {
    document.title = 'FlyHigh - Travel Planning Made Easy';
  }, []);

  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturedDestinations />
      <PopularExperiences />
      
      {/* Testimonials section */}
      <section className="py-16 md:py-24 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">What Our Travelers Say</h2>
            <p className="max-w-2xl mx-auto text-blue-100">
              Discover why thousands of travelers choose FlyHigh for their travel planning needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white bg-opacity-10 backdrop-blur-sm p-8 rounded-xl">
              <div className="flex items-center space-x-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
              <p className="text-white mb-6">
                "FlyHigh made planning our honeymoon so easy. We found amazing hotels and activities that we wouldn't have discovered otherwise. Highly recommend!"
              </p>
              <div className="flex items-center">
                <img 
                  src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400" 
                  alt="Sarah Johnson" 
                  className="w-12 h-12 rounded-full object-cover mr-4" 
                />
                <div>
                  <p className="font-medium">Sarah Johnson</p>
                  <p className="text-blue-200 text-sm">Trip to Bali</p>
                </div>
              </div>
            </div>
            
            {/* Testimonial 2 */}
            <div className="bg-white bg-opacity-10 backdrop-blur-sm p-8 rounded-xl">
              <div className="flex items-center space-x-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
              <p className="text-white mb-6">
                "The itinerary builder is fantastic! I was able to organize our entire family trip to Japan with ease. Great hotel recommendations too."
              </p>
              <div className="flex items-center">
                <img 
                  src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400" 
                  alt="Michael Rodriguez" 
                  className="w-12 h-12 rounded-full object-cover mr-4" 
                />
                <div>
                  <p className="font-medium">Michael Rodriguez</p>
                  <p className="text-blue-200 text-sm">Trip to Tokyo</p>
                </div>
              </div>
            </div>
            
            {/* Testimonial 3 */}
            <div className="bg-white bg-opacity-10 backdrop-blur-sm p-8 rounded-xl">
              <div className="flex items-center space-x-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
              <p className="text-white mb-6">
                "Found the best flight deals through FlyHigh. The price comparison feature saved us hundreds on our trip to Europe. Will definitely use again!"
              </p>
              <div className="flex items-center">
                <img 
                  src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400" 
                  alt="Emily Chen" 
                  className="w-12 h-12 rounded-full object-cover mr-4" 
                />
                <div>
                  <p className="font-medium">Emily Chen</p>
                  <p className="text-blue-200 text-sm">Trip to Paris</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Start Planning Your Dream Trip Today
              </h2>
              <p className="text-gray-600 text-lg mb-8 max-w-md">
                Join thousands of satisfied travelers who have discovered the easiest way to plan unforgettable journeys.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                  Start Planning
                </button>
                <button className="px-8 py-3 border border-blue-600 text-blue-600 hover:bg-blue-50 rounded-lg font-medium transition-colors">
                  Learn More
                </button>
              </div>
            </div>
            <div className="md:w-1/2">
              <img 
                src="https://images.pexels.com/photos/4553618/pexels-photo-4553618.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Travel planning" 
                className="rounded-lg shadow-xl w-full object-cover max-h-96 object-center" 
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;