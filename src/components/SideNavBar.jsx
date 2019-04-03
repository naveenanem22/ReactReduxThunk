import React from 'react';
import { Nav, NavItem, NavLink, Navbar } from 'reactstrap';
import { FaUser, FaAngleDoubleRight } from 'react-icons/fa';
import history from '../history';
import { connect } from 'react-redux';
import { fetchTicketsAPICall, showFormNewTicket} from '../actions/TicketActions'
import {fetchDashboardDataAPICall, fetchDashboardDataMultipleAPICall} from '../actions/DashboardActions';


class SideNavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dashboardStyle : { borderTopLeftRadius:'10px',borderTopRightRadius:'10px',borderBottom: '1px solid #bdb7b7', marginBottom: '', textDecoration: 'none', color: '#546e7a' },
      assignticketsStyle : { borderBottom: '1px solid #bdb7b7', marginBottom: '', textDecoration: 'none', color: '#546e7a' },
      awaitresponseStyle : { borderBottom: '1px solid #bdb7b7', marginBottom: '', textDecoration: 'none', color: '#546e7a' },
      newticketStyle : { borderBottom: '1px solid #bdb7b7', marginBottom: '', textDecoration: 'none', color: '#546e7a' },
      myticketsStyle : { borderBottom: '1px solid #bdb7b7', marginBottom: '', textDecoration: 'none', color: '#546e7a' },
      closedticketsStyle : { borderBottom: '1px solid #bdb7b7', marginBottom: '', textDecoration: 'none', color: '#546e7a' },
      disabledLink : { borderBottomLeftRadius:'10px', borderBottomRightRadius:'10px', textDecoration: 'none', color: '#546e7a' }
      


    };
    this.handleClosedTicketsClick = this.handleClosedTicketsClick.bind(this);
    this.handleAssignTicketsClick = this.handleAssignTicketsClick.bind(this);
    this.handleMyTicketsClick = this.handleMyTicketsClick.bind(this);
    this.handleAwaitResponseClick = this.handleAwaitResponseClick.bind(this);
    this.handleDashboard = this.handleDashboard.bind(this);
    this.handleNewTicket = this.handleNewTicket.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
  }

  handleDashboard(e) {
    history.push({pathname: "/dashboard", key:'dashboard'});
    this.props.fetchDashboardData();
  }

  handleAwaitResponseClick() {
    history.push("/tickets?status=InProcess");
    this.props.fetchTickets({
      status: 'InProcess',
      sortBy: 'ticketId'
    });
  }

  handleClosedTicketsClick() {
    history.push("/tickets?status=Closed");
    this.handleFocus();
    this.props.fetchTickets({
      status: 'Closed',
      sortBy: 'ticketId'
    });
  }

  handleAssignTicketsClick() {
    history.push("/tickets?status=New");
    this.handleFocus();
    this.props.fetchTickets({
      status: 'New',
      sortBy: 'ticketId'
    });

  }

  handleMyTicketsClick() {
    history.push("/tickets?status=all");
    this.handleFocus();
    this.props.fetchTickets({
      status: 'all',
      sortBy: 'ticketId'
    });

  }

  handleNewTicket() {
    history.push("/newticket");
    this.handleFocus();
    this.props.showNewTicketForm();
  }

  componentDidMount(){
    this.handleFocus();
  }

  handleFocus(){
    if(history.location.pathname == '/dashboard'){
      const focusStyle = { backgroundColor:'#d4d8d8', borderTopLeftRadius:'10px',borderTopRightRadius:'10px',borderBottom: '1px solid #bdb7b7', marginBottom: '', textDecoration: 'none', color: '#546e7a' }
      console.log("Setting focus style to Dashboard option");
      this.setState({
        dashboardStyle : focusStyle
      });
    }

    if(history.location.pathname == '/tickets' && history.location.search == '?status=New'){
      const focusStyle = { backgroundColor:'#d4d8d8', borderBottom: '1px solid #bdb7b7', marginBottom: '', textDecoration: 'none', color: '#546e7a' };
      const blurStyle = { borderBottom: '1px solid #bdb7b7', marginBottom: '', textDecoration: 'none', color: '#546e7a' };
      console.log("Setting focus style to AssignTickets option");
      this.setState({
        closedticketsStyle : blurStyle,
        myticketsStyle : blurStyle,
        awaitresponseStyle: blurStyle,
        assignticketsStyle: focusStyle
      });
    }

    if(history.location.pathname == '/tickets' && history.location.search == '?status=InProcess'){
      const focusStyle = { backgroundColor:'#d4d8d8', borderBottom: '1px solid #bdb7b7', marginBottom: '', textDecoration: 'none', color: '#546e7a' };
      const blurStyle = {  borderBottom: '1px solid #bdb7b7', marginBottom: '', textDecoration: 'none', color: '#546e7a' };
      console.log("Setting focus style to AwaitResponse option");
      this.setState({
        closedticketsStyle : blurStyle,
        myticketsStyle : blurStyle,
        awaitresponseStyle: focusStyle,
        assignticketsStyle: blurStyle
      });
    }

    if(history.location.pathname == '/newticket'){
      const focusStyle = { backgroundColor:'#d4d8d8', borderBottom: '1px solid #bdb7b7', marginBottom: '', textDecoration: 'none', color: '#546e7a' }
      console.log("Setting focus style to NewTicket option");
      this.setState({
        newticketStyle : focusStyle
      });
    }

    if(history.location.pathname == '/tickets' && history.location.search == '?status=all'){
      const focusStyle = { backgroundColor:'#d4d8d8', borderBottom: '1px solid #bdb7b7', marginBottom: '', textDecoration: 'none', color: '#546e7a' };
      const blurStyle = {  borderBottom: '1px solid #bdb7b7', marginBottom: '', textDecoration: 'none', color: '#546e7a' };
      console.log("Setting focus style to MyTickets option");
      this.setState({
        closedticketsStyle : blurStyle,
        myticketsStyle : focusStyle,
        awaitresponseStyle: blurStyle,
        assignticketsStyle: blurStyle
      });
    }

    if(history.location.pathname == '/tickets' && history.location.search == '?status=Closed'){
      const focusStyle = { backgroundColor:'#d4d8d8', borderBottom: '1px solid #bdb7b7', marginBottom: '', textDecoration: 'none', color: '#546e7a' };
      const blurStyle = {  borderBottom: '1px solid #bdb7b7', marginBottom: '', textDecoration: 'none', color: '#546e7a' };
      console.log("Setting focus style to ClosedTickets option");
      this.setState({
        closedticketsStyle : focusStyle,
        myticketsStyle : blurStyle,
        awaitresponseStyle: blurStyle,
        assignticketsStyle: blurStyle
      });
    }
  }



  render() {

    return (
      <div class='sidenavbar' style={{}}>

        <Nav style={{ borderRadius: '10px', border: '1px solid grey', backgroundColor: '#E8EAED' }} vertical >
          <NavItem >
            <NavLink href="#" onClick = {this.handleDashboard} style={this.state.dashboardStyle}><FaAngleDoubleRight style={{ color: '#546e7a' }} /> Dashboard
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink href="#" onClick={this.handleAssignTicketsClick} style={this.state.assignticketsStyle}><FaAngleDoubleRight style={{ color: '#546e7a' }} /> Assign Tickets
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink href="#" onClick={this.handleAwaitResponseClick} style={this.state.awaitresponseStyle}><FaAngleDoubleRight style={{ color: '#546e7a' }} /> Await Response
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink href="#" onClick={this.handleNewTicket} style={this.state.newticketStyle}><FaAngleDoubleRight style={{ color: '#546e7a' }} /> New Ticket
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink href="#" onClick={this.handleMyTicketsClick} style={this.state.myticketsStyle}><FaAngleDoubleRight style={{ color: '#546e7a' }} /> My Tickets</NavLink>
          </NavItem>

          <NavItem>
            <NavLink href="#" onClick={this.handleClosedTicketsClick} style={this.state.closedticketsStyle}><FaAngleDoubleRight style={{ color: '#546e7a' }} /> Closed Tickets</NavLink>
          </NavItem>

          <NavItem>
            <NavLink disabled href="#" style={{ borderBottomLeftRadius:'10px', borderBottomRightRadius:'10px', textDecoration: 'none', color: '#546e7a' }}><FaAngleDoubleRight style={{ color: '#546e7a' }} /> Disabled Link</NavLink>
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