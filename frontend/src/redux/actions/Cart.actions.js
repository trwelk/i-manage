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
    axios.put(AppConstants.REST_URL_HOST + AppConstants.CART_URL, cart)
        .then(response => {
            dispatch(updateCartSuccess({...response.data}))
        })
        .catch(error => {
            console.log(error)
        }) 
}

export const addToCart = (dispatch, cart) => {
    axios.get(AppConstants.REST_URL_HOST + AppConstants.CART_URL  + '/' + cart.userId)
        .then(response => {
            dispatch(fetchCartSuccess(response.data))
            if(response.data == ""){
                createCart(cart,dispatch);
            }
            else{
                var items = response.data[0].items;
                var updated = false;
                for(var i = 0; i < items.length; i++){
                    if(items[i].id == cart.items[0].id){
                        response.data[0].items[i].qty += 1;
                        updated = true;
                    }
                }
                if(!updated){
                    response.data[0].items.push(cart.items[0]);
                }
                updateCart(dispatch,response.data[0])
            }
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

//CREATE
export const deleteCart = (data,dispatch) => {
    const cart = data;
    axios.delete(AppConstants.REST_URL_HOST + AppConstants.CART_URL + "/" + cart.userId )
        .then(response => {
            const id = response;
            dispatch(deleteCartSuccess(response.data))
            console.log(id);
        })
        .catch(error => {
            console.log(error)

        })

}

export const deleteCartSuccess = (data) => {
    return {
        type: ActionTypes.CART_DELETE_SUCCESS,
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