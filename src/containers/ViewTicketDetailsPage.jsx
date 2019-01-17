import React from 'react';
import HeaderNavBar from "../components/HeaderNavBar";
import SideNavBar from '../components/SideNavBar';
import { ScaleLoader } from 'react-spinners';
import ViewTicketDetailsForm from './ViewTicketDetailsForm';
import {connect} from 'react-redux';
import {fetchTicketDetailsAPICall} from '../actions/TicketActions'
import {Table} from 'reactstrap';


class ViewTicketDetailsPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
        }
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
                }</td>
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
        isLoadingScreenInViewTicketDetailsPage : state.ticketDetails.isLoadingScreenInViewTicketDetailsPage
    }
  }

  const mapActionsToProps = {  
    fetchTicketDetails : fetchTicketDetailsAPICall  
  }

  export default connect(mapStateToProps,mapActionsToProps)(ViewTicketDetailsPage);