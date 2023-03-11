import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productDetailsReducer,
  productReducer,
} from "./reducers/productReducer";
import { userReducer } from "./reducers/userReducer";
import { updateUserReducer } from "./reducers/updateUserReducer.js";
import { cartReducer } from "./reducers/cartReducers";
import { myOrderReducer, newOrderReducer } from "./reducers/orderReducer";

const reducer = combineReducers({
  products: productReducer,
  productDetails: productDetailsReducer,
  user: userReducer,
  profile: updateUserReducer,
  cart: cartReducer,
  newOrder:newOrderReducer,
  myOrders:myOrderReducer
});

let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
    ? JSON.parse(localStorage.getItem("shippingInfo"))
    : {},
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
