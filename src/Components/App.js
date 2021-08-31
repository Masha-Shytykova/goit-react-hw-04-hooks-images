import React, { useState, useEffect } from 'react';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import { getImagesAPI } from '../utils/ServiceApi';

export default function App() {
  const [query, setQuery] = useState('');
  const [hits, setHits] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [tags, setTags] = useState('');
  const [totalHits, setTotalHits] = useState(0);

  useEffect(() => {
    if (query === '') {
      return;
    }
    setStatus('pending');
    setPage(1);
    setHits([]);
    getImages({ nextQuery: query, page: 1 });
  }, [query]);

  useEffect(() => {
    if (page === 1) {
      return;
    }
    setStatus('pending');
    getImages({ nextQuery: query, page: page });
  }, [page]); /* eslint-disable-line*/

  const getImages = ({ nextQuery, page }) => {
    getImagesAPI({ nextQuery, page })
      .then(data => {
        if (data.hits.length === 0) {
          setStatus('rejected');
        }
        setTotalHits(data.totalHits);
        setHits(prev => [...prev, ...data.hits]);
        setStatus('resolved');
      })
      .catch(error => {
        setError(error);
        setStatus('rejected');
      })
      .finally(() => {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      });
  };

  const handleLoadMore = e => {
    setPage(prevState => prevState + 1);
  };

  const handleFormSubmit = query => {
    setQuery(query);
  };

  const handleSetLargeImageURL = ({ largeImageURL, tags }) => {
    setLargeImageURL(largeImageURL);
    setTags(tags);
  };

  const toggleModal = () => {
    setShowModal(prevState => !prevState);
  };

  return (
    <div>
      <Searchbar onSubmit={handleFormSubmit} />;
      {status === 'pending' && <Loader />}
      {status === 'rejected' && error && <h1>{error.message}</h1>}
      {status === 'resolved' && (
        <>
          <ImageGallery
            hits={hits}
            toggleModal={toggleModal}
            handleSetLargeImageURL={handleSetLargeImageURL}
          />
          {hits.length >= 12 && hits.length < totalHits && (
            <Button onClick={handleLoadMore} />
          )}
          {hits.length === 0 && <h1>по запросу {query} ничего не найдено</h1>}

          {showModal && (
            <Modal onClose={toggleModal}>
              <img src={largeImageURL} alt={tags} />
            </Modal>
          )}
        </>
      )}
    </div>
  );
}
