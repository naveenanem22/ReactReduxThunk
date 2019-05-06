import React from 'react';
import { connect } from 'react-redux';
import { Table, Container, Input, Badge, NavLink, Button, Row, Col, ListGroup, ListGroupItem } from 'reactstrap';
import SearchInput from '../components/SearchInput';
import { assignAndUpdateMultipleTicketsAPICall } from '../actions/TicketActions';
import history from '../history';
import {Role, TicketStatus} from '../masterdata/ApplicationMasterData';
import {fetchCreatedTicketsAPICall} from '../actions/TicketActions'
import queryString from 'query-string';
import { ScaleLoader } from 'react-spinners';
import {componentInfoObj} from '../masterdata/ApplicationMasterData';

class ViewTicketsForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      tickets: this.processPropsForInitialState(this.props.tickets),
      ticketsToAssignAndUpdate: []

    };
    this.handleClick = this.handleClick.bind(this);
    this.handleAssign = this.handleAssign.bind(this);
    this.handleCheckAndUnCheck = this.handleCheckAndUnCheck.bind(this);
    this.updateAssignedValue = this.updateAssignedValue.bind(this);
    this.processPropsForInitialState = this.processPropsForInitialState.bind(this);
    this.isEveryTicketHasvalidData = this.isEveryTicketHasvalidData.bind(this);
    this.handleBundleViewClick = this.handleBundleViewClick.bind(this);

  }

  static getDerivedStateFromProps(props, current_state) {
    console.log("setting state after receiving props");
    if (current_state.tickets !== props.tickets) {
        //Update state with default fields which are not available in props
        var tempTickets = props.tickets;
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
  
  handleBundleViewClick(){
    history.push({
      pathname: "/ticketmanage/tickets",
      search: "?status="+TicketStatus.NEW
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
      if (ticketsToUpdate.length > 0){
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


    if (e.target.type == 'checkbox') {

    } else if (e.target.type == 'text') {

    } else if (e.target.type == 'suggestion') {

    } else{
      history.push({
        pathname: "/ticketdetails",
        search: "?ticketId=" + ticket.id
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

  componentDidMount(){
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
          sortBy: 'ticketId'
        });
      }
    }

    if (localStorage.getItem('role') === Role.ROLE_MANAGER) {
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
    
    const title = params.cioKey? componentInfoObj.getInfo(params.cioKey).title: componentInfoObj.getDefaultInfo().title;
    const subTitle = params.cioKey? componentInfoObj.getInfo(params.cioKey).subTitle: componentInfoObj.getDefaultInfo().subTitle;


    return (
      <div style={{ marginLeft: '1%', marginRight: '1%' }}>
        <Container style={{ marginTop: '3%' }}><Row style={{ textAlign: 'left' }}>
          <h4>{title}</h4>
        </Row>
          <Row style={{ textAlign: 'left' }}>
            <p>{subTitle}</p>
          </Row>
        </Container>
        <hr/>
        {(localStorage.getItem('role') === Role.ROLE_MANAGER) &&
            <Row>
              <Col style={{textAlign:'right'}}>
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
              <th>Ticket#</th>
              <th>Status</th>
              <th>Title</th>
              <th>Updated</th>
              {localStorage.getItem('role') === Role.ROLE_MANAGER && <th>Assign To</th>}
            </tr>
          </thead>
          <tbody>
            {this.props.tickets.map((ticket) =>

              <tr onClick={(e) => this.props.handleListViewTicketClick(e, ticket)/* this.handleClick(e, ticket) */}>
                {localStorage.getItem('role') === Role.ROLE_MANAGER && <td style={{ width: '5%', textAlign: 'center' }}><Input style={{ marginLeft: '0%' }} type="checkbox" onChange={(e) => this.handleCheckAndUnCheck(e, ticket)} /></td>}
                <td style={{ fontSize: '14px' }}>{ticket.id}</td>
                <td style={{ fontSize: '14px' }}>{ticket.status}</td>
                <td style={{ fontSize: '14px' }}>{ticket.title}</td>
                <td style={{ fontSize: '14px' }}>{ticket.updatedDate}</td>
                {localStorage.getItem('role') === Role.ROLE_MANAGER && <td style={{ marginRight: '1%' }}><SearchInput isInValid={ticket.isAssignedToInvalid} onSelectSuggestion={selectedValue => this.updateAssignedValue(selectedValue, ticket)} suggestions={suggestions}></SearchInput>
                </td>}
              </tr>
            )}
          </tbody>
        </Table>}
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
    tickets: state.ticketList.tickets,
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