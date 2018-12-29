import { CREATE_TICKET } from './ActionTypes';
import { CREATE_TICKET_SUCCESS } from './ActionTypes';

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