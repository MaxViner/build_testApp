import React from 'react';
import { connect } from 'react-redux';
import { setImagesToFetch } from '../Store/Action';

const ImageCountSelector = ({ setImagesToFetch }) => {
  const handleCountChange = (e) => {
    setImagesToFetch(Number(e.target.value));
  };

  return (
    <div>
      <label htmlFor="image-count">Select images to fetch</label>
      <select name="image-count" onChange={handleCountChange}>
        <option value="25">25</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
    </div>
  );
};

const mapDispatchToProps = {
  setImagesToFetch,
};

export default connect(null, mapDispatchToProps)(ImageCountSelector)