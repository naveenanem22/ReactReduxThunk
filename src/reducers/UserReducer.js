import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT, GET_PROFILE, GET_PROFILE_SUCCESS } from '../actions/ActionTypes';

export function userReducer(state = {}, action) {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state, isLoggedIn: true, profile: {
                    role: action.payload.user.role
                }
            };

        case LOGIN_FAILURE:
            return { ...state, isLoginFailure: true, loginFailureMessage: 'Invalid Credentials. Please try again.', isLoggedIn: false }

        case LOGOUT:
            return { ...state, isLoggedIn: false }

        case GET_PROFILE_SUCCESS:
            return { ...state, profile: action.payload.profile }


        default:
            return state;
    }
}