import axios from 'axios'
import {ActionTypes} from  '../constants/ActionTypes'
import {AppConstants} from '../constants/AppConstants'

export const superUserLogin = (dispatch, superuser) => {
    axios.post(AppConstants.REST_URL_HOST + "/login", superuser)
        .then(response => {
            if(response.data.auth)
                dispatch(superUserLoginSuccess(response))
            else
                dispatch(superUserLoginFail())
        })
        .catch(error => {
            console.log(error)
        })
}

export const superUserLoginSuccess = (data) =>  {
    return {
        type: ActionTypes.SUPERUSER_LOGIN_SUCCESS,
        payload: data
    }
}

export const superUserLoginFail = (data) =>  {
    return {
        type: ActionTypes.SUPERUSER_LOGIN_FAIL,
        payload: data
    }
}

export const superUserLoginReset = (dispatch) =>  {
    dispatch( {
        type: ActionTypes.SUPERUSER_LOGIN_RESET,
        payload: ""
    })
}

export const superUserLogout = (dispatch) => {
    dispatch({
        type: ActionTypes.SUPERUSER_LOGOUT,
        payload: ""
    })
}