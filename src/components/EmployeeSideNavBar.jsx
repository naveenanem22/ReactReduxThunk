import React from 'react';
import { Nav, NavItem, NavLink, Navbar } from 'reactstrap';
import { FaUser, FaAngleDoubleRight } from 'react-icons/fa';
import history from '../history';
import { connect } from 'react-redux';
import { fetchTicketsAPICall, showFormNewTicket } from '../actions/TicketActions'
import { fetchDashboardDataAPICall, fetchDashboardDataMultipleAPICall } from '../actions/DashboardActions';
import { TicketStatus } from '../masterdata/ApplicationMasterData';


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
      search: '?status='+TicketStatus.CLOSE+'&'+'cioKey=CLT'
    });
  }


  handleMyTicketsClick() {
    //history.push("/ticketing/tickets?status="+TicketStatus.ALL+"&"+"cioKey=ALT");
    history.push({
      pathname: '/ticketing/tickets',
      search: '?status='+TicketStatus.ALL+'&'+'cioKey=ALT'+'&'+'pageNumber=1'+'&'+'pageSize=3'
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

        <Nav style={{ borderRadius: '10px', border: '1px solid grey', backgroundColor: '#FFFFFF' }} vertical >
          <NavItem >
            <NavLink href="#" onClick={this.handleNewTicket} style={{ borderTopLeftRadius:'10px',borderTopRightRadius:'10px',borderBottom: '1px solid #bdb7b7', marginBottom: '', textDecoration: 'none', color: '#546e7a' }}><FaAngleDoubleRight style={{ color: '#546e7a' }} /> New Ticket
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#" onClick={this.handleMyTicketsClick} style={{ borderBottom: '1px solid #bdb7b7', marginBottom: '', textDecoration: 'none', color: '#546e7a' }}><FaAngleDoubleRight style={{ color: '#546e7a' }} /> My Tickets</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#" onClick={this.handleClosedTicketsClick} style={{ borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px', marginBottom: '', textDecoration: 'none', color: '#546e7a' }}><FaAngleDoubleRight style={{ color: '#546e7a' }} /> Closed Tickets</NavLink>
          </NavItem>

        </Nav>

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