import { applyMiddleware, createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from "redux-thunk"
import { CartReducer } from './Reducers/CartReducer';
import { fetchProductsReducer,fetchSingleProductReducer } from './Reducers/productReducer';
import { SignupReducer,LoginReducer, UpdateProfileReducer,FetchProfileReducer } from './Reducers/UsersReducer';

const reducer = combineReducers({
    fetchProducts: fetchProductsReducer,
    fetchSingleProduct: fetchSingleProductReducer,
    cart: CartReducer,
    signupDetails: SignupReducer,
    loginDetails: LoginReducer,
    updateProfile: UpdateProfileReducer,
    fetchProfile:FetchProfileReducer
});

const cartItemsFromStorage = localStorage.getItem("cartItems")? JSON.parse(localStorage.getItem("cartItems")):[]
const loggedInFromStorage = localStorage.getItem("loggedIn")? JSON.parse(localStorage.getItem("loggedIn")):null
const signedInFromStorage = localStorage.getItem("loggedIn")? JSON.parse(localStorage.getItem("loggedIn")):null
const shippingAddressFromStorage = localStorage.getItem("shippingAddress")? JSON.parse(localStorage.getItem("shippingAddress")):{}
const paymentMethodFromStorage = localStorage.getItem("paymentMethod")? JSON.parse(localStorage.getItem("paymentMethod")):""
const initialState = {
    cart: { cartItems: cartItemsFromStorage,shippingAddress:shippingAddressFromStorage,paymentMethod:paymentMethodFromStorage },
    loginDetails: { loginDetails: loggedInFromStorage },
    signupDetails:{userDetail:signedInFromStorage}
}
const middleware = [thunk]
const store = createStore(
     reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)
export default store