import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';

export default class SideNavBar extends React.Component {
  render() {
    return (
      <div class = 'sidenavbar'>
        <p>My Actions</p>
        <Nav vertical>
          <NavItem>
            <NavLink href="/newticket">New Ticket</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/tickets">My Tickets</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#">Closed Tickets</NavLink>
          </NavItem>
          <NavItem>
            <NavLink disabled href="#">Disabled Link</NavLink>
          </NavItem>
        </Nav>
        <hr />
        <p>Organization Tickets</p>
        <Nav vertical>
          <NavLink href="#">Link</NavLink> <NavLink href="#">Link</NavLink> <NavLink href="#">Another Link</NavLink> <NavLink disabled href="#">Disabled Link</NavLink>
        </Nav>
      </div>
    );
  }
}