import React from 'react';

// component imports
import Header from "../header/header"; //page header
import MetaData from "../metaData"; //set page title
import CheckoutSteps from "./CheckoutSteps.js"
import Footer from "../footer/footer";

// CSS File
import "./Shipping.css";
import { useNavigate } from "react-router";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ConfirmItemCard from './ConfirmItemCard';


const ConfirmOrder = () => {
    const navigate = useNavigate();
    const {shippingInfo, cartItems} = useSelector((state)=>state.cart);
    const {user} = useSelector((state)=>state.user);
  
    let subTotal = 0;
  
    cartItems.map((i) => (subTotal += i.price * i.quantity));

    const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}`;

    const shippingCharges = subTotal>1000?0:200;
    const tax = subTotal * 0.18 ;
    const total = subTotal + tax + shippingCharges;

    const confirmHandler = ()=>{

      const data = {
        subTotal,
        tax,
        shippingCharges,
        total
      }

      // store data object in session storage
      sessionStorage.setItem("OrderInfo",JSON.stringify(data));

      navigate('/order/payment');
    }

  return (
    <>
        <MetaData title="Confirm Order"/>
        {/* Navbar */}
        <Header/>
        {/* main body */}
        <div className='container'>
            <CheckoutSteps activeStep={1}/>
            <div className="row mt-5">
                <div className='col-md-8'>
                  <div className="col-md-12">
                    <span className="cart-heading-txt">Shipping Info</span>
                  </div>
                  <div className="col-md-12 mt-3">
                    <table>
                      <tr>
                        <td><strong>Name:</strong></td>
                        <td>{user.name}</td>
                      </tr>
                      <tr>
                        <td><strong>Phone:</strong></td>
                        <td>{shippingInfo.phoneNo}</td>
                      </tr>
                      <tr>
                        <td><strong>Address:</strong></td>
                        <td>{address}</td>
                      </tr>
                    </table>
                  </div>
                
                  <div className="col-md-12 mt-5">
                    <span className="cart-heading-txt">YOUR CART ITEMS</span>
                  </div>
                  <div className="col-md-12 mt-2">
                    {cartItems && cartItems.length > 0 ? (
                      cartItems.map((item) => (
                        <ConfirmItemCard
                          item={item}
                          key={item.product}
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
                </div>
                <div className="col-md-4">
                  <div className="cart-total">
                    <span className="cart-heading-txt-total">ORDER SUMMARY</span>
                    <div className="cart-total-box">
                      <table className="cart-total-details">
                        <tbody>
                          <tr>
                            <td>Shipping Charges</td>
                            <td>₹{shippingCharges}</td>
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
                        {total !== 0
                          ? total.toLocaleString("en-IN", {
                              style: "currency",
                              currency: "INR",
                            })
                          : total}
                      </span>
                    </div>
                  </div>

                  <div className="check-button bg-success" onClick={confirmHandler}>
                    Proceed to Payment
                  </div>
                </div>
            </div>
        </div>

        {/* Footer */}
        <Footer/>
    </>
  )
}

export default ConfirmOrder