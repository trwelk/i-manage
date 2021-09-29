import { ActionTypes } from "../constants/ActionTypes";
const initialState = {
    cart: null,
    isLoading: true
}
export const CartReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ActionTypes.CART_CREATE_SUCCESS:
            return { ...state, cart: payload[0] }
        case ActionTypes.CART_UPDATE_SUCCESS:
            return { ...state, cart: payload[0], isLoading: true }
        case ActionTypes.FETCH_CART_SUCCESS:
            return { ...state, cart: payload[0], isLoading: false }
        default:
            return state;
    }
}