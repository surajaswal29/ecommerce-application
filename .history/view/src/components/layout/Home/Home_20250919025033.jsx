import React, { useEffect } from 'react';
import MainBanner from '../banner/main-banner';
import Loader from '../loader/loader';
import ProductCard from '../product/productCard';

// importing swiper
import { Swiper, SwiperSlide } from 'swiper/react';
// import { Autoplay } from "swiper";
import 'swiper/swiper.min.css';

import { useData } from '../../../hooks/use-data';
import MetaData from '../metaData.jsx';

// CSS file
import { Link } from 'react-router-dom';
import Blog from '../Home/blog';
import './home.css';

// Import images
import accessoriesImg from '../../../assets/category/accessories.jpg';
import backpacksImg from '../../../assets/category/backpacks.jpg';
import bottomwearImg from '../../../assets/category/bottomwear.jpg';
import festiveWearImg from '../../../assets/category/festive_wear.jpg';
import footwearImg from '../../../assets/category/footwear.jpg';
import gadgetsImg from '../../../assets/category/gadgets.jpg';
import innerwearImg from '../../../assets/category/innerwear.jpg';
import sportsWearImg from '../../../assets/category/sports_wear.jpg';
import sunglassesFramesImg from '../../../assets/category/sunglasses.jpg';
import topwearImg from '../../../assets/category/topwear.jpg';
import watchesImg from '../../../assets/category/watches.jpg';

const Home = () => {
  const categoryData = [
    {
      category: 'Topwear',
      imgURL: topwearImg,
    },
    {
      category: 'Bottomwear',
      imgURL: bottomwearImg,
    },
    {
      category: 'Innerwear',
      imgURL: innerwearImg,
    },
    {
      category: 'Footwear',
      imgURL: footwearImg,
    },
    {
      category: 'Festive Wear',
      imgURL: festiveWearImg,
    },
    {
      category: 'Sports Wear',
      imgURL: sportsWearImg,
    },
    {
      category: 'Watches',
      imgURL: watchesImg,
    },
    {
      category: 'Accessories',
      imgURL: accessoriesImg,
    },
    {
      category: 'Gadgets',
      imgURL: gadgetsImg,
    },
    {
      category: 'Backpacks',
      imgURL: backpacksImg,
    },
    {
      category: 'Sunglasses & Frames',
      imgURL: sunglassesFramesImg,
    },
  ];

  const { products, productsLoading, getProducts } = useData();

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  return (
    <>
      {productsLoading ? (
        <Loader />
      ) : (
        <>
          <MetaData title='Home - Black Bag' />
          <div className='mobile-category-view'>
            <div className='row mt-1'>
              <div className='col-md-12'>
                <div className='category-box-overflow'>
                  <Swiper slidesPerView={'auto'}>
                    {categoryData.map((data) => {
                      const boxCat = (
                        <SwiperSlide key={`${data.category}${data.imgURL}`}>
                          <Link to={`/products/category/${data.category}`}>
                            <div className='category-box-home'>
                              <div className='category-round-box'>
                                <img
                                  src={data.imgURL}
                                  alt='category round box'
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
          </div>
          <MainBanner />
          <div className='container bg-product' id='main-home'>
            <div className='row'>
              <div className='col-md-12'>
                <h2 className='product-heading text-center'>
                  Featured Products
                </h2>
              </div>
            </div>
            <div className='row'>
              <div className='col-md-12 product-flex-board flex-gap'>
                {products &&
                  products.map((product) => (
                    <ProductCard product={product} key={product._id} />
                  ))}
              </div>
            </div>
          </div>
          <div className='container-fluid desktop-categories-view'>
            <div className='row mt-4'>
              <div className='col-md-12'>
                <h2 className='product-heading'>Categories</h2>
              </div>
            </div>
            <div className='row mt-1'>
              <div className='col-md-12'>
                <div className='category-box-overflow'>
                  <Swiper slidesPerView={'auto'}>
                    {categoryData.map((data) => {
                      const boxCat = (
                        <SwiperSlide key={`${data.category}${data.imgURL}`}>
                          <Link to={`/products/category/${data.category}`}>
                            <div className='category-box-home'>
                              <div className='category-round-box'>
                                <img
                                  src={data.imgURL}
                                  alt='category round box'
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
            <div className='row mt-5'>
              <div className='col-md-12 border-top'>
                <h2 className='product-heading text-center text-sm-start'>
                  Blogs
                </h2>
              </div>
            </div>
            <div className='row mt-1'>
              <div className='col-md-12 d-flex justify-content-between black-bag-blogs'>
                <Blog img='https://www.apetogentleman.com/wp-content/uploads/2022/01/mens-smart-casual-dress-code-guide-2-720x420.jpg' />
                <Blog img='https://www.apetogentleman.com/wp-content/uploads/2022/12/CoolestDadShoeMain1-450x340.jpg' />
                <Blog img='https://www.apetogentleman.com/wp-content/uploads/2018/10/Winter-Coats-450x340.png' />
                <Blog img='https://www.apetogentleman.com/wp-content/uploads/2018/10/Winter-Coats-450x340.png' />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
