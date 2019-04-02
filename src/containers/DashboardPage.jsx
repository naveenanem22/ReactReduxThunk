import React from 'react';
import HeaderNavBar from "../components/HeaderNavBar";
import SideNavBar from '../components/SideNavBar';
import DashBoardForm from './DashboardForm';
import { ScaleLoader } from 'react-spinners';
import {connect} from 'react-redux';
import {fetchTicketsAPICall} from '../actions/TicketActions'
import {Table} from 'reactstrap';

class DashBoardPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
      
  }
   
    render(){
        return (
            <div >
                <div class = 'sticky'>
                <HeaderNavBar></HeaderNavBar>
                </div>

                <div  style ={{ background:'rgba(0,0,0,0.3)' }} class = "view-ticket-body">
                <Table borderless>          
                <tbody>
               <tr >
               <td style ={{ width:'20%' }}><SideNavBar ></SideNavBar></td>
               <td>
               {this.props.isDashboardFormVisible && <div class = 'view-ticket-form'>
                <DashBoardForm ></DashBoardForm>
                </div>}
                
                {this.props.isLoadingScreenVisible && 
                <div className='view-ticket-loading'>
                <ScaleLoader 
                color='#00d8ff'
                loading = 'true' 
                />
                </div>
                }
                
                </td>
              </tr>             
            
            </tbody>
            </Table>
            </div>
            </div>
        
        );
    }
}

const mapStateToProps = function (state) {
  return {
    isDashboardFormVisible: state.dashboardData.isDashboardFormVisible,
    isLoadingScreenVisible: state.loadingScreen.isLoadingScreenVisible
  }
}

  const mapActionsToProps = {  
    fetchTickets : fetchTicketsAPICall  
  }
  export default connect(mapStateToProps,mapActionsToProps)(DashBoardPage);