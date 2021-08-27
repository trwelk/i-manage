import { ActionTypes } from "../constants/ActionTypes";
const initialState = {
    cart: null,
    isLoading: false,
    error: null,
}
export const CartReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ActionTypes.CART_CREATE_SUCCESS:
            return { ...state, cart: payload }
        case ActionTypes.CART_UPDATE_SUCCESS:
            return { ...state, cart: payload }
        case ActionTypes.FETCH_CART_SUCCESS:
            return { ...state, cart: payload }
        default:
            return state;
    }
}