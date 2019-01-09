import React from 'react';
import HeaderNavBar from "../components/HeaderNavBar";
import SideNavBar from '../components/SideNavBar';
import { ScaleLoader } from 'react-spinners';
import ViewTicketDetailsForm from './ViewTicketDetailsForm';
import {connect} from 'react-redux';
import {fetchTicketsAPICall} from '../actions/TicketActions'
import {Table} from 'reactstrap';


class ViewTicketDetailsPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
        this.props.fetchTickets({
          userId:"naveen.anem@kony.com",
          status:'all',
          sortBy:'ticketId'
        });
  }
   
    render(){
        var bg=require('../testpagebg2.jpg');
        
        return (
            
           <div>
               
               <div class="sticky">
               <HeaderNavBar></HeaderNavBar>
               </div >
                <div  style ={ /*{ backgroundImage: "url("+bg+")" }*/ { background:'rgba(0,0,0,0.3)' }} class = "view-ticket-body">
                <Table borderless>          
                <tbody>
               <tr >
               <td><SideNavBar ></SideNavBar></td>
               <td>{true && <div class = 'view-ticket-form'>
                <ViewTicketDetailsForm ></ViewTicketDetailsForm>
                </div>}
                {false && <div className='view-ticket-form'>
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
        isViewTicketsFormVisible: state.ticketList.isViewTicketsFormVisible,
        isLoadingScreenInViewTicketspage : state.ticketList.isLoadingScreenInViewTicketspage
    }
  }

  const mapActionsToProps = {  
    fetchTickets : fetchTicketsAPICall  
  }

  export default connect(mapStateToProps,mapActionsToProps)(ViewTicketDetailsPage);