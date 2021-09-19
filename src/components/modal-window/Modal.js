import { useEffect } from 'react';
import s from './modal-styles.module.css';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector(`#modal-root`);

const Modal = function ({ image, close }) {
  useEffect(() => {
    window.addEventListener('keydown', closeByEsc);
    return () => {
      window.removeEventListener('keydown', closeByEsc);
    }; // eslint-disable-next-line
  }, [image]);

  const closeByEsc = event => {
    if (event.code === 'Escape') {
      return close();
    }
  };

  const closeByBackdrop = event => {
    if (event.target.src) {
      return;
    }
    close();
  };

  return createPortal(
    <div className={s.backdrop} onClick={closeByBackdrop}>
      <img
        src={image.largeImageURL}
        alt={image.tags}
        width="600px"
        className={s.largeImage}
      />
    </div>,
    modalRoot,
  );
};

Modal.propTypes = {
  image: PropTypes.object,
  close: PropTypes.func,
};

export default Modal;
