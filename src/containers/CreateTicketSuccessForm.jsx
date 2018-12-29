import React from 'react';
import { Form, FormGroup, Label, Input, FormText } from 'reactstrap';

export default class CreateTicketSuccessForm extends React.Component {

  constructor(props){
    super(props);

    //State
    this.state = {
      
    }

  }

  
  render() {
    
    return (
      
      <Form>
        <FormGroup>
          <h3>Ticket Created successfully.</h3>
          <p> Need help with something? 
            Create a request right here. For faster service, 
            please add as much information as possible.</p>
        </FormGroup>
        <FormGroup>
          <Label for="ticketTitle">Title</Label>
          <Input type="text" name="ticketTitle" id="ticketTitle" 
          />
        </FormGroup>        
      </Form>
    );
  }
}



