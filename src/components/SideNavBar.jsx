import React from 'react';
import { Nav, NavItem, NavLink, Navbar } from 'reactstrap';
import { FaUser, FaAngleDoubleRight } from 'react-icons/fa';
import history from '../history';

export default class SideNavBar extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        
    };
}

  render() {
    return (
      <div class = 'sidenavbar'>
        
        <Nav style={{ borderRadius: '10px', border: '1px solid green',backgroundColor: '#E8EAED'}} vertical >
          <NavItem>
            <NavLink href="/newticket"  style={{ borderBottom: '1px solid black', marginBottom:'', textDecoration: 'none', color: 'black'}}><FaAngleDoubleRight style={{color: 'orange'}}/> New Ticket
            </NavLink>
          </NavItem>
          
          <NavItem>
            <NavLink href="/tickets" style={{ borderBottom: '1px solid black', textDecoration: 'none', color: 'black' }}><FaAngleDoubleRight style={{color: 'orange'}}/> My Tickets</NavLink>
          </NavItem>
          
          <NavItem>
            <NavLink href="/tickets?status=Closed" style={{ borderBottom: '1px solid black', textDecoration: 'none', color: 'black' }}><FaAngleDoubleRight style={{color: 'orange'}}/> Closed Tickets</NavLink>
          </NavItem>
          
          <NavItem>
            <NavLink disabled href="#" style={{ textDecoration: 'none', color: 'black' }}><FaAngleDoubleRight style={{color: 'orange'}}/> Disabled Link</NavLink>
          </NavItem>
        </Nav>
        
      </div>
    );
  }
}