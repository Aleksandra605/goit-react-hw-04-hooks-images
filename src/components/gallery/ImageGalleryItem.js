import s from './common-styles.module.css';

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
        // longdesc={this.props.large}
      />
    </li>
  );
};

export default ImageGalleryItem;
