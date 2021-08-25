import axios from 'axios'
import { ActionTypes } from '../constants/ActionTypes'
import { AppConstants } from '../constants/AppConstants'

export const fetchSuppliersSuccess = (data) => {
    return {
        type: ActionTypes.FETCH_SUPPLIER_SUCCESS,
        payload: data
    }
}


export const fetchSuppliers = (dispatch) => {
    axios.get(AppConstants.REST_URL_HOST + AppConstants.SUPPLIER_URL)
        .then(response => {
            dispatch(fetchSuppliersSuccess(response.data))
        })
        .catch(error => {
            console.log(error)
        })
}

//UPDATE
export const updateSupplier = (dispatch, supplier) => {
    axios.put(AppConstants.REST_URL_HOST + AppConstants.SUPPLIER_URL, supplier)
        .then(response => {
            dispatch(updateSupplierSuccess({ ...response.data }))
        })
        .catch(error => {
            console.log(error)
        })
}

export const updateSupplierSuccess = (data) => {
    return {
        type: ActionTypes.UPDATE_SUPPLIER_SUCCESS,
        payload: data
    }
}

//CREATE
export const createSupplier = (data, dispatch) => {
    const supplier = data;
    axios.post(AppConstants.REST_URL_HOST + AppConstants.SUPPLIER_URL, supplier)
        .then(response => {
            const id = response;
            console.log(id)
            dispatch(createSupplierSuccess(response.data))
        })

}

export const createSupplierSuccess = (data) => {
    return {
        type: ActionTypes.CREATE_SUPPLIER_SUCCESS,
        payload: data
    }
}

//DELETE
export const deleteSupplier = (dispatch, supplierId) => {
    axios.delete(AppConstants.REST_URL_HOST + AppConstants.SUPPLIER_URL + '/' + supplierId)
        .then(response => {
            console.log(response)
            dispatch(deleteSupplierSuccess(supplierId))
        })
        .catch(error => {
            console.log(error)
        })
}

export const deleteSupplierSuccess = (data) => {
    return {
        type: ActionTypes.DELETE_SUPPLIER_SUCCESS,
        payload: data
    }
}


export const validateSupplierObj = (data) => {
    if (data.id == null || data.id == "") {
        return "Field id Cannot be empty"
    }
    else if (data.supplierName == null || data.supplierName == "") {
        return "Field Name Cannot be empty"
    }
    else if (data.contractDate == null || data.contractDate == "") {
        return "Field contract Date Cannot be empty"
    }
    else if (data.contractExpDate == null || data.contractExpDate == "") {
        return "Field contract Exp Date Cannot be empty"
    }
    else if (data.contactNumber == null || data.contactNumber == "") {
        return "Field contact Number Cannot be empty"
    }
    else if (data.contactEmail == null || data.contactEmail == "") {
        return "Field Email Cannot be empty"
    }
    else if (data.currencyCode == null || data.currencyCode == "") {
        return "Field  currency Code Cannot be empty"
    }
    else if (data.methodOfContact == null || data.methodOfContact == "") {
        return "Field method Of Contact Cannot be empty"
    }
    else if (data.contactEmail == null || data.contactEmail == "") {
        console.log(data)
        return "Field email Cannot be empty"
    } else if (!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(data.contactEmail))) {
        return "Field Email is invalid"
    }
    else
        return null;
}
