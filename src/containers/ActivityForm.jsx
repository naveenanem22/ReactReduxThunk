import React from 'react';
import { addMessageAPICall, closeTicketAPICall, downloadAttachmentAPICall, fetchTicketDetailsAPICall } from '../actions/TicketActions'
import { connect } from 'react-redux';
import { Badge, Row, Col, Container, Input, FormGroup, Label, FormText } from 'reactstrap';
import { Button, Card, CardBody, CardHeader, CardText, CardTitle } from 'reactstrap';
import { FaEnvelope, FaMobile, FaHome, FaBuilding } from 'react-icons/fa';
import {loadFileIcon} from '../util/UIUtils';
import history from '../history';
import queryString from 'query-string';


class ActivityForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
    };

  }


  componentDidMount() {
    //Extracing params from url
    console.log("Search string: ");
    var searchString = history.location.search;
    console.log(searchString);
    var params = queryString.parse(searchString);
    console.log("Extracted params: ");
    console.log(params);

    //Show SelectTicketMessage if search-string contains the key: status
    if (params.status) {
      this.setState({
        showSelectTicketMsg: true
      })
    }

    //Make fetchTicketDetailsAPICall if the search-string contains key: ticketId
    if (params.ticketId) {
      this.props.fetchTicketDetails({
        ticketId: params.ticketId
      });
    }
  }


  render() {
    

    return (
      <div style={{overflowX:'hidden', overflowY:'auto',height:'100%'}}>
      <div style={{ border: '1px solid #E8EAED', borderRadius: '10px',backgroundColor: '#ffffff' }}>        
        <Row>
          <Col style={{textAlign:'left', fontSize:'small', fontWeight:500}}>Activity Log</Col>
        </Row>
        <Row>
          <Col style={{textAlign:'left', fontSize:'70%', fontWeight:400}}>Organizational Ticket activity</Col>
        </Row>

        <Row style={{marginTop:'5%'}}>
          <Col><hr></hr></Col>
        </Row>
        
        <Row>
          <Col style={{textAlign:'left', fontSize:'small', fontWeight:500}}>About Me</Col>
        </Row>
        <Row>
          <Col style={{textAlign:'left', fontSize:'75%', fontWeight:400}}>Madison id multi-million-dollar campaigns. Her background in brand strategy, visual d
          Madison id multi-million-dollar campaigns. Her background in brand strategy, visual
          Madison id multi-million-dollar campaigns. Her background in brand strategy, visual
          Madison id multi-million-dollar campaigns. Her background in brand strategy, visual
          Madison id multi-million-dollar campaigns. Her background in brand strategy, visual
          Madison id multi-million-dollar campaigns. Her background in brand strategy, visual
          Madison id multi-million-dollar campaigns. Her background in brand strategy, visual
          Madison id multi-million-dollar campaigns. Her background in brand strategy, visualesign, and account management inform her mindful but competitive approach.</Col>
        </Row>

        <Row style={{marginTop:'5%'}}>
          <Col><hr></hr></Col>
        </Row>

      </div>


      </div>
      
    );
  }
}

const mapStateToProps = function (state) {
  return {
    ticket: state.ticketDetails.ticket
  }
}

const mapActionsToProps = {
  addMessage: addMessageAPICall,
  closeTicket: closeTicketAPICall,
  downloadAttachment: downloadAttachmentAPICall,
  fetchTicketDetails: fetchTicketDetailsAPICall
}

export default connect(mapStateToProps, mapActionsToProps)(ActivityForm);