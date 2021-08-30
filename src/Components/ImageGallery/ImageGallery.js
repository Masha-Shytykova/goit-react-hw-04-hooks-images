import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';

const ImageGallery = ({ hits, toggleModal, handleSetLargeImageURL }) => {
  return (
    <ul className="ImageGallery">
      {hits.map(({ id, webformatURL, largeImageURL, tags }) => (
        <ImageGalleryItem
          key={id}
          url={webformatURL}
          tags={tags}
          toggleModal={toggleModal}
          largeImageURL={largeImageURL}
          handleSetLargeImageURL={handleSetLargeImageURL}
        />
      ))}
    </ul>
  );
};

export default ImageGallery;

ImageGallery.propTypes = {
  hits: PropTypes.array.isRequired,
  toggleModal: PropTypes.func.isRequired,
  handleSetLargeImageURL: PropTypes.func.isRequired,
};
