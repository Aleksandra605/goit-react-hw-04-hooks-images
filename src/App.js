import './App.css';
import { useState } from 'react';
import Searchbar from './components/search-bar/SearchBar';
import ImageGallery from './components/gallery/ImageGallery';

function App() {
  const [name, setName] = useState('');

  const handleFormSubmit = someName => {
    setName(someName);
  };

  return (
    <div>
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery name={name} />
    </div>
  );
}

export default App;
