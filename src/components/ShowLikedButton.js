import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showLiked } from '../Store/Action';

const ShowLikedButton = () => {
  const dispatch = useDispatch();
  const isShowLiked = useSelector((state) => state.showLiked);

  const handleShowLikedImages = () => {
    dispatch(showLiked());
  };

  return (
    <button type="button" className="btn btn-primary" onClick={handleShowLikedImages}>
      {isShowLiked ? 'Show All' : 'Show Liked'}
    </button>
  );
};

export default ShowLikedButton