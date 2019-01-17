import React from 'react';
import {createTicketAPICall} from '../actions/TicketActions'
import {connect} from 'react-redux';
import {Label, Row, Col, Container} from 'reactstrap';
import { FaUser } from 'react-icons/fa';
import { Table } from 'reactstrap';
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
    console.log(this.props);
    return (
      <div class = "ticket-details-form">
      <div class = "ticket-details-header">
        <h3>Ticket Details</h3>
        <p> Ticket details such as - attachments, converstaion and status.</p>
      </div>
      <div class = "ticket-details-body">
      
      <div>
      <Row>
        <Col md={6} style={{'text-align': 'left','padding-top': '.75rem'}}><strong>Naveen Anem</strong> - naveen.anem@kony.com</Col>
        <Col md={6} style={{'text-align': 'right','padding-top': '.75rem'}}>2018-08-22</Col>
      </Row>
      </div>
      
      <Row>
        <Col md={12}><h4>Need 2 monitors Keyboard and Mouse</h4></Col>
      </Row>
      <hr/>      
      <Row>
          <Col style={{'text-align': 'left','padding-top': '.30rem','padding-bottom': '.75rem'}}>Solved</Col>
          <Col style={{'text-align': 'left','padding-top': '.30rem','padding-bottom': '.75rem'}}>Updated: 2018-12-26</Col>
          <Col style={{'text-align': 'right','padding-top': '.30rem','padding-bottom': '.75rem'}}>Ticket ID: 12345</Col>
      </Row>
      
      <div class = "ticket-table-summary">
      <Table bordered size="sm">
          
          <tbody>
               <tr >
               <td style={{width: '20%'}}><strong>Category:</strong></td>
               <td style={{fontStyle: 'italic'}}>Internet / Email / Sharepoint</td>
              </tr>
              <tr>
               <td><strong>Priority:</strong></td>
               <td style={{fontStyle: 'italic'}}>Normal</td>
              </tr>
              <tr>
               <td><strong>Department:</strong></td>
               <td style={{fontStyle: 'italic'}}>Helpdesk</td>
              </tr>
              <tr>
               <td><strong>Office:</strong></td>
               <td style={{fontStyle: 'italic'}}>Hyderabad-DS</td>
              </tr>
              <tr>
               <td><strong>Service Type:</strong></td>
               <td style={{fontStyle: 'italic'}}>Task</td>
              </tr>
            
          </tbody>
        </Table>
        </div>


        <div class = "ticket-conv-block">
        <div class="author">
        <Row style={{'height': '50px'}}>
        <Col md={6} style={{'text-align': 'left','padding-top': '.75rem','padding-bottom': '.75rem'}}>Naveen Kumar Anem</Col>
        <Col md={6} style={{'text-align': 'right','padding-top': '.75rem','padding-bottom': '.75rem'}}>2018-09-17 13:14:04</Col>
        </Row> 
        </div>
        <hr/>

        <div class="message">
        <Row >
          <Col style={{'height': '200px'}}>Hi Naveen given 1 monitor completed check it and close your ticket regards
          Naveen</Col>
        </Row>
        </div>
        </div>

        <div class = "ticket-conv-block">
        <div class="author">
        <Row style={{'height': '50px'}}>
        <Col md={6} style={{'text-align': 'left','padding-top': '.75rem','padding-bottom': '.75rem'}}>Naveen Kumar Anem</Col>
        <Col md={6} style={{'text-align': 'right','padding-top': '.75rem','padding-bottom': '.75rem'}}>2018-09-17 13:14:04</Col>
        </Row> 
        </div>
        <hr/>
        <div class="message">
        <Row >
          <Col style={{'height': '200px'}}>Hi Naveen given 1 monitor completed check it and close your ticket regards
          Naveen</Col>
        </Row>
        </div>
        </div>

        </div>
      
      
      </div>
    );
  }
}

const mapActionsToProps = {  
  onCreateTicket : createTicketAPICall  
}

export default connect(null, mapActionsToProps)(ViewTicketDetailsForm);