import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { createOrder } from '../../../actions/orderAction';
import axios from 'axios';
import { MAIN_URI } from '../../../service/helper';

const PaymentButton = ({ orderData, onPaymentStart, onPaymentComplete, onPaymentError }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [instamojoLoaded, setInstamojoLoaded] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  // Load Instamojo script
  useEffect(() => {
    const loadInstamojoScript = () => {
      if (window.Instamojo) {
        setInstamojoLoaded(true);
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://js.instamojo.com/v1/checkout.js';
      script.async = true;
      script.onload = () => {
        setInstamojoLoaded(true);
        console.log('Instamojo script loaded successfully');
      };
      script.onerror = () => {
        console.error('Failed to load Instamojo script');
        onPaymentError?.('Failed to load payment gateway');
      };
      document.head.appendChild(script);
    };

    loadInstamojoScript();

    // Cleanup function
    return () => {
      const existingScript = document.querySelector('script[src="https://js.instamojo.com/v1/checkout.js"]');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [onPaymentError]);

  const handlePayment = async () => {
    if (!orderData) {
      onPaymentError?.('Order data is required');
      return;
    }

    if (!instamojoLoaded) {
      onPaymentError?.('Payment gateway is still loading. Please try again.');
      return;
    }

    setIsLoading(true);
    onPaymentStart?.();

    try {
      // Create payment request
      const paymentRequest = {
        amount: orderData.totalPrice,
        purpose: `Order #${Date.now()}`, // You can customize this
        buyer_name: user.name,
        email: user.email,
        phone: orderData.shippingInfo.phoneNo,
        order_id: `ORDER_${Date.now()}`,
        redirect_url: `${window.location.origin}/payment-success`,
        webhook_url: `${MAIN_URI}/api/v1/payment/webhook`
      };

      console.log('Creating payment request:', paymentRequest);

      const response = await axios.post(
        `${MAIN_URI}/api/v1/payment/create-payment`,
        paymentRequest,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );

      const { payment_url, payment_request_id } = response.data;

      console.log('Payment request created:', { payment_url, payment_request_id });

      // Configure Instamojo
      window.Instamojo.configure({
        onOpen: () => {
          console.log('Instamojo payment modal opened');
        },
        onClose: () => {
          console.log('Instamojo payment modal closed');
          setIsLoading(false);
        },
        onSuccess: async (payment) => {
          console.log('Payment successful:', payment);
          
          try {
            // Create order in database
            await dispatch(createOrder(orderData));
            onPaymentComplete?.(payment);
            
            // Redirect to success page
            navigate('/payment-success', { 
              state: { 
                payment: payment,
                orderData: orderData 
              } 
            });
          } catch (error) {
            console.error('Error creating order:', error);
            onPaymentError?.('Payment successful but order creation failed');
          }
        },
        onFailure: (data) => {
          console.log('Payment failed:', data);
          onPaymentError?.('Payment failed. Please try again.');
          setIsLoading(false);
        }
      });

      // Open Instamojo payment modal
      window.Instamojo.open(payment_url);

    } catch (error) {
      console.error('Payment request error:', error);
      onPaymentError?.(
        error.response?.data?.message || 
        'Failed to create payment request. Please try again.'
      );
      setIsLoading(false);
    }
  };

  return (
    <button
      className={`check-button bg-success ${isLoading ? 'disabled' : ''}`}
      onClick={handlePayment}
      disabled={isLoading || !instamojoLoaded}
      style={{
        opacity: isLoading || !instamojoLoaded ? 0.7 : 1,
        cursor: isLoading || !instamojoLoaded ? 'not-allowed' : 'pointer'
      }}
    >
      {isLoading ? (
        <>
          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
          Processing...
        </>
      ) : !instamojoLoaded ? (
        'Loading Payment Gateway...'
      ) : (
        'Pay with Instamojo'
      )}
    </button>
  );
};

export default PaymentButton;
