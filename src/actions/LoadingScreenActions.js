import {SHOW_LOADING_SCREEN, DISMISS_LOADING_SCREEN} from './ActionTypes';

export function showLoadingScreen() {
    return {
        type: SHOW_LOADING_SCREEN
    }

}

export function dismissLoadingScreen() {
    return {
        type: DISMISS_LOADING_SCREEN
    }

}