export const ImageGalleryItem = ({ pictures }) => {
  return pictures.map(picture => (
    <li key={picture.id} className="ImageGalleryItem">
      <a href={picture.largeImageURL}>
        <img src={picture.largeImageURL} alt={picture.comments} />
      </a>
    </li>
  ));
};
