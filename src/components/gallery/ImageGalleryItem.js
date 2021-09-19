import s from './common-styles.module.css';
import PropTypes from 'prop-types';

const ImageGalleryItem = function ({ src, alt, id, click }) {
  return (
    <li className={s.item}>
      <img
        src={src}
        alt={alt}
        className={s.img}
        height="196px"
        width="270px"
        onClick={click}
        id={id}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  id: PropTypes.number,
  click: PropTypes.func,
};

export default ImageGalleryItem;
