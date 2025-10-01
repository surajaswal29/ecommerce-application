import React, { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/use-auth';
import { useData } from '../../hooks/use-data';

/**
 * Example component demonstrating Redux Toolkit integration
 * Shows authentication flow and data fetching
 */
const ReduxExample = () => {
    const { isAuthenticated, user, login, logout, isLoading, error } = useAuth();
    const {
        products,
        productsLoading,
        productsError,
        getProducts,
        cartItems,
        cartItemsCount,
        addItemToCart
    } = useData();

    const [loginForm, setLoginForm] = useState({
        email: '',
        password: ''
    });

    // Load products on component mount
    useEffect(() => {
        getProducts();
    }, [getProducts]);

    const handleLogin = async (e) => {
        e.preventDefault();
        await login(loginForm);
    };

    const handleLogout = () => {
        logout();
    };

    const handleAddToCart = (productId) => {
        addItemToCart(productId, 1);
    };

    return (
        <div className="container mt-4">
            <h2>Redux Toolkit + Axios Integration Example</h2>

            {/* Authentication Section */}
            <div className="card mb-4">
                <div className="card-header">
                    <h4>Authentication</h4>
                </div>
                <div className="card-body">
                    {!isAuthenticated ? (
                        <form onSubmit={handleLogin}>
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    value={loginForm.email}
                                    onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    value={loginForm.password}
                                    onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Logging in...' : 'Login'}
                            </button>
                        </form>
                    ) : (
                        <div>
                            <p>Welcome, {user?.name}!</p>
                            <p>Email: {user?.email}</p>
                            <button onClick={handleLogout} className="btn btn-danger">
                                Logout
                            </button>
                        </div>
                    )}

                    {error && (
                        <div className="alert alert-danger mt-3">
                            {error}
                        </div>
                    )}
                </div>
            </div>

            {/* Products Section */}
            <div className="card mb-4">
                <div className="card-header d-flex justify-content-between align-items-center">
                    <h4>Products</h4>
                    <span className="badge bg-primary">Cart: {cartItemsCount} items</span>
                </div>
                <div className="card-body">
                    {productsLoading ? (
                        <div className="text-center">
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    ) : productsError ? (
                        <div className="alert alert-danger">
                            {productsError}
                        </div>
                    ) : (
                        <div className="row">
                            {products.slice(0, 6).map((product) => (
                                <div key={product._id} className="col-md-4 mb-3">
                                    <div className="card">
                                        <img
                                            src={product.images[0]?.url}
                                            className="card-img-top"
                                            alt={product.name}
                                            style={{ height: '200px', objectFit: 'cover' }}
                                        />
                                        <div className="card-body">
                                            <h5 className="card-title">{product.name}</h5>
                                            <p className="card-text">${product.price}</p>
                                            <p className="card-text">
                                                <small className="text-muted">
                                                    Stock: {product.stock}
                                                </small>
                                            </p>
                                            <button
                                                className="btn btn-success btn-sm"
                                                onClick={() => handleAddToCart(product._id)}
                                                disabled={product.stock === 0}
                                            >
                                                Add to Cart
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Cart Section */}
            {cartItems.length > 0 && (
                <div className="card">
                    <div className="card-header">
                        <h4>Cart Items</h4>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            {cartItems.map((item) => (
                                <div key={item.product} className="col-md-6 mb-2">
                                    <div className="d-flex align-items-center">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                            className="me-3"
                                        />
                                        <div>
                                            <h6 className="mb-0">{item.name}</h6>
                                            <small>Qty: {item.quantity} × ${item.price}</small>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ReduxExample;
