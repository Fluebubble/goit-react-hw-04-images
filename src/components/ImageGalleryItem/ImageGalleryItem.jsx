import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ pictures, onClick }) => {
  return pictures.map((picture, idx) => (
    <li key={picture.id} className="ImageGalleryItem">
      <img
        className="ImageGalleryItem-image"
        src={picture.webformatURL}
        alt={picture.tags}
        id={idx}
        onClick={e => onClick(e)}
      />
    </li>
  ));
};

ImageGalleryItem.propTypes = {
  pictures: PropTypes.arrayOf(PropTypes.object),
  onClick: PropTypes.func.isRequired,
};
