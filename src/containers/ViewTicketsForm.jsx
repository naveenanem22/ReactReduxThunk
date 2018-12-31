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
            <tr>
              <th scope="row">122121</th>
              <td>Closed</td>
              <td>Internet to be available on the personal device. 
                  Internet to be available on the personal device.
                  Internet to be available on the personal device.</td>
              <td>21st Jan 2018</td>
            </tr>
            <tr>
              <th scope="row">223333</th>
              <td>Open</td>
              <td>Printer not working</td>
              <td>31st Jan 2019</td>
            </tr>
            <tr>
              <th scope="row">34567</th>
              <td>New</td>
              <td>Mouse not working</td>
              <td>31st Jan 2019</td>
            </tr>
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