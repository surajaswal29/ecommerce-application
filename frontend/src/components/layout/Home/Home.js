import React, { useEffect } from "react";
import ProductCard from "../product/productCard";
import MainBanner from "../banner/main-banner";
import Loader from "../loader/loader";

// importing swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import "swiper/swiper.min.css";

import MetaData from "../metaData.js";
import { getProduct } from "../../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";

// CSS file
import "./home.css";
import { Link } from "react-router-dom";
import Blog from "../Home/blog";

const Home = () => {
  const categoryData = [
    {
      category: "Topwear",
      imgURL: "https://m.media-amazon.com/images/I/71eUwDk8z+L._UX569_.jpg",
    },
    {
      category: "Bottomwear",
      imgURL:
        "https://m.media-amazon.com/images/W/WEBP_402378-T1/images/I/618OKUXLDjL._UX569_.jpg",
    },
    {
      category: "Innerwear",
      imgURL:
        "https://m.media-amazon.com/images/I/81JSseEC3EL._SX522._SX._UX._SY._UY_.jpg",
    },
    {
      category: "Footwear",
      imgURL:
        "https://m.media-amazon.com/images/W/WEBP_402378-T1/images/I/716CXSbC5OL._UY625_.jpg",
    },
    {
      category: "Festive Wear",
      imgURL: "https://m.media-amazon.com/images/I/61v8ufBnqUL._UY741_.jpg",
    },
    {
      category: "Sports Wear",
      imgURL: "https://m.media-amazon.com/images/I/51eeOi8wSdL._SL1500_.jpg",
    },
    {
      category: "Watches",
      imgURL: "https://m.media-amazon.com/images/I/71YcPlrli5L._UX466_.jpg",
    },
    {
      category: "Accessories",
      imgURL: "https://m.media-amazon.com/images/I/81yGygOvboL._SX679_.jpg",
    },
    {
      category: "Gadgets",
      imgURL: "https://m.media-amazon.com/images/I/51xxA+6E+xL._SL1500_.jpg",
    },
    {
      category: "Backpacks",
      imgURL: "https://m.media-amazon.com/images/I/81+f2fDV9zL._SL1500_.jpg",
    },
    {
      category: "Sunglasses & Frames",
      imgURL: "https://m.media-amazon.com/images/I/515b-YOVx8L._UX679_.jpg",
    },
  ];

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
                <h2 className="product-heading text-center">
                  Featured Products
                </h2>
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
          <div className="container-fluid">
            <div className="row mt-4">
              <div className="col-md-12">
                <h2 className="product-heading">Categories</h2>
              </div>
            </div>
            <div className="row mt-1">
              <div className="col-md-12">
                <div className="category-box-overflow">
                  <Swiper slidesPerView={"auto"}>
                    {categoryData.map((data) => {
                      const boxCat = (
                        <SwiperSlide key={`${data.category}${data.imgURL}`}>
                          <Link to={`/products/category/${data.category}`}>
                            <div className="category-box-home">
                              <div className="category-round-box">
                                <img
                                  src={data.imgURL}
                                  alt="category round box"
                                />
                              </div>
                              <span>{data.category}</span>
                            </div>
                          </Link>
                        </SwiperSlide>
                      );
                      return boxCat;
                    })}
                  </Swiper>
                </div>
              </div>
            </div>
            <div className="row mt-5">
              <div className="col-md-12">
                <h2 className="product-heading">Blogs</h2>
              </div>
            </div>
            <div className="row mt-1">
              <div className="col-md-12 d-flex justify-content-between menhood-blogs">
                <Blog img="https://www.apetogentleman.com/wp-content/uploads/2022/01/mens-smart-casual-dress-code-guide-2-720x420.jpg" />
                <Blog img="https://www.apetogentleman.com/wp-content/uploads/2022/12/CoolestDadShoeMain1-450x340.jpg" />
                <Blog img="https://www.apetogentleman.com/wp-content/uploads/2018/10/Winter-Coats-450x340.png" />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
