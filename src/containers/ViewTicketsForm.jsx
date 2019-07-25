import React from 'react';
import { connect } from 'react-redux';
import { Table, Container, Label, Input, Badge, NavLink, Button, Row, Col, ListGroup, ListGroupItem } from 'reactstrap';
import SearchInput from '../components/SearchInput';
import { assignAndUpdateMultipleTicketsAPICall } from '../actions/TicketActions';
import history from '../history';
import { Role, TicketStatus, PAGINATION_START_PAGE, ticketStatusColorCode, TicketsSortBy } from '../masterdata/ApplicationMasterData';
import { fetchCreatedTicketsAPICall } from '../actions/TicketActions'
import queryString from 'query-string';
import { ScaleLoader } from 'react-spinners';
import { componentInfoObj, SortOrder } from '../masterdata/ApplicationMasterData';
import CustomPagination from '../components/CustomPagination';
import { getTicketStatusColorCode, truncate } from '../util/UIUtils';
import { FaLongArrowAltDown, FaLongArrowAltUp } from 'react-icons/fa';
import { getLocalTimeStamp } from '../util/CalendarUtil';


class ViewTicketsForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      tickets: this.processPropsForInitialState(this.props.ticketList.tickets),
      ticketsToAssignAndUpdate: []

    };
    this.handleClick = this.handleClick.bind(this);
    this.handleAssign = this.handleAssign.bind(this);
    this.handleCheckAndUnCheck = this.handleCheckAndUnCheck.bind(this);
    this.updateAssignedValue = this.updateAssignedValue.bind(this);
    this.processPropsForInitialState = this.processPropsForInitialState.bind(this);
    this.isEveryTicketHasvalidData = this.isEveryTicketHasvalidData.bind(this);
    this.handleBundleViewClick = this.handleBundleViewClick.bind(this);
    this.onPaginationPageChange = this.onPaginationPageChange.bind(this);
    this.showOrHideSortIcon = this.showOrHideSortIcon.bind(this);
    this.handleSort = this.handleSort.bind(this);

  }

  handleSort(e) {
    console.log("Parsing query params from query-string:");
    console.log(history.location.search);
    const params = queryString.parse(history.location.search);
    console.log("Parsed params: ");
    console.log(params);
    var sortBy = '';
    var sortOrder = '';

    switch (e.target.innerText) {
      case 'Ticket#':
        //update sortBy
        sortBy = TicketsSortBy.TICKET_ID;
        break;

      case 'Status':
        sortBy = TicketsSortBy.TICKET_STATUS;
        break;
      case 'Title':
        sortBy = TicketsSortBy.TICKET_TITLE;
        break;
      case 'Updated':
        sortBy = TicketsSortBy.TICKET_UPDATED_DATE;
        break;
      default:
        break;
    }

    params.sortBy = sortBy;

    //Update sortOrder
    if (params.sortOrder) {
      params.sortOrder === SortOrder.ASCENDING ? sortOrder = SortOrder.DESCENDING : sortOrder = SortOrder.ASCENDING;
      params.sortOrder = sortOrder;
    }
    else
      params.sortOrder = SortOrder.ASCENDING;

    //push the url to history
    history.push({
      pathname: "/ticketing/tickets",
      search: "?status=" + params.status + "&" + "cioKey=" + params.cioKey + "&" + "pageNumber=" + params.pageNumber
        + "&" + "pageSize=" + params.pageSize + "&" + "sortBy=" + params.sortBy + "&" + "sortOrder=" + params.sortOrder
    });

  }

  static getDerivedStateFromProps(props, current_state) {
    console.log("setting state after receiving props");
    if (current_state.tickets !== props.tickets) {
      //Update state with default fields which are not available in props
      var tempTickets = props.ticketList.tickets;
      tempTickets.forEach(ticket => {
        ticket.isAssignedToInvalid = false;
        ticket.selected = false;
        ticket.assignedTo = { userName: '' };
      });
      return {
        tickets: tempTickets
      }
    }
    return null
  }

  onPaginationPageChange(pageNumber) {
    if (localStorage.getItem('role') === Role.ROLE_EMPLOYEE) {
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
        pathname: "/ticketing/tickets",
        search: "?status=" + params.status + "&" + "cioKey=" + params.cioKey + "&" + "pageNumber=" + params.pageNumber
          + "&" + "pageSize=" + params.pageSize + "&" + "sortBy=" + params.sortBy + "&" + "sortOrder=" + params.sortOrder
      });
    }

  }

  onPaginationItemsPerPageChange(itemsPerPage) {
    if (localStorage.getItem('role') === Role.ROLE_EMPLOYEE) {
      //Extracting query params from url
      console.log("Parsing query params from query-string:");
      console.log(history.location.search);
      const params = queryString.parse(history.location.search);
      console.log("Parsed params: ");
      console.log(params);

      //update pageSize params with new values
      params.pageSize = itemsPerPage;
      params.pageNumber = PAGINATION_START_PAGE;

      //push the url to history
      history.push({
        pathname: "/ticketing/tickets",
        search: "?status=" + params.status + "&" + "cioKey=" + params.cioKey + "&" + "pageNumber=" + params.pageNumber
          + "&" + "pageSize=" + params.pageSize + '&' +
          'sortOrder=' + params.sortOrder + '&' + 'sortBy=' + params.sortBy
      });
    }

  }

  handleBundleViewClick() {
    history.push({
      pathname: "/ticketmanage/tickets",
      search: "?status=" + TicketStatus.NEW
    });
  }

  processPropsForInitialState(tickets) {
    tickets.forEach(ticket => {
      ticket.isAssignedToInvalid = false;
      ticket.selected = false;
      ticket.assignedTo = { userName: '' };
    });
    return tickets;
  }

  updateAssignedValue(selectedValue, targetTicket) {
    var tempTicketsArr = this.state.tickets;
    tempTicketsArr.forEach(ticket => {
      if (ticket.id === targetTicket.id) {
        ticket.assignedTo = {
          userName: selectedValue
        }
        if (ticket.isAssignedToInvalid == true)
          ticket.isAssignedToInvalid = false;
        return;
      }
    });

    this.setState({
      tickets: tempTicketsArr
    });
  }



  handleAssign(e) {
    e.preventDefault();
    //Perform UI validations for required data
    if (!this.isEveryTicketHasvalidData(this.state.tickets)) {
      console.log("Invalid data present");
      var ticketsListUIValidations = this.state.tickets.map(ticket => {
        if (ticket.selected === true && ticket.assignedTo.userName === '')
          ticket.isAssignedToInvalid = true;

        return ticket;
      });
      console.log("UIValidations: " + ticketsListUIValidations);
      this.setState({
        tickets: ticketsListUIValidations
      });
      console.log(this.state.tickets);
    }
    else {
      //Filter unchecked ticket-rows and send only checked ticket-rows    
      var ticketsToUpdate = [];
      ticketsToUpdate = this.state.tickets.filter(ticket => {
        return (ticket.selected === true);
      }).map(ticket => {
        ticket.status = 'Open';
        return ticket;
      })
      console.log("Ticket to be Assigned and Updated: " + ticketsToUpdate);
      if (ticketsToUpdate.length > 0) {
        this.props.assignAndUpdateTickets(ticketsToUpdate);
      }
    }
  }

  isEveryTicketHasvalidData(tickets) {
    console.log("Inside isAtLeastOneTicketWithInvalidDataPresent");
    console.log(JSON.stringify(tickets));
    return tickets.every(ticket => {
      console.log("ticket.selected: " + ticket.selected);
      console.log("ticket.assignedTo.userName: " + ticket.assignedTo.userName);
      if (ticket.selected === true)
        return ticket.assignedTo.userName !== "";
      else
        return true;

    });
  }



  handleClick(e, ticket) {

    console.log("Handle click");
    if (e.target.type == 'checkbox') {

    } else if (e.target.type == 'text') {

    } else if (e.target.type == 'suggestion') {

    } else {
      history.push({
        pathname: "/ticketdetails",
        search: '?ticketId=' + ticket.id + '&' + 'cioKey=TD'
      });
    }
  }

  handleCheckAndUnCheck(e, targetTicket) {

    //Add ticket from list if checked
    if (e.target.checked) {
      //Find and update ticket' selection
      var tempTicketsArr = this.state.tickets;

      tempTicketsArr.forEach(ticket => {
        if (ticket.id === targetTicket.id) {
          ticket.selected = true;
          return;
        }
      });

      this.setState({
        tickets: tempTicketsArr
      })
    }
    //Remove ticket from list if unchecked
    else {
      //Find and update ticket's selection
      var tempTicketsArr = this.state.tickets;

      tempTicketsArr.forEach(ticket => {
        if (ticket.id === targetTicket.id) {
          ticket.selected = false;
          return;
        }
      });

      this.setState({
        tickets: tempTicketsArr
      })
    }

  }

  showOrHideSortIcon(fieldName) {
    //Show or Hide sort icon(Ascending or Descending)
    console.log(fieldName);
    console.log("Parsing query params from query-string: showorhide");
    console.log(history.location.search);
    const params = queryString.parse(history.location.search);
    console.log("Parsed params: ");
    console.log(params);

    //return nothing if params.sortBy is matching fieldname
    if (params.sortBy !== fieldName)
      return;

    switch (params.sortBy) {
      case TicketsSortBy.TICKET_ID:
        return params.sortOrder === SortOrder.ASCENDING ?
          <FaLongArrowAltUp></FaLongArrowAltUp> : <FaLongArrowAltDown></FaLongArrowAltDown>

      case TicketsSortBy.TICKET_STATUS:
        return params.sortOrder === SortOrder.ASCENDING ?
          <FaLongArrowAltUp></FaLongArrowAltUp> : <FaLongArrowAltDown></FaLongArrowAltDown>

      case TicketsSortBy.TICKET_TITLE:
        return params.sortOrder === SortOrder.ASCENDING ?
          <FaLongArrowAltUp></FaLongArrowAltUp> : <FaLongArrowAltDown></FaLongArrowAltDown>

      case TicketsSortBy.TICKET_UPDATED_DATE:
        return params.sortOrder === SortOrder.ASCENDING ?
          <FaLongArrowAltUp></FaLongArrowAltUp> : <FaLongArrowAltDown></FaLongArrowAltDown>

      default:
        return;

    }

  }

  componentDidMount() {
    if (localStorage.getItem('role') === Role.ROLE_EMPLOYEE) {
      //Extracting query params from url
      console.log("Parsing query params from query-string:");
      console.log(history.location.search);
      const params = queryString.parse(history.location.search);
      console.log("Parsed params: ");
      console.log(params);

      if (params.status) {
        this.props.fetchCreatedTickets({
          status: params.status,
          sortBy: params.sortBy,
          sortOrder: params.sortOrder,
          pageNumber: params.pageNumber,
          pageSize: params.pageSize
        });
      }
    }

    if (localStorage.getItem('role') === Role.ROLE_MANAGER) {

      //Extracting query params from url
      console.log("Parsing query params from query-string:");
      console.log(history.location.search);
      const params = queryString.parse(history.location.search);
      console.log("Parsed params: ");
      console.log(params);

      if (params.status) {
        this.props.fetchCreatedTickets({
          status: params.status,
          sortBy: params.sortBy,
          sortOrder: params.sortOrder,
          pageNumber: params.pageNumber,
          pageSize: params.pageSize
        });
      }
    }
  }

  render() {
    //Initialize suggestions array with names from engineers array
    var suggestions = [];
    this.props.engineers.forEach(engineer => {
      suggestions.push({ name: engineer.userFullName })
    });

    //Processing ttsKey to fetch Form Title and SubTitle data
    const params = queryString.parse(history.location.search);
    const title = params.cioKey ? componentInfoObj.getInfo(params.cioKey).title : componentInfoObj.getDefaultInfo().title;
    const subTitle = params.cioKey ? componentInfoObj.getInfo(params.cioKey).subTitle : componentInfoObj.getDefaultInfo().subTitle;

    return (
      <div style={{ marginLeft: '1%', marginRight: '1%' }}>
        <Container style={{ marginTop: '3%' }}><Row style={{ textAlign: 'left' }}>
          <h4>{title}</h4>
        </Row>
          <Row style={{ textAlign: 'left' }}>
            <p>{subTitle}</p>
          </Row>
        </Container>
        <hr />
        {this.props.fetchCreatedTicketsAPICallStatus.success && <CustomPagination data={this.props.ticketList}
          onPaginationPageChange={this.onPaginationPageChange}
          onPaginationItemsPerPageChange={this.onPaginationItemsPerPageChange}>
        </CustomPagination>
        }
        {(localStorage.getItem('role') === Role.ROLE_MANAGER) &&
          <Row>
            <Col style={{ textAlign: 'right' }}>
              <NavLink href="#" onClick={this.handleBundleViewClick} style={{ marginBottom: '', textDecoration: 'none', color: '#546e7a' }}>
                <Badge href="#" color="primary">Bundle View</Badge>
              </NavLink>
            </Col>
          </Row>
        }
        {this.props.fetchCreatedTicketsAPICallStatus.requested && <div className='view-ticket-loading'>
          <ScaleLoader
            color='#00d8ff'
            loading='true'
          />
        </div>
        }

        {this.props.fetchCreatedTicketsAPICallStatus.success && <Table size='sm' hover bordered class="rounded mb-0" style={{ marginTop: '1%' }}>
          <thead>
            <tr>
              {localStorage.getItem('role') === Role.ROLE_MANAGER && <th></th>}
              <th>{this.showOrHideSortIcon(TicketsSortBy.TICKET_ID)}<Label onClick={this.handleSort} style={{ cursor: 'pointer' }}>Ticket#</Label></th>
              <th>{this.showOrHideSortIcon(TicketsSortBy.TICKET_STATUS)}<Label onClick={this.handleSort} style={{ cursor: 'pointer' }}>Status</Label></th>
              <th>{this.showOrHideSortIcon(TicketsSortBy.TICKET_TITLE)}<Label onClick={this.handleSort} style={{ cursor: 'pointer' }}>Title</Label></th>
              <th>{this.showOrHideSortIcon(TicketsSortBy.TICKET_UPDATED_DATE)}<Label onClick={this.handleSort} style={{ cursor: 'pointer' }}>Updated</Label></th>
              {localStorage.getItem('role') === Role.ROLE_MANAGER && <th>Assign To</th>}
            </tr>
          </thead>
          <tbody>
            {this.props.ticketList.tickets.map((ticket) =>

              <tr style={{ cursor: 'pointer' }} onClick={(e) => this.props.handleListViewTicketClick(e, ticket)/* this.handleClick(e, ticket) */}>
                {localStorage.getItem('role') === Role.ROLE_MANAGER && <td style={{ width: '5%', textAlign: 'center' }}><Input style={{ marginLeft: '0%' }} type="checkbox" onChange={(e) => this.handleCheckAndUnCheck(e, ticket)} /></td>}
                <td style={{ fontSize: '14px' }}>{ticket.id}</td>
                <td style={{ fontSize: '14px' }}><Badge color={getTicketStatusColorCode(ticket.status)}>
                  {ticket.status}</Badge></td>
                <td style={{ fontSize: '14px' }}>{truncate.apply(ticket.title, [75, true])}</td>
                <td style={{ fontSize: '14px' }}>{getLocalTimeStamp(ticket.updatedDate)}</td>
                {localStorage.getItem('role') === Role.ROLE_MANAGER && <td style={{ marginRight: '1%' }}><SearchInput isInValid={ticket.isAssignedToInvalid} onSelectSuggestion={selectedValue => this.updateAssignedValue(selectedValue, ticket)} suggestions={suggestions}></SearchInput>
                </td>}
              </tr>
            )}
          </tbody>
        </Table>}
        {this.props.fetchCreatedTicketsAPICallStatus.success && <CustomPagination data={this.props.ticketList}
          onPaginationPageChange={this.onPaginationPageChange}
          onPaginationItemsPerPageChange={this.onPaginationItemsPerPageChange}>
        </CustomPagination>
        }
        {localStorage.getItem('role') === Role.ROLE_MANAGER &&
          <Container style={{ marginTop: '3%', marginBottom: '3%' }}><Row style={{ textAlign: 'center' }}>
            <Col style={{ textAlign: 'center' }}>
              <Button color="success" style={{ width: '110px', marginRight: '5%' }} onClick={(e) => this.handleAssign(e)}>Assign</Button>
              <Button color="secondary" style={{ width: '110px', marginLeft: '5%' }}>Close</Button>
            </Col>
          </Row>
          </Container>}

      </div>
    );

  }
}


const mapStateToProps = function (state) {
  return {
    ticketList: state.ticketList,
    user: state.user,
    engineers: state.engineerList.engineers,
    fetchCreatedTicketsAPICallStatus: state.serviceCallStatus.fetchCreatedTicketsAPI
  }
}

const mapActionsToProps = {
  assignAndUpdateTickets: assignAndUpdateMultipleTicketsAPICall,
  fetchCreatedTickets: fetchCreatedTicketsAPICall
}


export default connect(mapStateToProps, mapActionsToProps)(ViewTicketsForm);