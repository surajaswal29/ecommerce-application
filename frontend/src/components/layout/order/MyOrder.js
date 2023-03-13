import React, {useEffect} from 'react';

// React Redux
import {useDispatch, useSelector} from "react-redux";
import {myOrders, clearErrors} from "../../../actions/orderAction";


// local components
import Header from "../header/header.js";
import Footer from "../footer/footer.js";
import Loader from '../loader/loader';
import MetaData from '../metaData';
import OrderItemCard from "./OrderItemCard";

import "./order.css";
import { Link } from 'react-router-dom';

const MyOrder = () => {

  const dispatch = useDispatch();

  const {orders, error, loading}=useSelector((state)=>state.myOrders);

  useEffect(() => {

    if(error){
      dispatch(clearErrors());
    }

    dispatch(myOrders());

  }, [error, dispatch])
  

  return (
    <>
      {
        loading ? (<Loader/>):
        (
          <>
          <MetaData title="My Order"/>
            <Header/>
              <section className='container' id="my-order">
                  <div className='row mt-4'>
                    <div className="col-md-12 pr-center">
                      <div className="order-container-wrap">
                        <div className='row'>
                          <div className='col-md-12'>
                            <span className="cart-heading-txt">MY ORDERS</span>
                          </div>
                          {
                            orders.length !== 0?(
                              <div className='col-md-12 mt-3'>
                                {
                                orders.map((order)=>(
                                  <OrderItemCard item={order} key={order._id}/>
                                ))
                                }
                              </div>
                            ):(
                              <div className='col-md-12 mt-3'>
                                  <div className="item-wrapper-order text-center">
                                    <p className="text-center">No Order Placed Yet!</p>
                                    <Link to={"/products"} className="btn btn-primary">
                                      Start shopping
                                    </Link>
                                  </div>
                              </div>
                            )
                          }
                        </div>
                    </div>
                  </div>
                </div>
              </section>
            <Footer/>
          </>
        )
      }
    </>
  )
}

export default MyOrder