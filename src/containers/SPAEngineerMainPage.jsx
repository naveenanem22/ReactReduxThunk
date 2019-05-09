import React from 'react';
import HeaderNavBar from "../components/EngineerHeaderNavBar";
import { connect } from 'react-redux';
import CreateTicketForm from './CreateTicketForm';
import DashboardForm from './EngineerDashboard';
import ViewTicketsForm from './ViewTicketBundlesForm';
import { Route } from 'react-router-dom'
import SideNavBar from '../components/EngineerSideNavBar';
import { Row, Col } from 'reactstrap';
import ViewTicketBundleDetailsForm from './ViewTicketBundleDetailsForm';
import EngineerProfileForm from './EngineerProfile';
import history from '../history';
import queryString from 'query-string';
import EngineerProfile from './EngineerProfile';
import ActivityForm from './ActivityForm';

class SPAEngineerMainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSelectTicketMsg: true
    }
    this.updateRouteAndShowTicketBundleDetails = this.updateRouteAndShowTicketBundleDetails.bind(this);
  }

  updateRouteAndShowTicketBundleDetails(ticketId) {
    //Process url to get the 'cioKey' and append to URL on bundleClick()
    const params = queryString.parse(history.location.search);
    history.push({
      pathname: '/ticketmaint/tickets',
      search: '?ticketId=' + ticketId + (params.cioKey ? '&cioKey=' + params.cioKey : '')
    });
    this.setState({
      showSelectTicketMsg: false
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
        <Row style={{ background: 'rgba(0,0,0,0.3)', marginTop: '1%', marginLeft: '3%', marginRight: '3%', paddingTop: '1%' }}>
          <Col sm='3' >
            <Row><Col sm='8'><SideNavBar></SideNavBar></Col></Row>
            <Row style={{ marginTop: '3%' }}><Col><ActivityForm ></ActivityForm></Col></Row>
          </Col>

          <Route path="/ticketmaint/newticket"
            component={() =>
              <Col sm='9' style={{ border: '1px solid #E8EAED', borderRadius: '10px', paddingRight: '5px', paddingLeft: '5px', paddingTop: '5px', paddingBottom: '5px', backgroundColor: '#ffffff' }}>
                <CreateTicketForm></CreateTicketForm>
              </Col>}>
          </Route>

          <Route path="/ticketmaint/dashboard"
            component={() =>
              <Col sm='9'>
                <Row>
                  <Col sm='8' style={{ border: '1px solid #E8EAED', borderRadius: '10px', paddingRight: '5px', paddingLeft: '5px', paddingTop: '5px', paddingBottom: '5px', backgroundColor: '#ffffff' }}>
                    <DashboardForm></DashboardForm>
                  </Col>
                  <Col sm='4'>
                    <EngineerProfile></EngineerProfile>
                  </Col>
                </Row>
              </Col>
            }>
          </Route>

          <Route path="/ticketmaint/tickets"
            component={() =>
              <Col sm='9' >
                <Row>
                  <Col sm='8' style={{ border: '1px solid #E8EAED', borderRadius: '10px', paddingRight: '5px', paddingLeft: '5px', paddingTop: '5px', paddingBottom: '5px', backgroundColor: '#ffffff' }}>
                    <ViewTicketsForm handleTicketBundleClick={this.updateRouteAndShowTicketBundleDetails} />
                  </Col>
               
                  <Col sm='4'>
                    <div style={{ position: 'sticky', top: 100, zIndex: 1 }}>
                      <ViewTicketBundleDetailsForm showSelectTicketMsg={this.state.showSelectTicketMsg}></ViewTicketBundleDetailsForm>
                    </div>
                  </Col>
                </Row>
              </Col>
            }>
          </Route>



          {/* <Col sm='7' style={{ border: '1px solid #E8EAED', borderRadius: '10px', paddingRight: '5px', paddingLeft: '5px', paddingTop: '5px', paddingBottom: '5px', backgroundColor: '#ffffff' }}>
            <Route path="/ticketmaint/tickets" component={() => <ViewTicketsForm handleTicketBundleClick={this.updateRouteAndShowTicketBundleDetails} />}></Route>
          </Col>
          <Col sm='3'>
            <div style={{ position: 'sticky', top: 100, zIndex: 1 }}>
              <Route path="/ticketmaint/tickets" component={() => <ViewTicketBundleDetailsForm showSelectTicketMsg={this.state.showSelectTicketMsg}></ViewTicketBundleDetailsForm>}> </Route>

            </div>
          </Col> */}
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