import {AUTH_SUCCSESS , AUTH_LOGOUT} from '../actions/actionsTypes'

const initialState = {
    token: null
}

export default function authReducer(state = initialState, action){
    switch(action.type) {
        case AUTH_SUCCSESS: 
            return {
                ...state, token: action.token
            }
        case AUTH_LOGOUT:
            return {
                ...state, token: null
            }
        default: 
            return state
    }
}