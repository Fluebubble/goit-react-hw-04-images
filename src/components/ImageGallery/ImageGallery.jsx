import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import React, { Component } from 'react';

export class ImageGallery extends Component {
  state = {
    isLoading: false
  };
  render() {
    return (
      <ul className="ImageGallery">
        <ImageGalleryItem pictures={this.props.pictures} />
      </ul>
    );
  }
}


// export const ImageGallerys = ({ pictures }) => {
//   return (
//     <ul className="ImageGallery">
//       <ImageGalleryItem pictures={pictures} />
//     </ul>
//   );
// };
