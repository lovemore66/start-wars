import React, { useState } from 'react';
import './Searchbar.css';

const Searchbar = ({ onSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearchChange = async (value) => {
    setSearchTerm(value);
    if (value.length >= 2) {
      setIsLoading(true); 
      try {
        const response = await fetch(
          `https://swapi.dev/api/people/?search=${value}`
        );
        const data = await response.json();
        setSuggestions(data.results);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false); 
      }
    } else {
      setSuggestions([]);
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search Star Wars characters..."
        value={searchTerm}
        onChange={(e) => handleSearchChange(e.target.value)}
      />
      {isLoading && <p>Loading...</p>} 
      {suggestions.length > 0 && !isLoading && (
        <ul className="suggestions">
          {suggestions.map((character) => (
            <li
              key={character.name}
              onClick={() => {
                setSearchTerm(character.name);
                setSuggestions([]);
                onSelect(character);
              }}
            >
              {character.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Searchbar;
