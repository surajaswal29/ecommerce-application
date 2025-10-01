import React, { useEffect, useState } from 'react';
import ReactStar from 'react-rating-stars-component';
// import Minibox from "./miniBox";
import Review from './review';

import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import Loader from '../loader/loader';
import MetaData from '../metaData.jsx';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import { MdKeyboardArrowLeft } from 'react-icons/md';
// Redux
import { useParams } from 'react-router';
import { useData } from '../../../hooks/use-data';

const ProductDetails = () => {
  const { id } = useParams();
  const {
    productDetails,
    productDetailsLoading,
    getProductDetails,
    addItemToCart,
  } = useData();

  // quantity state
  const [quantity, onQuantityClick] = useState(1);
  //console.log(quantity);
  const options = {
    edit: false,
    color: 'rgba(20,20,20,0.1)',
    activeColor: 'tomato',
    size: window.innerWidth < 600 ? 20 : 25,
    isHalf: true,
  };

  // handling add to cart event
  const addToCartHandler = () => {
    addItemToCart(id, quantity);
    alert('Item Added to Cart');
  };

  useEffect(() => {
    getProductDetails(id);
  }, [getProductDetails, id]);

  return (
    <>
      {productDetailsLoading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={productDetails?.name} />
          <div className='container single-productDetails'>
            <div className='row mt-3'>
                  <div className='col-md-12'>
                    <button
                      onClick={() => navigate(-1)}
                      className='text-decoration-none text-dark d-flex align-items-center border-0 bg-transparent'
                    >
                      <MdKeyboardArrowLeft />
                      Back
                    </button>
                  </div>
            </div>
            <div className='row mt-5'>
              <div className='col-md-5'>
                <div className='productDetails-img pr-center'>
                  <Swiper pagination={true} modules={[Pagination]}>
                    {productDetails?.images &&
                      productDetails?.images.map((item, i) => (
                        <SwiperSlide key={`${i} ${item.url}`}>
                          <img
                            src={item.url}
                            key={`${i} ${item.url}`}
                            alt={`${i} productDetails`}
                          />
                        </SwiperSlide>
                      ))}
                    {/* <div className="mini-image-box-wrapper">
                 <Minibox onHoverEvent={onHoverEvent} imgIndex={0} />
                    <Minibox onHoverEvent={onHoverEvent} imgIndex={1} />
                    <Minibox onHoverEvent={onHoverEvent} imgIndex={2} />
                    <Minibox onHoverEvent={onHoverEvent} imgIndex={3} />
                {
                  productDetails?.images && productDetails?.images.map((item,i)=>(
                    <div className="mini-img-box" onMouseEnter={() => { onHoverEvent(i); }}>
                      <img src={item.url} alt={`Product ${i}`} />
                    </div>
                  ))
                }
                  </div> */}
                  </Swiper>
                </div>
              </div>
              <div className='col-md-7 productDetails-desc-details'>
                <h1>{productDetails?.name}</h1>
                <span>Product ID: {productDetails?._id}</span>
                <div className='productDetails-details-ratings d-flex align-items-center'>
                  <ReactStar {...options} value={productDetails?.ratings} />{' '}
                  &nbsp; &nbsp;{' '}
                  <span>({productDetails?.numOfReviews} reviews)</span>
                </div>
                <h2 className='productDetails-price'>
                  {productDetails?.price &&
                    productDetails?.price.toLocaleString('en-IN', {
                      style: 'currency',
                      currency: 'INR',
                    })}
                </h2>
                <div className='quantity-wrapper'>
                  <label htmlFor='quantity'>Quantity</label>
                  <div className='quantity-box'>
                    <button
                      onClick={() =>
                        quantity > 1 && onQuantityClick(quantity - 1)
                      }
                    >
                      -
                    </button>
                    <input
                      type='number'
                      id='quantity'
                      readOnly
                      value={quantity}
                      onChange={(e) => onQuantityClick(e.target.value)}
                    />
                    <button
                      onClick={() =>
                        quantity < 5 && onQuantityClick(quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>
                </div>
                <div
                  className={`my-2 ${
                    productDetails?.stock > 0 ? 'green' : 'red'
                  }`}
                >
                  Status:{' '}
                  {productDetails?.stock > 0 ? 'In Stock' : 'Out of Stock'}
                </div>
                <div className='row mt-4'>
                  <div className='col-md-6'>
                    <div className='cart-button' onClick={addToCartHandler}>
                      ADD TO CART
                    </div>
                  </div>
                  {/* <div className="col-md-6">
                    <div className="check-button"> Checkout</div>
                  </div> */}
                </div>
              </div>
            </div>
            <div className='row mt-4'>
              <div className='col-md-12 '>
                <h2>Product Description</h2>
                <p className='text-justify'>{productDetails?.description}</p>
              </div>
            </div>
            <hr />
            <div className='row mt-5'>
              <div className='col-md-8'>
                <h2>Product Reviews</h2>
                {productDetails?.reviews && productDetails?.reviews[0] ? (
                  productDetails?.reviews.map((rev, i) => (
                    <Review rev={rev} key={`${i} Review`} />
                  ))
                ) : (
                  <div className='no-reviews border p-3'>No reviews yet</div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProductDetails;
