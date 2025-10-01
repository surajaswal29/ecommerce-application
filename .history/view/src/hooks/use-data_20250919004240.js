import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';
import {
  fetchProducts,
  fetchProductDetails,
  fetchOrders,
  createOrder,
  fetchOrderDetails,
  addToCart,
  removeFromCart,
  updateCartQuantity,
  saveShippingInfo,
  clearDataError,
  clearCart,
} from '../store/slices/dataSlice';

/**
 * Custom hook for data state and actions
 * @returns {Object} Data state and actions
 */
export const useData = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data);

  // Product actions
  const getProducts = useCallback(
    (params) => dispatch(fetchProducts(params)),
    [dispatch]
  );

  const getProductDetails = useCallback(
    (productId) => dispatch(fetchProductDetails(productId)),
    [dispatch]
  );

  // Order actions
  const getOrders = useCallback(
    () => dispatch(fetchOrders()),
    [dispatch]
  );

  const createNewOrder = useCallback(
    (orderData) => dispatch(createOrder(orderData)),
    [dispatch]
  );

  const getOrderDetails = useCallback(
    (orderId) => dispatch(fetchOrderDetails(orderId)),
    [dispatch]
  );

  // Cart actions
  const addItemToCart = useCallback(
    (productId, quantity) => dispatch(addToCart({ productId, quantity })),
    [dispatch]
  );

  const removeItemFromCart = useCallback(
    (productId) => dispatch(removeFromCart(productId)),
    [dispatch]
  );

  const updateItemQuantity = useCallback(
    (productId, quantity) => dispatch(updateCartQuantity({ productId, quantity })),
    [dispatch]
  );

  const saveShipping = useCallback(
    (shippingInfo) => dispatch(saveShippingInfo(shippingInfo)),
    [dispatch]
  );

  const clearCartData = useCallback(
    () => dispatch(clearCart()),
    [dispatch]
  );

  const clearError = useCallback(
    (section) => dispatch(clearDataError({ section })),
    [dispatch]
  );

  // Computed values
  const cartItemsCount = data.cart.items.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = data.cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);

  return {
    // Products
    products: data.products.items,
    productsLoading: data.products.loading,
    productsError: data.products.error,
    productsCount: data.products.totalCount,
    
    // Product Details
    productDetails: data.productDetails.item,
    productDetailsLoading: data.productDetails.loading,
    productDetailsError: data.productDetails.error,
    
    // Orders
    orders: data.orders.items,
    ordersLoading: data.orders.loading,
    ordersError: data.orders.error,
    
    // Order Details
    orderDetails: data.orderDetails.item,
    orderDetailsLoading: data.orderDetails.loading,
    orderDetailsError: data.orderDetails.error,
    
    // Cart
    cartItems: data.cart.items,
    cartLoading: data.cart.loading,
    cartError: data.cart.error,
    cartItemsCount,
    cartTotal,
    shippingInfo: data.cart.shippingInfo,
    
    // Actions
    getProducts,
    getProductDetails,
    getOrders,
    createNewOrder,
    getOrderDetails,
    addItemToCart,
    removeItemFromCart,
    updateItemQuantity,
    saveShipping,
    clearCartData,
    clearError,
  };
};

export default useData;
