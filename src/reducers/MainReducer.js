import {userReducer} from './UserReducer';
import {productReducer} from './ProductReducer';
import {combineReducers } from 'redux';
import {ticketReducer} from './TicketReducer';
import {ticketDetailsReducer} from './TicketDetailsReducer';
import {engineerReducer} from './EngineerReducer';
import {departmentReducer} from './DepartmentReducer';
import {serviceCategoriesReducer} from './ServiceCategoriesReducer';
import {loadingScreenReducer} from './LoadingScreenReducer';
import {dashboardReducer} from './DashboardReducer';
import {serviceCallStatusReducer} from './ServiceCallStatusReducer';

export const MainReducer = combineReducers(
    {products : productReducer,
    user : userReducer,
    ticketList : ticketReducer,
    ticketDetails: ticketDetailsReducer,
    engineerList : engineerReducer,
    departments : departmentReducer,
    serviceCategories: serviceCategoriesReducer,
    loadingScreen: loadingScreenReducer,
    dashboardData: dashboardReducer,
    serviceCallStatus: serviceCallStatusReducer}

)