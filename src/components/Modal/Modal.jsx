import React from 'react';
import { useEffect } from 'react';

const Modal = ({ toggleModal, image }) => {
  const closeModal = e => {
    if (e.key === 'Escape') {
      console.log(e.key, '- Pressed');
      closeModal();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', closeModal);
    return () => {
      window.removeEventListener('keydown', closeModal);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { link, alt } = image;

  return (
    <div
      className="Overlay"
      onClick={e => {
        if (e.target.className === 'Overlay') {
          toggleModal();
        }
      }}
    >
      <div className="Modal">
        <img src={link} alt={alt} />
      </div>
    </div>
  );
};

export default Modal;
