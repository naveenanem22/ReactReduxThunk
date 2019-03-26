import { CREATE_TICKET, CREATE_TICKET_SUCCESS, CREATE_TICKET_FAILURE, FETCH_TICKETS_SUCCESS, FETCH_TICKETS } from '../actions/ActionTypes';
import { ASSIGN_UPDATE_TICKET_SUCCESS, ASSIGN_UPDATE_TICKET, ASSIGN_UPDATE_TICKET_FAILURE } from '../actions/ActionTypes'
import { SHOW_FORM_NEW_TICKET} from '../actions/ActionTypes';

export function ticketReducer(state = {}, action) {
    switch (action.type) {

        case SHOW_FORM_NEW_TICKET:
             return {
                ...state, isCreateTicketFormVisible: true, isViewTicketsFormVisible: false, 
                isSuccessAlertVisible: false
             };

        case CREATE_TICKET:
            return {
                ...state, isCreateTicketFormVisible: false,
                isCreateTicketFailureFormVisible: false, isSuccessAlertVisible: false
            };

        case CREATE_TICKET_SUCCESS:
            return {
                ...state, isCreateTicketFormVisible: false,
                 isCreateTicketFailureFormVisible: false, isSuccessAlertVisible: true
            };

        case CREATE_TICKET_FAILURE:
            return state;

        case FETCH_TICKETS_SUCCESS:
            return {
                ...state, tickets: action.payload.tickets, isViewTicketsFormVisible: true
            };
        case FETCH_TICKETS:
            return {
                ...state, isViewTicketsFormVisible: false, isCreateTicketFormVisible: false, isSuccessAlertVisible: false
            };

        case ASSIGN_UPDATE_TICKET_SUCCESS:
            return state;

        case ASSIGN_UPDATE_TICKET:
            return {
                ...state, isViewTicketsFormVisible: false, isCreateTicketFormVisible: false, isSuccessAlertVisible: false
            };

        default:
            return state;
    }
}





