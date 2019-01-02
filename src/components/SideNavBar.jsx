import React from 'react';
import { Nav, NavItem, NavLink, Navbar } from 'reactstrap';

export default class SideNavBar extends React.Component {
  render() {
    return (
      <div class = 'sidenavbar'>
        <h5>My Actions</h5>
        <Nav vertical pills>
          <NavItem>
            <NavLink href="/newticket" style={{ textDecoration: 'none', color: 'black' }}>New Ticket</NavLink>
          </NavItem>
          
          <NavItem>
            <NavLink href="/tickets" style={{ textDecoration: 'none', color: 'black' }}>My Tickets</NavLink>
          </NavItem>
          
          <NavItem>
            <NavLink href="#" style={{ textDecoration: 'none', color: 'black' }}>Closed Tickets</NavLink>
          </NavItem>
          
          <NavItem>
            <NavLink disabled href="#" style={{ textDecoration: 'none', color: 'black' }}>Disabled Link</NavLink>
          </NavItem>
        </Nav>
        
      </div>
    );
  }
}