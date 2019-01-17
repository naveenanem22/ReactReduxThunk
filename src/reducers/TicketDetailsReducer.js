import {FETCH_TICKET_DETAILS_SUCCESS} from '../actions/ActionTypes';

export function ticketDetailsReducer(state = {}, action){
    switch(action.type){        

        case FETCH_TICKET_DETAILS_SUCCESS:
        return { ...state, ticket:action.payload.ticket,isLoadingScreenInViewTicketDetailsPage: false, 
            isViewTicketDetailsFormVisible: true};

        default :
        return state;
    }
}





