import axios from 'axios'
import {ActionTypes} from  '../constants/ActionTypes'
import {AppConstants} from '../constants/AppConstants'

export const fetchInventorysSuccess = (data) =>  {
    return {
        type: ActionTypes.FETCH_INVENTORY_SUCCESS,
        payload: data
    }
}


export const fetchInventories = (dispatch) => {
        axios.get(AppConstants.REST_URL_HOST + AppConstants.INVENTORY_URL)
            .then(response => {
                dispatch(fetchInventorysSuccess(response.data))
            })
            .catch(error => {
                console.log(error)
            }) 
}

//UPDATE
export const updateInventory = (dispatch, inventory) => {
    axios.put(AppConstants.REST_URL_HOST + AppConstants.INVENTORY_URL, inventory)
        .then(response => {
            console.log(response)
            dispatch(updateInventorySuccess({...response.data}))
        })
        .catch(error => {
            console.log(error)
        }) 
}

export const updateInventorySuccess = (data) =>  {
return {
    type: ActionTypes.UPDATE_INVENTORY_SUCCESS,
    payload: data
}
}

//CREATE
export const createInventory = (data,dispatch) => {
    const inventory = data;
    console.log(inventory)
    axios.post(AppConstants.REST_URL_HOST + AppConstants.INVENTORY_URL, inventory )
        .then(response => {

            const id = response;
                    dispatch(createInventorySuccess(response.data))
        })
        .catch(error => {
            console.log(error)

        })

}

export const createInventorySuccess = (data) => {
    return {
        type: ActionTypes.CREATE_INVENTORY_SUCCESS  ,
        payload: data
    }
}

//DELETE
export const deleteInventory = (dispatch, inventoryId) => {
        axios.delete(AppConstants.REST_URL_HOST + AppConstants.INVENTORY_URL + '/' + inventoryId)
            .then(response => {
                console.log(response)
                dispatch(deleteInventorySuccess( inventoryId ))
            })
            .catch(error => {
                console.log(error)
            }) 
}

export const deleteInventorySuccess = (data) =>  {
    return {
        type: ActionTypes.DELETE_INVENTORY_SUCCESS,
        payload: data
    }
}


export const validateInvItemObj = (data) => {
    if (data.id == null || data.id == "") {
        return "Field id Cannot be empty"
    }
    else if (data.location == null || data.location == "") {
        return "Field location Cannot be empty"
    }
    else if (data.product == null || data.product == "") {
        return "Field product Date Cannot be empty"
    }
    else if (data.quantity == null || data.quantity == "") {
        return "Field quantity Exp Date Cannot be empty"
    }
    else
        return null;
}