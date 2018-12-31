import React from 'react';
import {connect} from 'react-redux';
import { Table } from 'reactstrap';


class ViewTicketsForm extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      
    }  

  }

  
  
  render() {
    
    
    return (
        <Table hover bordered className="rounded mb-0">
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
               <tr>
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