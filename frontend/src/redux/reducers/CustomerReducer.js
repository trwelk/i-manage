import { ActionTypes } from "../constants/ActionTypes";
import { store } from '../Store'
const initialState = {
    customer: null,
    isLoading: false,
    error: null,
}
export const CustomerReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ActionTypes.CUSTOMER_SIGNUP_SUCCESS:
            return { ...state, customer: payload }
        case ActionTypes.CUSTOMER_UPDATE_SUCCESS:
            return { ...state, customer: payload }
        case ActionTypes.CUSTOMER_DELETE_SUCCESS:
            window.sessionStorage.removeItem("jwtToken");
            return {customer:null}
        default:
            return state;
    }
}