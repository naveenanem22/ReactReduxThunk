import React from 'react';
import HeaderNavBar from "../components/HeaderNavBar";
import SideNavBar from '../components/SideNavBar';
import ViewTicketsForm from './ViewTicketsForm';
import { RingLoader, ScaleLoader } from 'react-spinners';
import { connect } from 'react-redux';
import { fetchTicketsAPICall } from '../actions/TicketActions'
import { Table } from 'reactstrap';
import { withRouter } from 'react-router';

class SPAMainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
    this.loadTickets = this.loadTickets.bind(this);
  }

  componentDidMount() {
    
  }

  loadTickets() {
    const queryParams = new URLSearchParams(this.props.location.search);
    const status = queryParams.get('status');
    this.props.fetchTickets({
      userId: "naveen.anem@kony.com",
      status: status,
      sortBy: 'ticketId'
    });
  }

  render() {
    /* if (this.props.loadTickets)
      this.loadTickets(); */
    return (
      <div >
        <div class='sticky'>
          <HeaderNavBar></HeaderNavBar>
        </div>

        <div style={{ background: 'rgba(0,0,0,0.3)' }} class="view-ticket-body">
          <Table borderless>
            <tbody>
              <tr >
                <td style={{ width: '20%' }}><SideNavBar ></SideNavBar></td>
                <td>
                  {this.props.isViewTicketsFormVisible && <div class='view-ticket-form'>
                    <ViewTicketsForm ></ViewTicketsForm>
                  </div>}

                  {this.props.isLoadingScreenInViewTicketspage &&
                    <div className='view-ticket-loading'>
                      <ScaleLoader
                        color='#00d8ff'
                        loading='true'
                      />
                    </div>
                  }

                </td>
              </tr>

            </tbody>
          </Table>
        </div>
      </div>

    );
  }
}

const mapStateToProps = function (state) {
  return {
    isViewTicketsFormVisible: state.ticketList.isViewTicketsFormVisible,
    isLoadingScreenInViewTicketspage: state.ticketList.isLoadingScreenInViewTicketspage,
    loadTickets: state.ticketList.loadTickets
  }
}

const mapActionsToProps = {
  fetchTickets: fetchTicketsAPICall
}
export default connect(mapStateToProps, mapActionsToProps)(SPAMainPage);
  //export default withRouter(connect(mapStateToProps,mapActionsToProps)(ViewTicketsPage));