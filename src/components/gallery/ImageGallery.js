import s from './common-styles.module.css';
import { useState, useEffect } from 'react';
import ImageGalleryItem from './ImageGalleryItem';
import Loader from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import fetchAPI from '../../services/fetchAPI';
import ButtonLoadMore from '../load-more/ButtonLoadMore';
import Modal from '../modal-window/Modal';

let selectedIndex = null;

const ImageGallery = function ({ name }) {
  const [pictures, setPictures] = useState(null);
  const [status, setStatus] = useState('idle');
  const [currentImage, setCurrentImage] = useState(null);

  useEffect(() => {
    if (name === '' || null || undefined) {
      return;
    }

    setStatus('pending');

    fetchAPI(name, 1)
      .then(({ hits }) => {
        if (hits.length > 0) {
          setPictures(hits);
          setStatus('resolved');
        } else throw new Error(`По запросу ${name} ничего не найдено`);
      })
      .catch(error => {
        setStatus('rejected');
        toast.error('No results were found for your search!');
      });
  }, [name]);

  const getMorePictures = data => {
    setPictures(pictures => [...pictures, ...data]);

    return window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  const openModal = event => {
    const currentPic = pictures.find(pic => pic.id === +event.target.id);
    setCurrentImage(currentPic);
  };

  const closeModal = event => {
    setCurrentImage(null);
  };

  useEffect(() => {
    if (currentImage) {
      window.addEventListener('keydown', turnOnKeys);
    }

    return () => {
      window.removeEventListener('keydown', turnOnKeys);
    }; // eslint-disable-next-line
  }, [currentImage]);

  const turnOnKeys = event => {
    if (event.keyCode === 39) {
      selectedIndex =
        selectedIndex === pictures.length - 1 ? 0 : selectedIndex + 1;
      return setCurrentImage(pictures[selectedIndex]);
    }

    if (event.keyCode === 37) {
      selectedIndex =
        selectedIndex === 0 ? pictures.length - 1 : selectedIndex - 1;
      return setCurrentImage(pictures[selectedIndex]);
    }
  };

  return (
    <div>
      {currentImage && <Modal close={closeModal} image={currentImage} />}
      {pictures === null && <p className={s.div}>Enter somethimg</p>}
      {status === 'pending' && (
        <div className={s.divLoader}>
          <Loader
            type="MutatingDots"
            color="#0b6470"
            secondaryColor="rgb(72, 163, 185)"
            height={100}
            width={100}
          />
        </div>
      )}
      {status === 'rejected' && <ToastContainer position="top-center" />}
      {status === 'resolved' && (
        <div className={s.contentBox}>
          <ul className={s.list}>
            {pictures.map(picture => (
              <ImageGalleryItem
                src={picture.webformatURL}
                alt={picture.tags}
                key={picture.id}
                click={openModal}
                id={picture.id}
              />
            ))}
          </ul>
          <ButtonLoadMore name={name} onLoadMore={getMorePictures} />
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
