import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import React from 'react';

export const ImageGallery = ({pictures, onClick}) => {
  return (
    <ul className="ImageGallery">
      <ImageGalleryItem
        pictures={pictures}
        onClick={onClick}
      />
    </ul>
  );
};