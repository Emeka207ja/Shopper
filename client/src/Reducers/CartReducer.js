import { CART_ADD_ITEM, CART_PAYMENT_METHOD, CART_REMOVE_ITEM,CART_SHIPPING_ADDRESS} from "../ActionCreators/CartActionCreator";


export const CartReducer = (state = {cartItems:[],shippingAddress:{},paymentMethod:""}, { type, payload }) => {
    switch (type) {
        case CART_ADD_ITEM:
            const item = payload;
            const itemExist = state.cartItems.find(x => x.product === item.product);
            if (itemExist) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(x => x.product === itemExist.product? item : x)
                }
             } else {
                return {
                    ...state,
                    cartItems:[...state.cartItems,item]
                    
                }
            }
        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter(x => x.product !== payload)
            };
        case CART_SHIPPING_ADDRESS:
            return { ...state, shippingAddress: payload };
        case CART_PAYMENT_METHOD:
            return{...state,paymentMethod:payload}
        default:
            return state;
    }
}