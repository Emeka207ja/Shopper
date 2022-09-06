import { CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, CREATE_ORDER_FAIL } from "../ActionCreators/OrderActionCreator";

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