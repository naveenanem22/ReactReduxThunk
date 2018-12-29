import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, compose, createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './App';
import {MainReducer} from './reducers/MainReducer'
import thunk from 'redux-thunk';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';
import CreateTicketSuccessPage from './containers/CreateTIcketSuccessPage';

const allStoreEnhancers = compose(
    applyMiddleware(thunk)
)
const store = createStore(MainReducer,{
    products : [],
    user : '',
    ticketList: {tickets:[],
        isLoadingScreen : false,
        isCreateTicketFormVisible: false,
        isCreateTicketSuccessFormVisible : true,
        isCreateTicketFailureFormVisible : false}    
},allStoreEnhancers);


ReactDOM.render(
    /*<Provider store={store}>
        <App ownPropTest="react-redux-app"/>
    </Provider>, document.getElementById('root'));*/
    <Provider store={store}>
    <BrowserRouter>
    <div>
    <Route path = "/newticket" component = {App}></Route>
    <Route path = "/createticketsuccess" component = {CreateTicketSuccessPage}></Route> 
    </div>
   </BrowserRouter>
   </Provider>,document.getElementById('root'));

registerServiceWorker();
