import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Header from '../header/header';
import Footer from '../footer/footer';
import MetaData from '../metaData';
import SUCCESS_GIF from '../../media/success_order.gif';

const PaymentSuccess = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [paymentData, setPaymentData] = useState(null);
    const [orderData, setOrderData] = useState(null);

    useEffect(() => {
        // Get payment data from navigation state
        if (location.state) {
            setPaymentData(location.state.payment);
            setOrderData(location.state.orderData);
        } else {
            // If no state, redirect to home
            navigate('/');
        }
    }, [location.state, navigate]);

    if (!paymentData) {
        return (
            <div className="container vh-100 d-flex justify-content-center align-items-center">
                <div className="text-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-3">Loading payment details...</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <MetaData title="Payment Successful" />
            <Header />

            <div className="container vh-100">
                <div className="row">
                    <div className="col-md-12 d-flex justify-content-center">
                        <div className="order-successfully mt-4">
                            <div className="order-img">
                                <img src={SUCCESS_GIF} alt="success gif" />
                            </div>
                            <div className="order-msg">
                                <h3 className="text-center text-success mb-3">Payment Successful!</h3>
                                <p className="text-center mb-3">
                                    Thank you for your purchase. Your order has been placed successfully.
                                </p>

                                {/* Payment Details */}
                                <div className="payment-details bg-light p-3 rounded mb-3">
                                    <h5 className="mb-3">Payment Details</h5>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <p><strong>Payment ID:</strong> {paymentData.payment_id}</p>
                                            <p><strong>Amount:</strong> ₹{paymentData.amount}</p>
                                        </div>
                                        <div className="col-md-6">
                                            <p><strong>Status:</strong> <span className="text-success">{paymentData.status}</span></p>
                                            <p><strong>Date:</strong> {new Date(paymentData.created_at).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Order Details */}
                                {orderData && (
                                    <div className="order-details bg-light p-3 rounded mb-3">
                                        <h5 className="mb-3">Order Details</h5>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <p><strong>Total Items:</strong> {orderData.orderItems?.length || 0}</p>
                                                <p><strong>Subtotal:</strong> ₹{orderData.itemsPrice}</p>
                                            </div>
                                            <div className="col-md-6">
                                                <p><strong>Tax:</strong> ₹{orderData.taxPrice}</p>
                                                <p><strong>Total:</strong> ₹{orderData.totalPrice}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="order-links d-flex gap-2 justify-content-center">
                                    <Link to="/orders/" className="btn btn-success">
                                        View My Orders
                                    </Link>
                                    <Link to="/products" className="btn btn-outline-primary">
                                        Continue Shopping
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default PaymentSuccess;
