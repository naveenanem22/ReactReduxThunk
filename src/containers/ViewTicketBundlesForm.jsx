import React from 'react';
import { connect } from 'react-redux';
import { Badge, NavLink, Container, InputGroupAddon, InputGroup, Button, Row, Col, ListGroup, ListGroupItem } from 'reactstrap';
import { FaUserAlt } from 'react-icons/fa';
import { Redirect } from 'react-router-dom';
import SearchInput from '../components/SearchInput';
import { assignAndUpdateMultipleTicketsAPICall } from '../actions/TicketActions';
import history from '../history';
import TicketDetailCard from '../components/TicketDetailCard';
import { fetchTicketsAPICall } from '../actions/TicketActions';
import queryString from 'query-string';
import { ScaleLoader } from 'react-spinners';
import {Role} from '../masterdata/ApplicationMasterData';


class ViewTicketsForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      tickets: this.props.tickets
    };
    this.handleTicketBundleClick = this.handleTicketBundleClick.bind(this);
    this.handleListViewClick = this.handleListViewClick.bind(this);

  }

  handleListViewClick(){
    history.push({
      pathname:'/ticketmanage/ticketslistview',
      search:'?status=New'
    });
  }

  handleTicketBundleClick(e, ticket) {    
    history.push({
      pathname:'/ticketmaint/tickets',
      search:'?ticketId=3'
    });
  }

  componentDidMount() {
    //Extracting query params from url
    console.log("Parsing query params from query-string:");
    console.log(history.location.search);
    const params = queryString.parse(history.location.search);
    console.log("Parsed params: ");
    console.log(params);

    if (params.status) {
      this.props.fetchTickets({
        status: params.status,
        sortBy: 'ticketId'
      });
    }

  }

  render() {
    console.log("***************");
    console.log(this.state.tickets);
    console.log(this.props.tickets);
    
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
          {this.props.fetchTicketsAPICallStatus.requested &&
            <div className='view-ticket-loading'>
              <ScaleLoader
                color='#00d8ff'
                loading='true'
              />
            </div>
          }
          {(this.props.user.profile.role === Role.ROLE_MANAGER) &&
            <Row>
              <Col style={{textAlign:'right'}}>
                  <NavLink href="#" onClick={this.handleListViewClick} style={{ marginBottom: '', textDecoration: 'none', color: '#546e7a' }}>
                  <Badge href="#" color="primary">List View</Badge>
                  </NavLink>
              </Col>
            </Row>
          }
          

          {this.props.fetchTicketsAPICallStatus.success && this.props.tickets.map(ticket => 
            <Row style={{ marginBottom: '2%' }}>
              <NavLink href="#" onClick={() => this.props.handleTicketBundleClick(ticket.id)}><TicketDetailCard ticket={ticket}></TicketDetailCard></NavLink>
            </Row>
          )}
        </Container>
        
      </div>
    );

  }
}


const mapStateToProps = function (state) {
  return {
    tickets: state.ticketList.tickets,
    user: state.user,
    engineers: state.engineerList.engineers,
    fetchTicketsAPICallStatus: state.serviceCallStatus.fetchTicketsAPI
  }
}

const mapActionsToProps = {
  fetchTickets: fetchTicketsAPICall
}


export default connect(mapStateToProps, mapActionsToProps)(ViewTicketsForm);