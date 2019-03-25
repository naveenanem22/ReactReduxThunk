import React from 'react';
import { Nav, NavItem, NavLink, Navbar } from 'reactstrap';
import { FaUser, FaAngleDoubleRight } from 'react-icons/fa';
import history from '../history';
import { connect } from 'react-redux';
import { fetchTicketsAPICall, showFormNewTicket} from '../actions/TicketActions'


class SideNavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.handleClosedTicketsClick = this.handleClosedTicketsClick.bind(this);
    this.handleAssignTicketsClick = this.handleAssignTicketsClick.bind(this);
    this.handleMyTicketsClick = this.handleMyTicketsClick.bind(this);
    this.handleAwaitResponseClick = this.handleAwaitResponseClick.bind(this);
    this.handleDashboard = this.handleDashboard.bind(this);
    this.handleNewTicket = this.handleNewTicket.bind(this);
  }

  handleDashboard(e) {

  }

  handleAwaitResponseClick() {
    history.push("/tickets?status=InProcess");
    this.props.fetchTickets({
      status: 'InProcess',
      sortBy: 'ticketId'
    });
  }

  handleClosedTicketsClick() {
    history.push("/tickets?status=Closed");
    this.props.fetchTickets({
      status: 'Closed',
      sortBy: 'ticketId'
    });
  }

  handleAssignTicketsClick() {
    history.push("/tickets?status=New");
    this.props.fetchTickets({
      status: 'New',
      sortBy: 'ticketId'
    });

  }

  handleMyTicketsClick() {
    history.push("/tickets?status=all");
    this.props.fetchTickets({
      status: 'all',
      sortBy: 'ticketId'
    });

  }

  handleNewTicket() {
    history.push("/newticket");
    this.props.showNewTicketForm();
  }



  render() {

    return (
      <div class='sidenavbar' style={{}}>

        <Nav style={{ borderRadius: '10px', border: '1px solid grey', backgroundColor: '#E8EAED' }} vertical >
          <NavItem>
            <NavLink href="/dashboard" style={{ borderBottom: '1px solid #bdb7b7', marginBottom: '', textDecoration: 'none', color: '#546e7a' }}><FaAngleDoubleRight style={{ color: '#546e7a' }} /> Dashboard
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink href="#" onClick={this.handleAssignTicketsClick} style={{ borderBottom: '1px solid #bdb7b7', marginBottom: '', textDecoration: 'none', color: '#546e7a' }}><FaAngleDoubleRight style={{ color: '#546e7a' }} /> Assign Tickets
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink href="#" onClick={this.handleAwaitResponseClick} style={{ borderBottom: '1px solid #bdb7b7', marginBottom: '', textDecoration: 'none', color: '#546e7a' }}><FaAngleDoubleRight style={{ color: '#546e7a' }} /> Await Response
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink href="#" onClick={this.handleNewTicket} style={{ borderBottom: '1px solid #bdb7b7', marginBottom: '', textDecoration: 'none', color: '#546e7a' }}><FaAngleDoubleRight style={{ color: '#546e7a' }} /> New Ticket
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink href="#" onClick={this.handleMyTicketsClick} style={{ borderBottom: '1px solid #bdb7b7', textDecoration: 'none', color: '#546e7a' }}><FaAngleDoubleRight style={{ color: '#546e7a' }} /> My Tickets</NavLink>
          </NavItem>

          <NavItem>
            <NavLink href="#" onClick={this.handleClosedTicketsClick} style={{ borderBottom: '1px solid #bdb7b7', textDecoration: 'none', color: '#546e7a' }}><FaAngleDoubleRight style={{ color: '#546e7a' }} /> Closed Tickets</NavLink>
          </NavItem>

          <NavItem>
            <NavLink disabled href="#" style={{ textDecoration: 'none', color: '#546e7a' }}><FaAngleDoubleRight style={{ color: '#546e7a' }} /> Disabled Link</NavLink>
          </NavItem>
        </Nav>

      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {

  return {
    fetchTickets: (params) => {
      dispatch(fetchTicketsAPICall(params))
    },
    showNewTicketForm: () =>{
      dispatch(showFormNewTicket());
    }
    
  };
}

const mapStateToProps = function (state) {

};


export default connect(mapStateToProps, mapDispatchToProps)(SideNavBar);