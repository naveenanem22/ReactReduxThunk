import { CREATE_TICKET, ADD_MESSAGE_SUCCESS, CLOSE_TICKET_SUCCESS,CLOSE_TICKET_FAILURE } from './ActionTypes';
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

export function addMessageSuccess(){
    return {
        type : ADD_MESSAGE_SUCCESS
    }
}

export function closeTicketSuccess(){
    return {
        type : CLOSE_TICKET_SUCCESS
    }
}

export function closeTicketFailure(){
    return {
        type : CLOSE_TICKET_FAILURE
    }
}


export function createTicketAPICall(ticket){
    var formData = new FormData();
    for(var name in ticket) {
        formData.append(name, ticket[name]);
      }
    return function (dispatch) {      
        return fetch(`http://localhost:8089/v0/ticket-management/tickets`,{
            method : 'POST',
            body : formData
        })
        .then(
           response => {
               console.log(response);
               if(response.status === 201){
                dispatch(createTicketSuccess());
               return response.statusText;
               }
           },
           error => {
            console.log('An error occurred.', error);
           }
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

export function addMessageAPICall(params){
    var url = new URL("http://localhost:8089/v0/ticket-management/tickets/123456");
    console.log(url);
    return function (dispatch) {      
        return fetch(url,{
            method : 'PUT'           
        })
        .then(
           response => {               
               if(response.status === 200)
               return response.json();
           },
           error => console.log('An error occurred.', error),
       )
        .then((ticket) => {
           dispatch(addMessageSuccess());
        },
       );
      };
}

export function closeTicketAPICall(params){
    console.log("inside close ticket");
    var url = new URL("http://localhost:8089/v0/ticket-management/tickets/123456");
    console.log(url);
    return function (dispatch) {      
        return fetch(url,{
            method: 'PUT',
            body: {}, 
            headers:{
                'Content-Type': 'application/json'
                }                    
        })
        .then(
           response => {
               if(response.status === 204){
                dispatch(closeTicketSuccess());
                return response.json();
               }
               
           },
           error => {
            console.log('An error occurred.', error);
            dispatch(closeTicketFailure());

           }
       );
      };
}