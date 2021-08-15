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
                return location.locationName === payload
            })[0];
            console.log(selectedLocation)
            if(selectedLocation)
                return { ...state, selectedInventory: selectedLocation }
            else
                return { ...state, selectedInventory: null }

        default:
            return state;
    }
}