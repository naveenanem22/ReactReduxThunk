import React from 'react';
import { connect } from 'react-redux';
import { Badge, NavLink, Container, InputGroupAddon, InputGroup, Button, Row, Col, ListGroup, ListGroupItem } from 'reactstrap';
import { FaUserAlt } from 'react-icons/fa';
import { Redirect } from 'react-router-dom';
import SearchInput from '../components/SearchInput';
import { fetchAssignedTicketsAPICall } from '../actions/TicketActions';
import history from '../history';
import TicketDetailCard from '../components/TicketDetailCard';
import { fetchTicketsAPICall } from '../actions/TicketActions';
import queryString from 'query-string';
import { ScaleLoader } from 'react-spinners';
import { Role, TicketStatus, TicketsSortBy } from '../masterdata/ApplicationMasterData';
import { componentInfoObj, PAGINATION_START_PAGE } from '../masterdata/ApplicationMasterData';
import CustomPagination from '../components/CustomPagination';
import { setManagerTicketSearchCriteria } from '../actions/TicketActions';
import { setManagerActiveSideMenuOption } from '../actions/ActiveSideMenuActions';



class ViewTicketsForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      tickets: this.props.tickets
    };
    this.handleTicketBundleClick = this.handleTicketBundleClick.bind(this);
    this.handleListViewClick = this.handleListViewClick.bind(this);
    this.onPaginationPageChange = this.onPaginationPageChange.bind(this);

  }

  handleListViewClick() {
    history.push({
      pathname: '/ticketmanage/ticketslistview',
      search: '?status=New'
    });
  }

  handleTicketBundleClick(e, ticket) {
    history.push({
      pathname: '/ticketmaint/tickets',
      search: '?ticketId=3'
    });
  }

  onPaginationPageChange(pageNumber) {
    /* if (localStorage.getItem('role') === Role.ROLE_MANAGER) {
      //Extracting query params from url
      console.log("Parsing query params from query-string:");
      console.log(history.location.search);
      const params = queryString.parse(history.location.search);
      console.log("Parsed params: ");
      console.log(params);

      //update pageNumber & pageSize params with new values
      params.pageNumber = pageNumber;

      //push the url to history
      history.push({
        pathname: "/ticketmanage/tickets",
        search: "?status=" + params.status + "&" + "cioKey=" + params.cioKey + "&" + "pageNumber=" + params.pageNumber
          + "&" + "pageSize=" + params.pageSize
      });
    } */
    const searchCriteria = this.props.ticketList.managerTicketSearchCriteria;
    if (localStorage.getItem('role') === Role.ROLE_MANAGER) {
      this.props.setManagerTicketSearchCriteria({
        //this is updated with new value
        pageNumber: pageNumber,

        //the following retains the same values
        cioKey: searchCriteria.cioKey,
        status: searchCriteria.status,
        pageSize: searchCriteria.pageSize,
        sortBy: searchCriteria.sortBy,
        sortOrder: searchCriteria.sortOrder,
        isLoad: true
      })
    }

  }

  onPaginationItemsPerPageChange(itemsPerPage) {
    if (localStorage.getItem('role') === Role.ROLE_MANAGER) {
      //Extracting query params from url
      console.log("Parsing query params from query-string:");
      console.log(history.location.search);
      const params = queryString.parse(history.location.search);
      console.log("Parsed params: ");
      console.log(params);

      //update pageSize params with new values
      params.pageSize = itemsPerPage;
      params.pageNumber = PAGINATION_START_PAGE;

      //update status param if its missing in URL based on cioKey
      if (!params.status)
        if (params.cioKey)
          params.status = componentInfoObj.getInfo(params.cioKey).statusFilterValue

      //push the url to history
      history.push({
        pathname: "/ticketmanage/tickets",
        search: "?status=" + params.status + "&" + "cioKey=" + params.cioKey + "&" + "pageNumber=" + params.pageNumber
          + "&" + "pageSize=" + params.pageSize
      });
    }

  }

  componentDidMount() {
    /* if (localStorage.getItem('role') === Role.ROLE_MANAGER) {
      //Extracting query params from url
      console.log("Parsing query params from query-string:");
      console.log(history.location.search);
      const params = queryString.parse(history.location.search);
      console.log("Parsed params: ");
      console.log(params);

      if (params.status) {
        this.props.fetchTickets({
          status: params.status,
          sortBy: TicketsSortBy.TICKET_ID,
          sortOrder: params.sortOrder,
          pageNumber: params.pageNumber,
          pageSize: params.pageSize,
          createdByMe: componentInfoObj.getInfo(params.cioKey).createdByMe
        });
      }
    } */

    if (localStorage.getItem('role') === Role.ROLE_MANAGER) {
      const searchCriteria = this.props.ticketList.managerTicketSearchCriteria;

      if (searchCriteria.isLoad) {
        this.props.fetchTickets({
          status: searchCriteria.status,
          sortBy: searchCriteria.sortBy,
          sortOrder: searchCriteria.sortOrder,
          pageNumber: searchCriteria.pageNumber,
          pageSize: searchCriteria.pageSize,
          createdByMe: componentInfoObj.getInfo(searchCriteria.cioKey).createdByMe
        });
      }
    }

  }

  componentDidUpdate(prevProps) {
    console.log("From inside of componentdidupdate");

    if (this.props.assignAndUpdateTicketAPICallStatus.success !==
      prevProps.assignAndUpdateTicketAPICallStatus.success) {


      console.log("Ticket assigned successfully. Reload the Tickets to be assigned.");
      //Fetching tickets post ticket update
      if (localStorage.getItem('role') === Role.ROLE_MANAGER) {
        this.props.fetchTickets({
          status: TicketStatus.NEW,
          sortBy: 'ticketId'
        });
      }
    }

    //Reload the tickets on searchCriteria changes
    if (prevProps.ticketList.managerTicketSearchCriteria !== this.props.ticketList.managerTicketSearchCriteria) {
      console.log("Manager Search criteria changed...reload the tickets");
      const searchCriteria = this.props.ticketList.managerTicketSearchCriteria;

      if (searchCriteria.isLoad) {
        this.props.fetchTickets({
          status: searchCriteria.status,
          sortBy: searchCriteria.sortBy,
          sortOrder: searchCriteria.sortOrder,
          pageNumber: searchCriteria.pageNumber,
          pageSize: searchCriteria.pageSize,
          createdByMe: componentInfoObj.getInfo(searchCriteria.cioKey).createdByMe
        });
      }
    }
  }

  render() {
    //Initialize suggestions array with names from engineers array
    var suggestions = [];
    this.props.engineers.forEach(engineer => {
      suggestions.push({ name: engineer.userFullName });
    });

    const title = this.props.ticketList.managerTicketSearchCriteria.cioKey ? componentInfoObj.getInfo(this.props.ticketList.managerTicketSearchCriteria.cioKey).title : componentInfoObj.getDefaultInfo().title;
    const subTitle = this.props.ticketList.managerTicketSearchCriteria.cioKey ? componentInfoObj.getInfo(this.props.ticketList.managerTicketSearchCriteria.cioKey).subTitle : componentInfoObj.getDefaultInfo().subTitle;


    return (
      <div style={{
        overflowX: 'hidden',
        overflowY: 'auto',
        height: '100%',
        marginLeft: '1%',
        marginRight: '1%'
      }}>
        <Container style={{ marginTop: '2%' }}><Row style={{ textAlign: 'left' }}>
          <h4>{title}</h4>
        </Row>
          <Row style={{ textAlign: 'left' }}>
            <p>{subTitle}</p>
          </Row>
        </Container>
        <hr />
        {(this.props.fetchTicketsAPICallStatus.success ||
          this.props.fetchAssignedTicketsAPICallStatus.success) && <CustomPagination data={this.props.ticketList}
            onPaginationPageChange={this.onPaginationPageChange}
            onPaginationItemsPerPageChange={this.onPaginationItemsPerPageChange}>
          </CustomPagination>
        }
        <Container>
          {(this.props.fetchTicketsAPICallStatus.requested ||
            this.props.fetchAssignedTicketsAPICallStatus.requested)
            &&
            <div className='view-ticket-loading'>
              <ScaleLoader
                color='#00d8ff'
                loading='true'
              />
            </div>
          }
          {false && (localStorage.getItem('role') === Role.ROLE_MANAGER) &&
            <Row>
              <Col style={{ textAlign: 'right' }}>
                <NavLink href="#" onClick={this.handleListViewClick} style={{ marginBottom: '', textDecoration: 'none', color: '#546e7a' }}>
                  <Badge href="#" color="primary">List View</Badge>
                </NavLink>
              </Col>
            </Row>
          }


          {(this.props.fetchTicketsAPICallStatus.success ||
            this.props.fetchAssignedTicketsAPICallStatus.success)
            && this.props.tickets.map(ticket =>
              <Row style={{ marginBottom: '2%' }}>
                <Col sm='12'>
                  <div style={{
                    cursor: 'pointer'
                  }} onClick={() => this.props.handleTicketBundleClick(ticket.id)}>
                    <TicketDetailCard ticket={ticket}></TicketDetailCard></div>
                </Col>
              </Row>
            )}
        </Container>

      </div>
    );

  }
}


const mapStateToProps = function (state) {
  return {
    tickets: state.ticketList.tickets,
    ticketList: state.ticketList,
    user: state.user,
    engineers: state.engineerList.engineers,
    fetchTicketsAPICallStatus: state.serviceCallStatus.fetchTicketsAPI,
    fetchAssignedTicketsAPICallStatus: state.serviceCallStatus.fetchAssignedTicketsAPI,
    assignAndUpdateTicketAPICallStatus: state.serviceCallStatus.assignAndUpdateTicketAPI

  }
}

/* const mapActionsToProps = {
  fetchAssignedTickets: fetchAssignedTicketsAPICall
} */

const mapActionsToProps = dispatch => {

  return {
    fetchTickets: (params) => {
      dispatch(fetchTicketsAPICall(params));
    },

    fetchAssignedTickets: (params) => {
      dispatch(fetchAssignedTicketsAPICall(params));
    },

    setActiveSideMenuItem: (activeSideMenuItem) => {
      dispatch(setManagerActiveSideMenuOption(activeSideMenuItem));
    },

    setManagerTicketSearchCriteria: (searchCriteria) => {
      dispatch(setManagerTicketSearchCriteria(searchCriteria));
    }

  };
}


export default connect(mapStateToProps, mapActionsToProps)(ViewTicketsForm);