import React from 'react';
import CreateNewTicketForm from "./CreateTicketForm";
import ViewTicketDetailForm from './ViewTicketDetailsForm';
import HeaderNavBar from "../components/HeaderNavBar";
import SideNavBar from '../components/SideNavBar';
import {connect} from 'react-redux';
import { Alert, Table } from 'reactstrap';
import { ScaleLoader } from 'react-spinners';

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
            <div >
                <div class = 'sticky'  >
                <HeaderNavBar></HeaderNavBar>
                </div>
                
                <div  style ={{ background:'rgba(0,0,0,0.3)' }} class = "view-ticket-body">
                <Table borderless>          
                <tbody>
               <tr >
               <td style ={{ width:'20%' }}><SideNavBar ></SideNavBar></td>
               <td>
               {this.props.isCreateTicketFormVisible && <div class = 'view-ticket-form'>
                <CreateNewTicketForm ></CreateNewTicketForm>
                </div>}
                
                {false && <div className='view-ticket-form'>
                <div className='view-ticket-loading'>
                <ScaleLoader 
                color='#00d8ff'
                loading = 'true' 
                />
                </div>
                
                </div>
                }
                
                {this.props.isCreateTicketSuccessFormVisible && <div >
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
                </div>}</td>
              </tr>             
            
            </tbody>
            </Table>
            </div>
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