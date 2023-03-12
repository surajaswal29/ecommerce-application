import React, { useEffect, useState } from "react";

// React Router
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// import Axios
import axios from "axios";

// Redux imports
import { useDispatch } from "react-redux";
import { loadUser } from "./actions/userAction";

// Stripe
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';

// components imports
import Home from "./components/layout/Home/Home";
import ProductDetails from "./components/layout/product/productDetails.js";
import Product from "./components/layout/product/product.js";
import MyCart from "./components/layout/cart/mycart.js";
import MyOrder from "./components/layout/order/MyOrder";
import Login from "./components/layout/user/login";
import Signup from "./components/layout/user/signup";
import Layout from "./components/layout/layout";
import Account from "./components/layout/user/Account.js";
import ProtectedRoute from "./components/Route/ProtectedRoute.js";
import Shipping from "./components/layout/cart/Shipping.js";
import ConfirmOrder from "./components/layout/cart/ConfirmOrder";
import OrderPayment from "./components/layout/cart/OrderPayment";
import PaymentSuccess from "./components/layout/cart/PaymentSuccess";
// import StripeRoute from "./components/Route/StripeRoute";

import { MAIN_URI } from "./service/helper";

// import bootstrap and css file
import "bootstrap/dist/css/bootstrap.min.css";
import "./app.css";

// creating App component
const App = () => {
  const dispatch = useDispatch();

  const [stripeApiKey, setstripeApiKey] = useState("");

  const getStripeApiKey = async()=>{
    const {data} = await axios.get(`${MAIN_URI}/api/v1/stripeapikey`,{
      withCredentials:true,
    });
    setstripeApiKey(data.StripeAPIKey);
  }

  useEffect(() => {
      dispatch(loadUser());

      getStripeApiKey();

  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/product/:id" element={<ProductDetails />} />
          <Route exact path="/products/" element={<Product />} />
          <Route path="/products/:keyword" element={<Product />} />
          <Route path="/products/category/:category" element={<Product />} />
          <Route exact path="/mycart/" element={<MyCart />} />
        </Route>
        
        <Route exact path="/" element={<ProtectedRoute />}>
          <Route exact path="/user/account" element={<Account />} />
          <Route exact path="/shipping" element={<Shipping />} />
          <Route exact path="/order/confirm" element={<ConfirmOrder />} />
          <Route exact path="/orders/" element={<MyOrder/>}/>
          {
            stripeApiKey && ( 
                    <Route exact path="/order/payment" element={(
                      <Elements stripe={loadStripe(stripeApiKey)}>
                          <OrderPayment/>
                      </Elements>
                    )}/>
            )
          }
          <Route exact path="/payment/success" element={<PaymentSuccess/>}/>
        </Route>
        <Route exact path="/user/login/" element={<Login />} />
        <Route exact path="/user/signup/" element={<Signup />} />
      </Routes>
    </Router>
  );
};

export default App;
