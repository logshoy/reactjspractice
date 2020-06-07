import axios from 'axios';
import {AUTH_SUCCSESS , AUTH_LOGOUT} from './actionsTypes'

export function auth(email, password, isLogin) {
    return async dispatch => {
        const authData = {
            email,
            password,
            returnSecureToken: true
        }

        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCvYLsdfQDEOFKkSE3eR847TySviu0Bijw'

        if (isLogin) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCvYLsdfQDEOFKkSE3eR847TySviu0Bijw'
        } 
        const response = await axios.post(url , authData)
        const data = response.data

        const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000)
        localStorage.setItem('token', data.idToken)
        localStorage.setItem('userId', data.localId)
        localStorage.setItem('expirationDate', expirationDate)

        dispatch(authSuccses(data.token))
        dispatch(autoLogout(data.expiresIn))
    }
}

export function autoLogout(time) {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout( ))
        }, time*1000)
    }
}

export function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('expirationDate')
    return {
        type: AUTH_LOGOUT
    }
}

export function autoLogin() {
    return dispatch =>{
        const token = localStorage.getItem('token')
        if (!token) {
            dispatch(logout())
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate')) 
            if (expirationDate <= new Date()) {
                dispatch(logout())
            } else {
                dispatch(authSuccses(token))
                dispatch(autoLogout( (expirationDate.getTime() - new Date().getTime()) / 1000))
            }
        }
    }
}

export function authSuccses(token ) {
    return {
        type: AUTH_SUCCSESS,
        token
    }
}