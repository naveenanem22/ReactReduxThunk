import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { timingSafeEqual } from 'crypto';
import {createTicketAPICall} from '../actions/TicketActions'
import {connect} from 'react-redux';

class CreateNewTicketForm extends React.Component {

  constructor(props){
    super(props);

    //State
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
      
      <Form>
        <FormGroup>
          <h3>New Ticket</h3>
          <p> Need help with something? 
            Create a request right here. For faster service, 
            please add as much information as possible.</p>
          <hr/>
        </FormGroup>
        <FormGroup>
          <Label for="ticketTitle">Title</Label>
          <Input type="text" name="ticketTitle" id="ticketTitle" 
          value ={this.state.ticketTitle} onChange = {this.handleChange} required/>
        </FormGroup>
        <FormGroup>
          <Label for="ticketDescription">Description</Label>
          <Input type="textarea" name="ticketDescription" id="ticketDescription"
           value = {this.state.titleDescription}
           onChange = {this.handleChange} required/>
        </FormGroup>        
        <FormGroup>
          <Label for="department">Department</Label>
          <Input type="select" name="department" id="department" value = {this.state.department} onChange={this.handleChange} required>
            <option>Choose department...</option>
            <option>RMG</option>
            <option>Finance</option>
            <option>HR</option>
            <option>ITS</option>
            <option>Other</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="priority">Priority</Label>
          <Input type="select" name="priority" id="priority" value={this.state.priority} onChange = {this.handleChange} required>
            <option>Normal</option>
            <option>Urgent</option>
            <option>Low</option>
            <option>Emergency</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="serviceCategory">Category</Label>
          <Input type="select" name="serviceCategory" id="serviceCategory" value={this.state.serviceCategory} 
          onChange = {this.handleChange}
          required>
            <option>Network</option>
            <option>Printer</option>
            <option>Desktop/Laptop</option>
            <option>Software/OS</option>
            <option>Application</option>
            <option>Internet / Email / Sharepoint</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="officeLocation">Office</Label>
          <Input type="select" name="officeLocation" id="officeLocation" value = {this.state.officeLocation} 
          onChange = {this.handleChange}
          required>
            <option>Office-Hyderabad</option>
            <option>Office-Bangalore</option>
            <option>Office-Chennai</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="deskNumber">Desk</Label>
          <Input type="text" name="deskNumber" id="deskNumber"
          value = {this.state.deskNumber}
          onChange = {this.handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="serviceType">Type</Label>
          <Input type="select" name="serviceType" id="serviceType" 
          value = {this.state.serviceType}
          onChange = {this.handleChange}
          required>
            <option>--Select--</option>
            <option>Task</option>
            <option>Incident</option>
            <option>Problem</option>
            <option>Question</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="notes">Additional Information</Label>
          <Input type="textarea" name="additionalInfo" id="additionalInfo" 
          value = {this.state.additionalInfo}
          onChange = {this.handleChange}
          />
        </FormGroup>               
        <FormGroup>
          <Label for="attachments">Attachments</Label>
          <Input type="file" name="file1" id="file1" onChange={this.onFileUpload}/>
          <Input type="file" name="file2" id="file2"/>
          <Input type="file" name="file3" id="file3"/>
          <FormText color="muted">
            Any files that can assist the corresponding team to resolve the issues at the earliest.
          </FormText>
        </FormGroup>        
        <Button type="submit" bsStyle="primary" bsSize="large" color="info" 
        onClick = {this.onSubmitCreateTicket}>Create Ticket</Button>
      </Form>
    );
  }
}

const mapActionsToProps = {  
  onCreateTicket : createTicketAPICall  
}

export default connect(null, mapActionsToProps)(CreateNewTicketForm);