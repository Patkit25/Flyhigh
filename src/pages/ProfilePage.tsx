import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, MapPin, Calendar, Edit2, Camera, Save, X } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { useUser } from '../context/UserContext';
import { useTrips } from '../context/TripsContext';

const ProfilePage: React.FC = () => {
  const { user, isAuthenticated, updateProfile } = useUser();
  const { trips } = useTrips();
  const navigate = useNavigate();
  
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [location, setLocation] = useState('');
  const [travelPreferences, setTravelPreferences] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    document.title = 'My Profile - FlyHigh Travel';
    
    if (!isAuthenticated) {
      navigate('/login');
    }
    
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setBio(user?.bio || '');
      setLocation(user?.location || '');
      setTravelPreferences(user?.preferences?.travelStyle || []);
    }
  }, [user, isAuthenticated, navigate]);
  
  const handleSaveProfile = async () => {
    setIsLoading(true);
    
    try {
      await updateProfile({
        name,
        email,
        bio,
        location,
        preferences: {
          ...user?.preferences,
          travelStyle: travelPreferences,
        },
      });
      
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const togglePreference = (preference: string) => {
    if (travelPreferences.includes(preference)) {
      setTravelPreferences(travelPreferences.filter(p => p !== preference));
    } else {
      setTravelPreferences([...travelPreferences, preference]);
    }
  };
  
  if (!user) {
    return null;
  }
  
  const availablePreferences = [
    'Adventure', 'Cultural', 'Relaxation', 'Food', 'Nature', 
    'Urban', 'Beach', 'Mountains', 'Luxury', 'Budget'
  ];
  
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="mb-8 overflow-visible">
              <div className="relative h-48 bg-gradient-to-r from-blue-500 to-teal-400 rounded-t-lg">
                <div className="absolute -bottom-16 left-8">
                  <div className="relative">
                    <img
                      src={user.profileImage || 'https://images.pexels.com/photos/1310474/pexels-photo-1310474.jpeg?auto=compress&cs=tinysrgb&w=400'}
                      alt={user.name}
                      className="w-32 h-32 rounded-full border-4 border-white object-cover"
                    />
                    {isEditing && (
                      <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors">
                        <Camera size={16} />
                      </button>
                    )}
                  </div>
                </div>
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="absolute top-4 right-4 bg-white bg-opacity-20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-opacity-30 transition-colors"
                  >
                    <Edit2 size={18} />
                  </button>
                )}
                {isEditing && (
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <button
                      onClick={() => setIsEditing(false)}
                      className="bg-white bg-opacity-20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-opacity-30 transition-colors"
                    >
                      <X size={18} />
                    </button>
                    <button
                      onClick={handleSaveProfile}
                      className="bg-white bg-opacity-20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-opacity-30 transition-colors"
                    >
                      <Save size={18} />
                    </button>
                  </div>
                )}
              </div>
              
              <Card.Content className="pt-20 pb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="md:col-span-2">
                    <div className="mb-6">
                      {isEditing ? (
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="text-2xl font-bold w-full border-b border-gray-300 pb-1 focus:outline-none focus:border-blue-500"
                        />
                      ) : (
                        <h2 className="text-2xl font-bold">{user.name}</h2>
                      )}
                      
                      <div className="flex flex-wrap items-center text-gray-600 mt-2 space-x-4">
                        <div className="flex items-center">
                          <Mail size={16} className="mr-1" />
                          {isEditing ? (
                            <input
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="border-b border-gray-300 pb-1 focus:outline-none focus:border-blue-500"
                            />
                          ) : (
                            <span>{user.email}</span>
                          )}
                        </div>
                        
                        <div className="flex items-center">
                          <MapPin size={16} className="mr-1" />
                          {isEditing ? (
                            <input
                              type="text"
                              value={location}
                              onChange={(e) => setLocation(e.target.value)}
                              placeholder="Your location"
                              className="border-b border-gray-300 pb-1 focus:outline-none focus:border-blue-500"
                            />
                          ) : (
                            <span>{user.location || 'No location set'}</span>
                          )}
                        </div>
                        
                        <div className="flex items-center">
                          <Calendar size={16} className="mr-1" />
                          <span>Member since {new Date().getFullYear()}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-2">About</h3>
                      {isEditing ? (
                        <textarea
                          value={bio}
                          onChange={(e) => setBio(e.target.value)}
                          placeholder="Tell us about yourself and your travel interests..."
                          className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
                        />
                      ) : (
                        <p className="text-gray-600">
                          {bio || 'No bio provided yet.'}
                        </p>
                      )}
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Travel Preferences</h3>
                      {isEditing ? (
                        <div className="flex flex-wrap gap-2">
                          {availablePreferences.map((preference) => (
                            <button
                              key={preference}
                              onClick={() => togglePreference(preference)}
                              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                                travelPreferences.includes(preference)
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                              }`}
                            >
                              {preference}
                            </button>
                          ))}
                        </div>
                      ) : (
                        <div className="flex flex-wrap gap-2">
                          {travelPreferences.length > 0 ? (
                            travelPreferences.map((preference) => (
                              <Badge key={preference} variant="primary" rounded>
                                {preference}
                              </Badge>
                            ))
                          ) : (
                            <p className="text-gray-500">No preferences set</p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Stats</h3>
                    <div className="bg-gray-50 rounded-lg p-4 mb-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-blue-600">{trips.length}</p>
                          <p className="text-sm text-gray-600">Trips Planned</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-blue-600">
                            {trips.reduce((count, trip) => count + trip.activities.length, 0)}
                          </p>
                          <p className="text-sm text-gray-600">Activities</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-blue-600">
                            {trips.reduce((count, trip) => {
                              const start = new Date(trip.startDate);
                              const end = new Date(trip.endDate);
                              const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
                              return count + days;
                            }, 0)}
                          </p>
                          <p className="text-sm text-gray-600">Travel Days</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-blue-600">
                            {new Set(trips.map(trip => trip.destination.country)).size}
                          </p>
                          <p className="text-sm text-gray-600">Countries</p>
                        </div>
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-semibold mb-4">Upcoming Trips</h3>
                    {trips.length > 0 ? (
                      <div className="space-y-4">
                        {trips.slice(0, 2).map((trip) => (
                          <div key={trip.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                            <h4 className="font-medium">{trip.name}</h4>
                            <p className="text-sm text-gray-600 mb-2">
                              {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
                            </p>
                            <div className="flex items-center text-sm">
                              <MapPin size={14} className="mr-1 text-gray-500" />
                              <span>{trip.destination.name}, {trip.destination.country}</span>
                            </div>
                          </div>
                        ))}
                        <Button
                          variant="outline"
                          size="sm"
                          fullWidth
                          onClick={() => navigate('/saved-trips')}
                        >
                          View All Trips
                        </Button>
                      </div>
                    ) : (
                      <div className="text-center py-6 bg-gray-50 rounded-lg">
                        <p className="text-gray-500 mb-4">No trips planned yet</p>
                        <Button
                          size="sm"
                          onClick={() => navigate('/planner')}
                        >
                          Plan a Trip
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </Card.Content>
            </Card>
          </motion.div>
          
          {isEditing && (
            <div className="flex justify-end space-x-4 mb-8">
              <Button
                variant="outline"
                onClick={() => setIsEditing(false)}
                leftIcon={<X size={18} />}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSaveProfile}
                isLoading={isLoading}
                leftIcon={<Save size={18} />}
              >
                Save Changes
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;