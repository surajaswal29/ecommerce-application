import React, { useEffect } from 'react';

// React Router
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

// Redux imports
import { useAuth } from './hooks/use-auth';
import { isTokenValid } from './service/authService';

// Snackbar context
import { SnackbarProvider } from './contexts/SnackbarContext';

// Error Boundary
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

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
    if (isTokenValid()) {
      loadUserData();
    }
  }, [loadUserData]);

  return (
    <ErrorBoundary>
      <SnackbarProvider>
        <Router>
          <Routes>
            <Route path='/' element={<Layout />}>
              <Route index element={<Home />} />
              <Route path='product/:id' element={<ProductDetails />} />
              <Route path='products/' element={<Product />} />
              <Route path='products/:keyword' element={<Product />} />
              <Route path='products/category/:category' element={<Product />} />
              <Route path='mycart/' element={<MyCart />} />

              {/* Protected Routes */}
              <Route
                path='user/account'
                element={
                  <ProtectedRoute>
                    <Account />
                  </ProtectedRoute>
                }
              />
              <Route
                path='shipping'
                element={
                  <ProtectedRoute>
                    <Shipping />
                  </ProtectedRoute>
                }
              />
              <Route
                path='order/confirm'
                element={
                  <ProtectedRoute>
                    <ConfirmOrder />
                  </ProtectedRoute>
                }
              />
              <Route
                path='orders/'
                element={
                  <ProtectedRoute>
                    <MyOrder />
                  </ProtectedRoute>
                }
              />
              <Route
                path='payment-success'
                element={
                  <ProtectedRoute>
                    <PaymentSuccess />
                  </ProtectedRoute>
                }
              />
            </Route>

            {/* Auth Routes - Outside Layout */}
            <Route path='/user/login/' element={<Login />} />
            <Route path='/user/signup/' element={<Signup />} />
          </Routes>
        </Router>
      </SnackbarProvider>
    </ErrorBoundary>
  );
};

export default App;
