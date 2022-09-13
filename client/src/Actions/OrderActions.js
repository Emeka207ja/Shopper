
import axios from "axios"
import { CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, CREATE_ORDER_FAIL,GET_ORDER_REQUEST,GET_ORDER_SUCCESS,GET_ORDER_FAIL,ORDER_PAY_REQUEST,ORDER_PAY_SUCCESS,ORDER_PAY_FAIL,ORDER_PAY_RESET,GET_PAYSTACK_CLIENT_ID_REQUEST,GET_PAYSTACK_CLIENT_ID_SUCCESS,GET_PAYSTACK_CLIENT_ID_FAIL } from "../ActionCreators/OrderActionCreator"

export const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({
            type:CREATE_ORDER_REQUEST
        })
        const { loginDetails: { loginDetails } } = getState()
       
        const { signupDetails:{userDetail} } = getState()
         console.log(userDetail.token)
        const Config = {
            headers: {
                "Content-Type": "application/json",
                Authorization : `Bearer ${loginDetails?.token || userDetail?.token}`
            }
        }
        const { data } = await axios.post("/api/orders", order, Config)
       
        dispatch({
            type: CREATE_ORDER_SUCCESS,
            payload:data
        })
    } catch (error) {
       
        dispatch({
            type: CREATE_ORDER_FAIL,
            payload:error.response?.data.message
        })
    }
}

export const getOrder = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: GET_ORDER_REQUEST })
         const { loginDetails: { loginDetails } } = getState()
       
        const { signupDetails:{userDetail} } = getState()
        
        const Config = {
            headers: {
                "Content-Type": "application/json",
                Authorization : `Bearer ${loginDetails?.token || userDetail?.token}`
            }
        }
        const { data } = await axios.get(`/api/orders/${id}`, Config)
       
        dispatch({
            type: GET_ORDER_SUCCESS,
            payload:data
        })
        
    } catch (error) {
         
        dispatch({
            type: GET_ORDER_FAIL,
            payload:error.response?.data.message
        })
    }
}

export const orderPay = (id,paymentResult,email) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_PAY_REQUEST })
        const { loginDetails: { loginDetails } } = getState()
       
        const { signupDetails:{userDetail} } = getState()
        
        const Config = {
            headers: {
                "Content-Type": "application/json",
                Authorization : `Bearer ${loginDetails?.token || userDetail?.token}`
            }
        }
        const { data } = await axios.put(`/api/orders/${id}`, { paymentResult,email }, Config)
        dispatch({
            type: ORDER_PAY_SUCCESS,
            payload:data
        })
        
    } catch (error) {
        dispatch({
            type: ORDER_PAY_FAIL,
            payload:error.response.data.message
        })
    }
}

export const getPaystackClientId = () => async (dispatch, getState) => {
    try {
        dispatch({ type: GET_PAYSTACK_CLIENT_ID_REQUEST })
         const { loginDetails: { loginDetails } } = getState()
       
        const { signupDetails:{userDetail} } = getState()
        
        const Config = {
            headers: {
                "Content-Type": "application/json",
                Authorization : `Bearer ${loginDetails?.token || userDetail?.token}`
            }
        }
        const { data } = await axios.get("/api/users/paystack",Config)
        
        dispatch({
            type: GET_PAYSTACK_CLIENT_ID_SUCCESS,
            payload:data
        })
        console.log(data)
    } catch (error) {
         dispatch({
            type: GET_PAYSTACK_CLIENT_ID_FAIL,
            payload:error.response.data.message
        })
    }
}