import {SET_EMPLOYEE_ACTIVE_SIDE_MENU_ITEM} from './ActionTypes';

export function setEmployeeActiveSideMenuOption(activeSideMenuOption) {
    return {
        type: SET_EMPLOYEE_ACTIVE_SIDE_MENU_ITEM,
        payLoad: {
            activeSideMenuOption : activeSideMenuOption
        }
    }

}