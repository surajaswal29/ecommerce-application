import React from "react";
import "./app.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// components imports
import Home from "./components/layout/Home/Home";
import ProductDetails from "./components/layout/product/productDetails.js";
import Product from "./components/layout/product/product.js";
import MyCart from "./components/layout/cart/mycart.js";
import Login from "./components/layout/user/login";
import Signup from "./components/layout/user/signup";
import Layout from "./components/layout/layout";
import Account from "./components/layout/user/account";

// import bootstrap file
import "bootstrap/dist/css/bootstrap.min.css";

// creating App component
const App = () => {
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
        <Route exact path="/user/login/" element={<Login />} />
        <Route exact path="/user/signup/" element={<Signup />} />
        <Route exact path="/user/account" element={<Account />} />
      </Routes>
    </Router>
  );
};

export default App;
