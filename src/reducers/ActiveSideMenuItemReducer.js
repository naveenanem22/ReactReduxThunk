import {SET_EMPLOYEE_ACTIVE_SIDE_MENU_ITEM} from '../actions/ActionTypes';

export function activeSideMenuItemReducer(state = {}, action) {
    switch (action.type) {

        case SET_EMPLOYEE_ACTIVE_SIDE_MENU_ITEM:
            return {
                ...state, employeeView: {
                    activeSideMenuOption : action.payLoad.activeSideMenuOption
                }
            };

        

        default:
            return state;
    }
}