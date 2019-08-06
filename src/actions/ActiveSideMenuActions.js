import {SET_EMPLOYEE_ACTIVE_SIDE_MENU_ITEM, SET_MANAGER_ACTIVE_SIDE_MENU_ITEM} from './ActionTypes';

export function setEmployeeActiveSideMenuOption(activeSideMenuOption) {
    return {
        type: SET_EMPLOYEE_ACTIVE_SIDE_MENU_ITEM,
        payLoad: {
            activeSideMenuOption : activeSideMenuOption
        }
    }

}

export function setManagerActiveSideMenuOption(activeSideMenuOption) {
    return {
        type: SET_MANAGER_ACTIVE_SIDE_MENU_ITEM,
        payLoad: {
            activeSideMenuOption : activeSideMenuOption
        }
    }

}