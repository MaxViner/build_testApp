import React from 'react';
 const ImagesPerPageSelector = ({ handleCountChange, count }) => {
  return (
    <div className="select-wrapper">
      <label htmlFor="countSelect">Number of images per page:</label>
      <select id="countSelect" onChange={handleCountChange} value={count}>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="15">15</option>
        <option value="20">20</option>
        <option value="25">25</option>
      </select>
    </div>
  );
};
 export default ImagesPerPageSelector;