import { CREATE_TICKET, CLOSE_TICKET_SUCCESS, CLOSE_TICKET_FAILURE, FETCH_ASSIGNED_TICKET_DETAILS, FETCH_ASSIGNED_TICKET_DETAILS_SUCCESS, FETCH_ASSIGNED_TICKET_DETAILS_FAILURE, CREATE_TICKET_FAILURE, CLOSE_TICKET, ASSIGN_UPDATE_MULTIPLE_TICKET, ASSIGN_UPDATE_MULTIPLE_TICKETS, ASSIGN_UPDATE_MULTIPLE_TICKETS_SUCCESS, ASSIGN_UPDATE_MULTIPLE_TICKETS_FAILURE, SET_MANAGER_TICKET_SEARCH_CRITERIA } from './ActionTypes';
import { CLOSE_UPDATE_TICKET, CLOSE_UPDATE_TICKET_SUCCESS, CLOSE_UPDATE_TICKET_FAILURE } from './ActionTypes';
import {MESSAGE_UPDATE_TICKET, MESSAGE_UPDATE_TICKET_FAILURE, MESSAGE_UPDATE_TICKET_SUCCESS} from './ActionTypes';
import { CREATE_TICKET_SUCCESS, FETCH_TICKETS_SUCCESS, FETCH_TICKETS, ASSIGN_UPDATE_TICKET_SUCCESS, ASSIGN_UPDATE_TICKET_FAILURE, ASSIGN_UPDATE_TICKET } from './ActionTypes';
import { FETCH_TICKET_DETAILS, FETCH_TICKET_DETAILS_FAILURE, FETCH_TICKET_DETAILS_SUCCESS } from './ActionTypes';
import { ADD_MESSAGE, ADD_MESSAGE_SUCCESS, ADD_MESSAGE_FAILURE } from './ActionTypes';
import { SHOW_FORM_NEW_TICKET } from './ActionTypes';
import { FETCH_ASSIGNED_TICKETS_SUCCESS, FETCH_ASSIGNED_TICKETS_FAILURE, FETCH_ASSIGNED_TICKETS } from './ActionTypes'
import { FETCH_CREATED_TICKETS_SUCCESS, FETCH_CREATED_TICKETS_FAILURE, FETCH_CREATED_TICKETS } from './ActionTypes'
import { FETCH_CREATED_TICKET_DETAILS_SUCCESS, FETCH_CREATED_TICKET_DETAILS_FAILURE, FETCH_CREATED_TICKET_DETAILS } from './ActionTypes';
import { showLoadingScreen, dismissLoadingScreen } from './LoadingScreenActions';
import FileSaver from 'file-saver';
import { PMAPI_BASE_URL } from '../masterdata/EnvironmentConfig';

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

export function createTicketFailure() {
    return {
        type: CREATE_TICKET_FAILURE
    }
}

export function fetchTicketsSuccess(ticketsData) {
    return {
        type: FETCH_TICKETS_SUCCESS,
        payload: {
            ticketList: {
                tickets: ticketsData.content,
                totalPages: ticketsData.totalPages,
                totalElements: ticketsData.totalElements,
                size: ticketsData.size,
                number: ticketsData.number,
                numberOfElements: ticketsData.numberOfElements
            }

        }
    }
}

export function fetchTickets() {
    return {
        type: FETCH_TICKETS
    }
}

export function fetchAssignedTicketsSuccess(tickets) {
    return {
        type: FETCH_ASSIGNED_TICKETS_SUCCESS,
        payload: {
            tickets: tickets
        }
    }
}

export function fetchAssignedTicketsFailure(tickets) {
    return {
        type: FETCH_ASSIGNED_TICKETS_FAILURE
    }
}

export function fetchAssignedTickets() {
    return {
        type: FETCH_ASSIGNED_TICKETS
    }
}

export function fetchCreatedTicketsSuccess(ticketsData) {
    return {
        type: FETCH_CREATED_TICKETS_SUCCESS,
        payload: {
            ticketList: {
                tickets: ticketsData.content,
                totalPages: ticketsData.totalPages,
                totalElements: ticketsData.totalElements,
                size: ticketsData.size,
                number: ticketsData.number,
                numberOfElements: ticketsData.numberOfElements
            }

        }
    }
}

export function fetchCreatedTicketsFailure(tickets) {
    return {
        type: FETCH_CREATED_TICKETS_FAILURE
    }
}

export function fetchCreatedTickets() {
    return {
        type: FETCH_CREATED_TICKETS
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

export function fetchAssignedTicketDetails(ticket) {
    return {
        type: FETCH_ASSIGNED_TICKET_DETAILS
    }
}

export function fetchAssignedTicketDetailsSuccess(ticket) {
    return {
        type: FETCH_ASSIGNED_TICKET_DETAILS_SUCCESS,
        payload: {
            ticket: ticket
        }
    }
}

export function fetchAssignedTicketDetailsFailure(ticket) {
    return {
        type: FETCH_ASSIGNED_TICKET_DETAILS_FAILURE
    }
}

export function fetchCreatedTicketDetails(ticket) {
    return {
        type: FETCH_CREATED_TICKET_DETAILS
    }
}

export function fetchCreatedTicketDetailsSuccess(ticket) {
    return {
        type: FETCH_CREATED_TICKET_DETAILS_SUCCESS,
        payload: {
            ticket: ticket
        }
    }
}

export function fetchCreatedTicketDetailsFailure(ticket) {
    return {
        type: FETCH_CREATED_TICKET_DETAILS_FAILURE
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

export function closeTicket() {
    return {
        type: CLOSE_TICKET
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

export function closeAndUpdateTicket() {
    return {
        type: CLOSE_UPDATE_TICKET
    }
}

export function closeAndUpdateTicketSuccess() {
    return {
        type: CLOSE_UPDATE_TICKET_SUCCESS
    }
}

export function closeAndUpdateTicketFailure() {
    return {
        type: CLOSE_UPDATE_TICKET_FAILURE
    }
}

export function messageAndUpdateTicket() {
    return {
        type: MESSAGE_UPDATE_TICKET
    }
}

export function messageAndUpdateTicketSuccess() {
    return {
        type: MESSAGE_UPDATE_TICKET_SUCCESS
    }
}

export function messageAndUpdateTicketFailure() {
    return {
        type: MESSAGE_UPDATE_TICKET_FAILURE
    }
}

export function assignAndUpdateTicket() {
    return {
        type: ASSIGN_UPDATE_TICKET
    }
}

export function assignAndUpdateTicketSuccess() {
    return {
        type: ASSIGN_UPDATE_TICKET_SUCCESS
    }
}

export function assignAndUpdateTicketFailure() {
    return {
        type: ASSIGN_UPDATE_TICKET_FAILURE
    }
}

export function assignAndUpdateMultipleTickets() {
    return {
        type: ASSIGN_UPDATE_MULTIPLE_TICKETS
    }
}

export function assignAndUpdateMultipleTicketsSuccess() {
    return {
        type: ASSIGN_UPDATE_MULTIPLE_TICKETS_SUCCESS
    }
}

export function assignAndUpdateMultipleTicketsFailure() {
    return {
        type: ASSIGN_UPDATE_MULTIPLE_TICKETS_FAILURE
    }
}

export function setManagerTicketSearchCriteria(params) {
    return {
        type: SET_MANAGER_TICKET_SEARCH_CRITERIA,
        payload: {
            ticketList: {
                managerTicketSearchCriteria: {
                    cioKey: params.cioKey,
                    status: params.status,
                    pageNumber: params.pageNumber,
                    pageSize: params.pageSize,
                    isLoad: params.isLoad,
                    sortBy: params.sortBy,
                    sortOrder: params.sortOrder
                },
                loadManagerTickets: params.isLoad
            }
        }
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
        dispatch(createTicket());
        return fetch(PMAPI_BASE_URL + "/v0/ticketing/tickets", {
            method: 'POST',
            body: formData,
            headers: headers
        })
            .then(
                response => {
                    console.log(response);
                    if (response.status === 201) {
                        dispatch(createTicketSuccess());
                        return response.json();
                    }
                    if (response.status === 500) {
                        dispatch(createTicketFailure());
                    }
                },
                error => {
                    dispatch(createTicketFailure());
                    console.log('An error occurred.', error);
                }
            ).then((ticketData) => {
                console.log("Created ticket:");
                console.log(ticketData);
            }
            );
    };
}

export function fetchTicketsAPICall(queryParams) {
    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    var url = new URL(PMAPI_BASE_URL + "/v0/ticket-management/tickets");
    var params = {
        status: queryParams.status, pageNumber: queryParams.pageNumber,
        pageSize: queryParams.pageSize, createdByMe: queryParams.createdByMe
    };
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
            .then((ticketsData) => {
                console.log("Tickets Data:");
                console.log(ticketsData);
                dispatch(dismissLoadingScreen());
                dispatch(fetchTicketsSuccess(ticketsData));
            },
            );
    };
}

export function fetchAssignedTicketsAPICall(queryParams) {
    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    var url = new URL(PMAPI_BASE_URL + "/v0/ticket-support/tickets");
    var params = { status: queryParams.status, sortBy: queryParams.sortBy };
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

    return function (dispatch) {
        dispatch(fetchAssignedTickets());
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
                dispatch(fetchAssignedTicketsSuccess(tickets));
            },
            );
    };
}

export function fetchCreatedTicketsAPICall(queryParams) {
    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    var url = new URL(PMAPI_BASE_URL + "/v0/ticketing/tickets");
    var params = {
        status: queryParams.status,
        sortBy: queryParams.sortBy,
        pageNumber: queryParams.pageNumber,
        pageSize: queryParams.pageSize,
        sortOrder: queryParams.sortOrder
    };
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

    return function (dispatch) {
        dispatch(fetchCreatedTickets());
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
            .then((ticketsData) => {
                console.log("Tickets Data:");
                console.log(ticketsData);
                dispatch(fetchCreatedTicketsSuccess(ticketsData));
            },
            );
    };
}

export function fetchTicketDetailsAPICall(pathParams) {
    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    var url = new URL(PMAPI_BASE_URL + "/v0/ticket-management/tickets/" + pathParams.ticketId);
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

export function fetchAssignedTicketDetailsAPICall(pathParams) {
    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    var url = new URL(PMAPI_BASE_URL + "/v0/ticket-support/tickets/" + pathParams.ticketId);
    console.log(url);
    return function (dispatch) {
        dispatch(fetchAssignedTicketDetails());
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
                dispatch(fetchAssignedTicketDetailsSuccess(ticket));
            },
            );
    };
}

export function fetchCreatedTicketDetailsAPICall(pathParams) {
    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    var url = new URL(PMAPI_BASE_URL + "/v0/ticketing/tickets/" + pathParams.ticketId);
    console.log(url);
    return function (dispatch) {
        dispatch(fetchCreatedTicketDetails());
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
                dispatch(fetchCreatedTicketDetailsSuccess(ticket));
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
    var url = new URL(PMAPI_BASE_URL + "/v0/ticketing/tickets/" + params.id);
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

                    if (response.status === 500 || response.status === 400) {
                        dispatch(addMessageFailure());
                    }
                },
                error => {
                    console.log('An error occurred.', error);
                    dispatch(addMessageFailure());
                }
            );
    };
}

export function assignAndUpdateTicketAPICall(params, queryParams) {
    console.log("params: " + JSON.stringify(params));
    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    var formData = new FormData();
    for (var name in params) {
        formData.append(name, params[name]);
    }
    console.log("Formdata: " + JSON.stringify(formData));
    var url = new URL(PMAPI_BASE_URL + "/v0/ticket-management/tickets/" + params.id);

    //Appending the query-params if available
    if (queryParams)
        Object.keys(queryParams).forEach(key => url.searchParams.append(key, queryParams[key]));
    return function (dispatch) {
        dispatch(assignAndUpdateTicket());
        return fetch(url, {
            method: 'PUT',
            headers: headers,
            body: formData
        })
            .then(
                response => {
                    if (response.status === 204) {
                        dispatch(assignAndUpdateTicketSuccess());
                    }
                    if (response.status === 500 || response.status === 400) {
                        console.log("Dispatching close ticket failure");
                        dispatch(assignAndUpdateTicketFailure());
                    }

                },
                error => {
                    console.log('An error occurred.', error);
                    dispatch(assignAndUpdateTicketFailure());

                }
            );
    };

}

export function assignAndUpdateMultipleTicketsAPICall(params) {

    console.log("params: " + JSON.stringify(params));
    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    headers.append('Content-Type', 'application/json');
    var url = new URL(PMAPI_BASE_URL + "/v0/ticket-management/tickets");
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
    var url = new URL(PMAPI_BASE_URL + "/v0/ticketing/tickets/" + params.id);
    return function (dispatch) {
        dispatch(closeTicket());
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
                    if (response.status === 500 || response.status === 400) {
                        console.log("Dispatching close ticket failure");
                        dispatch(closeTicketFailure());
                    }

                },
                error => {
                    console.log('An error occurred.', error);
                    dispatch(closeTicketFailure());

                }
            );
    };
}

export function closeAndUpdateTicketAPICall(params, queryParams) {
    console.log("params:");
    console.log(params);
    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    var formData = new FormData();
    for (var name in params) {
        formData.append(name, params[name]);
    }
    console.log("Formdata: " + JSON.stringify(formData));
    var url = new URL(PMAPI_BASE_URL + "/v0/ticket-management/tickets/" + params.id);
    //Appending the query-params
    Object.keys(queryParams).forEach(key => url.searchParams.append(key, queryParams[key]));
    return function (dispatch) {
        dispatch(closeAndUpdateTicket());
        return fetch(url, {
            method: 'PUT',
            headers: headers,
            body: formData
        })
            .then(
                response => {
                    if (response.status === 204) {
                        dispatch(closeAndUpdateTicketSuccess());
                    }
                    if (response.status === 500 || response.status === 400) {
                        console.log("Dispatching close ticket failure");
                        dispatch(closeAndUpdateTicketFailure());
                    }

                },
                error => {
                    console.log('An error occurred.', error);
                    dispatch(closeAndUpdateTicketFailure());

                }
            );
    };
}

export function messageAndUpdateTicketAPICall(params, queryParams) {
    console.log("params:");
    console.log(params);
    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    var formData = new FormData();
    for (var name in params) {
        formData.append(name, params[name]);
    }
    console.log("Formdata: " + JSON.stringify(formData));
    var url = new URL(PMAPI_BASE_URL + "/v0/ticket-management/tickets/" + params.id);
    //Appending the query-params
    Object.keys(queryParams).forEach(key => url.searchParams.append(key, queryParams[key]));
    return function (dispatch) {
        dispatch(closeAndUpdateTicket());
        return fetch(url, {
            method: 'PUT',
            headers: headers,
            body: formData
        })
            .then(
                response => {
                    if (response.status === 204) {
                        dispatch(closeAndUpdateTicketSuccess());
                    }
                    if (response.status === 500 || response.status === 400) {
                        console.log("Dispatching close ticket failure");
                        dispatch(closeAndUpdateTicketFailure());
                    }

                },
                error => {
                    console.log('An error occurred.', error);
                    dispatch(closeAndUpdateTicketFailure());

                }
            );
    };
}

export function downloadAttachmentAPICall(params) {
    console.log(params);
    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    var url = new URL(PMAPI_BASE_URL + "/v0/ticket-management/tickets/downloadFile/123198_getAlertPackageResponse.txt");
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


