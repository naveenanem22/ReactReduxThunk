import React from 'react';
import { Alert, Button } from 'reactstrap';
import { FaCheckCircle } from 'react-icons/fa';

class SuccessAlertWithTick extends React.Component{
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
            <Alert color="success">
            
            <h4 className="alert-heading"> <FaCheckCircle ></FaCheckCircle> Success!</h4>
            <p>
              Ticket Updated Successfully.
            </p>
            <hr/>            
            <Button color="success" size="sm" 
            style={{marginTop:'5%'}}>Goto Tickets</Button>
          </Alert>
        );
      }
}

export default SuccessAlertWithTick;