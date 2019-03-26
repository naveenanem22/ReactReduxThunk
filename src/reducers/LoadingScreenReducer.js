import {SHOW_LOADING_SCREEN, DISMISS_LOADING_SCREEN} from '../actions/ActionTypes';

export function loadingScreenReducer(state = {}, action) {
    switch (action.type) {

        case SHOW_LOADING_SCREEN:
             return {
                ...state, isLoadingScreenVisible: true
             };

        case DISMISS_LOADING_SCREEN:
            return {
                ...state, isLoadingScreenVisible: false
            };

        default:
            return state;
    }
}