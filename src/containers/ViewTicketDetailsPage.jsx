import React from 'react';
import HeaderNavBar from "../components/HeaderNavBar";
import SideNavBar from '../components/SideNavBar';
import { ScaleLoader } from 'react-spinners';
import ViewTicketDetailsForm from './ViewTicketDetailsForm';
import {connect} from 'react-redux';
import {fetchTicketDetailsAPICall} from '../actions/TicketActions'
import {Alert,Table} from 'reactstrap';


class ViewTicketDetailsPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isAlertVisible : true
        };
        this.onDismiss = this.onDismiss.bind(this);
    }

    onDismiss() {
        this.setState({ isAlertVisible: false });
    }

    componentDidMount() {
        const queryParams = new URLSearchParams(this.props.location.search);
        const ticketId = queryParams.get('ticketId');

        this.props.fetchTicketDetails({
          ticketId:ticketId
        });
  }
   
    render(){
        var bg=require('../testpagebg2.jpg');

        return (
            
           <div>
               
               <div class="sticky">
               <HeaderNavBar></HeaderNavBar>
               </div >
                <div  style ={{ background:'rgba(0,0,0,0.3)' }} class = "view-ticket-body">
                <Table borderless>          
                <tbody>
               <tr >
               <td style ={{ width:'20%' }}><SideNavBar ></SideNavBar></td>
               <td >{this.props.isViewTicketDetailsFormVisible && <div class = 'view-ticket-form'>
                <ViewTicketDetailsForm ></ViewTicketDetailsForm>
                </div>}
                {this.props.isLoadingScreenInViewTicketDetailsPage && <div className='view-ticket-form'>
                <div className='view-ticket-loading'>
                <ScaleLoader 
                color='#00d8ff'
                loading = 'true' 
                />
                </div>
                
                </div>
                }
                
                {this.props.isAddMessageSuccessVisible && <div >
                <Alert color="success" isOpen={this.state.isAlertVisible} toggle={this.onDismiss}>
                <h4 className="alert-heading">Success!</h4>
                <p>
                Message has been added to the ticket successfully.
                </p>
                <hr />
                <p className="mb-0">
                Should you require further assistance on the same, please reach out to the ITS-Helpdesk
                at itshelpdesk@compnay.com.
                </p>
                </Alert>
                </div>}
                
                {this.props.isCloseTicketSuccessVisible && <div >
                <Alert color="success" isOpen={this.state.isAlertVisible} toggle={this.onDismiss}>
                <h4 className="alert-heading">Success!</h4>
                <p>
                Ticket has been closed successfully.
                </p>
                <hr />
                <p className="mb-0">
                Should you require further assistance on the same, please reach out to the ITS-Helpdesk
                at itshelpdesk@compnay.com.
                </p>
                </Alert>
                </div>}

                {this.props.isCloseTicketFailureVisible && <div >
                <Alert color="danger" isOpen={this.state.isAlertVisible} toggle={this.onDismiss}>
                <h4 className="alert-heading">Failure!</h4>
                <p>
                An error occured while updating the ticket. Please try again after sometime.
                </p>
                <hr />
                <p className="mb-0">
                Should you require further assistance on the same, please reach out to the ITS-Helpdesk
                at itshelpdesk@compnay.com.
                </p>
                </Alert>
                </div>}
                
                </td>
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
        isViewTicketDetailsFormVisible: state.ticketDetails.isViewTicketDetailsFormVisible,
        isLoadingScreenInViewTicketDetailsPage : state.ticketDetails.isLoadingScreenInViewTicketDetailsPage,
        isAddMessageSuccessVisible: state.ticketDetails.isAddMessageSuccessVisible,
        isCloseTicketSuccessVisible: state.ticketDetails.isCloseTicketSuccessVisible,
        isCloseTicketFailureVisible : state.ticketDetails.isCloseTicketFailureVisible
    }
  }

  const mapActionsToProps = {  
    fetchTicketDetails : fetchTicketDetailsAPICall  
  }

  export default connect(mapStateToProps,mapActionsToProps)(ViewTicketDetailsPage);