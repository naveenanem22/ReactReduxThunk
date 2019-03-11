import React from 'react';
import HeaderNavBar from "../components/HeaderNavBarHome";
import {connect} from 'react-redux';

import { ScaleLoader } from 'react-spinners';


class HomePage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
        }
        
    }

    render(){        
        return (
            <div >
                <div class = 'sticky'  >
                <HeaderNavBar></HeaderNavBar>
                </div >
                
                
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

  export default connect(mapStateToProps)(HomePage);