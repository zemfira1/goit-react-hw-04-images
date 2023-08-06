import { useEffect } from 'react';
import { Overlay, ModalEl, Image } from './Modal.styled';

export const Modal = ({ largeImageURL, tag, toggleModal }) => {
  useEffect(() => {
    const keyDown = event => {
      if (event.code === 'Escape') {
        toggleModal();
      }
    };

    window.addEventListener('keydown', keyDown);

    return () => {
      window.removeEventListener('keydown', keyDown);
    };
  }, [toggleModal]);

  const backdropClick = event => {
    if (event.currentTarget === event.target) {
      toggleModal();
    }
  };

  return (
    <Overlay onClick={backdropClick}>
      <ModalEl>
        <Image src={largeImageURL} alt={tag} />
      </ModalEl>
    </Overlay>
  );
};
