import React from 'react';
import { Container, Label, Row, Col, Nav, NavItem, NavLink, Navbar } from 'reactstrap';
import { FaUser, FaAngleDoubleRight, FaChartLine, FaClock, FaTicketAlt, FaRegClock, FaFileAlt, FaRegFileAlt, FaListAlt, FaRegListAlt } from 'react-icons/fa';
import history from '../history';
import { connect } from 'react-redux';
import { fetchTicketsAPICall, showFormNewTicket } from '../actions/TicketActions'
import { fetchDashboardDataAPICall, fetchDashboardDataMultipleAPICall } from '../actions/DashboardActions';
import { TicketStatus } from '../masterdata/ApplicationMasterData'


class SideNavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.handleClosedTicketsClick = this.handleClosedTicketsClick.bind(this);
    this.handleAssignedTicketsClick = this.handleAssignedTicketsClick.bind(this);
    this.handleAwaitResponseClick = this.handleAwaitResponseClick.bind(this);
    this.handleDashboard = this.handleDashboard.bind(this);
    this.handleNewTicket = this.handleNewTicket.bind(this);
  }

  handleDashboard(e) {
    history.push({
      pathname: '/ticketmaint/dashboard',
      search: '?cioKey=ENDB'
    });
    //this.props.fetchDashboardData();
  }

  handleAwaitResponseClick() {
    //history.push("/ticketmaint/tickets?status=" + TicketStatus.AWAIT_RESPONSE);
    history.push({
      pathname: '/ticketmaint/tickets',
      search: 'status=' + TicketStatus.AWAIT_RESPONSE + '&' + 'cioKey=AWT'
    });
  }

  handleClosedTicketsClick() {
    //history.push("/ticketmaint/tickets?status=" + TicketStatus.CLOSE);
    history.push({
      pathname: '/ticketmaint/tickets',
      search: 'status=' + TicketStatus.TicketStatus.CLOSE + '&' + 'cioKey=CLT'
    });
    this.props.fetchTickets({
      status: TicketStatus.CLOSE,
      sortBy: 'ticketId'
    });
  }

  /* handleAssignTicketsClick() {
    //history.push("/ticketmaint/tickets?status=" + TicketStatus.NEW);
    history.push({ 
      pathname: '/ticketmaint/tickets',
      search :'status='+TicketStatus.NEW+'&'+'cioKey=AWT'
     });
    this.props.fetchTickets({
      status: TicketStatus.NEW,
      sortBy: 'ticketId'
    });

  } */

  handleAssignedTicketsClick() {
    //history.push("/ticketmaint/tickets?status=" + TicketStatus.ALL);
    history.push({
      pathname: '/ticketmaint/tickets',
      search: 'status=' + TicketStatus.ALL + '&' + 'cioKey=AST'
    });
    /* this.props.fetchTickets({
      status: 'all',
      sortBy: 'ticketId'
    }); */

  }

  handleNewTicket() {
    //history.push("/ticketmaint/newticket");
    history.push({
      pathname: '/ticketmaint/newticket',
      search: 'cioKey=NT'
    });
    //this.props.showNewTicketForm();
  }

  componentDidMount() {
  }



  render() {

    return (
      <div class='sidenavbar' style={{ height: '100%', width: '100%' }}>
      <Container>
        <Row>
          <Col style={{
          }}>
            <Label style={{
              marginTop:'1%',
              marginBottom:'1%',
              color:'#5C5B5A',
              fontWeight:'600'
            }}>Action Bar</Label>
          </Col>
        </Row>
        <Row>
          <Col>
            <Nav vertical >
              <NavItem >
                <NavLink href="#" onClick={this.handleDashboard}
                  style={{
                    textDecoration: 'none',
                    color: '#546e7a',
                    fontSize: '1vw'

                  }}>
                  <Row style={{
                    padding: '0',
                    margin: '0'
                  }}>
                    <Col sm='2' style={{
                      padding: '0',
                      margin: '0'
                    }}>
                      <FaChartLine style={{ color: '#546e7a' }} />
                    </Col>
                    <Col sm='10' style={{
                      padding: '0',
                      margin: '0'
                    }}>
                      Dashboard
                </Col>
                  </Row>

                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink href="#" onClick={this.handleAwaitResponseClick}
                  style={{
                    textDecoration: 'none',
                    color: '#546e7a',
                    fontSize: '1vw'
                  }}>
                  <Row style={{
                    padding: '0',
                    margin: '0'
                  }}>
                    <Col sm='2' style={{
                      padding: '0',
                      margin: '0'
                    }}>
                      <FaRegClock style={{ color: '#546e7a' }} />
                    </Col>
                    <Col sm='10' style={{
                      padding: '0',
                      margin: '0'
                    }}>
                      Awaiting
                </Col>
                  </Row>
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink href="#" onClick={this.handleNewTicket}
                  style={{
                    textDecoration: 'none',
                    color: '#546e7a',
                    fontSize: '1vw'
                  }}>
                  <Row style={{
                    padding: '0',
                    margin: '0'
                  }}>
                    <Col sm='2' style={{
                      padding: '0',
                      margin: '0'
                    }}>
                      <FaRegFileAlt style={{ color: '#546e7a' }} />
                    </Col>
                    <Col sm='10' style={{
                      padding: '0',
                      margin: '0'
                    }}>
                      New Ticket
                </Col>
                  </Row>
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink href="#" onClick={this.handleAssignedTicketsClick}
                  style={{
                    textDecoration: 'none',
                    color: '#546e7a',
                    fontSize: '1vw'
                  }}>
                  <Row style={{
                    padding: '0',
                    margin: '0'
                  }}>
                    <Col sm='2' style={{
                      padding: '0',
                      margin: '0'
                    }}>
                      <FaRegListAlt style={{ color: '#546e7a' }} />
                    </Col>
                    <Col sm='10' style={{
                      padding: '0',
                      margin: '0'
                    }}>
                      Assigned
                </Col>
                  </Row>
                </NavLink>
              </NavItem>
            </Nav>
          </Col>
        </Row>


        </Container>
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