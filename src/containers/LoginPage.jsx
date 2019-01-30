import React from 'react';
import HeaderNavBar from "../components/HeaderNavBar";
import {connect} from 'react-redux';

import { ScaleLoader } from 'react-spinners';
import LoginForm from './LoginForm';

class LoginPage extends React.Component {
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
                <LoginForm ></LoginForm>
                
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

  export default connect(mapStateToProps)(LoginPage);