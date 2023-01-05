import React, { useEffect, useState } from "react";
import ProductCard from "../product/productCard";
import Loader from "../loader/loader";
import NotExist from "./notExist";
import Pagination from "react-js-pagination";
import Category from "../header/category";

import MetaData from "../metaData.js";
import { getProduct } from "../../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";

import "./product.css";
import { useParams } from "react-router";
import { MdKeyboardArrowLeft } from "react-icons/md";
import Slider from "@mui/material/Slider";
import { CiFilter } from "react-icons/ci";

const AllProduct = () => {
  // query parameters
  const { keyword } = useParams();
  const { category } = useParams();

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 50000]);

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (_event, newPrice) => {
    setPrice(newPrice);
  };

  const dispatch = useDispatch();
  const {
    loading,
    products,
    productCount,
    resultPerPage,
    filteredProductCount,
  } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(
      getProduct(keyword, category, currentPage, price, filteredProductCount)
    );
  }, [dispatch, keyword, currentPage, category, price]);

  const termToPut = category
    ? `Category: ${category}`
    : `Search Term: ${keyword}`;

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData
            title={`${keyword || category ? termToPut : "All Products"}`}
          />
          <div className="container-fluid">
            <div className="row mt-3 px-2 bd-bottom">
              <div className="col-md-12">
                <a
                  href="http://localhost:3000/"
                  className="text-decoration-none text-dark d-flex align-items-center"
                >
                  <MdKeyboardArrowLeft />
                  Back
                </a>
              </div>
              <div className="col-md-12 mt-2 all-product-heading pr-center-even">
                <h1>{keyword || category ? termToPut : "All Products"}</h1>
              </div>
            </div>
            <div className="row">
              <div className="col-md-2 bd-right side-bar">
                <h4 className="side-heading">
                  <CiFilter />
                  Filters
                </h4>
                <div className="price-filter">
                  <span>Price</span>
                  <div className="slider-component">
                    <Slider
                      aria-labelledby="range-slider"
                      value={price}
                      onChangeCommitted={priceHandler}
                      valueLabelDisplay="auto"
                      min={0}
                      max={50000}
                      step={1000}
                    />
                  </div>
                </div>
                <div className="nav-sidebar mt-2">
                  <span>Category</span>
                  <Category />
                </div>
              </div>
              <div className="col-md-10 d-flex flex-wrap flex-gap">
                {products && products.length > 0 ? (
                  products.map((product) => (
                    <ProductCard product={product} key={product._id} />
                  ))
                ) : (
                  <NotExist />
                )}
              </div>
              <div className="col-md-12 mt-5 pr-center">
                {products &&
                products.length > 0 &&
                productCount > resultPerPage &&
                (keyword || category
                  ? products.length >= resultPerPage
                  : resultPerPage) ? (
                  <Pagination
                    activePage={currentPage}
                    itemsCountPerPage={resultPerPage}
                    totalItemsCount={productCount}
                    onChange={setCurrentPageNo}
                    nextPageText="Next"
                    prevPageText="Prev"
                    firstPageText="First"
                    lastPageText="Last"
                    itemClass="page-item"
                    linkClass="page-link"
                    activeClass="active"
                    activeLinkClass="active"
                  />
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AllProduct;
