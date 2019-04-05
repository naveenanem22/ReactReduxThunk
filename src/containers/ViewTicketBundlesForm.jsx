import React from 'react';
import { connect } from 'react-redux';
import { Table, Container, Input, InputGroupAddon, InputGroup, Button, Row, Col, ListGroup, ListGroupItem } from 'reactstrap';
import { FaUserAlt } from 'react-icons/fa';
import { Redirect } from 'react-router-dom';
import SearchInput from '../components/SearchInput';
import { assignAndUpdateMultipleTicketsAPICall } from '../actions/TicketActions';
import history from '../history';
import TicketDetailCard from '../components/TicketDetailCard';

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



  render() {
    console.log("This is from ViewTicketBundlesForm...");
    //Initialize suggestions array with names from engineers array
    var suggestions = [];
    this.props.engineers.forEach(engineer => {
      suggestions.push({ name: engineer.userFullName });
    });

    return (
      <div style={{ marginLeft: '1%', marginRight: '1%' }}>
        <Container style={{ marginTop: '3%' }}><Row style={{ textAlign: 'left' }}>
          <h4>New Tickets</h4>
        </Row>
          <Row style={{ textAlign: 'left' }}>
            <p>Tickets that need to be actioned.</p>
          </Row>
        </Container>
        <Container>
          <Row style={{marginBottom:'2%'}}><TicketDetailCard></TicketDetailCard></Row>
          <Row style={{marginBottom:'2%'}}><TicketDetailCard></TicketDetailCard></Row>
          <Row style={{marginBottom:'2%'}}><TicketDetailCard></TicketDetailCard></Row>
          <Row style={{marginBottom:'2%'}}><TicketDetailCard></TicketDetailCard></Row>
        </Container>
        
      </div>
    );

  }
}


const mapStateToProps = function (state) {
  return {
    tickets: state.ticketList.tickets,
    user: state.user,
    engineers: state.engineerList.engineers
  }
}

const mapActionsToProps = {
  assignAndUpdateTickets: assignAndUpdateMultipleTicketsAPICall
}


export default connect(mapStateToProps, mapActionsToProps)(ViewTicketsForm);