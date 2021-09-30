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


export const validateProductObj = (data) => {
    if (data.id == null || data.id == "") {
        return "Field id Cannot be empty"
    }
    else if (data.productName == null || data.productName == "") {
        return "Field Name Cannot be empty"
    }
    else if (data.type == null || data.type == "") {
        return "Field type Cannot be empty"
    }
    else if (data.supplier == null || data.supplier == "") {
        return "Field supplier Cannot be empty"
    }
    else if (data.sellingPrice == null || data.sellingPrice == "") {
        return "Field  selling Price Code Cannot be empty"
    }
    else if (data.buyingPrice == null || data.buyingPrice == "") {
        return "Field buyingPrice Of Contact Cannot be empty"
    }
    else
        return null;
}