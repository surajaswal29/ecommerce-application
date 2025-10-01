import React, { useEffect } from 'react';

// React Router
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

// Redux imports
import { useAuth } from './hooks/use-auth';

// Snackbar context
import { SnackbarProvider } from './contexts/SnackbarContext';

// components imports
import ConfirmOrder from './components/layout/cart/ConfirmOrder';
import MyCart from './components/layout/cart/mycart.jsx';
import PaymentSuccess from './components/layout/cart/PaymentSuccess';
import Shipping from './components/layout/cart/Shipping.jsx';
import Home from './components/layout/Home/Home';
import Layout from './components/layout/layout';
import MyOrder from './components/layout/order/MyOrder';
import Product from './components/layout/product/product.jsx';
import ProductDetails from './components/layout/product/productDetails.jsx';
import Account from './components/layout/user/account.jsx';
import Login from './components/layout/user/login';
import Signup from './components/layout/user/signup';
import ProtectedRoute from './components/Route/ProtectedRoute.jsx';

// import bootstrap and css file
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

// creating App component
const App = () => {
  const { loadUserData } = useAuth();

  useEffect(() => {
    loadUserData();
  }, [loadUserData]);

  return (
    <SnackbarProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/product/:id' element={<ProductDetails />} />
            <Route exact path='/products/' element={<Product />} />
            <Route path='/products/:keyword' element={<Product />} />
            <Route path='/products/category/:category' element={<Product />} />
            <Route exact path='/mycart/' element={<MyCart />} />
          </Route>

          <Route exact path='/' element={<ProtectedRoute />}>
            <Route exact path='/user/account' element={<Account />} />
            <Route exact path='/shipping' element={<Shipping />} />
            <Route exact path='/order/confirm' element={<ConfirmOrder />} />
            <Route exact path='/orders/' element={<MyOrder />} />
            <Route exact path='/payment-success' element={<PaymentSuccess />} />
          </Route>
          <Route exact path='/user/login/' element={<Login />} />
          <Route exact path='/user/signup/' element={<Signup />} />
        </Routes>
      </Router>
    </SnackbarProvider>
  );
};

export default App;
