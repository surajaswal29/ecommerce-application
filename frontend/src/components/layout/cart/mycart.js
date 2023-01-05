import React from "react";

// css file
import "./cart.css";
import { MdKeyboardArrowLeft, MdDelete } from "react-icons/md";

const MyCart = () => {
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
          <div className="item-wrapper d-flex">
            <div className="item-img">
              <img
                src="https://m.media-amazon.com/images/W/WEBP_402378-T1/images/I/41OXtSIsFXL.jpg"
                alt="product"
              />
            </div>
            <div className="item-name">
              <span>Men's Winter Wear Full Sleeves Denim Jacket</span>
              <br />
              <span>Product ID #63a610ad7b3a12cf32c575ab</span>
            </div>
            <div className="item-quantity-price d-flex justify-content-between">
              <span>Quantity: 2</span>
              <span>
                <strong>₹1200</strong>
              </span>
            </div>
            <MdDelete />
          </div>
          <div className="item-wrapper d-flex">
            <div className="item-img">
              <img
                src="https://m.media-amazon.com/images/W/WEBP_402378-T1/images/I/61KNBTw4K8S._UX679_.jpg"
                alt="product"
              />
            </div>
            <div className="item-name">
              <span>Men's Full Sleeves Formal Shirt</span>
              <br />
              <span>Product ID #63a610ad7b3a12cf32c575ab</span>
            </div>
            <div className="item-quantity-price d-flex justify-content-between">
              <span>Quantity: 1</span>
              <span>
                <strong>₹700</strong>
              </span>
            </div>
            <MdDelete />
          </div>
          <div className="item-wrapper d-flex">
            <div className="item-img">
              <img
                src="https://m.media-amazon.com/images/W/WEBP_402378-T1/images/I/61ahn9N38zL._SX679_.jpg"
                alt="product"
              />
            </div>
            <div className="item-name">
              <span>OnePlus Nord 2T</span>
              <br />
              <span>Product ID #63a6c850c79d384eb2d1f07c</span>
            </div>
            <div className="item-quantity-price d-flex justify-content-between">
              <span>Quantity: 1</span>
              <span>
                <strong>₹28999</strong>
              </span>
            </div>
            <MdDelete />
          </div>
        </div>
        <div className="col-md-4">
          <div className="cart-total">
            <span className="cart-heading-txt-total">CART TOTALS</span>
            <div className="cart-total-box">
              <table className="cart-total-details">
                <tbody>
                  <tr>
                    <td>Shipping/Delievery(4-5 Business Days)</td>
                    <td>Free</td>
                  </tr>
                  <tr>
                    <td>Tax/GST</td>
                    <td>₹200</td>
                  </tr>
                  <tr>
                    <td>Subtotal</td>
                    <td>₹1947</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="full-total pr-center-even">
              <span>Total</span>
              <span>₹2147</span>
            </div>
          </div>
          <div className="check-button bg-dark"> Proceed to Checkout</div>
        </div>
      </div>
    </div>
  );
};

export default MyCart;
