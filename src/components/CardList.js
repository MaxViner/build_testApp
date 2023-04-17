import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from './Card';
import {
  fetchImages,
  toggleLike,
  removeCard,
  setCurrentPage,
  setImagesPerPage,
  setImagesToFetch,
} from '../Store/Action';
import './CardList.css';
import ImagePage from './imagePage/imagePage';
import ImagesPerPageSelector from './ImagesPerPageSelector';
import ShowLikedButton from './ShowLikedButton';
import ImageCountSelector from './ImageCountSelector';

const CardList = () => {
  const dispatch = useDispatch();
  const images = useSelector((state) => state.images);
  const imagesPerPage = useSelector((state) => state.imagesPerPage);
  const isShowLiked = useSelector((state) => state.showLiked);
  const showLiked = useSelector((state) => state.showLiked);
  const currentPage = useSelector((state) => state.currentPage);
  const imagesToFetch = useSelector((state) => state.imagesToFetch); // Add this line
  const [count, setCount] = useState(imagesPerPage);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(fetchImages());
  }, [dispatch]);

  const handleLike = (event) => {
    const id = event.currentTarget.dataset.id;
    dispatch(toggleLike(id));
  };

  const handleRemove = (event) => {
    const id = event.currentTarget.dataset.id;
    dispatch(removeCard(id));
  };

  const handleShowLikedImages = () => {
    dispatch(showLiked());
  };

  const handlePageChange = (event) => {
    const page = Number(event.target.dataset.page);
    dispatch(setCurrentPage(page));
  };

  const handleCountChange = (event) => {
    const count = Number(event.target.value);
    setCount(count);
    dispatch(setImagesPerPage(count));
  };

  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const currentImages = images.slice(indexOfFirstImage, indexOfLastImage);

  const handleImageClick = (event) => {
    const id = event.currentTarget.dataset.id;
    const image = images.find((img) => img.id === id);
    setSelectedImage(image);
    setShowModal(true);
  };

  const handleCloseImagePage = () => {
    setSelectedImage(null);
    setShowModal(false);
  };

  const currentImagesToShow = isShowLiked
    ? currentImages.filter((img) => img.liked)
    : currentImages;


   const renderImages = currentImagesToShow.map((img) => (
    <Card 
      key={img.id} 
      img={img} 
      handleLike={handleLike} 
      handleRemove={handleRemove} 
      handleImageClick={handleImageClick} 
    /> 
  )); 


    const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(imagesToFetch / imagesPerPage); i++) { // Modify this line
    pageNumbers.push(i);
  }

   const renderPageNumbers = pageNumbers.map((number) => (
    <li key={number} className={currentPage === number ? 'page-item active' : 'page-item'}>
      <button className="page-link" onClick={handlePageChange} data-page={number}>
        {number}
      </button>
    </li>
  ));
   return (
    <div>
      {showModal && (
        <div>
          <div className="modal">
            <div className="imgContainer">
              <ImagePage image={selectedImage} imageId={selectedImage.id} />
            </div>
            <button onClick={handleCloseImagePage}>Закрыть</button>
            <button className={`btn btn-primary ${selectedImage.liked ? 'liked' : ''}`} onClick={handleLike} data-id={selectedImage.id}>
              {selectedImage.liked ? 'Не нравится' : 'Нравится'}
            </button>
            <button className="btn btn-danger" onClick={() => handleRemove({ currentTarget: { dataset: { id: selectedImage.id } } })}>
              Удалить
            </button>
          </div>
          <div className="overlay" onClick={handleCloseImagePage}></div>
        </div>
      )}
      <div className="select-wrapper">
       
        <ImagesPerPageSelector handleCountChange={handleCountChange} count={count} />
      </div>
      <div className="btn-group mb-3" role="group" aria-label="Basic example">
        <ShowLikedButton />
      </div>
      <ImageCountSelector />
      <div className="cardcontainer">{renderImages}</div>
      <nav aria-label="Page navigation example">
        <ul className="pagination">{renderPageNumbers}</ul>
      </nav>
    </div>
  );
};
 export default CardList;