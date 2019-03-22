import React from 'react';
import { Nav, NavItem, NavLink, Navbar } from 'reactstrap';
import { FaUser, FaAngleDoubleRight } from 'react-icons/fa';
import history from '../history';
import {connect} from 'react-redux';
import {enableLoadTicketsFlag} from '../actions/TicketActions'

class SideNavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.handleClosedTicketsClick = this.handleClosedTicketsClick.bind(this);
  }

  handleClosedTicketsClick(){
    history.push("/tickets?status=Closed");  
    //update loadTickets flag to true in 'store.ticketList' via an action
    this.props.loadTickets();
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
            <NavLink href="/tickets?status=New" style={{ borderBottom: '1px solid black', marginBottom: '', textDecoration: 'none', color: 'black' }}><FaAngleDoubleRight style={{ color: 'orange' }} /> Assign Tickets
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink href="/tickets?status=InProcess" style={{ borderBottom: '1px solid black', marginBottom: '', textDecoration: 'none', color: 'black' }}><FaAngleDoubleRight style={{ color: 'orange' }} /> Await Response
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink href="/newticket" style={{ borderBottom: '1px solid black', marginBottom: '', textDecoration: 'none', color: 'black' }}><FaAngleDoubleRight style={{ color: 'orange' }} /> New Ticket
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink href="/tickets" style={{ borderBottom: '1px solid black', textDecoration: 'none', color: 'black' }}><FaAngleDoubleRight style={{ color: 'orange' }} /> My Tickets</NavLink>
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
  loadTickets: enableLoadTicketsFlag
}

const mapStateToProps = function (state){
}

export default connect(mapStateToProps, mapActionsToProps)(SideNavBar);