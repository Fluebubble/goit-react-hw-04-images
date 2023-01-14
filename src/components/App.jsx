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
    setQuery(query);
    e.target.reset();
  };
  useEffect(() => {
    console.log('useEffect with [query]');
    if (query === '') {
      console.log('first useEffect with [query], returning');

      return;
    }
    getImages(query, page)
      .then(response => {
        console.log(response);
        setPictures(response);
        setCurrentResponseLength(response.length);
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
    console.log('query is =', query);
  }, [query]);

  useEffect(() => {
    console.log('useEffect with [page]');
    if (page === 1) {
      console.log('page is === 1, return');
      return;
    }

    console.log('page is !== 1, getImages(query, page)');
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
  }, [page]);

  const handleChange = e => {
    setQuery(e.target.value);
  };
  const loadMore = () => {
    console.log('loading more, page += 1');
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
