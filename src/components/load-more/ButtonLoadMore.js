import { useState, useEffect } from 'react';
import s from '../gallery/common-styles.module.css';
import fetchAPI from '../../services/fetchAPI';
import PropTypes from 'prop-types';

const ButtonLoadMore = function ({ name, onLoadMore }) {
  let [page, setPage] = useState(1);

  useEffect(() => {
    if (page === 1) {
      return;
    }

    fetchAPI(name, page).then(data => onLoadMore(data.hits)); // eslint-disable-next-line
  }, [page]);

  useEffect(() => {
    setPage(1);
  }, [name]);

  return (
    <button type="button" className={s.btnMore} onClick={() => setPage(++page)}>
      Load more
    </button>
  );
};

ButtonLoadMore.propTypes = {
  name: PropTypes.string,
  onLoadMore: PropTypes.func,
};

export default ButtonLoadMore;
