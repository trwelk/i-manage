import { ActionTypes } from "../constants/ActionTypes";
import { store } from '../Store'
const initialState = {
    purchaseReqs: [],
    isLoading: false,
    error: null,
}
export const PurchaseReqReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ActionTypes.FETCH_PURCHASE_REQ_SUCCESS:
            return { ...state, purchaseReqs: payload }
        case ActionTypes.DELETE_PURCHASE_REQ_SUCCESS:
            let remainingPurchaseReqs = state.purchaseReqs.filter(item => item.id !== payload)
            return { ...state, purchaseReqs: remainingPurchaseReqs }
        case ActionTypes.CREATE_PURCHASE_REQ_SUCCESS:
            return { ...state, purchaseReqs: [...state.purchaseReqs, payload] }
        case ActionTypes.UPDATE_PURCHASE_REQ_SUCCESS:
            let oldPurchaseReqs = state.purchaseReqs
            let newPurchaseReqs = oldPurchaseReqs.filter(item => item.id !== payload.id)
            newPurchaseReqs.push(payload)
            return { ...state, purchaseReqs: newPurchaseReqs }
        default:
            return state;
    }
}