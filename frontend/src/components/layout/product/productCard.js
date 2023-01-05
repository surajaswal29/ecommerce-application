import React from "react";
import ReactStar from "react-rating-stars-component";

// product css file
import "./product.css";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerwidth < 600 ? 20 : 25,
    value: product.ratings,
    isHalf: true,
  };

  return (
    <div className="card-box">
      {/* ${product._id} */}
      <Link to={`/product/${product._id}`} className="card-inner-box">
        <div className="card-image pr-center">
          <img
            src={
              product.images && product.images[0]
                ? product.images[0].url
                : "image"
            }
            alt="Product"
            className="img-fluid"
          />
        </div>
        <div className="card-description">
          <h2>{product.name}</h2>
          <div className="ratings pr-center-even">
            <ReactStar {...options} />{" "}
            <span>({product.numOfReviews}) reviews</span>
          </div>
          <span>₹{product.price}</span>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
