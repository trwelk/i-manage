import axios from 'axios'
import { ActionTypes } from '../constants/ActionTypes'
import { AppConstants } from '../constants/AppConstants'


//CREATE
export const createCustomer = (data, dispatch) => {
    const customer = data;
    axios.post(AppConstants.REST_URL_HOST + AppConstants.CUSTOMER_SIGNUP_URL, customer)
        .then(response => {
            const id = response;
            console.log(id)
            dispatch(createCustomerSuccess(response.data))
        })

}
//Update
export const updateCustomer = (data, dispatch) => {
    const customer = data;
    console.log(data);
    axios.put(AppConstants.REST_URL_HOST + AppConstants.CUSTOMER_UPDATE_URL , customer)
        .then(response => {
            const id = response;
            console.log(id)
            dispatch(updateCustomerSuccess(response.data))
        })

}
export const updateCustomerSuccess = (data) => {
    return {
        type: ActionTypes.CUSTOMER_UPDATE_SUCCESS,
        payload: data
    }
}
export const createCustomerSuccess = (data) => {
    return {
        type: ActionTypes.CUSTOMER_SIGNUP_SUCCESS,
        payload: data
    }
}

//DELETE
// export const deleteCustomer = (dispatch, customerId) => {
//     axios.delete(AppConstants.REST_URL_HOST + AppConstants.SUPPLIER_URL + '/' + customerId)
//         .then(response => {
//             console.log(response)
//             dispatch(deleteCustomerSuccess(customerId))
//         })
//         .catch(error => {
//             console.log(error)
//         })
// }

// export const deleteCustomerSuccess = (data) => {
//     return {
//         type: ActionTypes.DELETE_SUPPLIER_SUCCESS,
//         payload: data
//     }
// }


export const validateCustomerObj = (data) => {
    
    if (data.firstName == null || data.firstName == "") {
        return "Field First Name Cannot be empty"
    }
    else if (data.lastName == null || data.lastName == "") {
        return "Field Last Name Cannot be empty"
    }
    else if (data.dateOfBirth == null || data.dateOfBirth == "") {
        return "Field Date of Birth Cannot be empty"
    } 
    else if (data.address == null || data.address == "") {
        return "Field Address Cannot be empty"
    }
    else if (data.password == null || data.password == "") {
        return "Field Password Cannot be empty"
    }
    else if (data.emailAddress == null || data.emailAddress == "") {
        console.log(data)
        return "Field Email Cannot be empty"
    } else if (!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(data.emailAddress))) {
        return "Field Email is invalid"
    }
    else
        return null;
}
