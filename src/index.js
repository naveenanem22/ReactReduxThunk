import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, compose, createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './App';
import { MainReducer } from './reducers/MainReducer'
import thunk from 'redux-thunk';
import { Router, Route, Link } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';
import SPAMainPage from './containers/SPAMainPage';
import ViewTicketDetailsPage from './containers/ViewTicketDetailsPage';
import LoginPage from './containers/LoginPage';
import HomePage from './containers/HomePage';
import history from './history';
import DashboardPage from './containers/DashboardPage';
import SPAEngineerMainPage from './containers/SPAEngineerMainPage';
import SPAManagerMainPage from './containers/SPAManagerMainPage';
import SPAEmployeeMainPage from './containers/SPAEmployeeMainPage';
import { employeeSideMenuOptions } from './masterdata/ApplicationMasterData';

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
        engineerView: {}
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
        managerTicketSearchCriteria: {
            cioKey: '',
            status: '',
            pageNumber: '',
            pageSize: '',
            isLoad: false,
            sortBy:'',
            sortOrder: ''
        },
        loadManagerTickets: false

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


ReactDOM.render(
    /*<Provider store={store}>
        <App ownPropTest="react-redux-app"/>
    </Provider>, document.getElementById('root'));*/
    <Provider store={store}>
        <Router history={history}>
            <div>
                <Route path="/ticketmaint" component={SPAEngineerMainPage}></Route>
                <Route path="/ticketmanage" component={SPAManagerMainPage}></Route>
                <Route path="/ticketing" component={SPAEmployeeMainPage}></Route>
                <Route path="/home" component={HomePage}></Route>
                <Route path="/login" component={LoginPage}></Route>
                {/* <Route path="/tickets" component={SPAMainPage}></Route> */}
                <Route path="/ticketdetails" component={ViewTicketDetailsPage}></Route>
                <Route path="/dashboard" component={DashboardPage}></Route>
            </div>
        </Router>
    </Provider>, document.getElementById('root'));

registerServiceWorker();
