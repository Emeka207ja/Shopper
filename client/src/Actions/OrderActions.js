
import axios from "axios"
import { CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, CREATE_ORDER_FAIL } from "../ActionCreators/OrderActionCreator"

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