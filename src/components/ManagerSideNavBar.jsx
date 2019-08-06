import React from 'react';
import { Nav, NavItem, NavLink, ListGroup, ListGroupItem } from 'reactstrap';
import { FaUser, FaAngleDoubleRight, FaChartLine, FaTasks } from 'react-icons/fa';
import history from '../history';
import { connect } from 'react-redux';
import { fetchTicketsAPICall, showFormNewTicket } from '../actions/TicketActions'
import { fetchDashboardDataAPICall, fetchDashboardDataMultipleAPICall } from '../actions/DashboardActions';
import { TicketStatus, managerSideMenuOptions } from '../masterdata/ApplicationMasterData';
import { FaTimesCircle, FaListAlt, FaPlusSquare } from 'react-icons/fa';
import { PAGINATION_START_PAGE, TICKETS_PER_PAGE_EMPLOYEE } from '../masterdata/ApplicationMasterData';
import { managerSideMenuOptionsArray, employeeSideMenuOptions } from '../masterdata/ApplicationMasterData';


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
  }

  handleDashboard(e) {
    //history.push({pathname: "/ticketmanage/dashboard"});
    history.push({
      pathname: "/ticketmanage/dashboard",
      search: "?cioKey=MDB"
    });
  }

  /* handleAwaitResponseClick() {
    //history.push("/ticketmanage/tickets?status="+TicketStatus.IN_PROCESS);
    history.push({
      pathname: "/ticketmanage/tickets",
      search: '?status='+TicketStatus.IN_PROCESS+'&'+'cioKey=MDB'
    });
    this.props.fetchTickets({
      status: TicketStatus.IN_PROCESS,
      sortBy: 'ticketId'
    });
  }
 */

  getMenuOptionStyle(menuItem) {
    //check if it is present in focused list and return focusStyle
    return this.state.menuItemState.focused.includes(menuItem) ?
      { padding: '0', margin: '0', color: '#17a2b8', fontWeight: 600 } :
      { padding: '0', margin: '0', color: '#111111' }
  }

  handleClosedTicketsClick() {
    // history.push("/ticketmanage/tickets?status="+TicketStatus.CLOSE);
    history.push({
      pathname: "/ticketmanage/tickets",
      search: '?status=' + TicketStatus.CLOSE + '&' + 'cioKey=CLT' + '&' +
        'pageNumber=' + PAGINATION_START_PAGE + '&' + 'pageSize=' + TICKETS_PER_PAGE_EMPLOYEE
    });
  }

  handleAssignTicketsClick() {
    //history.push("/ticketmanage/tickets?status="+TicketStatus.NEW);
    history.push({
      pathname: "/ticketmanage/tickets",
      search: '?status=' + TicketStatus.NEW + '&' + 'cioKey=AST' + '&' +
        'pageNumber=' + PAGINATION_START_PAGE + '&' + 'pageSize=' + TICKETS_PER_PAGE_EMPLOYEE
    });

  }

  handleAllTicketsClick() {
    history.push({
      pathname: "/ticketmanage/tickets",
      search: '?status=' + TicketStatus.ALL + '&' + 'cioKey=ALT' + '&' +
        'pageNumber=' + PAGINATION_START_PAGE + '&' + 'pageSize=' + TICKETS_PER_PAGE_EMPLOYEE
    });

  }

  handleNewTicket() {
    history.push({
      pathname: "/ticketmanage/newticket",
      search: '?cioKey=NT'
    });
  }

  componentDidMount() {
  }



  render() {

    return (
      <div class='sidenavbar' style={{}}>

        {/* <Nav style={{ borderRadius: '10px', border: '1px solid grey', backgroundColor: '#FFFFFF' }} vertical >
          <NavItem >
            <NavLink href="#" onClick = {this.handleDashboard} style={{ borderTopLeftRadius:'10px',borderTopRightRadius:'10px',borderBottom: '1px solid #bdb7b7', marginBottom: '', textDecoration: 'none', color: '#546e7a' }}><FaAngleDoubleRight style={{ color: '#546e7a' }} /> Dashboard
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink href="#" onClick={this.handleAssignTicketsClick} style={{ borderBottom: '1px solid #bdb7b7', marginBottom: '', textDecoration: 'none', color: '#546e7a' }}><FaAngleDoubleRight style={{ color: '#546e7a' }} /> Assign Tickets
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink href="#" onClick={this.handleNewTicket} style={{ borderBottom: '1px solid #bdb7b7', marginBottom: '', textDecoration: 'none', color: '#546e7a' }}><FaAngleDoubleRight style={{ color: '#546e7a' }} /> New Ticket
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink href="#" onClick={this.handleMyTicketsClick} style={{ borderBottom: '1px solid #bdb7b7', marginBottom: '', textDecoration: 'none', color: '#546e7a' }}><FaAngleDoubleRight style={{ color: '#546e7a' }} /> My Tickets</NavLink>
          </NavItem>

          <NavItem>
            <NavLink href="#" onClick={this.handleClosedTicketsClick} style={{ borderBottomLeftRadius:'10px', borderBottomRightRadius:'10px', marginBottom: '', textDecoration: 'none', color: '#546e7a' }}><FaAngleDoubleRight style={{ color: '#546e7a' }} /> Closed Tickets</NavLink>
          </NavItem>

        </Nav> */}
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
    }

  };
}

const mapStateToProps = function (state) {

};


export default connect(mapStateToProps, mapDispatchToProps)(SideNavBar);