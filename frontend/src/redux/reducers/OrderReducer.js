import { ActionTypes } from "../constants/ActionTypes";
const initialState = {
    orders: [],
    isLoading: false,
    error: null,
}
export const OrderReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ActionTypes.FETCH_ORDERS_SUCCESS:
            return { ...state, orders: payload }
        case ActionTypes.DELETE_ORDER_SUCCESS:
            let remainingOrders = state.orders.filter(item => item.id !== payload)
            return { ...state, orders: remainingOrders }
        case ActionTypes.CREATE_ORDER_SUCCESS:
            return { ...state, orders: [...state.orders, payload] }
        case ActionTypes.UPDATE_ORDER_SUCCESS:
            let oldOrders = state.orders
            let newOrders = oldOrders.filter(item => item.id !== payload.id)
            newOrders.push(payload)
            return { ...state, orders: newOrders }

        default:
            return state;
    }
}