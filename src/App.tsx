import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import { TripsProvider } from './context/TripsContext';

// Layout Components
import Layout from './components/layout/Layout';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import TripPlannerPage from './pages/TripPlannerPage';
import DestinationsPage from './pages/DestinationsPage';
import SavedTripsPage from './pages/SavedTripsPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Router>
      <UserProvider>
        <TripsProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="planner" element={<TripPlannerPage />} />
              <Route path="destinations" element={<DestinationsPage />} />
              <Route path="saved-trips" element={<SavedTripsPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </TripsProvider>
      </UserProvider>
    </Router>
  );
}

export default App;