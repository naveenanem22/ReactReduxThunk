import React from 'react';
import { connect } from 'react-redux';
import { Table, Input } from 'reactstrap';
import { Redirect } from 'react-router-dom';

class ViewTicketsForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e, ticket) {

    if (e.target.type == 'checkbox') {
      
    } else
      this.setState({ redirect: true, ticketId: ticket.id });
  }



  render() {
    if (this.state.redirect) {
      return <Redirect push to={{
        pathname: "/ticketdetails",
        search: "?ticketId=" + this.state.ticketId
      }} />;
    }

    return (
      <Table hover bordered class="rounded mb-0">
        <thead>
          <tr>
            {true && <th></th>}
            <th>Ticket#</th>
            <th>Status</th>
            <th>Title</th>
            <th>Updated</th>
            <th>Assign To</th>
          </tr>
        </thead>
        <tbody>
          {this.props.tickets.map((ticket) =>

            <tr onClick={(e) => this.handleClick(e, ticket)}>
              {true && <td><Input style={{ marginLeft: '0%' }} type="checkbox" /></td>}
              <td scope="row">{ticket.id}</td>
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


const mapStateToProps = function (state) {
  return {
    tickets: state.ticketList.tickets,
    user: state.user
  }
}



export default connect(mapStateToProps)(ViewTicketsForm);