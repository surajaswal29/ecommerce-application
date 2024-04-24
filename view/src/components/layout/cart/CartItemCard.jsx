import React from "react";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

const CartItemCard = ({ item, deleteCartItem }) => {
  return (
    <>
      <div className="item-wrapper d-flex">
        <div className="item-img">
          <img src={item.images} alt="product" />
        </div>
        <div className="item-name">
          <span>{item.name}</span>
          <br />
          <span>
            #ID{" "}
            <Link to={`/product/${item.product}`}>{item.product}</Link>
          </span>
          <span className="mobile-hide-details">Quantity: {item.quantity}</span>
          <span className="mobile-hide-details">
            <strong>
              {(item.quantity * item.price).toLocaleString("en-IN", {
                style: "currency",
                currency: "INR",
              })}
            </strong>
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
        <div
          onClick={() => {
            deleteCartItem(item.product);
          }}
        >
          <MdDelete />
        </div>
      </div>
    </>
  );
};

export default CartItemCard;
