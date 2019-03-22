import { CREATE_TICKET, ADD_MESSAGE_SUCCESS,ADD_MESSAGE_FAILURE, CLOSE_TICKET_SUCCESS,CLOSE_TICKET_FAILURE } from './ActionTypes';
import { ENABLE_LOADTICKETS, CREATE_TICKET_SUCCESS, FETCH_TICKETS_SUCCESS, FETCH_TICKETS, FETCH_TICKET_DETAILS_SUCCESS, ASSIGN_UPDATE_TICKET_SUCCESS, ASSIGN_UPDATE_TICKET_FAILURE, ASSIGN_UPDATE_TICKET } from './ActionTypes';
import FileSaver from 'file-saver';

export function enableLoadTicketsFlag(){
    return {
        type : ENABLE_LOADTICKETS
    }
}

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

export function fetchTickets(tickets){
    return {
        type : FETCH_TICKETS,
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

export function assignAndUpdateMultipleTickets(){
    return {
        type : ASSIGN_UPDATE_TICKET
    }
}

export function assignAndUpdateMultipleTicketsSuccess(){
    return {
        type : ASSIGN_UPDATE_TICKET_SUCCESS
    }
}

export function assignAndUpdateMultipleTicketsFailure(){
    return {
        type : ASSIGN_UPDATE_TICKET_FAILURE
    }
}

export function createTicketAPICall(ticket){
    console.log(ticket);
    let headers = new Headers();
    /* headers.append('Content-Type', 'multipart/form-data'); */
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    var formData = new FormData();
    for(var name in ticket) {
        formData.append(name, ticket[name]);
      }
      console.log(JSON.stringify(formData));
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
    console.log(queryParams);    
    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
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
            console.log("Tickets fetched: "+tickets);
           dispatch(fetchTicketsSuccess(tickets));
        },
       );
      };
}

export function fetchTicketDetailsAPICall(pathParams){
    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    var url = new URL("http://localhost:8080/v0/ticket-management/tickets/"+pathParams.ticketId);
    console.log(url);
    return function (dispatch) {      
        return fetch(url,{
            method : 'GET',
            headers: headers           
        })
        .then(
           response => {               
               if(response.status === 200 || response.status === 404 )
               return response.json();
               if(response.status === 404){
                   return response.json();
               }
               
           },
           error => console.log('An error occurred.', error),
       )
        .then((ticket) => {
            console.log(ticket);
           dispatch(fetchTicketDetailsSuccess(ticket));
        },
       );
      };
}

export function addMessageAPICall(params){
    console.log("params: "+JSON.stringify(params));
    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    var formData = new FormData();
    for(var name in params) {
        formData.append(name, params[name]);
      }
    var url = new URL("http://localhost:8080/v0/ticket-management/tickets/"+params.id);
    console.log(url);
    return function (dispatch) {      
        return fetch(url,{
            method : 'PUT',
            headers: headers,
            body:formData         
        })
        .then(
           response => {
               if(response.status === 204){
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


export function assignAndUpdateMultipleTicketsAPICall(params){
    
    console.log("params: "+JSON.stringify(params));
    let headers = new Headers();    
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    headers.append('Content-Type', 'application/json');
    var url = new URL("http://localhost:8080/v0/ticket-management/tickets");
    return function (dispatch) {      
        dispatch(assignAndUpdateMultipleTickets());
        return fetch(url,{
            method: 'PUT',
            headers: headers,
            body:JSON.stringify(params)
        })
        .then(
           response => {
               if(response.status === 204){
                dispatch(assignAndUpdateMultipleTicketsSuccess());
               }
               
           },
           error => {
            console.log('An error occurred.', error);
            dispatch(assignAndUpdateMultipleTicketsFailure());
           }
       );
      };
}


 export function closeTicketAPICall(params){
    console.log("params: "+JSON.stringify(params));
    let headers = new Headers();    
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    var formData = new FormData();
    for(var name in params) {
        formData.append(name, params[name]);
      }
    console.log("Formdata: "+JSON.stringify(formData));
    var url = new URL("http://localhost:8080/v0/ticket-management/tickets/"+params.id);
    return function (dispatch) {      
        return fetch(url,{
            method: 'PUT',
            headers: headers,
            body:formData
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


export function downloadAttachmentAPICall(params){
    console.log(params);
    let headers = new Headers();    
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    var url = new URL("http://localhost:8080/v0/ticket-management/tickets/downloadFile/123198_getAlertPackageResponse.txt");
    return function (dispatch) {      
        return fetch(url,{
            method: 'GET',
            headers: headers
        })
        .then(
           response => {
               console.log("Response received");
               return response.blob();
               
           },
           error => {
            console.log('An error occurred.', error);
            dispatch(closeTicketFailure());

           }
       ).then(blob => {
           FileSaver.saveAs(blob,"sample.txt");
       });
      };
}


