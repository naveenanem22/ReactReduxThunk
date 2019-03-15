import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, compose, createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './App';
import { MainReducer } from './reducers/MainReducer'
import thunk from 'redux-thunk';
import { Router, Route, Link } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';
import ViewTicketsPage from './containers/ViewTicketsPage';
import ViewTicketDetailsPage from './containers/ViewTicketDetailsPage';
import LoginPage from './containers/LoginPage';
import HomePage from './containers/HomePage';
import history from './history';
import DashboardPage from './containers/DashboardPage';

const allStoreEnhancers = compose(
    applyMiddleware(thunk)
)
const store = createStore(MainReducer, {
    departments: [{ id: '1', name: 'ITS' }, { id: '2', name: 'RMG' }, { id: '3', name: 'HR' }],
    priority: [{ id: '1', name: 'High' }, { id: '2', name: 'Medium' }, { id: '3', name: 'Low' }],
    ticketType: [{ id: '1', name: 'Task' }, { id: '2', name: 'Issue' }],
    ticketStatus: [{ id: '1', name: 'Processing' }, { id: '2', name: 'Pending' }, { id: '3', name: 'Closed' }, { id: '4', name: 'Open' }, { id: '5', name: 'New' }],
    serviceCategories: [{ id: '1', name: 'Network' }, { id: '2', name: 'Printer' }, { id: '3', name: 'Desktop/Laptop' }, { id: '4', name: 'Software/OS' }],
    products: [],
    user: {
        isLoggedIn: false, isLoginFailure: false, loginFailureMessage: '', profile: {
            firstName: 'Anem',
            lastName: 'Naveen Kumar', role: 'Manager'
        },
        engineerList: {
            engineers: [{ userId: '1', userEmail: 'mike@itshelpdesk.com', userFullName: 'Mike Spanner' },
            { userId: '2', userEmail: 'matt@itshelpdesk.com', userFullName: 'Matt Dillon' },
            { userId: '3', userEmail: 'prior@itshelpdesk.com', userFullName: 'Prior Hann' },
            { userId: '4', userEmail: 'humpty@itshelpdesk.com', userFullName: 'Humpty Nash' },
            { userId: '5', userEmail: 'sunder@itshelpdesk.com', userFullName: 'Sunder Kumar' },
            { userId: '6', userEmail: 'pichai@itshelpdesk.com', userFullName: 'Pichai google' },
            { userId: '7', userEmail: 'salmon@itshelpdesk.com', userFullName: 'Salmon Khan' },
            { userId: '8', userEmail: 'cambridge@itshelpdesk.com', userFullName: 'Steve Kemp' },
            { userId: '9', userEmail: 'su@itshelpdesk.com', userFullName: 'Su Chi' },
            { userId: '10', userEmail: 'wang@itshelpdesk.com', userFullName: 'Wang Robert' },
            { userId: '11', userEmail: 'tim@itshelpdesk.com', userFullName: 'Tim Hann' },
            { userId: '12', userEmail: 'cook@itshelpdesk.com', userFullName: 'Cook Brenner' },
            { userId: '13', userEmail: 'chowhan@itshelpdesk.com', userFullName: 'Chowhan Rahul' },
            { userId: '14', userEmail: 'rahul@itshelpdesk.com', userFullName: 'Rahul Kumar' }]
        }
    },
    
    ticketList: {
        tickets: [],
        isLoadingScreen: true,
        isCreateTicketFormVisible: true,
        isCreateTicketSuccessFormVisible: false,
        isCreateTicketFailureFormVisible: false,
        isViewTicketsFormVisible: false,
        isLoadingScreenInViewTicketspage: true
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
                <Route path="/home" component={HomePage}></Route>
                <Route path="/login" component={LoginPage}></Route>
                <Route path="/newticket" component={App}></Route>
                <Route path="/tickets" component={ViewTicketsPage}></Route>
                <Route path="/ticketdetails" component={ViewTicketDetailsPage}></Route>
                <Route path="/dashboard" component={DashboardPage}></Route>
            </div>
        </Router>
    </Provider>, document.getElementById('root'));

registerServiceWorker();
