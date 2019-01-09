import React from 'react';
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
  DropdownItem } from 'reactstrap';

export default class HeaderNavBar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      options: ['Edit Profile','My Tickets','Logout'],
      optionsTitle:"Naveen Kumar"
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      
        <Navbar color="dark" dark expand="md">
          <NavbarBrand href="/"><h3>ITS Helpdesk</h3></NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/components/">Components</NavLink>
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
                    {this.state.options[0]}
                  </DropdownItem>
                  <DropdownItem>
                  {this.state.options[1]}
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem >
                  {this.state.options[2]}
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      
    );
  }
}