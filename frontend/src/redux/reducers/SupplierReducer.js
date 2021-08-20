import { ActionTypes } from "../constants/ActionTypes";
import { store } from '../Store'
const initialState = {
    suppliers: [],
    isLoading: false,
    error: null,
}
export const SupplierReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ActionTypes.FETCH_SUPPLIER_SUCCESS:
            return { ...state, suppliers: payload }
        case ActionTypes.DELETE_SUPPLIER_SUCCESS:
            let remainingSuppliers = state.suppliers.filter(item => item.id !== payload)
            return { ...state, suppliers: remainingSuppliers }
        case ActionTypes.CREATE_SUPPLIER_SUCCESS:
            return { ...state, suppliers: [...state.suppliers, payload] }
        case ActionTypes.UPDATE_SUPPLIER_SUCCESS:
            let oldSuppliers = state.suppliers
            let newSuppliers = oldSuppliers.filter(item => item.id !== payload.id)
            newSuppliers.push(payload)
            return { ...state, suppliers: newSuppliers }
        default:
            return state;
    }
}