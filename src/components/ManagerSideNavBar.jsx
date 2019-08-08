import React from 'react';
import { Nav, NavItem, NavLink, ListGroup, ListGroupItem } from 'reactstrap';
import { FaUser, FaAngleDoubleRight, FaChartLine, FaTasks } from 'react-icons/fa';
import history from '../history';
import { connect } from 'react-redux';
import { fetchTicketsAPICall, showFormNewTicket, setManagerTicketSearchCriteria } from '../actions/TicketActions'
import { fetchDashboardDataAPICall, fetchDashboardDataMultipleAPICall } from '../actions/DashboardActions';
import { TicketStatus, managerSideMenuOptions, TICKETS_PER_PAGE_MANAGER, TicketsSortBy, SortOrder } from '../masterdata/ApplicationMasterData';
import { FaTimesCircle, FaListAlt, FaPlusSquare } from 'react-icons/fa';
import { PAGINATION_START_PAGE, TICKETS_PER_PAGE_EMPLOYEE } from '../masterdata/ApplicationMasterData';
import { managerSideMenuOptionsArray, employeeSideMenuOptions } from '../masterdata/ApplicationMasterData';
import { setManagerActiveSideMenuOption } from '../actions/ActiveSideMenuActions';


class SideNavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuItemState: {
        focused: [],
        unfocused: managerSideMenuOptionsArray

      }
    };
    this.handleClosedTicketsClick = this.handleClosedTicketsClick.bind(this);
    this.handleAssignTicketsClick = this.handleAssignTicketsClick.bind(this);
    this.handleAllTicketsClick = this.handleAllTicketsClick.bind(this);
    this.getMenuOptionStyle = this.getMenuOptionStyle.bind(this);
    this.handleDashboard = this.handleDashboard.bind(this);
    this.handleNewTicket = this.handleNewTicket.bind(this);
    this.getInactiveSideMenuItems = this.getInactiveSideMenuItems.bind(this);
  }

  handleDashboard(e) {
    //history.push({pathname: "/ticketmanage/dashboard"});
    history.push({
      pathname: "/ticketmanage/dashboard",
      search: "?cioKey=MDB"
    });

    //Set Active Item for Employee-SideMenu
    this.props.setActiveSideMenuItem(managerSideMenuOptions.DASHBOARD);
  }

  getMenuOptionStyle(menuItem) {
    //check if it is present in focused list and return focusStyle
    return this.state.menuItemState.focused.includes(menuItem) ?
      { padding: '0', margin: '0', color: '#17a2b8', fontWeight: 600 } :
      { padding: '0', margin: '0', color: '#111111' }
  }

  handleClosedTicketsClick() {
    history.push({
      pathname: "/ticketmanage/tickets"
    });

    //set managerTicketSearchCriteria
    this.props.setManagerTicketSearchCriteria({
      cioKey: 'CLT',
      status: TicketStatus.CLOSE,
      pageNumber: PAGINATION_START_PAGE,
      pageSize: TICKETS_PER_PAGE_MANAGER,
      sortBy: TicketsSortBy.TICKET_UPDATED_DATE,
      sortOrder: SortOrder.DESCENDING,
      isLoad: true
    });

    //Set Active Item for Employee-SideMenu
    this.props.setActiveSideMenuItem(managerSideMenuOptions.CLOSED_TICKETS);
  }

  handleAssignTicketsClick() {
    history.push({
      pathname: "/ticketmanage/tickets"
    });

    //set managerTicketSearchCriteria
    this.props.setManagerTicketSearchCriteria({
      cioKey: 'AST',
      status: TicketStatus.NEW,
      pageNumber: PAGINATION_START_PAGE,
      pageSize: TICKETS_PER_PAGE_MANAGER,
      sortBy: TicketsSortBy.TICKET_UPDATED_DATE,
      sortOrder: SortOrder.DESCENDING,
      isLoad: true
    });

    //Set Active Item for Employee-SideMenu
    this.props.setActiveSideMenuItem(managerSideMenuOptions.ASSIGN_TICKETS);

  }

  handleAllTicketsClick() {
    history.push({
      pathname: "/ticketmanage/tickets"
    });

    //set managerTicketSearchCriteria
    this.props.setManagerTicketSearchCriteria({
      cioKey: 'ALT',
      status: TicketStatus.ALL,
      pageNumber: PAGINATION_START_PAGE,
      pageSize: TICKETS_PER_PAGE_MANAGER,
      sortBy: TicketsSortBy.TICKET_UPDATED_DATE,
      sortOrder: SortOrder.DESCENDING,
      isLoad: true
    });

    //Set Active Item for Employee-SideMenu
    this.props.setActiveSideMenuItem(managerSideMenuOptions.ALL_TICKETS);

  }

  handleNewTicket() {
    history.push({
      pathname: "/ticketmanage/newticket",
      search: '?cioKey=NT'
    });

    //Set Active Item for Employee-SideMenu
    this.props.setActiveSideMenuItem(managerSideMenuOptions.NEW_TICKET);
  }

  getInactiveSideMenuItems(value) {
    return value !== this.props.activeSideMenuItem
  }

  componentDidUpdate(prevProps) {
    console.log("inside componentdidupdate - Manager Side Menu");
    console.log(prevProps);
    if (prevProps.activeSideMenuItem !== this.props.activeSideMenuItem) {
      console.log("Change in Active-Menu-Item and setting the state");
      this.setState({
        menuItemState: {
          focused: [this.props.activeSideMenuItem],
          unfocused: managerSideMenuOptionsArray.filter(this.getInactiveSideMenuItems)
        }

      });

    }


  }

  componentDidMount() {
  }



  render() {

    return (
      <div class='sidenavbar' style={{}}>

        <div class='sidemenu'>
          <ListGroup size='sm'>
            <ListGroupItem style={{
              cursor: 'pointer',
              paddingTop: '5%',
              paddingBottom: '5%'
            }}><NavLink href='#' onClick={this.handleDashboard} style={this.getMenuOptionStyle(managerSideMenuOptions.DASHBOARD)}><FaChartLine style={{
              marginBottom: '3%',
              marginRight: '5%'
            }}></FaChartLine> {managerSideMenuOptions.DASHBOARD}</NavLink></ListGroupItem>
            <ListGroupItem style={{
              cursor: 'pointer',
              paddingTop: '5%',
              paddingBottom: '5%'
            }}><NavLink onClick={this.handleAssignTicketsClick} href='#' style={this.getMenuOptionStyle(managerSideMenuOptions.ASSIGN_TICKETS)}><FaTasks style={{
              marginBottom: '3%',
              marginRight: '5%'
            }}></FaTasks> {managerSideMenuOptions.ASSIGN_TICKETS}</NavLink></ListGroupItem>
            <ListGroupItem style={{
              cursor: 'pointer',
              paddingTop: '5%',
              paddingBottom: '5%'
            }}><NavLink active onClick={this.handleNewTicket} href='#' style={this.getMenuOptionStyle(managerSideMenuOptions.NEW_TICKET)}><FaPlusSquare style={{
              marginBottom: '3%',
              marginRight: '5%'
            }}></FaPlusSquare> {managerSideMenuOptions.NEW_TICKET}</NavLink></ListGroupItem>
            <ListGroupItem style={{
              cursor: 'pointer',
              paddingTop: '5%',
              paddingBottom: '5%'
            }}><NavLink active onClick={this.handleAllTicketsClick} href='#' style={this.getMenuOptionStyle(managerSideMenuOptions.ALL_TICKETS)}><FaListAlt style={{
              marginBottom: '3%',
              marginRight: '5%'
            }}></FaListAlt> {managerSideMenuOptions.ALL_TICKETS}</NavLink></ListGroupItem>
            <ListGroupItem style={{
              cursor: 'pointer',
              paddingTop: '5%',
              paddingBottom: '5%'
            }}><NavLink active onClick={this.handleClosedTicketsClick} href='#' style={this.getMenuOptionStyle(managerSideMenuOptions.CLOSED_TICKETS)}><FaTimesCircle style={{
              marginBottom: '3%',
              marginRight: '5%'
            }}></FaTimesCircle> {managerSideMenuOptions.CLOSED_TICKETS}</NavLink></ListGroupItem>
          </ListGroup>
        </div>

      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {

  return {
    fetchTickets: (params) => {
      dispatch(fetchTicketsAPICall(params));
    },

    fetchDashboardData: () => {
      //dispatch(fetchDashboardDataAPICall());
      dispatch(fetchDashboardDataMultipleAPICall());
    },
    showNewTicketForm: () => {
      dispatch(showFormNewTicket());
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
  return {
    activeSideMenuItem: state.activeSideMenuItem.managerView.activeSideMenuOption
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(SideNavBar);