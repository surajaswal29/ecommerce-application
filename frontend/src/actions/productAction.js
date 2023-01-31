import axios from "axios";

import {
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  CLEAR_ERRORS,
} from "../constants/productConstants";

//API URI
import { MAIN_URI } from "../service/helper";

export const getProduct = (
  keyword = "",
  category,
  currentPage = 1,
  price = [0, 50000]
) => async (dispatch) => {
  try {
    dispatch({ type: ALL_PRODUCT_REQUEST });

    // creating separate API Link
    let link;

    if (!category) {
      link = `${MAIN_URI}/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}`;
    } else {
      link = `${MAIN_URI}/api/v1/products?keyword=${keyword}&category=${category
        .toString()
        .toLowerCase()}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${
        price[1]
      }`;
    }
    console.log(link);
    const { data } = await axios.get(link);
    dispatch({ type: ALL_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ALL_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    const { data } = await axios.get(`${MAIN_URI}/api/v1/product/${id}`);

    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data.product });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
