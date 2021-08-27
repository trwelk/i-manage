import axios from 'axios'
import {ActionTypes} from  '../constants/ActionTypes'
import {AppConstants} from '../constants/AppConstants'

export const fetchCartSuccess = (data) =>  {
    return {
        type: ActionTypes.FETCH_CART_SUCCESS,
        payload: data
    }
}


export const fetchCart = (dispatch, userId) => {
        axios.get(AppConstants.REST_URL_HOST + AppConstants.CART_URL  + '/' + userId)
            .then(response => {
                dispatch(fetchCartSuccess(response.data))
            })
            .catch(error => {
                console.log(error)
            }) 
}

//UPDATE
export const updateCart = (dispatch, cart) => {
    console.log(cart);
    axios.put(AppConstants.REST_URL_HOST + AppConstants.CART_URL, cart)
        .then(response => {
            console.log(response)
            dispatch(updateCartSuccess({...response.data}))
        })
        .catch(error => {
            console.log(error)
        }) 
}

export const updateCartSuccess = (data) =>  {
return {
    type: ActionTypes.CART_UPDATE_SUCCESS,
    payload: data
}
}

//CREATE
export const createCart = (data,dispatch) => {
    const cart = data;
    axios.post(AppConstants.REST_URL_HOST + AppConstants.CART_URL, cart )
        .then(response => {
            const id = response;
            dispatch(createCartSuccess(response.data))
            console.log(id);
        })
        .catch(error => {
            console.log(error)

        })

}

export const createCartSuccess = (data) => {
    return {
        type: ActionTypes.CART_CREATE_SUCCESS,
        payload: data
    }
}


// export const validateOrderObj = (data) => {
//     if (data.userId == null || data.userId === "") {
//         return "Field UserId Cannot be empty"
//     }
//     else if (data.source == null || data.source === "") {
//         return "Field Source Cannot be empty"
//     }
//     else if (data.items == null || data.items === "") {
//         return "Field Products Cannot be empty"
//     }
//     else
//         return null;
// }