import React from 'react';
import { Nav, NavItem, NavLink, ListGroup, ListGroupItem, Label } from 'reactstrap';
import { FaUser, FaAngleDoubleRight, FaChartLine, FaTasks } from 'react-icons/fa';
import history from '../history';
import { connect } from 'react-redux';
import { fetchTicketsAPICall, showFormNewTicket, setTicketSearchCriteria } from '../actions/TicketActions'
import { fetchDashboardDataAPICall, fetchDashboardDataMultipleAPICall } from '../actions/DashboardActions';
import { TicketStatus, managerSideMenuOptions, TICKETS_PER_PAGE_MANAGER, TicketsSortBy, SortOrder, engineerSideMenuOptions, engineerSideMenuOptionsArray, TICKETS_PER_PAGE_ENGINEER } from '../masterdata/ApplicationMasterData';
import { FaTimesCircle, FaListAlt, FaPlusSquare } from 'react-icons/fa';
import { PAGINATION_START_PAGE, TICKETS_PER_PAGE_EMPLOYEE } from '../masterdata/ApplicationMasterData';
import { managerSideMenuOptionsArray, employeeSideMenuOptions } from '../masterdata/ApplicationMasterData';
import { setEngineerActiveSideMenuOption } from '../actions/ActiveSideMenuActions';


class SideNavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuItemState: {
        focused: [],
        unfocused: engineerSideMenuOptionsArray

      }
    };
    this.handleClosedTicketsClick = this.handleClosedTicketsClick.bind(this);
    this.handleAssignedTicketsClick = this.handleAssignedTicketsClick.bind(this);
    this.handleAwaitResponseClick = this.handleAwaitResponseClick.bind(this);
    this.getMenuOptionStyle = this.getMenuOptionStyle.bind(this);
    this.handleDashboard = this.handleDashboard.bind(this);
    this.handleNewTicket = this.handleNewTicket.bind(this);
    this.getInactiveSideMenuItems = this.getInactiveSideMenuItems.bind(this);
  }

  handleDashboard(e) {
    //history.push({pathname: "/ticketmanage/dashboard"});
    history.push({
      pathname: "/ticketmaint/dashboard",
      search: "?cioKey=MDB"
    });

    //Set Active Item for Employee-SideMenu
    this.props.setActiveSideMenuItem(engineerSideMenuOptions.DASHBOARD);
  }

  getMenuOptionStyle(menuItem) {
    //check if it is present in focused list and return focusStyle
    return this.state.menuItemState.focused.includes(menuItem) ?
      { padding: '0', margin: '0', color: '#17a2b8', fontWeight: 600 } :
      { padding: '0', margin: '0', color: '#111111' }
  }

  handleClosedTicketsClick() {
    history.push({
      pathname: "/ticketmaint/tickets"
    });

    //set managerTicketSearchCriteria
    this.props.setTicketSearchCriteria({
      cioKey: 'CLT',
      status: TicketStatus.CLOSE,
      pageNumber: PAGINATION_START_PAGE,
      pageSize: TICKETS_PER_PAGE_MANAGER,
      sortBy: TicketsSortBy.TICKET_UPDATED_DATE,
      sortOrder: SortOrder.DESCENDING,
      isSearch: false,
      searchText: '',
      searchFieldsListString: '',
      isLoad: true,
      managedByMe:true
    });

    //Set Active Item for Employee-SideMenu
    this.props.setActiveSideMenuItem(engineerSideMenuOptions.CLOSED_TICKETS);
  }

  handleAssignedTicketsClick() {
    history.push({
      pathname: "/ticketmaint/tickets"
    });

    //set managerTicketSearchCriteria
    this.props.setTicketSearchCriteria({
      cioKey: 'AST',
      status: TicketStatus.ALL,
      pageNumber: PAGINATION_START_PAGE,
      pageSize: TICKETS_PER_PAGE_ENGINEER,
      sortBy: TicketsSortBy.TICKET_UPDATED_DATE,
      sortOrder: SortOrder.DESCENDING,
      isSearch: false,
      searchText: '',
      searchFieldsListString: '',
      isLoad: true,
      assignedToMe: true
    });

    //Set Active Item for Engineer-SideMenu
    this.props.setActiveSideMenuItem(engineerSideMenuOptions.ASSIGNED_TICKETS);

  }

  handleAwaitResponseClick() {
    history.push({
      pathname: "/ticketmaint/tickets"
    });

    //set managerTicketSearchCriteria
    this.props.setTicketSearchCriteria({
      cioKey: 'ALT',
      status: TicketStatus.ALL,
      pageNumber: PAGINATION_START_PAGE,
      pageSize: TICKETS_PER_PAGE_MANAGER,
      sortBy: TicketsSortBy.TICKET_UPDATED_DATE,
      sortOrder: SortOrder.DESCENDING,
      isSearch: false,
      searchText: '',
      searchFieldsListString: '',
      isLoad: true,
      assignedToMe:true
    });

    //Set Active Item for Employee-SideMenu
    this.props.setActiveSideMenuItem(engineerSideMenuOptions.AWAITING_RESPONSE);

  }

  handleNewTicket() {
    history.push({
      pathname: "/ticketmaint/newticket",
      search: '?cioKey=NT'
    });

    //Set Active Item for Engineer-SideMenu
    this.props.setActiveSideMenuItem(engineerSideMenuOptions.NEW_TICKET);
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
              paddingBottom: '5%',
              borderRadius: '0'
            }}><NavLink href='#' onClick={this.handleDashboard} style={this.getMenuOptionStyle(engineerSideMenuOptions.DASHBOARD)}><FaChartLine style={{
              marginBottom: '3%',
              marginRight: '5%'
            }}></FaChartLine> <Label style={{
              margin: '0',
              padding: '0'
            }}
              size='sm'>{engineerSideMenuOptions.DASHBOARD}</Label></NavLink>
            </ListGroupItem>

            <ListGroupItem style={{
              cursor: 'pointer',
              paddingTop: '5%',
              paddingBottom: '5%',
              borderRadius: '0'
            }}><NavLink onClick={this.handleAssignedTicketsClick} href='#' style={this.getMenuOptionStyle(engineerSideMenuOptions.ASSIGNED_TICKETS)}><FaTasks style={{
              marginBottom: '3%',
              marginRight: '5%'
            }}></FaTasks> <Label style={{
              margin: '0',
              padding: '0'
            }}
              size='sm'>{engineerSideMenuOptions.ASSIGNED_TICKETS}</Label></NavLink>
            </ListGroupItem>

            <ListGroupItem style={{
              cursor: 'pointer',
              paddingTop: '5%',
              paddingBottom: '5%',
              borderRadius: '0'
            }}><NavLink active onClick={this.handleNewTicket} href='#' style={this.getMenuOptionStyle(engineerSideMenuOptions.NEW_TICKET)}><FaPlusSquare style={{
              marginBottom: '3%',
              marginRight: '5%'
            }}></FaPlusSquare> <Label style={{
              margin: '0',
              padding: '0'
            }}
              size='sm'>{engineerSideMenuOptions.NEW_TICKET}</Label></NavLink>
            </ListGroupItem>

            <ListGroupItem style={{
              cursor: 'pointer',
              paddingTop: '5%',
              paddingBottom: '5%',
              borderRadius: '0'
            }}><NavLink active onClick={this.handleAwaitResponseClick} href='#' style={this.getMenuOptionStyle(engineerSideMenuOptions.AWAITING_RESPONSE)}><FaListAlt style={{
              marginBottom: '3%',
              marginRight: '5%'
            }}></FaListAlt> <Label style={{
              margin: '0',
              padding: '0'
            }}
              size='sm'>{engineerSideMenuOptions.AWAITING_RESPONSE}</Label></NavLink></ListGroupItem>

            <ListGroupItem style={{
              cursor: 'pointer',
              paddingTop: '5%',
              paddingBottom: '5%',
              borderRadius: '0'
            }}><NavLink active onClick={this.handleClosedTicketsClick} href='#' style={this.getMenuOptionStyle(engineerSideMenuOptions.CLOSED_TICKETS)}><FaTimesCircle style={{
              marginBottom: '3%',
              marginRight: '5%'
            }}></FaTimesCircle>
                <Label style={{
                  margin: '0',
                  padding: '0'
                }}
                  size='sm'>{engineerSideMenuOptions.CLOSED_TICKETS}</Label>
              </NavLink>
            </ListGroupItem>
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
      dispatch(setEngineerActiveSideMenuOption(activeSideMenuItem));
    },
    setTicketSearchCriteria: (searchCriteria) => {
      dispatch(setTicketSearchCriteria(searchCriteria));
    }

  };
}

const mapStateToProps = function (state) {
  return {
    activeSideMenuItem: state.activeSideMenuItem.engineerView.activeSideMenuOption
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(SideNavBar);