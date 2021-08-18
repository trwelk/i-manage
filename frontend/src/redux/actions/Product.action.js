import axios from 'axios'
import {ActionTypes} from  '../constants/ActionTypes'
import {AppConstants} from '../constants/AppConstants'

export const fetchProductsSuccess = (data) =>  {
    return {
        type: ActionTypes.FETCH_PRODUCT_SUCCESS,
        payload: data
    }
}


export const fetchProducts = (dispatch) => {
        axios.get(AppConstants.REST_URL_HOST + AppConstants.PRODUCT_URL)
            .then(response => {
                dispatch(fetchProductsSuccess(response.data))
            })
            .catch(error => {
                console.log(error)
            }) 
}

//UPDATE
export const updateProduct = (dispatch, product) => {
    axios.put(AppConstants.REST_URL_HOST + AppConstants.PRODUCT_URL, product)
        .then(response => {
            dispatch(updateProductSuccess({...response.data}))
        })
        .catch(error => {
            console.log(error)
        }) 
}

export const updateProductSuccess = (data) =>  {
return {
    type: ActionTypes.UPDATE_PRODUCT_SUCCESS,
    payload: data
}
}

//CREATE
export const createProduct = (data,dispatch) => {
    const product = data;
    axios.post(AppConstants.REST_URL_HOST + AppConstants.PRODUCT_URL, product )
        .then(response => {
            const id = response;
            console.log(id)
                    dispatch(createProductSuccess(response.data))
        })

}

export const createProductSuccess = (data) => {
    return {
        type: ActionTypes.CREATE_PRODUCT_SUCCESS  ,
        payload: data
    }
}

//DELETE
export const deleteProduct = (dispatch, productId) => {
    console.log(productId)
        axios.delete(AppConstants.REST_URL_HOST + AppConstants.PRODUCT_URL + '/' + productId)
            .then(response => {
                console.log(response)
                dispatch(deleteProductSuccess( productId ))
            })
            .catch(error => {
                console.log(error)
            }) 
}

export const deleteProductSuccess = (data) =>  {
    return {
        type: ActionTypes.DELETE_PRODUCT_SUCCESS,
        payload: data
    }
}