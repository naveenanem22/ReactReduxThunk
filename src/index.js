import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, compose, createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './App';
import {MainReducer} from './reducers/MainReducer'
import thunk from 'redux-thunk';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';
import ViewTicketsPage from './containers/ViewTicketsPage';
import ViewTicketDetailsPage from './containers/ViewTicketDetailsPage';

const allStoreEnhancers = compose(
    applyMiddleware(thunk)
)
const store = createStore(MainReducer,{
    products : [],
    user : '',
    ticketList: {tickets:[],
        isLoadingScreen : true,
        isCreateTicketFormVisible: true,
        isCreateTicketSuccessFormVisible : false,
        isCreateTicketFailureFormVisible : false,        
        isViewTicketsFormVisible: false,
        isLoadingScreenInViewTicketspage: true},
    ticketDetails:{ticket:{},                      
        isViewTicketDetailsFormVisible: false,
        isLoadingScreenInViewTicketDetailsPage: true}    
},allStoreEnhancers);


ReactDOM.render(
    /*<Provider store={store}>
        <App ownPropTest="react-redux-app"/>
    </Provider>, document.getElementById('root'));*/
    <Provider store={store}>
    <BrowserRouter>
    <div>
    <Route path = "/newticket" component = {App}></Route>
    <Route path = "/tickets" component = {ViewTicketsPage}></Route>
    <Route path = "/ticketdetails" component = {ViewTicketDetailsPage}></Route> 
    </div>
   </BrowserRouter>
   </Provider>,document.getElementById('root'));

registerServiceWorker();
