import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiService } from '../../service/apiService';

// Initial state
const initialState = {
  // Products
  products: {
    items: [],
    totalCount: 0,
    loading: false,
    error: null,
  },
  productDetails: {
    item: null,
    loading: false,
    error: null,
  },

  // Orders
  orders: {
    items: [],
    totalCount: 0,
    loading: false,
    error: null,
  },
  orderDetails: {
    item: null,
    loading: false,
    error: null,
  },

  // Cart
  cart: {
    items: JSON.parse(localStorage.getItem('cartItems') || '[]'),
    shippingInfo: JSON.parse(localStorage.getItem('shippingInfo') || '{}'),
    loading: false,
    error: null,
  },
};

// Product async thunks
export const fetchProducts = createAsyncThunk(
  'data/fetchProducts',
  async (params = {}, { rejectWithValue }) => {
    try {
      const data = await apiService.product.getAllProducts(params);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch products'
      );
    }
  }
);

export const fetchProductDetails = createAsyncThunk(
  'data/fetchProductDetails',
  async (productId, { rejectWithValue }) => {
    try {
      const data = await apiService.product.getProductDetails(productId);
      return data.product;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch product details'
      );
    }
  }
);

// Order async thunks
export const fetchOrders = createAsyncThunk(
  'data/fetchOrders',
  async (_, { rejectWithValue }) => {
    try {
      const data = await apiService.order.getMyOrders();
      return data.orders;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch orders'
      );
    }
  }
);

export const createOrder = createAsyncThunk(
  'data/createOrder',
  async (orderData, { rejectWithValue }) => {
    try {
      const data = await apiService.order.createOrder(orderData);
      return data.order;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to create order'
      );
    }
  }
);

export const fetchOrderDetails = createAsyncThunk(
  'data/fetchOrderDetails',
  async (orderId, { rejectWithValue }) => {
    try {
      const data = await apiService.order.getOrderDetails(orderId);
      return data.order;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch order details'
      );
    }
  }
);

// Cart async thunks
export const addToCart = createAsyncThunk(
  'data/addToCart',
  async ({ productId, quantity }, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const existingItem = state.data.cart.items.find(
        (item) => item.product === productId
      );

      let newItems;
      if (existingItem) {
        newItems = state.data.cart.items.map((item) =>
          item.product === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // For new items, we need to fetch product details
        const data = await apiService.product.getProductDetails(productId);
        const product = data.product;

        newItems = [
          ...state.data.cart.items,
          {
            product: productId,
            name: product.name,
            price: product.price,
            image: product.images[0].url,
            stock: product.stock,
            quantity,
          },
        ];
      }

      // Save to localStorage
      localStorage.setItem('cartItems', JSON.stringify(newItems));

      return newItems;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to add to cart'
      );
    }
  }
);

export const removeFromCart = createAsyncThunk(
  'data/removeFromCart',
  async (productId, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const newItems = state.data.cart.items.filter(
        (item) => item.product !== productId
      );

      // Save to localStorage
      localStorage.setItem('cartItems', JSON.stringify(newItems));

      return newItems;
    } catch (error) {
      return rejectWithValue('Failed to remove from cart');
    }
  }
);

export const updateCartQuantity = createAsyncThunk(
  'data/updateCartQuantity',
  async ({ productId, quantity }, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const newItems = state.data.cart.items
        .map((item) =>
          item.product === productId ? { ...item, quantity } : item
        )
        .filter((item) => item.quantity > 0);

      // Save to localStorage
      localStorage.setItem('cartItems', JSON.stringify(newItems));

      return newItems;
    } catch (error) {
      return rejectWithValue('Failed to update cart quantity');
    }
  }
);

export const saveShippingInfo = createAsyncThunk(
  'data/saveShippingInfo',
  async (shippingInfo, { rejectWithValue }) => {
    try {
      // Save to localStorage
      localStorage.setItem('shippingInfo', JSON.stringify(shippingInfo));
      return shippingInfo;
    } catch (error) {
      return rejectWithValue('Failed to save shipping info');
    }
  }
);

// Data slice
const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    clearDataError: (state, action) => {
      const { section } = action.payload;
      if (section && state[section]) {
        state[section].error = null;
      }
    },
    clearCart: (state) => {
      state.cart.items = [];
      state.cart.shippingInfo = {};
      localStorage.removeItem('cartItems');
      localStorage.removeItem('shippingInfo');
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Products
      .addCase(fetchProducts.pending, (state) => {
        state.products.loading = true;
        state.products.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products.loading = false;
        state.products.items = action.payload.products;
        state.products.totalCount = action.payload.productsCount;
        state.products.error = null;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.products.loading = false;
        state.products.error = action.payload;
      })

      // Fetch Product Details
      .addCase(fetchProductDetails.pending, (state) => {
        state.productDetails.loading = true;
        state.productDetails.error = null;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.productDetails.loading = false;
        state.productDetails.item = action.payload;
        state.productDetails.error = null;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.productDetails.loading = false;
        state.productDetails.error = action.payload;
      })

      // Fetch Orders
      .addCase(fetchOrders.pending, (state) => {
        state.orders.loading = true;
        state.orders.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.orders.loading = false;
        state.orders.items = action.payload;
        state.orders.error = null;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.orders.loading = false;
        state.orders.error = action.payload;
      })

      // Create Order
      .addCase(createOrder.pending, (state) => {
        state.orders.loading = true;
        state.orders.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orders.loading = false;
        state.orders.items.unshift(action.payload);
        state.orders.error = null;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.orders.loading = false;
        state.orders.error = action.payload;
      })

      // Fetch Order Details
      .addCase(fetchOrderDetails.pending, (state) => {
        state.orderDetails.loading = true;
        state.orderDetails.error = null;
      })
      .addCase(fetchOrderDetails.fulfilled, (state, action) => {
        state.orderDetails.loading = false;
        state.orderDetails.item = action.payload;
        state.orderDetails.error = null;
      })
      .addCase(fetchOrderDetails.rejected, (state, action) => {
        state.orderDetails.loading = false;
        state.orderDetails.error = action.payload;
      })

      // Add to Cart
      .addCase(addToCart.pending, (state) => {
        state.cart.loading = true;
        state.cart.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.cart.loading = false;
        state.cart.items = action.payload;
        state.cart.error = null;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.cart.loading = false;
        state.cart.error = action.payload;
      })

      // Remove from Cart
      .addCase(removeFromCart.pending, (state) => {
        state.cart.loading = true;
        state.cart.error = null;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.cart.loading = false;
        state.cart.items = action.payload;
        state.cart.error = null;
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.cart.loading = false;
        state.cart.error = action.payload;
      })

      // Update Cart Quantity
      .addCase(updateCartQuantity.pending, (state) => {
        state.cart.loading = true;
        state.cart.error = null;
      })
      .addCase(updateCartQuantity.fulfilled, (state, action) => {
        state.cart.loading = false;
        state.cart.items = action.payload;
        state.cart.error = null;
      })
      .addCase(updateCartQuantity.rejected, (state, action) => {
        state.cart.loading = false;
        state.cart.error = action.payload;
      })

      // Save Shipping Info
      .addCase(saveShippingInfo.fulfilled, (state, action) => {
        state.cart.shippingInfo = action.payload;
      });
  },
});

export const { clearDataError, clearCart } = dataSlice.actions;
export default dataSlice.reducer;
