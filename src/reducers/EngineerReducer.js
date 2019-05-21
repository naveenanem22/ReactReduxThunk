import {LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT, FETCH_ENGINEERS_SUCCESS} from '../actions/ActionTypes';

export function engineerReducer(state = {}, action){
    switch(action.type){  
        case FETCH_ENGINEERS_SUCCESS:
            return {
                ...state, engineers: action.payload.engineers
            };
              
        default:
        return state;
    }
}