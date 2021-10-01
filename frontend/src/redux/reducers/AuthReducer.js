import { ActionTypes } from "../constants/ActionTypes";
import jwt_decode from "jwt-decode";

const initialState = {
    loggedUser: null,
    logged: false,
    fail: false
}
export const AuthReducer = (state = initialState, { type, payload }) => {
    if(state.loggedUser == null){
        const session = window.sessionStorage.getItem("jwtToken");
        if(session){
            let user = jwt_decode(session);
            return { loggedUser: user, logged: true, fail: false };
        }
    }
    switch (type) {
        case ActionTypes.SUPERUSER_LOGIN_SUCCESS:
            const { token, auth } = payload.data;
            var currentUser = jwt_decode(token);
            window.sessionStorage.setItem("jwtToken", token);
            return { loggedUser: currentUser, logged: true };   
        case ActionTypes.SUPERUSER_LOGOUT:
            window.sessionStorage.removeItem("jwtToken");
            return { loggedUser: null, logged: false, fail: false};
        case ActionTypes.SUPERUSER_LOGIN_FAIL:
            return { loggedUser: null, logged: false, fail: true};
        case ActionTypes.SUPERUSER_LOGIN_RESET:
            return { loggedUser: null, logged: false, fail: false};   
        default:
            return state;
    }
}