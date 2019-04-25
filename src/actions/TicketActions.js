import { CREATE_TICKET, CLOSE_TICKET_SUCCESS, CLOSE_TICKET_FAILURE } from './ActionTypes';
import { CREATE_TICKET_SUCCESS, FETCH_TICKETS_SUCCESS, FETCH_TICKETS,ASSIGN_UPDATE_TICKET_SUCCESS, ASSIGN_UPDATE_TICKET_FAILURE, ASSIGN_UPDATE_TICKET } from './ActionTypes';
import {FETCH_TICKET_DETAILS,FETCH_TICKET_DETAILS_FAILURE, FETCH_TICKET_DETAILS_SUCCESS} from './ActionTypes';
import {ADD_MESSAGE, ADD_MESSAGE_SUCCESS, ADD_MESSAGE_FAILURE} from './ActionTypes';
import { SHOW_FORM_NEW_TICKET } from './ActionTypes';
import {showLoadingScreen, dismissLoadingScreen} from './LoadingScreenActions';
import FileSaver from 'file-saver';

export function showFormNewTicket() {
    return {
        type: SHOW_FORM_NEW_TICKET
    }

}

export function createTicket() {
    return {
        type: CREATE_TICKET
    }
}

export function createTicketSuccess() {
    return {
        type: CREATE_TICKET_SUCCESS
    }
}

export function fetchTicketsSuccess(tickets) {
    return {
        type: FETCH_TICKETS_SUCCESS,
        payload: {
            tickets: tickets
        }
    }
}

export function fetchTickets() {
    return {
        type: FETCH_TICKETS
    }
}

export function fetchTicketDetails(ticket) {
    return {
        type: FETCH_TICKET_DETAILS
    }
}

export function fetchTicketDetailsSuccess(ticket) {
    return {
        type: FETCH_TICKET_DETAILS_SUCCESS,
        payload: {
            ticket: ticket
        }
    }
}

export function fetchTicketDetailsFailure(ticket) {
    return {
        type: FETCH_TICKET_DETAILS_FAILURE
    }
}

export function addMessage() {
    return {
        type: ADD_MESSAGE
    }
}

export function addMessageSuccess() {
    return {
        type: ADD_MESSAGE_SUCCESS
    }
}

export function addMessageFailure() {
    return {
        type: ADD_MESSAGE_FAILURE
    }
}

export function closeTicketSuccess() {
    return {
        type: CLOSE_TICKET_SUCCESS
    }
}

export function closeTicketFailure() {
    return {
        type: CLOSE_TICKET_FAILURE
    }
}

export function assignAndUpdateMultipleTickets() {
    return {
        type: ASSIGN_UPDATE_TICKET
    }
}

export function assignAndUpdateMultipleTicketsSuccess() {
    return {
        type: ASSIGN_UPDATE_TICKET_SUCCESS
    }
}

export function assignAndUpdateMultipleTicketsFailure() {
    return {
        type: ASSIGN_UPDATE_TICKET_FAILURE
    }
}

export function createTicketAPICall(ticket) {
    let headers = new Headers();
    /* headers.append('Content-Type', 'multipart/form-data'); */
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    var formData = new FormData();
    for (var name in ticket) {
        formData.append(name, ticket[name]);
    }
    console.log(JSON.stringify(formData));
    return function (dispatch) {
        dispatch(showLoadingScreen());
        dispatch(createTicket());
        return fetch(`http://localhost:8080/v0/ticket-management/tickets`, {
            method: 'POST',
            body: formData,
            headers: headers
        })
            .then(
                response => {
                    console.log(response);
                    if (response.status === 201) {
                        dispatch(dismissLoadingScreen());
                        dispatch(createTicketSuccess());
                        return response.statusText;
                    }
                },
                error => {
                    dispatch(dismissLoadingScreen());
                    console.log('An error occurred.', error);
                }
            );
    };
}

export function fetchTicketsAPICall(queryParams) {
    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    var url = new URL("http://localhost:8080/v0/ticket-management/tickets");
    var params = { userId: queryParams.userId, status: queryParams.status, sortBy: queryParams.sortBy };
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

    return function (dispatch) {
        dispatch(showLoadingScreen());
        dispatch(fetchTickets());
        return fetch(url, {
            method: 'GET',
            headers: headers
        })
            .then(
                response => {
                    if (response.status === 200)
                        return response.json();
                },
                error => console.log('An error occurred.', error),
            )
            .then((tickets) => {
                console.log("Tickets fetched: " + tickets);
                dispatch(dismissLoadingScreen());
                dispatch(fetchTicketsSuccess(tickets));
            },
            );
    };
}

export function fetchTicketDetailsAPICall(pathParams) {
    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    var url = new URL("http://localhost:8080/v0/ticket-management/tickets/" + pathParams.ticketId);
    console.log(url);
    return function (dispatch) {
        dispatch(fetchTicketDetails());
        return fetch(url, {
            method: 'GET',
            headers: headers
        })
            .then(
                response => {
                    if (response.status === 200 || response.status === 404)
                        return response.json();
                    if (response.status === 404) {
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

export function addMessageAPICall(params) {
    console.log("params: " + JSON.stringify(params));
    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    var formData = new FormData();
    for (var name in params) {
        formData.append(name, params[name]);
    }
    var url = new URL("http://localhost:8080/v0/ticket-management/tickets/" + params.id);
    console.log(url);
    return function (dispatch) {
        dispatch(addMessage());
        return fetch(url, {
            method: 'PUT',
            headers: headers,
            body: formData
        })
            .then(
                response => {
                    if (response.status === 204) {
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


export function assignAndUpdateMultipleTicketsAPICall(params) {

    console.log("params: " + JSON.stringify(params));
    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    headers.append('Content-Type', 'application/json');
    var url = new URL("http://localhost:8080/v0/ticket-management/tickets");
    return function (dispatch) {
        dispatch(showLoadingScreen());
        dispatch(assignAndUpdateMultipleTickets());
        return fetch(url, {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(params)
        })
            .then(
                response => {
                    if (response.status === 204) {
                        dispatch(dismissLoadingScreen());
                        dispatch(assignAndUpdateMultipleTicketsSuccess());
                    }

                },
                error => {
                    console.log('An error occurred.', error);
                    dispatch(dismissLoadingScreen());
                    dispatch(assignAndUpdateMultipleTicketsFailure());
                }
            );
    };
}


export function closeTicketAPICall(params) {
    console.log("params: " + JSON.stringify(params));
    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    var formData = new FormData();
    for (var name in params) {
        formData.append(name, params[name]);
    }
    console.log("Formdata: " + JSON.stringify(formData));
    var url = new URL("http://localhost:8080/v0/ticket-management/tickets/" + params.id);
    return function (dispatch) {
        return fetch(url, {
            method: 'PUT',
            headers: headers,
            body: formData
        })
            .then(
                response => {
                    if (response.status === 204) {
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


export function downloadAttachmentAPICall(params) {
    console.log(params);
    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    var url = new URL("http://localhost:8080/v0/ticket-management/tickets/downloadFile/123198_getAlertPackageResponse.txt");
    return function (dispatch) {
        return fetch(url, {
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
                FileSaver.saveAs(blob, "sample.txt");
            });
    };
}


