import React from 'react';
import {connect} from 'react-redux';
import { Table } from 'reactstrap';
import { Redirect } from 'react-router';

class ViewTicketsForm extends React.Component {

  constructor(props){
    super(props);
    this.state = {
    };
    this.handleClick = this.handleClick.bind(this);  
  }

  handleClick(ticket){
    this.setState({redirect: true, ticketId: ticket.id});
  }

  
  
  render() {
    if (this.state.redirect) {
      return <Redirect push to={{
        pathname: "/ticketdetails",
        search : "?ticketId="+this.state.ticketId
      }} />;
    }
    
    return (
        <Table hover bordered class="rounded mb-0">
          <thead>
            <tr>
              <th>Ticket#</th>
              <th>Status</th>
              <th>Title</th>
              <th>Updated</th>
            </tr>
          </thead>
          <tbody>
            {this.props.tickets.map((ticket) =>
               <tr onClick={() => this.handleClick(ticket)}>
               <th scope="row">{ticket.id}</th>
               <td>{ticket.status}</td>
               <td>{ticket.title}</td>
               <td>{ticket.updatedDate}</td>
              </tr>
              )}
          </tbody>
        </Table>
      );

  }    
}


const mapStateToProps = function (state){
    return {
      tickets: state.ticketList.tickets
    }
  }



export default connect(mapStateToProps)(ViewTicketsForm);