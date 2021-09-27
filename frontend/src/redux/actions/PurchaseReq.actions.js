import axios from 'axios'
import {ActionTypes} from  '../constants/ActionTypes'
import {AppConstants} from '../constants/AppConstants'

export const fetchPurchaseReqsSuccess = (data) =>  {
    return {
        type: ActionTypes.FETCH_PURCHASE_REQ_SUCCESS,
        payload: data
    }
}


export const fetchPurchaseReqs = (dispatch) => {
        axios.get(AppConstants.REST_URL_HOST + AppConstants.PURCHASE_REQUEST_URL)
            .then(response => {
                dispatch(fetchPurchaseReqsSuccess(response.data))
            })
            .catch(error => {
                console.log(error)
            }) 
}

//UPDATE
export const updatePurchaseReq = (dispatch, purchaseReq) => {
    axios.put(AppConstants.REST_URL_HOST + AppConstants.PURCHASE_REQUEST_URL, purchaseReq)
        .then(response => {
            dispatch(updatePurchaseReqSuccess({...response.data}))
        })
        .catch(error => {
            console.log(error)
        }) 
}

export const updatePurchaseReqSuccess = (data) =>  {
return {
    type: ActionTypes.UPDATE_PURCHASE_REQ_SUCCESS,
    payload: data
}
}

//CREATE
export const createPurchaseReq = (data,dispatch) => {
    const purchaseReq = data;
    console.log(data)
    axios.post(AppConstants.REST_URL_HOST + AppConstants.PURCHASE_REQUEST_URL, purchaseReq )
        .then(response => {
            const id = response;
                    dispatch(createPurchaseReqSuccess(response.data))
        }).catch(err => {
            console.log(err.response)
        })
}

export const createPurchaseReqSuccess = (data) => {
    return {
        type: ActionTypes.CREATE_PURCHASE_REQ_SUCCESS  ,
        payload: data
    }
}

//DELETE
export const deletePurchaseReq = (dispatch, purchaseReqId) => {
        axios.delete(AppConstants.REST_URL_HOST + AppConstants.PURCHASE_REQUEST_URL + '/' + purchaseReqId)
            .then(response => {
                console.log(response)
                dispatch(deletePurchaseReqSuccess( purchaseReqId ))
            })
            .catch(error => {
                console.log(error)
            }) 
}

export const deletePurchaseReqSuccess = (data) =>  {
    return {
        type: ActionTypes.DELETE_PURCHASE_REQ_SUCCESS,
        payload: data
    }
}