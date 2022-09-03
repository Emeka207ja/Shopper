import { SIGNUP_FAIL, SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNIN_REQUEST,SIGNIN_SUCCESS,SIGNIN_FAIL,UPDATE_PROFILE_REQUEST,UPDATE_PROFILE_SUCCESS,UPDATE_PROFILE_FAIL,FETCH_PROFILE_REQUEST,FETCH_PROFILE_SUCCESS,FETCH_PROFILE_FAIL, SIGNIN_OUT } from "../ActionCreators/UserAccessActionCreator";


export const SignupReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case SIGNUP_REQUEST:
            return { loading: true };
        case SIGNUP_SUCCESS:
            return { loading: false, userDetail: payload };
        case SIGNUP_FAIL:
            return { loading: false, error: payload };
        default:
            return state;
            
    }
}

export const LoginReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case SIGNIN_REQUEST:
            return { loading: true };
        case SIGNIN_SUCCESS:
            return { loading: false, loginDetails: payload };
        case SIGNIN_FAIL:
            return { loading: false, error: payload };
        case SIGNIN_OUT:
            return {};
        default:
            return state;
            
    }
}
export const UpdateProfileReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case UPDATE_PROFILE_REQUEST:
            return { loading: true };
        case UPDATE_PROFILE_SUCCESS:
            return { loading: false, success: payload };
        case UPDATE_PROFILE_FAIL:
            return { loading: false, error: payload };
        default:
            return state;
            
    }
}
export const FetchProfileReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case FETCH_PROFILE_REQUEST:
            return { loading: true };
        case FETCH_PROFILE_SUCCESS:
            return { loading: false, userDetail: payload };
        case FETCH_PROFILE_FAIL:
            return { loading: false, error: payload };
        default:
            return state;
            
    }
}