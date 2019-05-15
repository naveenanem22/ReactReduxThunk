import React from 'react';
import { Nav, NavItem, NavLink, Navbar } from 'reactstrap';
import { FaUser, FaAngleDoubleRight } from 'react-icons/fa';
import history from '../history';
import { connect } from 'react-redux';
import { fetchTicketsAPICall, showFormNewTicket } from '../actions/TicketActions'
import { fetchDashboardDataAPICall, fetchDashboardDataMultipleAPICall } from '../actions/DashboardActions';
import { TicketStatus } from '../masterdata/ApplicationMasterData'


class SideNavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.handleClosedTicketsClick = this.handleClosedTicketsClick.bind(this);
    this.handleAssignedTicketsClick = this.handleAssignedTicketsClick.bind(this);
    this.handleAwaitResponseClick = this.handleAwaitResponseClick.bind(this);
    this.handleDashboard = this.handleDashboard.bind(this);
    this.handleNewTicket = this.handleNewTicket.bind(this);
  }

  handleDashboard(e) {
    history.push({
      pathname: '/ticketmaint/dashboard',
      search: '?cioKey=ENDB'
    });
    //this.props.fetchDashboardData();
  }

  handleAwaitResponseClick() {
    //history.push("/ticketmaint/tickets?status=" + TicketStatus.AWAIT_RESPONSE);
    history.push({
      pathname: '/ticketmaint/tickets',
      search: 'status=' + TicketStatus.AWAIT_RESPONSE + '&' + 'cioKey=AWT'
    });
  }

  handleClosedTicketsClick() {
    //history.push("/ticketmaint/tickets?status=" + TicketStatus.CLOSE);
    history.push({
      pathname: '/ticketmaint/tickets',
      search: 'status=' + TicketStatus.TicketStatus.CLOSE + '&' + 'cioKey=CLT'
    });
    this.props.fetchTickets({
      status: TicketStatus.CLOSE,
      sortBy: 'ticketId'
    });
  }

  /* handleAssignTicketsClick() {
    //history.push("/ticketmaint/tickets?status=" + TicketStatus.NEW);
    history.push({ 
      pathname: '/ticketmaint/tickets',
      search :'status='+TicketStatus.NEW+'&'+'cioKey=AWT'
     });
    this.props.fetchTickets({
      status: TicketStatus.NEW,
      sortBy: 'ticketId'
    });

  } */

  handleAssignedTicketsClick() {
    //history.push("/ticketmaint/tickets?status=" + TicketStatus.ALL);
    history.push({
      pathname: '/ticketmaint/tickets',
      search: 'status=' + TicketStatus.ALL + '&' + 'cioKey=AST'
    });
    /* this.props.fetchTickets({
      status: 'all',
      sortBy: 'ticketId'
    }); */

  }

  handleNewTicket() {
    //history.push("/ticketmaint/newticket");
    history.push({
      pathname: '/ticketmaint/newticket',
      search: 'cioKey=NT'
    });
    //this.props.showNewTicketForm();
  }

  componentDidMount() {
  }



  render() {

    return (
      <div class='sidenavbar' style={{height:'100%', width:'100%'}}>

        <Nav vertical >
          <NavItem >
            <NavLink href="#" onClick={this.handleDashboard}
              style={{
                textDecoration: 'none',
                color: '#546e7a'
              }}>
              <FaAngleDoubleRight style={{ color: '#546e7a' }} /> Dashboard
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink href="#" onClick={this.handleAwaitResponseClick}
              style={{
                textDecoration: 'none',
                color: '#546e7a'
              }}>
              <FaAngleDoubleRight style={{ color: '#546e7a' }} /> Await Response
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink href="#" onClick={this.handleNewTicket}
              style={{
                textDecoration: 'none',
                color: '#546e7a'
              }}>
              <FaAngleDoubleRight style={{ color: '#546e7a' }} /> New Ticket
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink href="#" onClick={this.handleAssignedTicketsClick}
              style={{
                textDecoration: 'none',
                color: '#546e7a'
              }}>
              <FaAngleDoubleRight style={{ color: '#546e7a' }} /> Assigned Tickets</NavLink>
          </NavItem>
        </Nav>

      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {

  return {
    fetchTickets: (params) => {
      dispatch(fetchTicketsAPICall(params));
    },

    fetchDashboardData: () => {
      //dispatch(fetchDashboardDataAPICall());
      dispatch(fetchDashboardDataMultipleAPICall());
    },
    showNewTicketForm: () => {
      dispatch(showFormNewTicket());
    }

  };
}

const mapStateToProps = function (state) {

};


export default connect(mapStateToProps, mapDispatchToProps)(SideNavBar);