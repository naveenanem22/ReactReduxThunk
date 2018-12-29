import {UPDATE_USER} from '../actions/UserActions';

export function userReducer(state = '', action){
    switch(action.type){
        case UPDATE_USER: 
        state = action.payload.user;       
        return state;
        default:
        return state;
    }
}