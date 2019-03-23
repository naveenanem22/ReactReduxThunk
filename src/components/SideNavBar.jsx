import React from 'react';
import { Nav, NavItem, NavLink, Navbar } from 'reactstrap';
import { FaUser, FaAngleDoubleRight } from 'react-icons/fa';
import history from '../history';
import {connect} from 'react-redux';
import { fetchTicketsAPICall } from '../actions/TicketActions'

class SideNavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.handleClosedTicketsClick = this.handleClosedTicketsClick.bind(this);
    this.handleAssignTicketsClick = this.handleAssignTicketsClick.bind(this);
    this.handleMyTicketsClick = this.handleMyTicketsClick.bind(this);
    this.handleAwaitResponseClick = this.handleAwaitResponseClick.bind(this);
  }

  handleAwaitResponseClick(){
    history.push("/tickets?status=InProcess");  
    this.props.fetchTickets({      
      status: 'InProcess',
      sortBy: 'ticketId'
    });
  }

  handleClosedTicketsClick(){
    history.push("/tickets?status=Closed");  
    this.props.fetchTickets({      
      status: 'Closed',
      sortBy: 'ticketId'
    });
  }

  handleAssignTicketsClick(){
    history.push("/tickets?status=New");  
    this.props.fetchTickets({      
      status: 'New',
      sortBy: 'ticketId'
    });

  }

  handleMyTicketsClick(){
    history.push("/tickets?status=all");  
    this.props.fetchTickets({            
      status: 'all',
      sortBy: 'ticketId'
    });

  }

  render() {
    return (
      <div class='sidenavbar'>

        <Nav style={{ borderRadius: '10px', border: '1px solid grey', backgroundColor: '#E8EAED' }} vertical >
          <NavItem>
            <NavLink href="/dashboard" style={{ borderBottom: '1px solid black', marginBottom: '', textDecoration: 'none', color: 'black' }}><FaAngleDoubleRight style={{ color: 'orange' }} /> Dashboard
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink href="#" onClick = {this.handleAssignTicketsClick} style={{ borderBottom: '1px solid black', marginBottom: '', textDecoration: 'none', color: 'black' }}><FaAngleDoubleRight style={{ color: 'orange' }} /> Assign Tickets
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink href="#" onClick = {this.handleAwaitResponseClick} style={{ borderBottom: '1px solid black', marginBottom: '', textDecoration: 'none', color: 'black' }}><FaAngleDoubleRight style={{ color: 'orange' }} /> Await Response
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink href="/newticket" style={{ borderBottom: '1px solid black', marginBottom: '', textDecoration: 'none', color: 'black' }}><FaAngleDoubleRight style={{ color: 'orange' }} /> New Ticket
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink href="#" onClick = {this.handleMyTicketsClick} style={{ borderBottom: '1px solid black', textDecoration: 'none', color: 'black' }}><FaAngleDoubleRight style={{ color: 'orange' }} /> My Tickets</NavLink>
          </NavItem>

          <NavItem>
            <NavLink href="#" onClick = {this.handleClosedTicketsClick} style={{ borderBottom: '1px solid black', textDecoration: 'none', color: 'black' }}><FaAngleDoubleRight style={{ color: 'orange' }} /> Closed Tickets</NavLink>
          </NavItem>

          <NavItem>
            <NavLink disabled href="#" style={{ textDecoration: 'none', color: 'black' }}><FaAngleDoubleRight style={{ color: 'orange' }} /> Disabled Link</NavLink>
          </NavItem>
        </Nav>

      </div>
    );
  }
}

const mapActionsToProps = {  
  fetchTickets: fetchTicketsAPICall
}

const mapStateToProps = function (state){
  
}

export default connect(mapStateToProps, mapActionsToProps)(SideNavBar);