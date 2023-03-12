import React, { useEffect, useRef } from 'react';
import {CardNumberElement,CardExpiryElement,CardCvcElement,useStripe,useElements} from '@stripe/react-stripe-js';
// import { Typography } from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";

// component imports
import Header from "../header/header"; //page header
import MetaData from "../metaData"; //set page title
import CheckoutSteps from "./CheckoutSteps.js"
import Footer from "../footer/footer";
import {useNavigate } from 'react-router';
import { MAIN_URI } from '../../../service/helper';

import {createOrder, clearErrors} from "../../../actions/orderAction";



const OrderPayment = () => {

  const orderInfo = JSON.parse(sessionStorage.getItem("OrderInfo"));
  console.log(orderInfo);

  const paymentButton = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  const {shippingInfo, cartItems} = useSelector((state)=>state.cart);
  const {user} = useSelector((state)=>state.user);
  const {error} = useSelector((state)=>state.newOrder);


  // creating payment data object
  const paymentData = {
    amount: Math.round(orderInfo.total * 100),
  }

  // creating order object
  const order = {
    shippingInfo,
    orderItems:cartItems,
    itemsPrice: orderInfo.subTotal,
    taxPrice:orderInfo.tax,
    shippingPrice:orderInfo.shippingCharges,
    totalPrice:orderInfo.total
  };

  // declaring and defining submit handler
  const submitHandler = async (e)=>{
    e.preventDefault();

    paymentButton.current.disabled = true;

    try {

      const config={
        headers:{
          "Content-Type":"application/json",
        },
        withCredentials:true,
      };

      const {data} = await axios.post(`${MAIN_URI}/api/v1/payment/process`,paymentData,config);

      const client_secret = data.client_secret;

      if(!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret,{
        payment_method:{
         card:elements.getElement(CardNumberElement),
         billing_details:{
           name:user.name,
           email:user.email,
           address:{
             line1:shippingInfo.address,
             city:shippingInfo.city,
             state:shippingInfo.state,
             postal_code:shippingInfo.pinCode,
             country:shippingInfo.country,
           }
         }
        }
      });

      if(result.error){
        paymentButton.current.disabled = false;
        alert(result.error.message);
      }else{
        if(result.paymentIntent.status === "succeeded"){

          order.paymentInfo = {
            id:result.paymentIntent.id,
            status:result.paymentIntent.status,
          };

          dispatch(createOrder(order));

          localStorage.removeItem("cartItems");

          navigate('/payment/success');
        }else{
          alert("There's an issue while processing your payment request!");
        }
      }

    } catch (error) {
      paymentButton.current.disabled = false;
      alert(error.response.data.message);
    }
    
  }

  useEffect(()=>{
    if(error){
      alert(error);
      dispatch(clearErrors());
    }
  });

  return (
    <>
      <MetaData title="Order Payment"/>
      {/* Header components */}
      <Header/>
      {/* Payment body */}
      <div className='container'>
        <CheckoutSteps activeStep={2}/>
        <div className="row">
          <div className="col-md-12 mt-5">
            
              <h2 className='text-center'>Card Info</h2>
            
          </div>
          <div className="col-md-12 pr-center">
            <div className="form-container-wrapper">
                <form className='payment-form-container' onSubmit={(e)=>submitHandler(e)}>
                    <div className="row">
                      <div className="col-md-12 mt-3">
                        <CardNumberElement className='form-control'/>
                      </div>
                      <div className="col-md-6 mt-3">
                        <CardExpiryElement className='form-control'/>
                      </div>
                      <div className="col-md-6 mt-3">
                        <CardCvcElement className='form-control'/>
                      </div>
                    </div>
                    <div className="row mt-3">
                      <div className="col-md-12">
                        <button type="submit" className='btn btn-primary form-control' ref={paymentButton}>Pay - Rs. {orderInfo.total}</button>
                      </div>
                    </div>
                </form>
            </div>
          </div>
        </div>
      </div>
      {/* Footer Component */}
      <Footer/>
    </>
  )
}

export default OrderPayment