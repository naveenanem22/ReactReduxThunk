import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, compose, createStore } from 'redux';
import App from './App';
import { MainReducer } from './reducers/MainReducer'
import thunk from 'redux-thunk';
import registerServiceWorker from './registerServiceWorker';




const allStoreEnhancers = compose(
    applyMiddleware(thunk)
)
const store = createStore(MainReducer, {
    serviceCallStatus: {
        fetchTicketsAPI: { requested: false, success: false, error: false },
        loginAPI: { requested: false, success: false, error: false },
        getProfileAPI: { requested: false, success: false, error: false },
        createTicketAPI: { requested: false, success: false, error: false },
        fetchTicketDetailsAPI: { requested: false, success: false, error: false },
        fetchAssignedTicketDetailsAPI: { requested: false, success: false, error: false },
        fetchCreatedTicketDetailsAPI: { requested: false, success: false, error: false },
        addMessageAPI: { requested: false, success: false, error: false },
        closeTicketAPI: { requested: false, success: false, error: false },
        closeAndUpdateTicketAPI: { requested: false, success: false, error: false },
        messageAndUpdateTicketAPI: { requested: false, success: false, error: false },
        modalMessageAndUpdateTicketAPI: { requested: false, success: false, error: false },
        fetchAssignedTicketsAPI: { requested: false, success: false, error: false },
        fetchCreatedTicketsAPI: { requested: false, success: false, error: false },
        fetchEngineersAPI: { requested: false, success: false, error: false },
        assignAndUpdateTicketAPI: { requested: false, success: false, error: false },
        fetchDashboardDataMultipleAPI: { requested: false, success: false, error: false }
    },
    dashboardData: {
        barChart: {
            data: []
        },
        pieChart: {
            data: []

        },
        lineGraph: {
            data: []
        },
        lastHourTicketCount: {
            Closed: 0,
            New: 0,
            AwaitingUserResponse: 0
        },
        totalTicketCountFromStart: {
            count: 0
        },
        isDashboardFormVisible: false
    },
    loadingScreen: {
        isLoadingScreenVisible: false
    },
    activeSideMenuItem: {
        employeeView: { activeSideMenuOption: '' },
        managerView: { activeSideMenuOption: '' },
        engineerView: { activeSideMenuOption: '' }
    },
    departments: [{ id: '1', name: 'ITS' }, { id: '2', name: 'RMG' }, { id: '3', name: 'HR' }],
    serviceCategories: [{ id: '1', name: 'Network' }, { id: '2', name: 'Printer' }, { id: '3', name: 'Desktop/Laptop' }, { id: '4', name: 'Software/OS' }],
    products: [],
    user: {
        isLoggedIn: false, isLoginFailure: false, loginFailureMessage: '', profile: {
            contactInfo: {}, individualAddress: {}
        }
    },
    engineerList: {
        engineers: []
    },

    ticketList: {
        tickets: [],
        isCreateTicketFormVisible: false,
        isCreateTicketFailureFormVisible: false,
        isViewTicketsFormVisible: false,
        isSuccessAlertVisible: false,
        //managerTicketSearchCriteria will be depricated as the common ticketSearchCriteriaObject should be used.
        managerTicketSearchCriteria: {
            cioKey: '',
            status: '',
            pageNumber: '',
            pageSize: '',
            isLoad: false,
            sortBy: '',
            sortOrder: '',
            createdByMe: '',
            managedByMe: '',
            assignedToMe: '',
            isSearch: false,
            searchText: '',
            searchFieldsListString: ''
        },
        loadManagerTickets: false,

        ticketSearchCriteria: {
            cioKey: '',
            status: '',
            pageNumber: '',
            pageSize: '',
            isLoad: false,
            sortBy: '',
            sortOrder: '',
            createdByMe: '',
            managedByMe: '',
            assignedToMe: '',
            isSearch: false,
            searchText: '',
            searchFieldsListString: ''
        },
        loadTickets: false

    },

    ticketDetails: {
        ticket: {},
        isViewTicketDetailsFormVisible: false,
        isLoadingScreenInViewTicketDetailsPage: true,
        isAddMessageSuccessVisible: false,
        isAddMessageFailureVisible: false,
        isCloseTicketSuccessVisible: false,
        isCloseTicketFailureVisible: false
    }
}, allStoreEnhancers);

ReactDOM.render(<App />, document.getElementById("root"));

registerServiceWorker();
