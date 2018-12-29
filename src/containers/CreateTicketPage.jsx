import React from 'react';
import CreateNewTicketForm from "./CreateTicketForm";
import HeaderNavBar from "../components/HeaderNavBar";
import SideNavBar from '../components/SideNavBar';
import {connect} from 'react-redux';
import CreateTicketSuccessForm from './CreateTicketSuccessForm';

class CreateNewTicketPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            
        }
    }

    render(){
        console.log(this.props);
        return (
            <div class = 'new-ticket-page'>
                <div class = 'new-ticket-header'>
                <HeaderNavBar></HeaderNavBar>
                </div>
                <div class = 'new-ticket-side-nav'>
                <SideNavBar></SideNavBar>
                </div>            
                {this.props.isCreateTicketFormVisible && <div class = 'new-ticket-form'>
                <CreateNewTicketForm ></CreateNewTicketForm>
                </div>}
                {this.props.isCreateTicketSuccessFormVisible && <div class = 'new-ticket-form'>
                <CreateTicketSuccessForm ></CreateTicketSuccessForm>
                </div>}
            </div>
        
        );
    }


}

const mapStateToProps = function (state){
    return {
        isCreateTicketFormVisible: state.ticketList.isCreateTicketFormVisible,
        isCreateTicketSuccessFormVisible : state.ticketList.isCreateTicketSuccessFormVisible,
        isCreateTicketFailureFormVisible : state.ticketList.isCreateTicketFailureFormVisible
  
    }
  }

  export default connect(mapStateToProps)(CreateNewTicketPage);