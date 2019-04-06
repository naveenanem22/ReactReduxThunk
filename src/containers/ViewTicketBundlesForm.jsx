import React from 'react';
import { connect } from 'react-redux';
import { NavItem, NavLink, Container, InputGroupAddon, InputGroup, Button, Row, Col, ListGroup, ListGroupItem } from 'reactstrap';
import { FaUserAlt } from 'react-icons/fa';
import { Redirect } from 'react-router-dom';
import SearchInput from '../components/SearchInput';
import { assignAndUpdateMultipleTicketsAPICall } from '../actions/TicketActions';
import history from '../history';
import TicketDetailCard from '../components/TicketDetailCard';
import {fetchTicketDetailsAPICall} from '../actions/TicketActions';

class ViewTicketsForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      tickets: this.props.tickets
    };
    this.handleTicketBundleClick = this.handleTicketBundleClick.bind(this);

  }

  handleTicketBundleClick(e, ticket) {    
    history.push({
      pathname:'/ticketmaint/tickets',
      search:'?ticketId=3'
    });
  }

  render() {
    console.log("This is from ViewTicketBundlesForm...");
    //Initialize suggestions array with names from engineers array
    var suggestions = [];
    this.props.engineers.forEach(engineer => {
      suggestions.push({ name: engineer.userFullName });
    });

    return (
      <div style={{ marginLeft: '1%', marginRight: '1%' }}>
        <Container style={{ marginTop: '3%' }}><Row style={{ textAlign: 'left' }}>
          <h4>New Tickets</h4>
        </Row>
          <Row style={{ textAlign: 'left' }}>
            <p>Tickets that need to be actioned.</p>
          </Row>
        </Container>
        <Container>
          <Row style={{marginBottom:'2%'}}>
            <NavLink href="#" onClick={this.handleTicketBundleClick}><TicketDetailCard></TicketDetailCard></NavLink>
          </Row>
          <Row style={{marginBottom:'2%'}}><TicketDetailCard></TicketDetailCard></Row>
          <Row style={{marginBottom:'2%'}}><TicketDetailCard></TicketDetailCard></Row>
          <Row style={{marginBottom:'2%'}}><TicketDetailCard></TicketDetailCard></Row>
        </Container>
        
      </div>
    );

  }
}


const mapStateToProps = function (state) {
  return {
    tickets: state.ticketList.tickets,
    user: state.user,
    engineers: state.engineerList.engineers
  }
}

const mapActionsToProps = {
  fetchTicketDetails: fetchTicketDetailsAPICall
}


export default connect(mapStateToProps, mapActionsToProps)(ViewTicketsForm);