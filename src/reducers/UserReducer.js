import {LOGIN_SUCCESS} from '../actions/ActionTypes';

export function userReducer(state = {}, action){
    switch(action.type){
        case LOGIN_SUCCESS: 
        return { ...state, token: action.payload.token};      
        default:
        return state;
    }
}