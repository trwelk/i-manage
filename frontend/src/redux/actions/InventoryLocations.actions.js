import axios from 'axios'
import {ActionTypes} from  '../constants/ActionTypes'
import {AppConstants} from '../constants/AppConstants'

export const fetchInventoryLocationsSuccess = (data) =>  {
    return {
        type: ActionTypes.FETCH_INVENTORY_LOCATIONS_SUCCESS,
        payload: data
    }
}


export const fetchInventoryLocations = (dispatch) => {
        axios.get(AppConstants.REST_URL_HOST + AppConstants.INVENTORY_LOCATION_URL)
            .then(response => {
                dispatch(fetchInventoryLocationsSuccess(response.data))
            })
            .catch(error => {
                console.log(error)
            }) 
}

export const setSelectedInventoryLocation = (data) => {
    return {
        type: ActionTypes.INVENTORY_LOCATION_SELECTED,
        payload: data
    }
}