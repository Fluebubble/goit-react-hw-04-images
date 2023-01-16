import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import React from 'react';
import PropTypes from 'prop-types';

export const ImageGallery = ({ pictures, onClick }) => {
  return (
    <ul className="ImageGallery">
      <ImageGalleryItem pictures={pictures} onClick={onClick} />
    </ul>
  );
};

ImageGallery.propTypes = {
  pictures: PropTypes.arrayOf(PropTypes.object),
  onClick: PropTypes.func.isRequired,
};
