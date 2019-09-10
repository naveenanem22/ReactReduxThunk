import { CREATE_TICKET, CREATE_TICKET_SUCCESS, CREATE_TICKET_FAILURE, FETCH_TICKETS_SUCCESS, FETCH_TICKETS, FETCH_CREATED_TICKETS_SUCCESS, FETCH_CREATED_TICKETS, SET_MANAGER_TICKET_SEARCH_CRITERIA } from '../actions/ActionTypes';
import { ASSIGN_UPDATE_TICKET_SUCCESS, ASSIGN_UPDATE_TICKET, ASSIGN_UPDATE_TICKET_FAILURE } from '../actions/ActionTypes'
import { SHOW_FORM_NEW_TICKET } from '../actions/ActionTypes';
import { FETCH_ASSIGNED_TICKETS, FETCH_ASSIGNED_TICKETS_FAILURE, FETCH_ASSIGNED_TICKETS_SUCCESS } from '../actions/ActionTypes';

export function ticketReducer(state = {}, action) {
    switch (action.type) {

        case SHOW_FORM_NEW_TICKET:
            return {
                ...state, isCreateTicketFormVisible: true, isViewTicketsFormVisible: false,
                isSuccessAlertVisible: false
            };

        case FETCH_TICKETS_SUCCESS:
            return {
                ...state, tickets: action.payload.ticketList.tickets,
                totalPages: action.payload.ticketList.totalPages,
                totalElements: action.payload.ticketList.totalElements,
                size: action.payload.ticketList.size,
                number: action.payload.ticketList.number,
                numberOfElements: action.payload.ticketList.numberOfElements,
                isViewTicketsFormVisible: true,
                loadManagerTickets: false
            };
        case FETCH_TICKETS:
            return {
                ...state, isViewTicketsFormVisible: false, isCreateTicketFormVisible: false, isSuccessAlertVisible: false
            };

        case FETCH_ASSIGNED_TICKETS_SUCCESS:
            return {
                ...state, tickets: action.payload.tickets
            };
        case FETCH_ASSIGNED_TICKETS:
            return {
                ...state
            };

        case FETCH_CREATED_TICKETS_SUCCESS:
            return {
                ...state, tickets: action.payload.ticketList.tickets,
                totalPages: action.payload.ticketList.totalPages,
                totalElements: action.payload.ticketList.totalElements,
                size: action.payload.ticketList.size,
                number: action.payload.ticketList.number,
                numberOfElements: action.payload.ticketList.numberOfElements
            };
        case FETCH_CREATED_TICKETS:
            return {
                ...state
            };

        case ASSIGN_UPDATE_TICKET_SUCCESS:
            return state;

        case ASSIGN_UPDATE_TICKET:
            return {
                ...state, isViewTicketsFormVisible: false, isCreateTicketFormVisible: false, isSuccessAlertVisible: false
            };
        case SET_MANAGER_TICKET_SEARCH_CRITERIA:
            return {
                ...state, managerTicketSearchCriteria: {
                    cioKey: action.payload.ticketList.managerTicketSearchCriteria.cioKey,
                    status: action.payload.ticketList.managerTicketSearchCriteria.status,
                    pageNumber: action.payload.ticketList.managerTicketSearchCriteria.pageNumber,
                    pageSize: action.payload.ticketList.managerTicketSearchCriteria.pageSize,
                    isLoad: action.payload.ticketList.managerTicketSearchCriteria.isLoad,
                    sortBy: action.payload.ticketList.managerTicketSearchCriteria.sortBy,
                    sortOrder: action.payload.ticketList.managerTicketSearchCriteria.sortOrder,
                    isSearch: action.payload.ticketList.managerTicketSearchCriteria.isSearch,
                    searchText: action.payload.ticketList.managerTicketSearchCriteria.searchText,
                    searchFieldsListString: action.payload.ticketList.managerTicketSearchCriteria.searchFieldsListString
                }, loadManagerTickets: action.payload.ticketList.loadManagerTickets
            };


        default:
            return state;
    }
}





