import React, { useState } from "react";
import "./search.css";
import { useNavigate } from "react-router-dom";

const Search = () => {
    const [keyword, setKeywrod]=useState('')
    const navigate= useNavigate()
  const searchHandler = (e) => {
    e.preventDefault();
    navigate('/products/'+ keyword)

  };
  return (
    <>
      <form className="" onSubmit={searchHandler}>
        <div className="w-100 vh-100 d-flex align-items-center justify-content-center px-5">
          <div className="d-flex w-50 position-relative">
            <input
              placeholder="Search Product..."
              className="form-control "
              type="text"
              name=""
              id=""
              value={keyword}
              onChange={(e)=>setKeywrod(e.target.value)}
            />
            <button type="submit" className="btn btn-primary search-btn">
              Search
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Search;
