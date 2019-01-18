import {FETCH_TICKET_DETAILS_SUCCESS, ADD_MESSAGE_SUCCESS, CLOSE_TICKET_SUCCESS, CLOSE_TICKET_FAILURE} from '../actions/ActionTypes';

export function ticketDetailsReducer(state = {}, action){
    switch(action.type){        

        case FETCH_TICKET_DETAILS_SUCCESS:
        return { ...state, ticket:action.payload.ticket,isLoadingScreenInViewTicketDetailsPage: false, 
            isViewTicketDetailsFormVisible: true};

        case ADD_MESSAGE_SUCCESS:
        return { ...state, isLoadingScreenInViewTicketDetailsPage: false, 
            isViewTicketDetailsFormVisible: false, isAddMessageSuccessVisible: true};

        case CLOSE_TICKET_SUCCESS:
        return { ...state, isLoadingScreenInViewTicketDetailsPage: false, 
            isViewTicketDetailsFormVisible: false, isCloseTicketSuccessVisible: true};
        
        case CLOSE_TICKET_FAILURE:
        return { ...state, isLoadingScreenInViewTicketDetailsPage: false, 
            isViewTicketDetailsFormVisible: false, isCloseTicketFailureVisible: true};


        default :
        return state;
    }
}





