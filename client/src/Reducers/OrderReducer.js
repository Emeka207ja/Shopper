import { CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, CREATE_ORDER_FAIL,GET_ORDER_REQUEST,GET_ORDER_SUCCESS,GET_ORDER_FAIL,ORDER_PAY_REQUEST,ORDER_PAY_SUCCESS,ORDER_PAY_FAIL,ORDER_PAY_RESET,GET_PAYSTACK_CLIENT_ID_REQUEST,GET_PAYSTACK_CLIENT_ID_SUCCESS,GET_PAYSTACK_CLIENT_ID_FAIL } from "../ActionCreators/OrderActionCreator";

export const OrderReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case CREATE_ORDER_REQUEST:
            return { loading: true };
        case CREATE_ORDER_SUCCESS:
            return { loading: false, success: true, order: payload };
        case CREATE_ORDER_FAIL:
            return { loading: false, error: payload };
        default:
            return state;
    }
}

export const getOrderReducer = (state = {}, { type, payload }) => {
    switch(type){
        case GET_ORDER_REQUEST:
            return { loading: true };
        case GET_ORDER_SUCCESS:
            return { loading: false, orderItems: payload };
        case GET_ORDER_FAIL:
            return { loading: false, error: payload };
        default:
            return state;
    }
}

export const orderPayReducer = (state={},{type,payload}) => {
    switch (type) {
        case ORDER_PAY_REQUEST:
            return { loading: false };
        case ORDER_PAY_SUCCESS:
            return { loading: false, success: true, paymentResult: payload };
        case ORDER_PAY_FAIL:
            return { loading: false, error: payload };
        case ORDER_PAY_RESET:
            return {};
        default:
            return state;
    }
}

export const getPaypalClientIdReducer = (state={},{type,payload}) => {
    switch (type) {
        case GET_PAYSTACK_CLIENT_ID_REQUEST:
            return { loading: true };
        case GET_PAYSTACK_CLIENT_ID_SUCCESS:
            return { loading: false, clientId: payload };
        case GET_PAYSTACK_CLIENT_ID_FAIL:
            return { loading: false, paypalError: payload };
        default:
            return state;
    }
}