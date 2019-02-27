import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, compose, createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './App';
import {MainReducer} from './reducers/MainReducer'
import thunk from 'redux-thunk';
import { Router, Route, Link } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';
import ViewTicketsPage from './containers/ViewTicketsPage';
import ViewTicketDetailsPage from './containers/ViewTicketDetailsPage';
import LoginPage from './containers/LoginPage';
import history from './history';

const allStoreEnhancers = compose(
    applyMiddleware(thunk)
)
const store = createStore(MainReducer,{
    departments: [{id:'1',name:'ITS'},{id:'2', name:'RMG'},{id:'3', name:'HR'}],
    priority:[{id:'1', name:'High'},{id:'2',name:'Medium'},{id:'3', name:'Low'}],
    ticketType:[{id:'1',name:'Task'},{id:'2', name:'Issue'}],
    ticketStatus:[{id:'1',name:'Processing'},{id:'2',name:'Pending'},{id:'3',name:'Closed'},{id:'4',name:'Open'},{id:'5',name:'New'}],
    serviceCategories:[{id:'1',name:'Network'},{id:'2',name:'Printer'},{id:'3',name:'Desktop/Laptop'},{id:'4',name:'Software/OS'}],
    products : [],
    user : {isLoggedIn: false, isLoginFailure: false, loginFailureMessage: ''},
    ticketList: {tickets:[],
        isLoadingScreen : true,
        isCreateTicketFormVisible: true,
        isCreateTicketSuccessFormVisible : false,
        isCreateTicketFailureFormVisible : false,        
        isViewTicketsFormVisible: false,
        isLoadingScreenInViewTicketspage: true},
    ticketDetails:{ticket:{},                      
        isViewTicketDetailsFormVisible: false,
        isLoadingScreenInViewTicketDetailsPage: true,
        isAddMessageSuccessVisible : false,
        isAddMessageFailureVisible: false,
        isCloseTicketSuccessVisible: false,
        isCloseTicketFailureVisible: false}    
},allStoreEnhancers);


ReactDOM.render(
    /*<Provider store={store}>
        <App ownPropTest="react-redux-app"/>
    </Provider>, document.getElementById('root'));*/
    <Provider store={store}>
    <Router history={history}>
    <div>
    <Route path = "/login" component = {LoginPage}></Route>
    <Route path = "/newticket" component = {App}></Route>
    <Route path = "/tickets" component = {ViewTicketsPage}></Route>
    <Route path = "/ticketdetails" component = {ViewTicketDetailsPage}></Route> 
    </div>
   </Router>
   </Provider>,document.getElementById('root'));

registerServiceWorker();
