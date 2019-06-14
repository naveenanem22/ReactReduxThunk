import React from 'react';
import { connect } from 'react-redux';
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
  DropdownItem,
  Row,
  Col
} from 'reactstrap';
import { logout } from '../actions/UserActions';
import history from '../history';
import { Link } from "react-router-dom";
import { TicketStatus } from '../masterdata/ApplicationMasterData';
import { FaChartLine, FaUser } from 'react-icons/fa';


class HeaderNavBar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      options: ['Edit Profile', 'My Tickets', 'Logout'],
      optionsTitle: ''
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

  onClickEditProfile() {
    history.push('/ticketing/editprofile?cioKey=PRF');
  }

  onClickTicketWorkflow() {
    history.push('/ticketworkflow');
  }

  onClickMyTickets() {
    history.push('/ticketing/tickets?status=' + TicketStatus.ALL);
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
              <NavLink href="https://github.com/reactstrap/reactstrap">Policy</NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                {(this.props.getProfileAPICallStatus.requested && this.state.optionsTitle)
                  || this.props.getProfileAPICallStatus.success && this.props.profile.firstName}
              </DropdownToggle>
              <DropdownMenu size='sm' right>
                <DropdownItem>
                  <Row style={{
                    margin: '0',
                    padding: '0'
                  }}>
                    <Col sm='2' style={{
                      margin: '0',
                      padding:'0'
                    }}>
                      <FaUser></FaUser>

                    </Col>

                    <Col sm='10' style={{
                      margin: '0'
                    }}>
                      <NavLink style={{ color: '#212529' }} href="#" onClick={this.onClickEditProfile}>
                        {this.state.options[0]}</NavLink>

                    </Col>
                  </Row>

                </DropdownItem>
                <DropdownItem >
                  <NavLink style={{ color: '#212529' }} href="#" onClick={this.onClickMyTickets}>{this.state.options[1]}</NavLink>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={this.onClickLogout}>
                  <NavLink style={{ color: '#212529' }} href="#">{this.state.options[2]}</NavLink>
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
  onLogout: logout
}

const mapStateToProps = function (state) {
  return {
    profile: state.user.profile,
    getProfileAPICallStatus: state.serviceCallStatus.getProfileAPI
  }
}

export default connect(mapStateToProps, mapActionsToProps)(HeaderNavBar);