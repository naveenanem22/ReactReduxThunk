import { CREATE_TICKET } from './ActionTypes';
import { CREATE_TICKET_SUCCESS, FETCH_TICKETS_SUCCESS } from './ActionTypes';

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

export function fetchTicketsSuccess(){
    return {
        type : FETCH_TICKETS_SUCCESS
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
    var url = new URL("");
    var params = {userId:queryParams.userId, status:queryParams.status, sortBy:queryParams.sortBy};
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
        
    return function (dispatch) {      
        return fetch(url,{
            method : 'GET'           
        })
        .then(
           response => {
               console.log(response);
               if(response.status === 200)
               return response.statusText;
           },
           error => console.log('An error occurred.', error),
       )
        .then((statusMessage) => {
            console.log(statusMessage);
           dispatch(fetchTicketsSuccess());
        },
       );
      };
}