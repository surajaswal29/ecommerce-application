import React from "react";
import { Link } from "react-router-dom";

const ConfirmItemCard = ({ item }) => {
  return (
    <>
      <div className="item-wrapper d-flex">
        <div className="item-img">
          <img src={item.images[0].url} alt="product" />
        </div>
        <div className="item-name">
          <span>{item.name}</span>
          <br />
          <span>
            Product ID{" "}
            <Link to={`/product/${item.product}`}>{item.product}</Link>
          </span>
        </div>
        <div className="item-quantity-price d-flex justify-content-between">
          <span>Quantity: {item.quantity}</span>
          <span>
            <strong>
              {(item.quantity * item.price).toLocaleString("en-IN", {
                style: "currency",
                currency: "INR",
              })}
            </strong>
          </span>
        </div>
      </div>
    </>
  );
};

export default ConfirmItemCard;
