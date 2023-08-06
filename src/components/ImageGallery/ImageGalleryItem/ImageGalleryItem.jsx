import PropTypes from 'prop-types';
import { GalleryItem, ImageGalleryItemImage } from './ImageGalleryItem.styled';
import { useState } from 'react';
import { Modal } from '../../Modal';

export const ImageGalleryItem = ({ tag, webformatURL, largeImageURL }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(prevState => !prevState);
  };

  return (
    <>
      <GalleryItem onClick={toggleModal}>
        <ImageGalleryItemImage src={webformatURL} alt={tag} />
      </GalleryItem>
      {showModal && (
        <Modal
          largeImageURL={largeImageURL}
          tag={tag}
          toggleModal={toggleModal}
        />
      )}
    </>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string,
  largeImageURL: PropTypes.string,
  tag: PropTypes.string,
};
