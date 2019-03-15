import {LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT} from '../actions/ActionTypes';

export function engineerReducer(state = {}, action){
    switch(action.type){
        case LOGIN_SUCCESS: 
        return { ...state, isLoggedIn: true};
        
        case LOGIN_FAILURE:
        return {...state, isLoginFailure: true, loginFailureMessage: 'Invalid Credentials. Please try again.', isLoggedIn: false}

        case LOGOUT:
        return {...state, isLoggedIn: false}
        
        default:
        return state;
    }
}