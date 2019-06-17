import React from 'react';
import { Nav, NavItem, NavLink, Navbar, ButtonGroup, Button, ListGroup, ListGroupItem } from 'reactstrap';
import { FaUser, FaAngleDoubleRight, FaPlusSquare, FaListAlt, FaTimesCircle } from 'react-icons/fa';
import history from '../history';
import { connect } from 'react-redux';
import { fetchTicketsAPICall, showFormNewTicket } from '../actions/TicketActions'
import { fetchDashboardDataAPICall, fetchDashboardDataMultipleAPICall } from '../actions/DashboardActions';
import { TicketStatus, TICKETS_PER_PAGE_EMPLOYEE, PAGINATION_START_PAGE } from '../masterdata/ApplicationMasterData';


class SideNavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.handleClosedTicketsClick = this.handleClosedTicketsClick.bind(this);
    this.handleMyTicketsClick = this.handleMyTicketsClick.bind(this);
    this.handleNewTicket = this.handleNewTicket.bind(this);
  }



  handleClosedTicketsClick() {
    //history.push("/ticketing/tickets?status="+TicketStatus.CLOSE+"&"+"cioKey=CLT");
    history.push({
      pathname: '/ticketing/tickets',
      search: '?status=' + TicketStatus.CLOSE + '&' +
        'cioKey=CLT' + '&' +
        'pageNumber=' + PAGINATION_START_PAGE + '&' + 'pageSize=' + TICKETS_PER_PAGE_EMPLOYEE
    });
  }


  handleMyTicketsClick() {
    //history.push("/ticketing/tickets?status="+TicketStatus.ALL+"&"+"cioKey=ALT");
    history.push({
      pathname: '/ticketing/tickets',
      search: '?status=' + TicketStatus.ALL + '&' +
        'cioKey=ALT' + '&' +
        'pageNumber=' + PAGINATION_START_PAGE + '&' + 'pageSize=' + TICKETS_PER_PAGE_EMPLOYEE
    });

  }

  handleNewTicket() {
    //history.push("/ticketing/newticket");
    history.push({
      pathname: "/ticketing/newticket",
      search: "?cioKey=NT"
    });
  }

  componentDidMount() {
  }



  render() {

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
              paddingTop:'5%',
              paddingBottom: '5%'
            }}><NavLink href='#' onClick={this.handleNewTicket} style={{
              padding: '0', margin: '0'
            }}><FaPlusSquare style={{
              marginBottom:'3%',
              marginRight:'5%'
            }}></FaPlusSquare> New Ticket</NavLink></ListGroupItem>
            <ListGroupItem style={{
              cursor: 'pointer',
              paddingTop:'5%',
              paddingBottom: '5%'
            }}><NavLink onClick={this.handleMyTicketsClick} href='#' style={{
              padding: '0', margin: '0'
            }}><FaListAlt style={{
              marginBottom:'3%',
              marginRight:'5%'
            }}></FaListAlt> My Tickets</NavLink></ListGroupItem>
            <ListGroupItem style={{
              cursor: 'pointer',
              paddingTop:'5%',
              paddingBottom: '5%'
            }}><NavLink active onClick={this.handleClosedTicketsClick} href='#' style={{
              padding: '0', margin: '0'
            }}><FaTimesCircle style={{
              marginBottom:'3%',
              marginRight:'5%'
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
    }

  };
}

const mapStateToProps = function (state) {

};


export default connect(mapStateToProps, mapDispatchToProps)(SideNavBar);