import { useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import s from './searchBar-styles.module.css';
import PropTypes from 'prop-types';

const SearchBar = function ({ onSubmit }) {
  const [value, setValue] = useState('');

  const handleChange = event => {
    const { value } = event.target;
    setValue(value);
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (value.trim() === '') {
      alert('Enter a word');
      return;
    }
    onSubmit(value.trim());
    setValue('');
  };

  return (
    <header className={s.header}>
      <form onSubmit={handleSubmit} className={s.form}>
        <button type="submit" className={s.btn}>
          <span>
            <BiSearch />
          </span>
        </button>

        <input
          name="name"
          className={s.search}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
          value={value}
        />
      </form>
    </header>
  );
};

SearchBar.propTypes = {
  onSubmit: PropTypes.func,
};

export default SearchBar;
