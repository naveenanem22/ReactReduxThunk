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
      
    };

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
    const ticket = this.props.ticket;    
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
        <Col md={6} style={{'text-align': 'right','padding-top': '.75rem'}}>{ticket.createdDate}</Col>
      </Row>
      </div>
      
      <Row>
        <Col md={12}><h4>{ticket.title}</h4></Col>
      </Row>
      <hr/>      
      <Row>
          <Col style={{'text-align': 'left','padding-top': '.30rem','padding-bottom': '.75rem'}}>{ticket.status}</Col>
          <Col style={{'text-align': 'left','padding-top': '.30rem','padding-bottom': '.75rem'}}>Updated: {ticket.updatedDate}</Col>
          <Col style={{'text-align': 'right','padding-top': '.30rem','padding-bottom': '.75rem'}}>Ticket ID: {ticket.id}</Col>
      </Row>
      
      <div class = "ticket-table-summary">
      <Table bordered size="sm">
          
          <tbody>
               <tr >
               <td style={{width: '20%'}}><strong>Category:</strong></td>
               <td style={{fontStyle: 'italic'}}>{ticket.serviceCategory}</td>
              </tr>
              <tr>
               <td><strong>Priority:</strong></td>
               <td style={{fontStyle: 'italic'}}>{ticket.priority}</td>
              </tr>
              <tr>
               <td><strong>Department:</strong></td>
               <td style={{fontStyle: 'italic'}}>{ticket.department}</td>
              </tr>
              <tr>
               <td><strong>Office:</strong></td>
               <td style={{fontStyle: 'italic'}}>{ticket.officeLocation}</td>
              </tr>
              <tr>
               <td><strong>Service Type:</strong></td>
               <td style={{fontStyle: 'italic'}}>{ticket.ticketType}</td>
              </tr>
            
          </tbody>
        </Table>
        </div>

        {ticket.ticketHistory.map((item) =>
               <div class = "ticket-conv-block">
               <div class="author">
               <Row style={{'height': '50px'}}>
               <Col md={6} style={{'text-align': 'left','padding-top': '.75rem','padding-bottom': '.75rem'}}>{item.authorName}</Col>
               <Col md={6} style={{'text-align': 'right','padding-top': '.75rem','padding-bottom': '.75rem'}}>{item.commentedOn}</Col>
               </Row> 
               </div>
               <hr/>
       
               <div class="message">
               <Row >
                 <Col style={{'height': '200px'}}>{item.comment}</Col>
               </Row>
               </div>
               </div>
        )}

        </div>
      
      
      </div>
    );
  }
}

const mapStateToProps = function (state){
  return {
    ticket: state.ticketDetails.ticket
  }
}

const mapActionsToProps = {  
  
}

export default connect(mapStateToProps, mapActionsToProps)(ViewTicketDetailsForm);