import React from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';
import { getImages } from '../api/api';
import { Button } from './Button/Button';
import Modal from './Modal/Modal';
import Loader from './Loader/Loader';
import { useState } from 'react';
import { useEffect } from 'react';

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
    setQuery(query);
    e.target.reset();
  };

  useEffect(() => {
    if (query === '') {
      return;
    }
    if (page === 1) {
      setIsLoading(true);
      getImages(query, page)
        .then(r => {
          setPictures(r);
          console.log(r.length);
          setCurrentResponseLength(r.length);
        })
        .catch(console.log)
        .finally(() => {
          setIsLoading(false);
        });
      return;
    }
    setIsLoading(true);
    getImages(query, page)
      .then(r => {
        setPictures(state => [...state, ...r]);
        console.log(r.length);
        setCurrentResponseLength(r.length);
      })
      .catch(console.log)
      .finally(() => {
        setIsLoading(false);
      });
  }, [page, query]);

  const handleChange = e => {
    setQuery(e.target.value);
  };
  const loadMore = () => {
    setPage(state => state + 1);
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
