import React from 'react';
import CreateNewTicketForm from "./CreateTicketForm";
import HeaderNavBar from "../components/HeaderNavBar";
import SideNavBar from '../components/SideNavBar';

export default class CreateNewTicketPage extends React.Component {
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
                <CreateNewTicketForm ></CreateNewTicketForm>
                </div>
            </div>
        
        );
    }
}