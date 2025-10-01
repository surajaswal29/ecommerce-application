import React, { useState } from 'react';
import { MdOutlineSearch } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const [keyword, setKeyword] = useState('');

  const navigate = useNavigate();

  const searchSubmitHandler = (e) => {
    e.preventDefault();

    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else {
      navigate(`/products`);
    }
  };

  return (
    <div className='input-search'>
      <form onSubmit={searchSubmitHandler}>
        <input
          type='text'
          placeholder='Search products'
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          aria-label='Search products'
          autoComplete='off'
        />
        <button
          className='search-icon pr-center'
          type='submit'
          aria-label='Search'
          title='Search products'
        >
          <MdOutlineSearch />
        </button>
      </form>
    </div>
  );
};

export default Search;
