import { CREATE_TICKET, CREATE_TICKET_SUCCESS, CREATE_TICKET_FAILURE, FETCH_TICKETS_SUCCESS, FETCH_TICKETS, FETCH_TICKETS_FAILURE } from '../actions/ActionTypes';
import { ASSIGN_UPDATE_TICKET_SUCCESS, ASSIGN_UPDATE_TICKET, ASSIGN_UPDATE_TICKET_FAILURE } from '../actions/ActionTypes'
import { SHOW_FORM_NEW_TICKET } from '../actions/ActionTypes';
import { FETCH_TICKET_DETAILS, FETCH_TICKET_DETAILS_FAILURE, FETCH_TICKET_DETAILS_SUCCESS } from '../actions/ActionTypes';

export function serviceCallStatusReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_TICKETS_SUCCESS:
            return {
                ...state, fetchTicketsAPI: { requested: false, success: true, error: false}
            };
        case FETCH_TICKETS:
            return {
                ...state, fetchTicketsAPI: {requested: true, success: false, error: false}
            };
        case FETCH_TICKETS_FAILURE:
            return {
                ...state, fetchTicketsAPI: {requested: false, success: false, error: true}

            };

        case FETCH_TICKET_DETAILS:
            return {
                ...state, fetchTicketDetailsAPI: { requested: true, success: false, error: false }
            };

        case FETCH_TICKET_DETAILS_SUCCESS:
            return {
                ...state, fetchTicketDetailsAPI: { requested: false, success: true, error: false }
            };
        case FETCH_TICKET_DETAILS_FAILURE:
            return {
                ...state, fetchTicketDetailsAPI: { requested: false, success: false, error: true }
            };
        default:
            return state;
    }
}





