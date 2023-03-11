// import constants
import {CREATE_ORDER_REQUEST, 
    CREATE_ORDER_SUCCESS, 
    CREATE_ORDER_FAIL, 
    CLEAR_ERRORS,
    MY_ORDER_REQUEST,
    MY_ORDER_SUCCESS,
    MY_ORDER_FAIL} from "../constants/orderConstants";

// import axios
import axios from "axios";
import { MAIN_URI } from "../service/helper";

// Create Order
export const createOrder = (order)=> async (dispatch, getState)=>{
    console.log(JSON.stringify(order));
    try {
        dispatch({type:CREATE_ORDER_REQUEST});

        const config = { headers: { "Content-Type": "application/json" } };

        const {data} = await axios.post(`${MAIN_URI}/api/v1/order/new`,order,config);
            console.log(data);
        dispatch({type:CREATE_ORDER_SUCCESS, payload:data});

    } catch (error) {
        dispatch({
            type:CREATE_ORDER_FAIL,
            payload:error.response.data.message,
        });
    }
};

// My orders
export const myOrders = ()=> async (dispatch)=>{
    try {
        dispatch({type:MY_ORDER_REQUEST});

        const {data} = await axios.get(`${MAIN_URI}/api/v1/orders/me`)

        dispatch({
            type:MY_ORDER_SUCCESS,
            payload:data.orders,

        })
        
        console.log(data);
    } catch (error) {
        dispatch({
            type:MY_ORDER_FAIL,
            payload:error.response.data.message
        })
    }
}

// Clear Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};