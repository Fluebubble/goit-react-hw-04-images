import React from 'react';
import { useEffect } from 'react';
import PropTypes from 'prop-types';

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

Modal.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  image: PropTypes.object.isRequired,
};

export default Modal;
