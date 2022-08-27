import axios from "axios"
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../ActionCreators/CartActionCreator"

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