import React from 'react';
import HeaderNavBar from "../components/HeaderNavBar";
import SideNavBar from '../components/SideNavBar';
import ViewTicketsForm from './ViewTicketsForm';
import { RingLoader, ScaleLoader } from 'react-spinners';
import {connect} from 'react-redux';
import {fetchTicketsAPICall} from '../actions/TicketActions'

class ViewTicketsPage extends React.Component {
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
        return (
            <div class = 'new-ticket-page'>
                <div class = 'new-ticket-header'>
                <HeaderNavBar></HeaderNavBar>
                </div>
                <div class = 'new-ticket-side-nav'>
                <SideNavBar></SideNavBar>
                </div >
                {this.props.isViewTicketsFormVisible && <div class = 'view-ticket-form'>
                <ViewTicketsForm ></ViewTicketsForm>
                </div>}
                {this.props.isLoadingScreenInViewTicketspage && <div className='view-ticket-form'>
                <div className='view-ticket-loading'>
                <ScaleLoader 
                color='#00d8ff'
                loading = 'true' 
                />
                </div>
                
                </div>
                }
                
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

  export default connect(mapStateToProps,mapActionsToProps)(ViewTicketsPage);