/* eslint-disable array-callback-return */
import React, { useState, useEffect } from 'react';
import { BallTriangle } from 'react-loader-spinner';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './components/Searchbar/Searchbar.js';
import ImageGallery from './components/ImageGallery/ImageGallery.js';
import Button from './components/Button/Button.js';
import Modal from './components/Modal/Modal.js';

export default function App() {
  const [imgValue, setValue] = useState('');
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState('idle');
  const [page, setPage] = useState(0);
  const [modalImage, setModalImage] = useState('');
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (imgValue === '') {
      return;
    }

    fetchImages();
  }, [imgValue, page]);

  const fetchImages = () => {
    const KEY = '24630234-63d298eb892b3c6f0ac62f70f';
    setStatus('pending');
    fetch(
      `https://pixabay.com/api/?q=${imgValue}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`,
    )
      .then(response => {
        if (response.ok) {
          return response.json();
        }
      })
      .then(image => {
        const arrImages = [];
        image.hits.forEach(img => {
          arrImages.push({
            id: img.id,
            webformatURL: img.webformatURL,
            largeImageURL: img.largeImageURL,
          });
        });

        setImages(prevState => [...prevState, ...arrImages]);
        scrollToBottom();

        // if (page > 1) {
        //   console.log('scroll');
        //   window.scrollTo({
        //     top: 0,
        //     behavior: "smooth",
        //   });
        // }

        setStatus('resolved');
      })
      .catch(error => setStatus('rejected'));
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  const onSubmit = ({ value }) => {
    if (value === imgValue) {
      toast.error('Вы сейчас это ищете');
      return;
    }
    setPage(1);
    setValue(value);
    setImages([]);
  };

  const loadMore = () => {
    setPage(page + 1);
  };

  const toggleModal = e => {
    setOpenModal(!openModal);
  };

  const onImageClick = largeImageURL => {
    setModalImage(largeImageURL);
    setOpenModal(true);
  };

  return (
    <div>
      <Searchbar onSubmit={onSubmit} />

      <ImageGallery
        images={images}
        onImageClick={largeImageUrl => onImageClick(largeImageUrl)}
      />

      {status === 'pending' && (
        <BallTriangle color="#00BFFF" height={100} width={100} timeout={3000} />
      )}
      {status === 'resolved' && <Button loadMore={loadMore} />}
      {openModal && <Modal modalImage={modalImage} toggleModal={toggleModal} />}

      <ToastContainer
        position={'top-right'}
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}
