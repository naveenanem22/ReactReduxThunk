import React from 'react';
import { Nav, NavItem, NavLink, Navbar } from 'reactstrap';
import { FaUser } from 'react-icons/fa';

export default class SideNavBar extends React.Component {
  render() {
    return (
      <div class = 'sidenavbar'>
        <h5>My Actions</h5>
        <Nav style={{ borderRadius: '10px', border: '1px solid green',backgroundColor: 'gray'}} vertical pills>
          <NavItem>
            <NavLink href="/newticket"  style={{ border: '1px solid red',textDecoration: 'none', color: 'white'}}>New Ticket</NavLink>
          </NavItem>
          
          <NavItem>
            <NavLink href="/tickets" style={{ textDecoration: 'none', color: 'black' }}><FaUser style={{color: 'green'}}/>My Tickets</NavLink>
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