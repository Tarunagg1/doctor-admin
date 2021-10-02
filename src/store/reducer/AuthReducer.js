import jwt_decode from 'jwt-decode';
import { getToken } from '../../config/action'
import { CLEAR_LOGIN_ERRORS, LOGIN_ERRORS, LOG_OUT, SET_TOKEN } from '../constant';

const initState = {
    token: null,
    user: null,
    loginerror: ""
}

const verifytoken = (token) => {
    try {
        const decodedToken = jwt_decode(token);
        const ExpireIn = new Date(decodedToken.exp * 1000);
        if (new Date() > ExpireIn) {
            localStorage.removeItem('jwt');
            return null;
        } else {
            return decodedToken;
        }
    } catch (error) {
        return null;
    }
};

let token = getToken();

const setToken = (token)=>{
    if (token) {
        const decodetoken = verifytoken(token);
        if (decodetoken) {
            initState.token = token;
            initState.user = decodetoken;
        }
    }
    return;    
}

setToken(token);

const AuthReducer = (state = initState, action) => {
    const { type, payload } = action;
    switch (type) {
        case SET_TOKEN:
            setToken(payload);
            return { ...state, token: payload }
        case LOGIN_ERRORS:
            return { ...state, loginerror: payload };
        case CLEAR_LOGIN_ERRORS:
            return { ...state, loginerror: "" };
        case LOG_OUT:
            return { ...state, user: '', token: '' }
        default:
            return state;
    }
}

export default AuthReducer;