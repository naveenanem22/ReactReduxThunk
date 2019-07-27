import React from 'react';
import { Nav, NavItem, NavLink, Navbar, ButtonGroup, Button, ListGroup, ListGroupItem } from 'reactstrap';
import { FaUser, FaAngleDoubleRight, FaPlusSquare, FaListAlt, FaTimesCircle } from 'react-icons/fa';
import history from '../history';
import { connect } from 'react-redux';
import { fetchTicketsAPICall, showFormNewTicket } from '../actions/TicketActions'
import { fetchDashboardDataAPICall, fetchDashboardDataMultipleAPICall } from '../actions/DashboardActions';
import { setEmployeeActiveSideMenuOption } from '../actions/ActiveSideMenuActions';
import { TicketStatus, TICKETS_PER_PAGE_EMPLOYEE, PAGINATION_START_PAGE, TicketsSortBy, SortOrder, employeeSideMenuOptions, employeeSideMenuOptionsArray } from '../masterdata/ApplicationMasterData';


class SideNavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuItemState: {
        focused: [],
        unfocused: [employeeSideMenuOptions.NEW_TICKET,
        employeeSideMenuOptions.MY_TICKETS,
        employeeSideMenuOptions.CLOSED_TICKETS]

      }
    };
    this.handleClosedTicketsClick = this.handleClosedTicketsClick.bind(this);
    this.handleMyTicketsClick = this.handleMyTicketsClick.bind(this);
    this.handleNewTicket = this.handleNewTicket.bind(this);
    this.getInactiveSideMenuItems = this.getInactiveSideMenuItems.bind(this);
    this.getMenuOptionStyle = this.getMenuOptionStyle.bind(this);
  }

  getMenuOptionStyle(menuItem) {
    //check if it is present in focused list and return focusStyle
    return this.state.menuItemState.focused.includes(menuItem) ?
      { padding: '0', margin: '0', color:'#17a2b8',fontWeight: 600 } : 
      { padding: '0', margin: '0', color:'#111111' }
  }



  handleClosedTicketsClick() {
    //history.push("/ticketing/tickets?status="+TicketStatus.CLOSE+"&"+"cioKey=CLT");
    history.push({
      pathname: '/ticketing/tickets',
      search: '?status=' + TicketStatus.CLOSE + '&' +
        'cioKey=CLT' + '&' +
        'pageNumber=' + PAGINATION_START_PAGE + '&' + 'pageSize=' + TICKETS_PER_PAGE_EMPLOYEE + '&' +
        'sortOrder=' + SortOrder.ASCENDING + '&' + 'sortBy=' + TicketsSortBy.TICKET_ID
    });

    //Set Active Item for Employee-SideMenu
    this.props.setActiveSideMenuItem(employeeSideMenuOptions.CLOSED_TICKETS);
  }


  handleMyTicketsClick() {
    history.push({
      pathname: '/ticketing/tickets',
      search: '?status=' + TicketStatus.ALL + '&' +
        'cioKey=ALT' + '&' +
        'pageNumber=' + PAGINATION_START_PAGE + '&' + 'pageSize=' + TICKETS_PER_PAGE_EMPLOYEE + '&' +
        'sortOrder=' + SortOrder.DESCENDING + '&' + 'sortBy=' + TicketsSortBy.TICKET_UPDATED_DATE
    });

    //Set Active Item for Employee-SideMenu
    this.props.setActiveSideMenuItem(employeeSideMenuOptions.MY_TICKETS);

  }

  handleNewTicket() {
    history.push({
      pathname: "/ticketing/newticket",
      search: "?cioKey=NT"
    });

    //Set Active Item for Employee-SideMenu
    this.props.setActiveSideMenuItem(employeeSideMenuOptions.NEW_TICKET);
  }

  componentDidMount() {
  }

  getInactiveSideMenuItems(value) {
    return value !== this.props.activeSideMenuItem
  }

  componentDidUpdate(prevProps) {
    console.log("inside componentdidupdate - Employee Side Menu");
    console.log(prevProps);
    if (prevProps.activeSideMenuItem !== this.props.activeSideMenuItem) {
      console.log("Change in Active-Menu-Item and setting the state");
      this.setState({
        menuItemState: {
          focused: [this.props.activeSideMenuItem],
          unfocused: employeeSideMenuOptionsArray.filter(this.getInactiveSideMenuItems)
        }

      });

    }


  }



  render() {
    console.log("From EmployeeSideNavBar");
    console.log(this.props.activeSideMenuItem);
    console.log(this.state);

    return (
      <div class='sidenavbar' style={{}}>

        {/* <Nav style={{ borderRadius: '10px', border: '1px solid grey', backgroundColor: '#FFFFFF' }} vertical >
          <NavItem >
            <NavLink href="#" onClick={this.handleNewTicket} style={{ borderTopLeftRadius: '10px', borderTopRightRadius: '10px', borderBottom: '1px solid #bdb7b7', marginBottom: '', textDecoration: 'none', color: '#546e7a' }}><FaAngleDoubleRight style={{ color: '#546e7a' }} /> New Ticket
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#" onClick={this.handleMyTicketsClick} style={{ borderBottom: '1px solid #bdb7b7', marginBottom: '', textDecoration: 'none', color: '#546e7a' }}><FaAngleDoubleRight style={{ color: '#546e7a' }} /> My Tickets</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#" onClick={this.handleClosedTicketsClick} style={{ borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px', marginBottom: '', textDecoration: 'none', color: '#546e7a' }}><FaAngleDoubleRight style={{ color: '#546e7a' }} /> Closed Tickets</NavLink>
          </NavItem>

        </Nav> */}
        <div class='sidemenu'>
          <ListGroup size='sm'>
            <ListGroupItem style={{
              cursor: 'pointer',
              paddingTop: '5%',
              paddingBottom: '5%'
            }}><NavLink href='#' onClick={this.handleNewTicket} style={this.getMenuOptionStyle(employeeSideMenuOptions.NEW_TICKET)}><FaPlusSquare style={{
              marginBottom: '3%',
              marginRight: '5%'
            }}></FaPlusSquare> New Ticket</NavLink></ListGroupItem>
            <ListGroupItem style={{
              cursor: 'pointer',
              paddingTop: '5%',
              paddingBottom: '5%'
            }}><NavLink onClick={this.handleMyTicketsClick} href='#' style={this.getMenuOptionStyle(employeeSideMenuOptions.MY_TICKETS)}><FaListAlt style={{
              marginBottom: '3%',
              marginRight: '5%'
            }}></FaListAlt> My Tickets</NavLink></ListGroupItem>
            <ListGroupItem style={{
              cursor: 'pointer',
              paddingTop: '5%',
              paddingBottom: '5%'
            }}><NavLink active onClick={this.handleClosedTicketsClick} href='#' style={this.getMenuOptionStyle(employeeSideMenuOptions.CLOSED_TICKETS)}><FaTimesCircle style={{
              marginBottom: '3%',
              marginRight: '5%'
            }}></FaTimesCircle> Closed Tickets</NavLink></ListGroupItem>
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
      dispatch(setEmployeeActiveSideMenuOption(activeSideMenuItem));
    },


  };
}

const mapStateToProps = function (state) {
  return {
    activeSideMenuItem: state.activeSideMenuItem.employeeView.activeSideMenuOption
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(SideNavBar);