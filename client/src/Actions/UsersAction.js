import axios from "axios"

import { SIGNUP_FAIL, SIGNUP_REQUEST, SIGNUP_SUCCESS,SIGNIN_REQUEST,SIGNIN_SUCCESS,SIGNIN_FAIL, UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_FAIL, FETCH_PROFILE_REQUEST,FETCH_PROFILE_SUCCESS,FETCH_PROFILE_FAIL, SIGNIN_OUT } from "../ActionCreators/UserAccessActionCreator"

export const userSignupHandler = (name, email, password) => async (dispatch, getState) => {
    try {
        dispatch({ type: SIGNUP_REQUEST });
        const { data } = await axios.post("/api/users/signup", { name, email, password })
        localStorage.setItem("loggedIn",JSON.stringify(data))
        dispatch({type:SIGNUP_SUCCESS,payload:data})
    } catch (error) {
        dispatch({type:SIGNUP_FAIL,payload:error.response.data.message})
    }
}

export const userLoginHandler = (email, password) => async (dispatch, getState) => {
    try {
        dispatch({ type: SIGNIN_REQUEST });
        const { data } = await axios.post("/api/users/signin", { email, password })
        localStorage.setItem("loggedIn",JSON.stringify(data))
        dispatch({type:SIGNIN_SUCCESS,payload:data})
    } catch (error) {
        dispatch({type:SIGNIN_FAIL,payload:error.response.data.message})
    }
}
export const userLogoutHandler = () => async (dispatch, getState) => {
    try {
        dispatch({ type: SIGNIN_OUT })
        localStorage.removeItem("loggedIn")
    } catch (error) {
        console.log(error)
    }
}
export const updateProfileHandler = (name,email, password,id) => async (dispatch, getState) => {
    try {
        dispatch({ type: UPDATE_PROFILE_REQUEST });
        const { data } = await axios.post(`/api/users/updateprofile/${id}`, { name, email, password })
        console.log("data",data)
        dispatch({type:UPDATE_PROFILE_SUCCESS,payload:data})
    } catch (error) {
        console.log("error",error.response.data.message)
        dispatch({type:UPDATE_PROFILE_FAIL,payload:error.response.data.message})
    }
}
export const fetchProfileHandler = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: FETCH_PROFILE_REQUEST });
        const { data } = await axios.get(`/api/users/fetchprofile/${id}`)
    
        dispatch({type:FETCH_PROFILE_SUCCESS,payload:data})
    } catch (error) {
        dispatch({type:FETCH_PROFILE_FAIL,payload:error.response.data.message})
    }
}