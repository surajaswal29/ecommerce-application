import React from 'react';
import { Link } from 'react-router-dom';
// import Footer from '../footer/footer';
// import Header from '../header/header';

import SUCCESS_GIF from "../../media/success_order.gif";

const PaymentSuccess = () => {
  return (
   <>
    {/* <Header/> */}
    <div className='container vh-100'>
        <div className="row">
            <div className="col-md-12 d-flex justify-content-center">
               <div className='order-successfully mt-4'>
                    <div className="order-img">
                        <img src={SUCCESS_GIF} alt="success gif"/>
                    </div>
                    <div className="order-msg">
                        <p className="text-center">Order Placed Successfully</p>
                        <div className="order-link">
                            {/* <a href="#" className="btn btn-sm btn-success text-light">My Orders</a> */}
                            <Link to={"/orders/"} className="btn btn-sm btn-success text-light">My Orders</Link>
                        </div>
                    </div>
               </div>
            </div>
        </div>
    </div>
    {/* <Footer/> */}
   </>
  )
}

export default PaymentSuccess