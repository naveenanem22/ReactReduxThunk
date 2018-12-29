import {CREATE_TICKET, CREATE_TICKET_SUCCESS, CREATE_TICKET_FAILURE} from '../actions/ActionTypes';

export function ticketReducer(state = {}, action){
    switch(action.type){
        case CREATE_TICKET:               
        return state;

        case CREATE_TICKET_SUCCESS:
        return { ...state, isLoadingScreen: false, isCreateTicketFormVisible: false, 
            isCreateTicketSuccessFormVisible: true, isCreateTicketFailureFormVisible : false };

        case CREATE_TICKET_FAILURE:
        return state;

        default :
        return state;
    }
}





