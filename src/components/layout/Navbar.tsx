import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, PlaneTakeoff, User, LogOut } from 'lucide-react';
import { useUser } from '../../context/UserContext';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, isAuthenticated, logout } = useUser();
  const location = useLocation();

  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const navbarClasses = `fixed w-full z-50 transition-all duration-300 ${
    isScrolled || !isHomePage
      ? 'bg-white shadow-md py-3'
      : 'bg-transparent py-5'
  }`;

  const textClasses = isScrolled || !isHomePage ? 'text-gray-800' : 'text-white';

  const navigationItems = [
    { name: 'Home', path: '/' },
    { name: 'Destinations', path: '/destinations' },
    { name: 'Trip Planner', path: '/planner' },
  ];

  if (isAuthenticated) {
    navigationItems.push({ name: 'My Trips', path: '/saved-trips' });
  }

  return (
    <nav className={navbarClasses}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <PlaneTakeoff size={28} className={`${textClasses}`} />
            <span className={`text-xl font-bold ${textClasses}`}>
              FlyHigh
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <ul className="flex space-x-6">
              {navigationItems.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className={`${textClasses} hover:text-blue-600 font-medium transition-colors`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <Link
                    to="/profile"
                    className="flex items-center space-x-2 hover:text-blue-600"
                  >
                    {user?.profileImage ? (
                      <img
                        src={user.profileImage}
                        alt={user.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <User size={20} className={textClasses} />
                    )}
                    <span className={`${textClasses} font-medium hidden lg:inline`}>
                      {user?.name}
                    </span>
                  </Link>
                  <button
                    onClick={logout}
                    className="hover:text-blue-600 flex items-center space-x-1"
                  >
                    <LogOut size={18} className={textClasses} />
                    <span className={`${textClasses} hidden lg:inline`}>Logout</span>
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link
                    to="/login"
                    className={`${textClasses} hover:text-blue-600 font-medium transition-colors`}
                  >
                    Log In
                  </Link>
                  <Link
                    to="/register"
                    className={`${
                      isScrolled || !isHomePage
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-blue-600'
                    } px-4 py-2 rounded-full font-medium hover:bg-opacity-90 transition-colors`}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-600"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X size={24} className={textClasses} />
            ) : (
              <Menu size={24} className={textClasses} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg absolute top-full left-0 right-0">
          <ul className="py-2 px-4 space-y-2">
            {navigationItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className="block py-2 text-gray-800 hover:text-blue-600 font-medium"
                  onClick={closeMenu}
                >
                  {item.name}
                </Link>
              </li>
            ))}
            {isAuthenticated ? (
              <>
                <li>
                  <Link
                    to="/profile"
                    className="block py-2 text-gray-800 hover:text-blue-600 font-medium"
                    onClick={closeMenu}
                  >
                    My Profile
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => {
                      logout();
                      closeMenu();
                    }}
                    className="block w-full text-left py-2 text-gray-800 hover:text-blue-600 font-medium"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/login"
                    className="block py-2 text-gray-800 hover:text-blue-600 font-medium"
                    onClick={closeMenu}
                  >
                    Log In
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    className="block py-2 bg-blue-600 text-white rounded-lg text-center font-medium"
                    onClick={closeMenu}
                  >
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;