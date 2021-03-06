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
  DropdownItem
} from 'reactstrap';
import { logout } from '../actions/UserActions';
import history from '../history';
import { Link } from "react-router-dom";
import { fetchTicketsAPICall } from '../actions/TicketActions';
import { TicketStatus, TICKETS_PER_PAGE_MANAGER, SortOrder, PAGINATION_START_PAGE, TicketsSortBy } from '../masterdata/ApplicationMasterData';
import { setManagerActiveSideMenuOption } from '../actions/ActiveSideMenuActions';
import { managerSideMenuOptions } from '../masterdata/ApplicationMasterData';
import { setManagerTicketSearchCriteria } from '../actions/TicketActions';


class HeaderNavBar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      options: ['Edit Profile', 'My Tickets', 'Logout'],
      optionsTitle: "Manager"
    };
    this.onClickLogout = this.onClickLogout.bind(this);
    this.onClickMyTickets = this.onClickMyTickets.bind(this);
    this.onClickHome = this.onClickHome.bind(this);
    this.onClickTicketWorkflow = this.onClickTicketWorkflow.bind(this);
    this.onClickFAQs = this.onClickFAQs.bind(this);
    this.onClickEditProfile = this.onClickEditProfile.bind(this);
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  onClickFAQs() {
    history.push('/ticketmanage/faqs');

    //Set Active Item for Employee-SideMenu
    this.props.setActiveSideMenuItem('');
  }

  onClickMyTickets() {
    /* history.push({
      pathname: '/ticketmanage/tickets',
      search: '?status=' + TicketStatus.ALL + '&' +
        'cioKey=MT' + '&' +
        'pageNumber=' + PAGINATION_START_PAGE + '&' + 'pageSize=' + TICKETS_PER_PAGE_MANAGER + '&' +
        'sortOrder=' + SortOrder.ASCENDING + '&' + 'sortBy=' + TicketsSortBy.TICKET_ID
    }); */


    history.push({
      pathname: "/ticketmanage/tickets"
    });

    //set managerTicketSearchCriteria
    this.props.setManagerTicketSearchCriteria({
      cioKey: 'MT',
      status: TicketStatus.ALL,
      pageNumber: PAGINATION_START_PAGE,
      pageSize: TICKETS_PER_PAGE_MANAGER,
      sortBy: TicketsSortBy.TICKET_UPDATED_DATE,
      sortOrder: SortOrder.DESCENDING,
      isSearch: false,
      searchText: '',
      searchFieldsListString: '',
      isLoad: true,
      createdByMe: true
    });

  }

  onClickEditProfile() {
    history.push({
      pathname: '/ticketmanage/profile',
      search: '?cioKey=ENDB'
    });

    //Set Active Item for Employee-SideMenu
    this.props.setActiveSideMenuItem('');

  }

  onClickLogout() {
    history.push('/login');
    this.props.onLogout();
  }

  onClickHome() {
    history.push({
      pathname: "/ticketmanage/dashboard",
      search: "?cioKey=MDB"
    });

    //Set Active Item for Employee-SideMenu
    this.props.setActiveSideMenuItem(managerSideMenuOptions.DASHBOARD);
  }

  onClickTicketWorkflow() {
    history.push('/ticketmanage/workflow');

    //Set Active Item for Employee-SideMenu
    this.props.setActiveSideMenuItem('');
  }

  render() {
    return (

      <Navbar color="dark" dark expand="md">
        <NavbarBrand onClick={this.onClickHome} ><h3 style={{
          color: '#ffffff',
          cursor: 'pointer'
        }}>ITS Helpdesk</h3></NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="#" onClick={this.onClickTicketWorkflow}>Workflow</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href='#' onClick={this.onClickFAQs}>FAQs</NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                {this.state.optionsTitle}
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  <NavLink style={{ color: '#212529' }} onClick={this.onClickEditProfile} href="#"> {this.state.options[0]}</NavLink>
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




const mapActionsToProps = dispatch => {

  return {
    fetchTickets: (params) => {
      dispatch(fetchTicketsAPICall(params));
    },

    onLogout: (params) => {
      dispatch(logout(params));
    },

    setActiveSideMenuItem: (activeSideMenuItem) => {
      dispatch(setManagerActiveSideMenuOption(activeSideMenuItem));
    },
    setManagerTicketSearchCriteria: (searchCriteria) => {
      dispatch(setManagerTicketSearchCriteria(searchCriteria));
    }

  };
}

const mapStateToProps = function (state) {
}

export default connect(mapStateToProps, mapActionsToProps)(HeaderNavBar);