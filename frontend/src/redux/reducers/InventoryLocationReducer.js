import { ActionTypes } from "../constants/ActionTypes";
const initialState = {
    inventoryLocations: [],
    isLoading: false,
    error: null,
    selectedInventory: null
}
export const InventoryLocationReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ActionTypes.FETCH_INVENTORY_LOCATIONS_SUCCESS:
            return { ...state, inventoryLocations: payload }
        case ActionTypes.INVENTORY_LOCATION_SELECTED:
            const selectedLocation = state.inventoryLocations.filter(location => {
                return location.id === payload
            })[0];
            if (selectedLocation)
                return { ...state, selectedInventory: selectedLocation }
            else
                return { ...state, selectedInventory: null }
        case ActionTypes.DELETE_LOCATION_SUCCESS:
            let remainingLocations = state.inventoryLocations.filter(item => item.id !== payload)
            return { ...state, inventoryLocations: remainingLocations }
        case ActionTypes.CREATE_LOCATION_SUCCESS:
            return { ...state, inventoryLocations: [...state.inventoryLocations, payload] }
        case ActionTypes.UPDATE_LOCATION_SUCCESS:
            let oldLocation = state.inventoryLocations
            let newLocation = oldLocation.filter(item => item.id !== payload.id)
            newLocation.push(payload)
            return { ...state, inventoryLocations: newLocation }
        default:
            return state;
    }
}