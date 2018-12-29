import React from 'react';
import HeaderNavBar from "../components/HeaderNavBar";
import SideNavBar from '../components/SideNavBar';
import CreateTicketSuccessForm from './CreateTicketSuccessForm';

export default class CreateTicketSuccessPage extends React.Component {
    render(){
        return (
            <div class = 'new-ticket-page'>
                <div class = 'new-ticket-header'>
                <HeaderNavBar></HeaderNavBar>
                </div>
                <div class = 'new-ticket-side-nav'>
                <SideNavBar></SideNavBar>
                </div>
                <div class = 'new-ticket-form'>
                <CreateTicketSuccessForm ></CreateTicketSuccessForm>
                </div>                
            </div>
        
        );
    }
}