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


//UPDATE
export const updateLocation = (dispatch, location) => {
    axios.put(AppConstants.REST_URL_HOST + AppConstants.INVENTORY_LOCATION_URL, location)
        .then(response => {
            dispatch(updateLocationSuccess({...response.data}))
        })
        .catch(error => {
            console.log(error)
        }) 
}

export const updateLocationSuccess = (data) =>  {
return {
    type: ActionTypes.UPDATE_LOCATION_SUCCESS,
    payload: data
}
}

//CREATE
export const createLocation = (data,dispatch) => {
    const location = data;
    axios.post(AppConstants.REST_URL_HOST + AppConstants.INVENTORY_LOCATION_URL, location )
        .then(response => {
            const id = response;
            console.log(id)
                    dispatch(createLocationSuccess(response.data))
        })

}

export const createLocationSuccess = (data) => {
    return {
        type: ActionTypes.CREATE_LOCATION_SUCCESS  ,
        payload: data
    }
}

//DELETE
export const deleteLocation = (dispatch, locationId) => {
        axios.delete(AppConstants.REST_URL_HOST + AppConstants.INVENTORY_LOCATION_URL + '/' + locationId)
            .then(response => {
                dispatch(deleteLocationSuccess( locationId ))
            })
            .catch(error => {
                console.log(error)
            }) 
}

export const deleteLocationSuccess = (data) =>  {
    return {
        type: ActionTypes.DELETE_LOCATION_SUCCESS,
        payload: data
    }
}