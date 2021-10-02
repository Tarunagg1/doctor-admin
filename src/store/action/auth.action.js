import { SET_TOKEN, LOGIN_ERRORS } from "../constant";
import axiosinstance from "../../config/axios"


export const login = (User) => {
    return async (dispatch) => {
        try {
            const {data} = await axiosinstance.post('/admin/login', User);
            return true;
        } catch (error) {
            dispatch({ type: LOGIN_ERRORS, payload: error.response.data.error });
        }

    }
}

export const verify = (User) => {
    return async (dispatch) => {
        try {
            const {data} = await axiosinstance.post('/admin/verify', User);
            console.log(data);
            localStorage.setItem('jwt', data.authToken);
            dispatch({ type:SET_TOKEN, payload: data.authToken});
        } catch (error) {
            console.log(error.response);
            dispatch({ type: LOGIN_ERRORS, payload: error.response.data.error });
        }

    }
}

