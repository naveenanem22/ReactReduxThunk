import React from 'react';
import {connect} from 'react-redux';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem} from 'reactstrap';
import { logout } from '../actions/UserActions';
import history from '../history';
import { Link } from "react-router-dom";
import {fetchTicketsAPICall} from '../actions/TicketActions';
import { TicketStatus } from '../masterdata/ApplicationMasterData';


class HeaderNavBar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      options: ['Edit Profile','My Tickets','Logout'],
      optionsTitle:"Employee"
    };
    this.onClickLogout = this.onClickLogout.bind(this);
    this.onClickMyTickets = this.onClickMyTickets.bind(this);
    this.onClickTicketWorkflow = this.onClickTicketWorkflow.bind(this);
    this.onClickEditProfile = this.onClickEditProfile.bind(this);
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  onClickEditProfile(){
    history.push('/ticketing/editprofile');
  }

  onClickTicketWorkflow(){
    history.push('/ticketworkflow');
  }

  onClickMyTickets(){
    history.push('/ticketing/tickets?status='+TicketStatus.ALL);
  }

  onClickLogout() {
    history.push('/login');
    this.props.onLogout();
  }
  render() {
    return (
      
        <Navbar color="dark" dark expand="md">
          <NavbarBrand href="/home"><h3>ITS Helpdesk</h3></NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="#" onClick={this.onClickTicketWorkflow}>Workflow</NavLink>
              </NavItem>
              <NavItem>
                <NavLink  href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  {this.state.optionsTitle}
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    <NavLink style = {{color:'#212529'}} href="#" onClick={this.onClickEditProfile}> 
                    {this.state.options[0]}</NavLink>
                  </DropdownItem>
                  <DropdownItem >
                    <NavLink style = {{color:'#212529'}} href="#" onClick = {this.onClickMyTickets}>{this.state.options[1]}</NavLink>
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem onClick = {this.onClickLogout}>
                    <NavLink style = {{color:'#212529'}} href="#">{this.state.options[2]}</NavLink>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      
    );
  }


}


const mapActionsToProps = {
  onLogout : logout,
  fetchTickets: fetchTicketsAPICall    
}

const mapStateToProps = function (state){
}

export default connect(mapStateToProps, mapActionsToProps)(HeaderNavBar);