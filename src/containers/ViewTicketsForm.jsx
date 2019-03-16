import React from 'react';
import { connect } from 'react-redux';
import { Table, Container, Input, InputGroupAddon, InputGroup, Button, Row, Col, ListGroup, ListGroupItem } from 'reactstrap';
import { FaUserAlt } from 'react-icons/fa';
import { Redirect } from 'react-router-dom';
import SearchInput from '../components/SearchInput';

class ViewTicketsForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e, ticket) {


    if (e.target.type == 'checkbox') {

    } else if (e.target.type == 'text') {

    } else if (e.target.type == 'suggestion') {

    } else
      this.setState({ redirect: true, ticketId: ticket.id });
  }



  render() {
    //Make suggestions array with names from engineers array
    var suggestions = [];
    this.props.engineers.forEach(engineer => {
      suggestions.push({ name: engineer.userFullName })
    });

    if (this.state.redirect) {
      return <Redirect push to={{
        pathname: "/ticketdetails",
        search: "?ticketId=" + this.state.ticketId
      }} />;
    }

    return (
      <div style={{marginLeft:'1%', marginRight:'1%'}}>
        <Container style={{marginTop:'3%'}}><Row style={{ textAlign: 'left' }}>
          <h4>New Tickets</h4>
        </Row>
        <Row style={{ textAlign: 'left' }}>
          <p>Assign or Close the tickets multiple or individual.</p>
        </Row>
        </Container>
        <Table size='sm' hover bordered class="rounded mb-0" style={{marginTop:'1%'}}>
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
                {true && <td ><Input style={{ marginLeft: '0%' }} type="checkbox" /></td>}
                <td style={{fontFamily:'Helvetica Neue, Arial, sans-serif', fontSize:'14px'}}>{ticket.id}</td>
                <td style={{fontFamily:'Helvetica Neue, Arial, sans-serif', fontSize:'14px'}}>{ticket.status}</td>
                <td style={{fontFamily:'Helvetica Neue, Arial, sans-serif', fontSize:'14px'}}>{ticket.title}</td>
                <td style={{fontFamily:'Helvetica Neue, Arial, sans-serif', fontSize:'14px'}}>{ticket.updatedDate}</td>
                {true && <td><SearchInput suggestions={suggestions}></SearchInput>
                </td>}
              </tr>
            )}
          </tbody>
        </Table>
        <Container style={{marginTop:'3%', marginBottom:'3%'}}><Row style={{ textAlign: 'center' }}>
          <Col style={{ textAlign: 'center' }}>
            <Button color="success" style={{ width: '110px', marginRight:'5%' }}>Assign</Button>
            <Button color="secondary" style={{ width: '110px', marginLeft:'5%' }}>Close</Button>
          </Col>
        </Row>
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



export default connect(mapStateToProps)(ViewTicketsForm);