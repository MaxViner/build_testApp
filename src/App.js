import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchImages, toggleLike, removeCard, showLiked } from './Store/Action';
import CardList from './components/CardList';

import './App.css';

function App() {
  const images = useSelector((state) => state.images);
  const showOnlyLiked = useSelector((state) => state.showOnlyLiked);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchImages());
  }, [dispatch]);

  const toggleLikeHandler = (id) => {
    dispatch(toggleLike(id));
  };

  const removeCardHandler = (id) => {
    dispatch(removeCard(id));
  };

  const showLikedHandler = () => {
    dispatch(showLiked());
  };

  const filteredImages = showOnlyLiked ? images.filter((img) => img.liked) : images;

  return (
    <div className="App">
     
      <CardList images={filteredImages} onToggleLike={toggleLikeHandler} onRemoveCard={removeCardHandler} />
    </div>);
}

export default App;