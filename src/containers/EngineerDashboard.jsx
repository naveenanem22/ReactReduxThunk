import React from 'react';
import { connect } from 'react-redux';
import { NavItem, NavLink, Container, InputGroupAddon, InputGroup, Button, Row, Col, ListGroup, ListGroupItem } from 'reactstrap';
import { FaUserAlt } from 'react-icons/fa';
import { Redirect } from 'react-router-dom';
import SearchInput from '../components/SearchInput';
import { assignAndUpdateMultipleTicketsAPICall } from '../actions/TicketActions';
import history from '../history';
import TicketDetailCard from '../components/TicketDetailCard';
import { fetchTicketsAPICall } from '../actions/TicketActions';
import queryString from 'query-string';

class DashboardForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
    };
    this.handleTicketBundleClick = this.handleTicketBundleClick.bind(this);

  }

  handleTicketBundleClick(e, ticket) {    
  }

  componentDidMount() {
  }

  render() {

    return (
      <div style={{ marginLeft: '1%', marginRight: '1%' }}>
        <Container style={{ marginTop: '3%' }}><Row style={{ textAlign: 'left' }}>
          <h4>My Board</h4>
        </Row>
          <Row style={{ textAlign: 'left' }}>
            <p>Screen your contribution or edit your profile if required.</p>
          </Row>
        </Container>
        <Container>
          <Row>Badges</Row>
          <Row>
            <Col>Badge 1</Col>
            <Col>Badge 2</Col>
            <Col>Badge 3</Col>
          </Row>
          <Row>Credits</Row>
          <Row>
            <Col>My Credits</Col>
          </Row>
        </Container>
        
      </div>
    );

  }
}


const mapStateToProps = function (state) {
  return {
    user: state.user
  }
}

const mapActionsToProps = {
  fetchTickets: fetchTicketsAPICall
}


export default connect(mapStateToProps, mapActionsToProps)(DashboardForm);