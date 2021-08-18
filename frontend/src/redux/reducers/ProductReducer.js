import { ActionTypes } from "../constants/ActionTypes";
import { store } from '../Store'
const initialState = {
    products: [],
    isLoading: false,
    error: null,
}
export const ProductReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ActionTypes.FETCH_PRODUCT_SUCCESS:
            return { ...state, products: payload }
        case ActionTypes.DELETE_PRODUCT_SUCCESS:
            let remainingProducts = state.products.filter(item => item.id !== payload)
            return { ...state, products: remainingProducts }
        case ActionTypes.CREATE_PRODUCT_SUCCESS:
            return { ...state, products: [...state.products, payload] }
        case ActionTypes.UPDATE_PRODUCT_SUCCESS:
            let oldProducts = state.products
            let newProducts = oldProducts.filter(item => item.id !== payload.id)
            newProducts.push(payload)
            return { ...state, products: newProducts }

        default:
            return state;
    }
}