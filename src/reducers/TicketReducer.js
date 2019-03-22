import { CREATE_TICKET, CREATE_TICKET_SUCCESS, CREATE_TICKET_FAILURE, FETCH_TICKETS_SUCCESS, FETCH_TICKETS } from '../actions/ActionTypes';
import { ENABLE_LOADTICKETS, ASSIGN_UPDATE_TICKET_SUCCESS, ASSIGN_UPDATE_TICKET, ASSIGN_UPDATE_TICKET_FAILURE } from '../actions/ActionTypes'

export function ticketReducer(state = {}, action) {
    switch (action.type) {
        case CREATE_TICKET:
            return state;

        case ENABLE_LOADTICKETS:
            return {
                ...state, loadTickets: true
            };

        case CREATE_TICKET_SUCCESS:
            return {
                ...state, isLoadingScreen: false, isCreateTicketFormVisible: false,
                isCreateTicketSuccessFormVisible: true, isCreateTicketFailureFormVisible: false
            };

        case CREATE_TICKET_FAILURE:
            return state;

        case FETCH_TICKETS_SUCCESS:
            return {
                ...state, tickets: action.payload.tickets, isLoadingScreenInViewTicketspage: false,
                isViewTicketsFormVisible: true, loadTickets: false
            };
        case FETCH_TICKETS:
            return {
                ...state, isLoadingScreenInViewTicketspage: true,
                isViewTicketsFormVisible: false
            };

        case ASSIGN_UPDATE_TICKET_SUCCESS:
            return {
                ...state, loadTickets: true
            }; 

        case ASSIGN_UPDATE_TICKET:
            return {
                ...state, isLoadingScreenInViewTicketspage: true,
                isViewTicketsFormVisible: false, loadTickets : false
            };

        default:
            return state;
    }
}





