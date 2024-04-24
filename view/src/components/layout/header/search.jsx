import React, { useState } from "react";
import { MdOutlineSearch } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [keyword, setKeyword] = useState("");

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
    <div className="input-search">
      <form onSubmit={searchSubmitHandler}>
        <input
          type="text"
          placeholder="Search products"
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button className="search-icon pr-center" type="submit">
          <MdOutlineSearch />
        </button>
      </form>
    </div>
  );
};

export default Search;
