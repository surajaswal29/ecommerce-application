import React from 'react';

// component imports
import Header from "../header/header"; //page header
import MetaData from "../metaData"; //set page title
import CheckoutSteps from "./CheckoutSteps.js"
import Footer from "../footer/footer";

// CSS File
import "./Shipping.css";

const OrderPayment = () => {
  return (
    <>
        <MetaData title="Confirm Order"/>
        {/* Navbar */}
        <Header/>
        {/* main body */}
        <div className='container'>
            <CheckoutSteps activeStep={2}/>
        </div>
        {/* Footer */}
        <Footer/>
    </>
  )
}

export default OrderPayment