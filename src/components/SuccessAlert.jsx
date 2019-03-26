import React from 'react';
import {connect} from 'react-redux';
import { Alert} from 'reactstrap';

class SuccessAlert extends React.Component{
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

    render(){
        return <Alert color="success" isOpen={this.state.isAlertVisible} toggle={this.onDismiss}>
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
    }
}

const mapDispatchToProps = dispatch => {

    return {
      fetchTickets: (params) => {
        //dispatch(fetchTicketsAPICall(params))
      }    
    };
  }
  
  const mapStateToProps = function (state) {
  
  };

export default connect(mapStateToProps, mapDispatchToProps)(SuccessAlert);

