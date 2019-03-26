import React from 'react';
import HeaderNavBar from "../components/HeaderNavBar";
import SideNavBar from '../components/SideNavBar';
import ViewTicketsForm from './ViewTicketsForm';
import DashboardForm from './DashboardForm';
import { RingLoader, ScaleLoader } from 'react-spinners';
import { connect } from 'react-redux';
import { fetchTicketsAPICall } from '../actions/TicketActions'
import { Table } from 'reactstrap';
import { withRouter } from 'react-router';
import CreateTicketForm from '../containers/CreateTicketForm';
import SuccessAlert from '../components/SuccessAlert';

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

                  {this.props.isCreateTicketFormVisible && <div class = 'view-ticket-form'>
                <CreateTicketForm ></CreateTicketForm>
                </div>}

                {this.props.isSuccessAlertVisible && <div class = 'view-ticket-form'>
                <SuccessAlert></SuccessAlert>
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
    isCreateTicketFormVisible: state.ticketList.isCreateTicketFormVisible,
    isSuccessAlertVisible : state.ticketList.isSuccessAlertVisible
  }
}

const mapActionsToProps = {
  fetchTickets: fetchTicketsAPICall
}
export default connect(mapStateToProps, mapActionsToProps)(SPAMainPage);
  //export default withRouter(connect(mapStateToProps,mapActionsToProps)(ViewTicketsPage));