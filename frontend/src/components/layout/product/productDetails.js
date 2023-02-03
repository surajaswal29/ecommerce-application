import React, { useState, useEffect } from "react";
import ReactStar from "react-rating-stars-component";
// import Minibox from "./miniBox";
import Review from "./review";

import MetaData from "../metaData.js";
import Loader from "../loader/loader";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/swiper.min.css";
import "swiper/modules/navigation/navigation.min.css";
import "swiper/modules/pagination/pagination.min.css";
import { MdKeyboardArrowLeft } from "react-icons/md";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import { getProductDetails } from "../../../actions/productAction";
import { addItemsToCart } from "../../../actions/cartAction";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { product, loading } = useSelector((state) => state.productDetails);

  // quantity state
  const [quantity, onQuantityClick] = useState(1);
  //console.log(quantity);
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    isHalf: true,
  };

  // handling add to cart event
  const addToCartHandler = () => {
    dispatch(addItemsToCart(id, quantity));
    alert("Item Added to Cart");
  };

  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [dispatch, id]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={product.name} />
          <div className="container single-product">
            <div className="row mt-3">
              <div className="col-md-12">
                <a
                  href="http://localhost:3000/"
                  className="text-decoration-none text-dark d-flex align-items-center"
                >
                  <MdKeyboardArrowLeft />
                  Back
                </a>
              </div>
            </div>
            <div className="row mt-5">
              <div className="col-md-5">
                <div className="product-img pr-center">
                  <Swiper pagination={true} modules={[Pagination]}>
                    {product.images &&
                      product.images.map((item, i) => (
                        <SwiperSlide key={`${i} ${item.url}`}>
                          <img
                            src={item.url}
                            key={`${i} ${item.url}`}
                            alt={`${i} product`}
                          />
                        </SwiperSlide>
                      ))}
                    {/* <div className="mini-image-box-wrapper">
                 <Minibox onHoverEvent={onHoverEvent} imgIndex={0} />
                    <Minibox onHoverEvent={onHoverEvent} imgIndex={1} />
                    <Minibox onHoverEvent={onHoverEvent} imgIndex={2} />
                    <Minibox onHoverEvent={onHoverEvent} imgIndex={3} /> 
                {
                  product.images && product.images.map((item,i)=>(
                    <div className="mini-img-box" onMouseEnter={() => { onHoverEvent(i); }}>
                      <img src={item.url} alt={`Product ${i}`} />
                    </div>
                  ))
                }
                  </div> */}
                  </Swiper>
                </div>
              </div>
              <div className="col-md-7">
                <h1>{product.name}</h1>
                <span>Product ID: {product._id}</span>
                <div className="ratings d-flex align-items-center">
                  <ReactStar {...options} value={product.ratings} /> &nbsp;
                  &nbsp; <span>({product.numOfReviews} reviews)</span>
                </div>
                <h2>
                  {product.price &&
                    product.price.toLocaleString("en-IN", {
                      style: "currency",
                      currency: "INR",
                    })}
                </h2>
                <div className="quantity-wrapper">
                  <label htmlFor="quantity">Quantity</label>
                  <div className="quantity-box">
                    <button
                      onClick={() =>
                        quantity > 1 && onQuantityClick(quantity - 1)
                      }
                    >
                      -
                    </button>
                    <input
                      type="number"
                      id="quantity"
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
                <div className={`my-2 ${product.stock > 0 ? "green" : "red"}`}>
                  Status: {product.stock > 0 ? "In Stock" : "Out of Stock"}
                </div>
                <div className="row mt-4">
                  <div className="col-md-6">
                    <div className="cart-button" onClick={addToCartHandler}>
                      ADD TO CART
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="check-button"> Checkout</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-md-12 ">
                <h2>Product Description</h2>
                <p className="text-justify">{product.description}</p>
              </div>
            </div>
            <hr />
            <div className="row mt-5">
              <div className="col-md-8">
                <h2>Product Reviews</h2>
                {product.reviews && product.reviews[0] ? (
                  product.reviews.map((rev, i) => (
                    <Review rev={rev} key={`${i} Review`} />
                  ))
                ) : (
                  <div className="no-reviews border p-3">No reviews yet</div>
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
