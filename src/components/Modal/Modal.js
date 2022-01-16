import { useEffect } from 'react';
import s from './Modal.module.scss';
import PropTypes from 'prop-types';

export default function Modal({ modalImage, toggleModal }) {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      toggleModal();
    }
  };

  const onBackdropClose = e => {
    if (e.target.nodeName === 'IMG') {
      return;
    }
    toggleModal();
  };

  return (
    <div className={s.overlay} onClick={onBackdropClose}>
      <div className={s.modal}>
        <img src={modalImage} alt="#" />
      </div>
    </div>
  );
}

Modal.propTypes = {
  modalImage: PropTypes.string,
  toggleModal: PropTypes.func,
};
