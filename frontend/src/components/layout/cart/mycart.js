import React from "react";

import { Link, useNavigate } from "react-router-dom";

// css file
import "./cart.css";
import { MdKeyboardArrowLeft } from "react-icons/md";

import { useDispatch, useSelector } from "react-redux";
import CartItemCard from "./CartItemCard";
import { removeItemsFromCart } from "../../../actions/cartAction.js";

const MyCart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const remCartEmpty = ()=>{
    alert("Cart is Empty!")
  }

  const { cartItems } = useSelector((state) => state.cart);

  let subTotal = 0;

  const tax = 200;
  // const totalPrice = subTotal + tax;

  cartItems.map((i) => (subTotal += i.price * i.quantity));

  const deleteCartItems = (id) => {
    dispatch(removeItemsFromCart(id));
  };

  const checkOutHandler = () => {
    navigate("/user/login?redirect=shipping");
  };
  return (
    <div className="container">
      <div className="row mt-3">
        <div className="col-md-12">
          <a
            href="http://localhost:3000/products"
            className="text-decoration-none text-dark d-flex align-items-center"
          >
            <MdKeyboardArrowLeft />
            Back
          </a>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-md-12">
          <span className="cart-heading-txt">YOUR CART</span>
        </div>
      </div>
      <div className="row mt-2">
        <div className="col-md-8">
          {cartItems && cartItems.length > 0 ? (
            cartItems.map((item) => (
              <CartItemCard
                item={item}
                key={item.product}
                deleteCartItem={deleteCartItems}
              />
            ))
          ) : (
            <div className="item-wrapper text-center">
              <p className="text-center">Cart is empty</p>
              <Link to={"/products"} className="btn btn-success">
                Start shopping
              </Link>
            </div>
          )}
        </div>
        <div className="col-md-4">
          <div className="cart-total">
            <span className="cart-heading-txt-total">CART TOTALS</span>
            <div className="cart-total-box">
              <table className="cart-total-details">
                <tbody>
                  <tr>
                    <td>Shipping/Delivery(4-5 Business Days)</td>
                    <td>Free</td>
                  </tr>
                  <tr>
                    <td>Tax/GST</td>
                    <td>₹{tax}</td>
                  </tr>
                  <tr>
                    <td>Subtotal</td>
                    <td>
                      {subTotal.toLocaleString("en-IN", {
                        style: "currency",
                        currency: "INR",
                      })}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="full-total pr-center-even">
              <span>Total</span>
              <span>
                {subTotal !== 0
                  ? subTotal.toLocaleString("en-IN", {
                      style: "currency",
                      currency: "INR",
                    })
                  : subTotal}
              </span>
            </div>
          </div>

          {
            localStorage.getItem("cartItems") == null?
            (
              <div className="check-button bg-dark" onClick={remCartEmpty}>
                Proceed to Checkout
              </div>
            ):(
              <div className="check-button bg-dark" onClick={checkOutHandler}>
                Proceed to Checkout
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default MyCart;
