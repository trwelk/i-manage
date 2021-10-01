import axios from 'axios'
import {ActionTypes} from  '../constants/ActionTypes'
import {AppConstants} from '../constants/AppConstants'

export const fetchOrdersSuccess = (data) =>  {
    return {
        type: ActionTypes.FETCH_ORDERS_SUCCESS,
        payload: data
    }
}


export const fetchOrders = (dispatch) => {
        axios.get(AppConstants.REST_URL_HOST + AppConstants.ORDER_URL)
            .then(response => {
                dispatch(fetchOrdersSuccess(response.data))
            })
            .catch(error => {
                console.log(error)
            }) 
}

//UPDATE
export const updateOrder = (dispatch, order) => {
    axios.put(AppConstants.REST_URL_HOST + AppConstants.ORDER_URL, order)
        .then(response => {
            console.log(response)
            dispatch(updateOrderSuccess({...response.data}))
        })
        .catch(error => {
            console.log(error)
        }) 
}

export const updateOrderSuccess = (data) =>  {
return {
    type: ActionTypes.UPDATE_ORDER_SUCCESS,
    payload: data
}
}

//CREATE
export const createOrder = (data,dispatch) => {
    const order = data;
    axios.post(AppConstants.REST_URL_HOST + AppConstants.ORDER_URL, order )
        .then(response => {
            const id = response;
                    dispatch(createOrderSuccess(response.data))
            console.log(id);
        })
        .catch(error => {
            console.log(error)

        })

}

export const createOrderSuccess = (data) => {
    return {
        type: ActionTypes.CREATE_ORDER_SUCCESS,
        payload: data
    }
}

//DELETE
export const deleteOrder = (dispatch, orderId) => {
        axios.delete(AppConstants.REST_URL_HOST + AppConstants.ORDER_URL + '/' + orderId)
            .then(response => {
                console.log(response)
                dispatch(deleteOrderSuccess( orderId ))
            })
            .catch(error => {
                console.log(error)
            }) 
}

export const deleteOrderSuccess = (data) =>  {
    return {
        type: ActionTypes.DELETE_ORDER_SUCCESS,
        payload: data
    }
}


export const validateOrderObj = (data) => {
    if (data.userId == null || data.userId === "") {
        return "Field UserId Cannot be empty"
    }
    else if (data.source == null || data.source === "") {
        return "Field Source Cannot be empty"
    }
    else if (data.items == null || data.items === "") {
        return "Field Products Cannot be empty"
    }
    else
        return null;
}