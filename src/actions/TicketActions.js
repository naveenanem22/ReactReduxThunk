import { CREATE_TICKET, ADD_MESSAGE_SUCCESS,ADD_MESSAGE_FAILURE, CLOSE_TICKET_SUCCESS,CLOSE_TICKET_FAILURE } from './ActionTypes';
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

export function addMessageFailure(){
    return {
        type : ADD_MESSAGE_FAILURE
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
    let base64 = require('base-64');
    let userName = 'admin1';
    let password = 'secret1'
    let headers = new Headers();
    headers.set('Authorization', 'Basic ' + base64.encode(userName + ":" + password));
    var formData = new FormData();
    for(var name in ticket) {
        formData.append(name, ticket[name]);
      }
    return function (dispatch) {      
        return fetch(`http://localhost:8080/v0/ticket-management/tickets`,{
            method : 'POST',
            body : formData,
            headers: headers
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
    let base64 = require('base-64');
    let userName = 'admin1';
    let password = 'secret1'
    let headers = new Headers();
    headers.set('Authorization', 'Basic ' + base64.encode(userName + ":" + password));
    var url = new URL("http://localhost:8080/v0/ticket-management/tickets");
    var params = {userId:queryParams.userId, status:queryParams.status, sortBy:queryParams.sortBy};
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
        
    return function (dispatch) {      
        return fetch(url,{
            method : 'GET',
            headers: headers           
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
    let base64 = require('base-64');
    let userName = 'admin1';
    let password = 'secret1'
    let headers = new Headers();
    headers.set('Authorization', 'Basic ' + base64.encode(userName + ":" + password));
    var url = new URL("http://localhost:8080/v0/ticket-management/tickets/123456");
    console.log(url);
    return function (dispatch) {      
        return fetch(url,{
            method : 'GET',
            headers: headers           
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
    let base64 = require('base-64');
    let userName = 'admin1';
    let password = 'secret1'
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json',);
    headers.append('Authorization', 'Basic ' + base64.encode(userName + ":" + password));
    var url = new URL("http://localhost:8080/v0/ticket-history/tickets/123456/messages");
    console.log(url);
    return function (dispatch) {      
        return fetch(url,{
            method : 'POST',
            headers: headers         
        })
        .then(
           response => {
               if(response.status === 201){
                dispatch(addMessageSuccess());
               }
           },
           error => {
               console.log('An error occurred.', error);
               dispatch(addMessageFailure());
        }
       );
      };
}

export function closeTicketAPICall(params){
    let base64 = require('base-64');
    let userName = 'admin1';
    let password = 'secret1'
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Basic ' + base64.encode(userName + ":" + password));
    var url = new URL("http://localhost:8080/v0/ticket-management/tickets/123456");
    return function (dispatch) {      
        return fetch(url,{
            method: 'PUT',
            headers: headers
        })
        .then(
           response => {
               if(response.status === 204){
                dispatch(closeTicketSuccess());
               }
               
           },
           error => {
            console.log('An error occurred.', error);
            dispatch(closeTicketFailure());

           }
       );
      };
}

