import React from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';
import { getImages } from '../api/api';
import { Button } from './Button/Button';
import Modal from './Modal/Modal';
import Loader from './Loader/Loader';
import { useState } from 'react';

const App = () => {
  const [query, setQuery] = useState('');
  const [pictures, setPictures] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [currentResponseLength, setCurrentResponseLength] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState(null);

  const handleSubmit = async (e, query) => {
    e.preventDefault();
    setPage(1);
    getImages(query, page)
      .then(response => {
        console.log(response);
        setPictures(response);
        setCurrentResponseLength(response.length);
        setPage(state => state + 1);
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
        e.target.reset();
      });
  };

  const handleChange = e => {
    setQuery(e.target.value);
  };
  const loadMore = () => {
    getImages(query, page)
      .then(response => {
        setPictures(state => [...state, ...response]);
        setCurrentResponseLength(response.length);
        setPage(state => state + 1);
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const toggleModal = () => {
    setShowModal(state => !state);
  };

  const getImageProps = e => {
    e.preventDefault();
    setModalImage({
      link: pictures[e.currentTarget.id].largeImageURL,
      alt: pictures[e.currentTarget.id].tags,
    });
    toggleModal();
  };

  return (
    <>
      {showModal && <Modal image={modalImage} toggleModal={toggleModal} />}
      <Searchbar
        onSubmit={handleSubmit}
        query={query}
        onChange={handleChange}
      />
      <ImageGallery pictures={pictures} onClick={getImageProps} />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '15px',
        }}
      >
        {isLoading ? (
          <Loader />
        ) : (
          currentResponseLength === 12 && <Button loadMore={loadMore} />
        )}
      </div>
    </>
  );
};

export default App;
