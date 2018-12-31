import React from 'react';
import CreateNewTicketForm from "./CreateTicketForm";
import HeaderNavBar from "../components/HeaderNavBar";
import SideNavBar from '../components/SideNavBar';
import {connect} from 'react-redux';
import { Alert } from 'reactstrap';

class CreateNewTicketPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isAlertVisible : true
        }

        this.onDismiss = this.onDismiss.bind(this);
    }

    onDismiss() {
        this.setState({ isAlertVisible: false });
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
                {this.props.isCreateTicketSuccessFormVisible && <div class = 'new-ticket-success-header'>
                <Alert color="success" isOpen={this.state.isAlertVisible} toggle={this.onDismiss}>
                <h4 className="alert-heading">Success!</h4>
                <p>
                A new ticket has been raised successfully. An auto generated eMail is already triggered
                and should be on the way to your inbox. Pls check the details and update the ticket if you need
                to.
                </p>
                <hr />
                <p className="mb-0">
                Should you require further assistance on the same, please reach out to the ITS-Helpdesk
                at itshelpdesk@compnay.com.
                </p>
                </Alert>
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