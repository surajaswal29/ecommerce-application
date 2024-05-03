import axios from "axios";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  LOGOUT_USER_FAIL,
  LOGOUT_USER_SUCCESS,
  CLEAR_ERRORS,
} from "../constants/userConstants";

// API URI
import { MAIN_URI } from "../service/helper";

// Login Action Handler
export const userLogin = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: LOGIN_REQUEST,
    });
    const config = {
      headers: { "Content-Type": "application/json" }
    };
    const { data } = await axios.post(
      `${MAIN_URI}/api/v1/user/login`,
      { email, password },
      config
    );
    //console.log(data);
    dispatch({ type: LOGIN_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: "Server Error",
    });
  }
};

// Register user
export const userRegister = (userData) => async (dispatch) => {
  try {
    dispatch({
      type: REGISTER_USER_REQUEST,
    });

    const config = {
      headers: { "Content-Type": "application/json" }
    }
    //console.log(userData);
    const { data } = await axios.post(
      `${MAIN_URI}/api/v1/user/register`,
      userData,
      config
    );

    console.log(data);

    dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
  } catch (error) {
    console.log(error.response.data.error);
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: error.response.data.error,
    });
  }
};

// Load User
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: LOAD_USER_REQUEST,
    });

    const { data } = await axios.get(`${MAIN_URI}/api/v1/user/me`);
    // console.log(data);
    dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: LOAD_USER_FAIL,
      payload: "Server Error",
    });
  }
};

// update user
export const updateUser = (updateUserData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_USER_REQUEST });

    const config = {
      headers: { "Content-Type": "multipart/form-data" }
    };

    const { data } = await axios.put(
      `${MAIN_URI}/api/v1/user/me/update`,
      updateUserData,
      config
    );

    dispatch({ type: UPDATE_USER_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({ type: UPDATE_USER_FAIL, payload: "Server Error" });
  }
};

// logout
export const logout = () => async (dispatch) => {
  try {
    await axios.get(`${MAIN_URI}/api/v1/user/logout`);
    dispatch({ type: LOGOUT_USER_SUCCESS });
  } catch (error) {
    dispatch({ type: LOGOUT_USER_FAIL, payload: "Server Error" });
  }
};
// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
