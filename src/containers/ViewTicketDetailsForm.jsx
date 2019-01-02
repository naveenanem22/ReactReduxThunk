import React from 'react';
import {createTicketAPICall} from '../actions/TicketActions'
import {connect} from 'react-redux';
import {Glyphicon, Button} from 'react-bootstrap';

class ViewTicketDetailsForm extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      ticketTitle:'',
      ticketDescription:'',
      department:'',
      priority:'',
      serviceCategory:'',
      officeLocation:'',
      deskNumber:'',
      serviceType:'',
      additionalInfo:'',
      file1:''
    }

    this.handleChange = this.handleChange.bind(this);
    this.onSubmitCreateTicket = this.onSubmitCreateTicket.bind(this);
    this.onFileUpload = this.onFileUpload.bind(this);

  }

  handleChange(e){
    this.setState({
      [e.target.name] : e.target.value
    });
  }

  onSubmitCreateTicket(e){
    e.preventDefault();
    this.props.onCreateTicket(this.state);
  }

  onFileUpload(e){
    e.preventDefault();
    this.setState({
      file1 : e.target.files[0]
    })
  }
  render() {
    console.log(this.state);
    return (
      <div>
      <div>
        <h3>New Ticket</h3>
        <p> Need help with something? 
            Create a request right here. For faster service, 
            please add as much information as possible.</p>
        <hr/>
      </div>
      <div class = "ticket-details-form">
      <Button>
        <Glyphicon glyph="star" /> Star
      </Button>
      </div>
      </div>
    );
  }
}

const mapActionsToProps = {  
  onCreateTicket : createTicketAPICall  
}

export default connect(null, mapActionsToProps)(ViewTicketDetailsForm);