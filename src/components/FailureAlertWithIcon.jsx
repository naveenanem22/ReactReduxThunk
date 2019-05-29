import React from 'react';
import { Alert, Button } from 'reactstrap';
import { FaExclamationCircle } from 'react-icons/fa';

class FailureAlertWithIcon extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            visible: true
          };

        this.onDismiss = this.onDismiss.bind(this);
    }

    onDismiss() {
        this.setState({ visible: false });
      }

    render() {
        return (
            <Alert color="danger">
            
            <h4 className="alert-heading"> <FaExclamationCircle ></FaExclamationCircle> Failure!</h4>
            <p>
              Ticket assignment failed. Please try again.
            </p>
            <hr/>            
            <Button color="danger" size="sm" 
            style={{marginTop:'5%'}}>Goto Tickets</Button>
          </Alert>
        );
      }
}

export default FailureAlertWithIcon;