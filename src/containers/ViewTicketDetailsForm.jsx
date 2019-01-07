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
    console.log(this.state);
    return (
      <div>
      <div class = "ticket-details-header">
        <h3>Ticket Details</h3>
        <p> Ticket details such as - attachments, converstaion and status.</p>
      </div>

      <div class = "ticket-details-body">
      <Row>
        <Col md={6} style={{'text-align': 'left','padding-top': '.75rem'}}><FaUser /><strong>Naveen Anem</strong> - naveen.anem@kony.com</Col>
        <Col md={6} style={{'text-align': 'right','padding-top': '.75rem'}}>2018-08-22</Col>
      </Row>
      <Row>
        <Col md={12}><h4>Need 2 monitors Keyboard and Mouse</h4></Col>
      </Row>
      <hr/>      
      <Row>
          <Col style={{'text-align': 'left','padding-top': '.30rem','padding-bottom': '.75rem'}}>Solved</Col>
          <Col style={{'text-align': 'left','padding-top': '.30rem','padding-bottom': '.75rem'}}>Updated: 2018-12-26</Col>
          <Col style={{'text-align': 'right','padding-top': '.30rem','padding-bottom': '.75rem'}}>Ticket ID: 21820281</Col>
      </Row>
      
      <div class = "ticket-table-summary">
      <Table bordered size="sm">
          
          <tbody>
               <tr >
               <td><strong>Category:</strong></td>
               <td>Internet / Email / Sharepoint</td>
              </tr>
              <tr>
               <td><strong>Category:</strong></td>
               <td>Internet / Email / Sharepoint</td>
              </tr>
              <tr>
               <td><strong>Category:</strong></td>
               <td>Internet / Email / Sharepoint</td>
              </tr>
              <tr>
               <td><strong>Category:</strong></td>
               <td>Internet / Email / Sharepoint</td>
              </tr>
              <tr>
               <td><strong>Category:</strong></td>
               <td>Internet / Email / Sharepoint</td>
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
      {/* <div class = "ticket-details-form">
      <Label for="userFullName">
      <FaUser /><strong>Naveen Kumar Anem</strong>
      - naveen.anem@kony.com
      </Label>
      <h6>Internet connectivity to Personal Mobile</h6>
      <hr></hr>
      <Row>
          <Col>Solved</Col>
          <Col>Updated: 2018-12-26</Col>
          <Col>Ticket ID: 21820281</Col>
        </Row>
        <hr></hr>
      <div class = "ticket-description">
      Internet connectivity to Personal Mobile
      IMEI
      356478083778876
      356478083778884
      wifi MAC
      d0:04:01:cd:f1:d2
      </div>
      <hr/>
      <Table  bordered className="rounded mb-0">
          
          <tbody>
               <tr>
               <td><strong>Category:</strong></td>
               <td>Internet / Email / Sharepoint</td>
              </tr>
              <tr>
               <td><strong>Category:</strong></td>
               <td>Internet / Email / Sharepoint</td>
              </tr>
              <tr>
               <td><strong>Category:</strong></td>
               <td>Internet / Email / Sharepoint</td>
              </tr>
              <tr>
               <td><strong>Category:</strong></td>
               <td>Internet / Email / Sharepoint</td>
              </tr>
              <tr>
               <td><strong>Category:</strong></td>
               <td>Internet / Email / Sharepoint</td>
              </tr>
            
          </tbody>
        </Table>
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
          <Col style={{'height': '200px'}}>Hi Naveen

given 1 monitor completed check it and close your ticket

regards

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
          <Col style={{'height': '200px'}}>Hi Naveen

given 1 monitor completed check it and close your ticket

regards

Naveen</Col>
        </Row>
        </div>
        </div>
      </div> */}
      
      </div>
    );
  }
}

const mapActionsToProps = {  
  onCreateTicket : createTicketAPICall  
}

export default connect(null, mapActionsToProps)(ViewTicketDetailsForm);