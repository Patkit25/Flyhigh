import React, { createContext, useState, useContext, ReactNode } from 'react';

type User = {
  id: string;
  name: string;
  email: string;
  profileImage?: string;
  preferences?: {
    travelStyle?: string[];
    budget?: string;
    favoriteDestinations?: string[];
  };
} | null;

type UserContextType = {
  user: User;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<boolean>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(null);
  
  // In a real app, this would interact with an API
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Mock successful login
      setUser({
        id: '1',
        name: 'Sample User',
        email,
        profileImage: 'https://images.pexels.com/photos/1310474/pexels-photo-1310474.jpeg?auto=compress&cs=tinysrgb&w=400',
        preferences: {
          travelStyle: ['Adventure', 'Cultural'],
          budget: 'Medium',
          favoriteDestinations: ['Japan', 'Italy', 'New Zealand'],
        },
      });
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      // Mock successful registration
      setUser({
        id: '1',
        name,
        email,
      });
      return true;
    } catch (error) {
      console.error('Registration failed:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = async (data: Partial<User>): Promise<boolean> => {
    try {
      if (user) {
        setUser({ ...user, ...data });
      }
      return true;
    } catch (error) {
      return false;
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};