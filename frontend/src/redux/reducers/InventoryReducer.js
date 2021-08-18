import { ActionTypes } from "../constants/ActionTypes";

const initialState = {
    inventory: [],
    isLoading: false,
    error: null,
    parentLocation:""
}
export const InventoryReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ActionTypes.FETCH_INVENTORY_SUCCESS:
            return { ...state, inventory: payload }
        case ActionTypes.INVENTORY_LOADING:
            return { ...state, isLoading: payload }
        case ActionTypes.CREATE_INVENTORY_SUCCESS:
            return { ...state, inventory: [...state.inventory, payload] }
        case ActionTypes.UPDATE_INVENTORY_SUCCESS:
            let oldInventory = state.inventory
            let newInventory = oldInventory.filter(item => item.id !== payload.id)
            newInventory.push(payload)
            return { ...state, inventory: newInventory }
        case ActionTypes.DELETE_INVENTORY_SUCCESS:
            let remainingInventory = state.inventory.filter(item => item.id !== payload)
            return { ...state, inventory: remainingInventory }
        case ActionTypes.INVENTORY_LOCATION_SELECTED:
                return { ...state, parentLocation: payload }


        default:
            return state;
    }
}