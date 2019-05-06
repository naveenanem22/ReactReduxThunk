import React from 'react';
import { Nav, NavItem, NavLink, Navbar } from 'reactstrap';
import { FaUser, FaAngleDoubleRight } from 'react-icons/fa';
import history from '../history';
import { connect } from 'react-redux';
import { fetchTicketsAPICall, showFormNewTicket} from '../actions/TicketActions'
import {fetchDashboardDataAPICall, fetchDashboardDataMultipleAPICall} from '../actions/DashboardActions';
import { TicketStatus } from '../masterdata/ApplicationMasterData';


class SideNavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.handleClosedTicketsClick = this.handleClosedTicketsClick.bind(this);
    this.handleAssignTicketsClick = this.handleAssignTicketsClick.bind(this);
    this.handleMyTicketsClick = this.handleMyTicketsClick.bind(this);
    
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
  handleClosedTicketsClick() {
   // history.push("/ticketmanage/tickets?status="+TicketStatus.CLOSE);
   history.push({
    pathname: "/ticketmanage/tickets",
    search: '?status='+TicketStatus.CLOSE+'&'+'cioKey=CLT'
  });
    /* this.props.fetchTickets({
      status: TicketStatus.CLOSE,
      sortBy: 'ticketId'
    }); */
  }

  handleAssignTicketsClick() {
    //history.push("/ticketmanage/tickets?status="+TicketStatus.NEW);
    history.push({
      pathname: "/ticketmanage/tickets",
      search: '?status='+TicketStatus.NEW+'&'+'cioKey=AT'
    });
    /* this.props.fetchTickets({
      status: TicketStatus.NEW,
      sortBy: 'ticketId'
    }); */

  }

  handleMyTicketsClick() {
    history.push("/ticketmanage/tickets?status="+TicketStatus.ALL);
    /* this.props.fetchTickets({
      status: 'all',
      sortBy: 'ticketId'
    }); */ 

  }

  handleNewTicket() {
    //history.push("/ticketmanage/newticket");
    history.push({
      pathname: "/ticketmanage/newticket",
      search: '?cioKey=NT'
    });
    //this.props.showNewTicketForm();
  }

  componentDidMount(){
  }



  render() {

    return (
      <div class='sidenavbar' style={{}}>

        <Nav style={{ borderRadius: '10px', border: '1px solid grey', backgroundColor: '#FFFFFF' }} vertical >
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
    showNewTicketForm: () =>{
      dispatch(showFormNewTicket());
    }
    
  };
}

const mapStateToProps = function (state) {

};


export default connect(mapStateToProps, mapDispatchToProps)(SideNavBar);