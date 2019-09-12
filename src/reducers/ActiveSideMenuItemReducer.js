import { SET_EMPLOYEE_ACTIVE_SIDE_MENU_ITEM, SET_MANAGER_ACTIVE_SIDE_MENU_ITEM, SET_ENGINEER_ACTIVE_SIDE_MENU_ITEM } from '../actions/ActionTypes';

export function activeSideMenuItemReducer(state = {}, action) {
    switch (action.type) {

        case SET_EMPLOYEE_ACTIVE_SIDE_MENU_ITEM:
            return {
                ...state, employeeView: {
                    activeSideMenuOption: action.payLoad.activeSideMenuOption
                }
            };

        case SET_MANAGER_ACTIVE_SIDE_MENU_ITEM:
            return {
                ...state, managerView: {
                    activeSideMenuOption: action.payLoad.activeSideMenuOption
                }
            };

        case SET_ENGINEER_ACTIVE_SIDE_MENU_ITEM:
            return {
                ...state, engineerView: {
                    activeSideMenuOption: action.payLoad.activeSideMenuOption
                }
            }



        default:
            return state;
    }
}