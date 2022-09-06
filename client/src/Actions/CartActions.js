import axios from "axios"
import { CART_ADD_ITEM, CART_PAYMENT_METHOD, CART_REMOVE_ITEM,CART_SHIPPING_ADDRESS } from "../ActionCreators/CartActionCreator"

export const addToCartHandler = (id, qty) => async (dispatch, getState) => {
    try {
        const { data } = await axios.get(`/api/products/${id}`)
        // console.log(data)
        dispatch({
            type: CART_ADD_ITEM,
            payload: {
                product: data?.[0]._id,
                name: data?.[0].name,
                image:data?.[0].image,
                price: data?.[0].price,
                countInStock: data?.[0].countInStock,
                qty
            }
        })
        localStorage.setItem("cartItems",JSON.stringify(getState().cart.cartItems))
    } catch (error) {
        console.log(error)
    }
}

export const removeFromCartHandler = (idx) => async (dispatch, getState) => {
    console.log("id",idx)
    dispatch({ type: CART_REMOVE_ITEM, payload: idx })
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))
}

export const cartShippingAddress = (data) => (dispatch) => {
    dispatch({ type: CART_SHIPPING_ADDRESS, payload: data });
    localStorage.setItem("shippingAddress",JSON.stringify(data))
}
export const cartPaymentMethod = (paymentMethod) => (dispatch) => {
    dispatch({ type: CART_PAYMENT_METHOD, payload: paymentMethod });
    localStorage.setItem("paymentMethod",JSON.stringify(paymentMethod))
}