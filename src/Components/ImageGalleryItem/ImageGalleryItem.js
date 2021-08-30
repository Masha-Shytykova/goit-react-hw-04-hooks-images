import PropTypes from 'prop-types';

const ImageGalleryItem = ({
  url,
  tags,
  toggleModal,
  handleSetLargeImageURL,
  largeImageURL,
}) => {
  const handleClick = e => {
    toggleModal();
    handleSetLargeImageURL({ largeImageURL, tags });
  };

  return (
    <li className="ImageGalleryItem">
      <img
        src={url}
        alt={tags}
        className="ImageGalleryItem-image"
        onClick={handleClick}
      />
    </li>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  url: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  toggleModal: PropTypes.func.isRequired,
  handleSetLargeImageURL: PropTypes.func.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
