import { CREATE_TICKET } from './ActionTypes';
import { CREATE_TICKET_SUCCESS, FETCH_TICKETS_SUCCESS, FETCH_TICKET_DETAILS_SUCCESS } from './ActionTypes';

export function createTicket(){
    return {
        type : CREATE_TICKET        
    }
}

export function createTicketSuccess(){
    return {
        type : CREATE_TICKET_SUCCESS
    }
}

export function fetchTicketsSuccess(tickets){
    return {
        type : FETCH_TICKETS_SUCCESS,
        payload: {
            tickets:tickets
        }
    }
}

export function fetchTicketDetailsSuccess(ticket){
    return {
        type : FETCH_TICKET_DETAILS_SUCCESS,
        payload: {
            ticket:ticket
        }
    }
}


export function createTicketAPICall(ticket){
    var formData = new FormData();
    for(var name in ticket) {
        formData.append(name, ticket[name]);
      }
    return function (dispatch) {      
        return fetch(`https://15e23b61-e331-41c0-9725-2c46ebe98828.mock.pstmn.io/v0/ticket-management/tickets`,{
            method : 'POST',
            body : formData
        })
        .then(
           response => {
               if(response.status === 201)
               return response.statusText;
           },
           error => console.log('An error occurred.', error),
       )
        .then((statusMessage) => {
            console.log(statusMessage);
           dispatch(createTicketSuccess());
        },
       );
      };
}

export function fetchTicketsAPICall(queryParams){
    var url = new URL("http://localhost:8089/v0/ticket-management/tickets");
    var params = {userId:queryParams.userId, status:queryParams.status, sortBy:queryParams.sortBy};
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
        
    return function (dispatch) {      
        return fetch(url,{
            method : 'GET'           
        })
        .then(
           response => {               
               if(response.status === 200)
               return response.json();
           },
           error => console.log('An error occurred.', error),
       )
        .then((tickets) => {
           dispatch(fetchTicketsSuccess(tickets));
        },
       );
      };
}

export function fetchTicketDetailsAPICall(pathParams){
    var url = new URL("http://localhost:8089/v0/ticket-management/tickets/123456");
    console.log(url);
    return function (dispatch) {      
        return fetch(url,{
            method : 'GET'           
        })
        .then(
           response => {               
               if(response.status === 200)
               return response.json();
           },
           error => console.log('An error occurred.', error),
       )
        .then((ticket) => {
           dispatch(fetchTicketDetailsSuccess(ticket));
        },
       );
      };
}