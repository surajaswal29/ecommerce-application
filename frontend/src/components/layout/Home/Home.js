import React, { useEffect } from "react";
import ProductCard from "../product/productCard";
import MainBanner from "../banner/main-banner";
import Loader from "../loader/loader";

import MetaData from "../metaData.js";
import { getProduct } from "../../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";

// CSS file
import "./home.css";

const Home = () => {
  const dispatch = useDispatch();
  const { loading, products } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Home - The Men Hood" />
          <MainBanner />
          <div className="container bg-product">
            <div className="row">
              <div className="col-md-12">
                <h2 className="product-heading">Featured Products</h2>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 product-flex-board flex-gap">
                {products &&
                  products.map((product) => (
                    <ProductCard product={product} key={product._id} />
                  ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
