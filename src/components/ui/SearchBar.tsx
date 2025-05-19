import React, { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';

type SearchBarProps = {
  placeholder?: string;
  onSearch?: (query: string) => void;
  suggestions?: string[];
  className?: string;
  darkMode?: boolean;
};

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Search destinations...',
  onSearch,
  suggestions = [],
  className = '',
  darkMode = false,
}) => {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.length > 0) {
      const filtered = suggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [query, suggestions]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = () => {
    if (onSearch && query.trim()) {
      onSearch(query);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    if (onSearch) {
      onSearch(suggestion);
    }
    setShowSuggestions(false);
  };

  const clearSearch = () => {
    setQuery('');
    setShowSuggestions(false);
  };

  const textColor = darkMode ? 'text-white' : 'text-gray-800';
  const bgColor = darkMode ? 'bg-gray-800' : 'bg-white';
  const borderColor = darkMode ? 'border-gray-700' : 'border-gray-300';
  const placeholderColor = darkMode ? 'placeholder-gray-400' : 'placeholder-gray-500';

  return (
    <div 
      ref={searchRef} 
      className={`relative w-full max-w-xl ${className}`}
    >
      <div className={`flex items-center border ${borderColor} rounded-full overflow-hidden shadow-sm ${bgColor}`}>
        <Search 
          size={20} 
          className={`ml-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} 
        />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={`w-full py-3 px-3 outline-none ${bgColor} ${textColor} ${placeholderColor}`}
        />
        {query && (
          <button 
            onClick={clearSearch} 
            className={`mr-2 p-1 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
          >
            <X size={16} className={darkMode ? 'text-gray-400' : 'text-gray-500'} />
          </button>
        )}
        <button
          onClick={handleSearch}
          className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 transition-colors"
        >
          Search
        </button>
      </div>

      {showSuggestions && filteredSuggestions.length > 0 && (
        <div className={`absolute z-10 mt-1 w-full rounded-md shadow-lg ${bgColor} border ${borderColor}`}>
          <ul className="py-1 max-h-60 overflow-auto">
            {filteredSuggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className={`px-4 py-2 cursor-pointer ${textColor} ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;