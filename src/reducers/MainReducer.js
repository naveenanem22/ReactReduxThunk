import {userReducer} from './UserReducer';
import {productReducer} from './ProductReducer';
import {combineReducers } from 'redux';
import {ticketReducer} from './TicketReducer';

export const MainReducer = combineReducers(
    {products : productReducer,
    user : userReducer,
    tickets : ticketReducer}

)