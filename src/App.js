import React, { useState } from 'react';
import Searchbar from './components/searchbar/Searchbar.js';
import Characterinfo from './components/character/Characterinfo.js'
import './App.css';

function App() {
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  return (
    <div className="app">
      <Searchbar onSelect={setSelectedCharacter} />
      {selectedCharacter && <Characterinfo character={selectedCharacter} />}
    </div>
  );
}

export default App;
