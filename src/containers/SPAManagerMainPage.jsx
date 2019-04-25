import React from 'react';
import HeaderNavBar from "../components/EngineerHeaderNavBar";
import { connect } from 'react-redux';
import CreateTicketForm from './CreateTicketForm';
import DashboardForm from './EngineerDashboard';
import ViewTicketsForm from './ViewTicketBundlesForm';
import { Route } from 'react-router-dom'
import SideNavBar from '../components/EngineerSideNavBar';
import {Row, Col} from 'reactstrap';
import ViewTicketBundleDetailsForm from './ViewTicketBundleDetailsForm';
import EngineerProfileForm from './EngineerProfile';
import history from '../history';

class SPAEngineerMainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSelectTicketMsg : true
    }
    this.updateRouteAndShowTicketBundleDetails = this.updateRouteAndShowTicketBundleDetails.bind(this);
  }

  updateRouteAndShowTicketBundleDetails(ticketId){
    history.push({
      pathname:'/ticketmaint/tickets',
      search:'?ticketId='+ticketId
    });
    console.log("ticketId: "+ticketId);
    this.setState({
      showSelectTicketMsg : false
    });
  }

  componentDidMount() {

  }

  render() {
    return (
      <div >
        <div class='sticky' style={{ height: '100%', width: '100%' }}>
          <HeaderNavBar></HeaderNavBar>
        </div>
        <Row style={{ background: 'rgba(0,0,0,0.3)', marginTop:'1%', marginLeft:'3%', marginRight:'3%', paddingTop:'1%' }}>
            <Col sm='2' ><SideNavBar></SideNavBar></Col>
            <Col sm='7' style={{border: '1px solid #E8EAED', borderRadius: '10px',  paddingRight: '5px',  paddingLeft:'5px',  paddingTop:'5px',  paddingBottom:'5px',  backgroundColor: '#ffffff'}}>
              <Route path="/ticketmaint/dashboard" component={DashboardForm}></Route>
              <Route path="/ticketmaint/newticket" component={CreateTicketForm}></Route>
              <Route path="/ticketmaint/tickets" component={() => <ViewTicketsForm handleTicketBundleClick={this.updateRouteAndShowTicketBundleDetails}/>}></Route>
            </Col>
            <Col sm='3'>            
              <div style={{ position: 'sticky', top: 100, zIndex: 1 }}>
              <Route path="/ticketmaint/tickets" component={() =><ViewTicketBundleDetailsForm showSelectTicketMsg={this.state.showSelectTicketMsg}></ViewTicketBundleDetailsForm>}> </Route>
              
              </div>
              <Route path="/ticketmaint/dashboard" component={() =><EngineerProfileForm ></EngineerProfileForm>}> </Route>
            </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = function (state) {
  return {
   // isLoadingScreenVisible: state.loadingScreen.isLoadingScreenVisible
  }
}

const mapActionsToProps = {
}
export default connect(mapStateToProps, mapActionsToProps)(SPAEngineerMainPage);