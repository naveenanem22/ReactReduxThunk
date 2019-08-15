import { CREATE_TICKET, CREATE_TICKET_SUCCESS, CREATE_TICKET_FAILURE, FETCH_TICKETS_SUCCESS, FETCH_TICKETS, FETCH_TICKETS_FAILURE, ADD_MESSAGE, ADD_MESSAGE_SUCCESS, ADD_MESSAGE_FAILURE, FETCH_ASSIGNED_TICKET_DETAILS, FETCH_ASSIGNED_TICKET_DETAILS_SUCCESS, FETCH_ASSIGNED_TICKET_DETAILS_FAILURE, FETCH_CREATED_TICKETS_SUCCESS, FETCH_CREATED_TICKETS, FETCH_CREATED_TICKETS_FAILURE, FETCH_CREATED_TICKET_DETAILS, FETCH_CREATED_TICKET_DETAILS_SUCCESS, FETCH_CREATED_TICKET_DETAILS_FAILURE, CLOSE_TICKET, CLOSE_TICKET_SUCCESS, CLOSE_TICKET_FAILURE, FETCH_ENGINEERS, FETCH_ENGINEERS_SUCCESS, FETCH_ENGINEERS_FAILURE, LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE, GET_PROFILE, GET_PROFILE_SUCCESS, GET_PROFILE_FAILURE } from '../actions/ActionTypes';
import { ASSIGN_UPDATE_TICKET_SUCCESS, ASSIGN_UPDATE_TICKET, ASSIGN_UPDATE_TICKET_FAILURE } from '../actions/ActionTypes'
import {MESSAGE_UPDATE_TICKET, MESSAGE_UPDATE_TICKET_FAILURE, MESSAGE_UPDATE_TICKET_SUCCESS} from '../actions/ActionTypes';
import { SHOW_FORM_NEW_TICKET } from '../actions/ActionTypes';
import { CLOSE_UPDATE_TICKET, CLOSE_UPDATE_TICKET_FAILURE, CLOSE_UPDATE_TICKET_SUCCESS } from '../actions/ActionTypes';
import { FETCH_TICKET_DETAILS, FETCH_TICKET_DETAILS_FAILURE, FETCH_TICKET_DETAILS_SUCCESS } from '../actions/ActionTypes';
import { FETCH_DASHBOARD_DATA, FETCH_DASHBOARD_DATA_SUCCESS, FETCH_DASHBOARD_DATA_FAILURE } from '../actions/ActionTypes';
import { FETCH_ASSIGNED_TICKETS, FETCH_ASSIGNED_TICKETS_SUCCESS, FETCH_ASSIGNED_TICKETS_FAILURE } from '../actions/ActionTypes';

export function serviceCallStatusReducer(state = {}, action) {
    switch (action.type) {
        case CREATE_TICKET:
            return {
                ...state, createTicketAPI: { requested: true, success: false, error: false }
            };

        case CREATE_TICKET_SUCCESS:
            return {
                ...state, createTicketAPI: { requested: false, success: true, error: false }
            };

        case CREATE_TICKET_FAILURE:
            return {
                ...state, createTicketAPI: { requested: false, success: false, error: true }
            };

        case FETCH_TICKETS_SUCCESS:
            return {
                ...state, fetchTicketsAPI: { requested: false, success: true, error: false }
            };
        case FETCH_TICKETS:
            return {
                ...state, fetchTicketsAPI: { requested: true, success: false, error: false }
            };
        case FETCH_TICKETS_FAILURE:
            return {
                ...state, fetchTicketsAPI: { requested: false, success: false, error: true }
            };

        case FETCH_ASSIGNED_TICKETS_SUCCESS:
            return {
                ...state, fetchAssignedTicketsAPI: { requested: false, success: true, error: false }
            };
        case FETCH_ASSIGNED_TICKETS:
            return {
                ...state, fetchAssignedTicketsAPI: { requested: true, success: false, error: false }
            };
        case FETCH_ASSIGNED_TICKETS_FAILURE:
            return {
                ...state, fetchAssignedTicketsAPI: { requested: false, success: false, error: true }
            };

        case FETCH_CREATED_TICKETS_SUCCESS:
            return {
                ...state, fetchCreatedTicketsAPI: { requested: false, success: true, error: false }
            };
        case FETCH_CREATED_TICKETS:
            return {
                ...state, fetchCreatedTicketsAPI: { requested: true, success: false, error: false }
            };
        case FETCH_CREATED_TICKETS_FAILURE:
            return {
                ...state, fetchCreatedTicketsAPI: { requested: false, success: false, error: true }
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


        case FETCH_ASSIGNED_TICKET_DETAILS:
            return {
                ...state, fetchAssignedTicketDetailsAPI: { requested: true, success: false, error: false }
            };

        case FETCH_ASSIGNED_TICKET_DETAILS_SUCCESS:
            return {
                ...state, fetchAssignedTicketDetailsAPI: { requested: false, success: true, error: false }
            };
        case FETCH_ASSIGNED_TICKET_DETAILS_FAILURE:
            return {
                ...state, fetchAssignedTicketDetailsAPI: { requested: false, success: false, error: true }
            };

        case FETCH_CREATED_TICKET_DETAILS:
            return {
                ...state, fetchCreatedTicketDetailsAPI: { requested: true, success: false, error: false }
            };

        case FETCH_CREATED_TICKET_DETAILS_SUCCESS:
            return {
                ...state, fetchCreatedTicketDetailsAPI: { requested: false, success: true, error: false }
            };
        case FETCH_CREATED_TICKET_DETAILS_FAILURE:
            return {
                ...state, fetchCreatedTicketDetailsAPI: { requested: false, success: false, error: true }
            };

        case ADD_MESSAGE:
            return {
                ...state, addMessageAPI: { requested: true, success: false, error: false }
            }
        case ADD_MESSAGE_SUCCESS:
            return {
                ...state, addMessageAPI: { requested: false, success: true, error: false }
            }
        case ADD_MESSAGE_FAILURE:
            return {
                ...state, addMessageAPI: { requested: false, success: false, error: true }
            }

        case CLOSE_TICKET:
            return {
                ...state, closeTicketAPI: { requested: true, success: false, error: false }
            }
        case CLOSE_TICKET_SUCCESS:
            return {
                ...state, closeTicketAPI: { requested: false, success: true, error: false }
            }
        case CLOSE_TICKET_FAILURE:
            return {
                ...state, closeTicketAPI: { requested: false, success: false, error: true }
            }


        case CLOSE_UPDATE_TICKET:
            return {
                ...state, closeAndUpdateTicketAPI: { requested: true, success: false, error: false }
            }
        case CLOSE_UPDATE_TICKET_SUCCESS:
            return {
                ...state, closeAndUpdateTicketAPI: { requested: false, success: true, error: false }
            }
        case CLOSE_UPDATE_TICKET_FAILURE:
            return {
                ...state, closeAndUpdateTicketAPI: { requested: false, success: false, error: true }
            }

        case MESSAGE_UPDATE_TICKET:
            return {
                ...state, messageAndUpdateTicketAPI: { requested: true, success: false, error: false }
            }
        case MESSAGE_UPDATE_TICKET_SUCCESS:
            return {
                ...state, messageAndUpdateTicketAPI: { requested: false, success: true, error: false }
            }
        case MESSAGE_UPDATE_TICKET_FAILURE:
            return {
                ...state, messageAndUpdateTicketAPI: { requested: false, success: false, error: true }
            }

        case FETCH_DASHBOARD_DATA:
            return {
                ...state, fetchDashboardDataMultipleAPI: { requested: true, success: false, error: false }
            }
        case FETCH_DASHBOARD_DATA_SUCCESS:
            return {
                ...state, fetchDashboardDataMultipleAPI: { requested: false, success: true, error: false }
            }
        case FETCH_DASHBOARD_DATA_FAILURE:
            return {
                ...state, fetchDashboardDataMultipleAPI: { requested: false, success: false, error: true }
            }

        case FETCH_ENGINEERS:
            return {
                ...state, fetchEngineersAPI: { requested: true, success: false, error: false }
            }
        case FETCH_ENGINEERS_SUCCESS:
            return {
                ...state, fetchEngineersAPI: { requested: false, success: true, error: false }
            }

        case FETCH_ENGINEERS_FAILURE:
            return {
                ...state, fetchEngineersAPI: { requested: false, success: false, error: true }
            }

        case ASSIGN_UPDATE_TICKET:
            return {
                ...state, assignAndUpdateTicketAPI: { requested: true, success: false, error: false }
            }
        case ASSIGN_UPDATE_TICKET_SUCCESS:
            return {
                ...state, assignAndUpdateTicketAPI: { requested: false, success: true, error: false }
            }

        case ASSIGN_UPDATE_TICKET_FAILURE:
            return {
                ...state, assignAndUpdateTicketAPI: { requested: false, success: false, error: true }
            }

        case LOGIN:
            return {
                ...state, loginAPI: { requested: true, success: false, error: false }
            }
        case LOGIN_SUCCESS:
            return {
                ...state, loginAPI: { requested: false, success: true, error: false }
            }
        case LOGIN_FAILURE:
            return {
                ...state, loginAPI: { requested: false, success: false, error: true }
            }

        case GET_PROFILE:
            return {
                ...state, getProfileAPI: { requested: true, success: false, error: false }
            }
        case GET_PROFILE_SUCCESS:
            return {
                ...state, getProfileAPI: { requested: false, success: true, error: false }
            }
        case GET_PROFILE_FAILURE:
            return {
                ...state, getProfileAPI: { requested: false, success: false, error: true }
            }

        default:
            return state;
    }
}





