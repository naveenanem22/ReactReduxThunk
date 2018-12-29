import React from 'react';
import { Form, FormGroup, Label, Input, FormText } from 'reactstrap';

export default class CreateTicketSuccessForm extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      
    }
  }

  
  render() {
    
    return (
      
      <Form>
        <FormGroup>
          <h3>Ticket Created successfully.</h3>
          <p> Next steps: You will receive an auto generated e-Mail with ticket details.</p>
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



