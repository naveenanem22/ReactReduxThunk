import React from 'react';
import HeaderNavBar from "../components/ManagerHeaderNavBar";
import { connect } from 'react-redux';
import CreateTicketForm from './CreateTicketForm';
import DashboardForm from './DashboardForm';
import ViewTicketsBundlesForm from './ViewTicketBundlesForm';
import ViewTicketsForm from './ViewTicketsForm';
import { Route } from 'react-router-dom'
import SideNavBar from '../components/ManagerSideNavBar';
import { Row, Col } from 'reactstrap';
import ViewTicketBundleDetailsForm from './ViewTicketBundleDetailsForm';
import EngineerProfileForm from './EngineerProfile';
import history from '../history';
import ViewTicketDetailsForm from './ViewTicketDetailsForm';
import queryString from 'query-string';
import FAQsForm from './FAQsForm';
import Workflow from './Workflow';
import {Role} from '../masterdata/ApplicationMasterData';
import EngineerDashboard from './EngineerDashboard';

class SPAEngineerMainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSelectTicketMsg: true
    }
    this.updateRouteAndShowTicketBundleDetails = this.updateRouteAndShowTicketBundleDetails.bind(this);
    this.updateRouteAndShowTicketDetails = this.updateRouteAndShowTicketDetails.bind(this);
  }

  updateRouteAndShowTicketDetails(e, ticket) {


    if (e.target.type == 'checkbox') {

    } else if (e.target.type == 'text') {

    } else if (e.target.type == 'suggestion') {

    } else {
      switch (localStorage.getItem('role')) {
        case Role.ROLE_EMPLOYEE:
          history.push({
            pathname: '/ticketing/ticketdetails',
            search: '?ticketId=' + ticket.id + '&' + 'cioKey=TD'
          });
          break;
        case Role.ROLE_MANAGER:
          history.push({
            pathname: "/ticketmanage/ticketdetails",
            search: "?ticketId=" + ticket.id
          });
          break;
        default:
          break;

      }

    }
  }

  updateRouteAndShowTicketBundleDetails(ticketId) {
    //Process url to get the 'cioKey' and append to URL on bundleClick()
    const params = queryString.parse(history.location.search);
    history.push({
      pathname: '/ticketmanage/tickets',
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
          <Col sm='2' ><SideNavBar></SideNavBar></Col>

          <Route path="/ticketmanage/workflow"
            component={() =>
              <Col sm='9' style={{ border: '1px solid #E8EAED', borderRadius: '10px', paddingRight: '5px', paddingLeft: '5px', paddingTop: '5px', paddingBottom: '5px', backgroundColor: '#ffffff' }}>
                <Workflow></Workflow>
              </Col>}>
          </Route>

          <Route path="/ticketmanage/faqs"
            component={() =>
              <Col sm='9' style={{ border: '1px solid #E8EAED', borderRadius: '10px', paddingRight: '5px', paddingLeft: '5px', paddingTop: '5px', paddingBottom: '5px', backgroundColor: '#ffffff' }}>
                <FAQsForm></FAQsForm>
              </Col>}>
          </Route>


          <Route path="/ticketmanage/newticket"
            component={() =>
              <Col sm='9' style={{ border: '1px solid #E8EAED', borderRadius: '10px', paddingRight: '5px', paddingLeft: '5px', paddingTop: '5px', paddingBottom: '5px', backgroundColor: '#ffffff' }}>
                <CreateTicketForm></CreateTicketForm>
              </Col>}>
          </Route>

          <Route path="/ticketmanage/mytickets"
            component={() =>
              <Col sm='9' style={{ border: '1px solid #E8EAED', borderRadius: '10px', paddingRight: '5px', paddingLeft: '5px', paddingTop: '5px', paddingBottom: '5px', backgroundColor: '#ffffff' }}>
                <ViewTicketsForm handleListViewTicketClick={this.updateRouteAndShowTicketDetails}></ViewTicketsForm>
              </Col>}>
          </Route>

          <Route path="/ticketmanage/ticketdetails"
            component={() =>
              <Col sm='9' style={{ border: '1px solid #E8EAED', borderRadius: '10px', paddingRight: '5px', paddingLeft: '5px', paddingTop: '5px', paddingBottom: '5px', backgroundColor: '#ffffff' }}>
                <ViewTicketDetailsForm></ViewTicketDetailsForm>
              </Col>}>
          </Route>

          <Route path="/ticketmanage/dashboard"
            component={() =>
              <Col sm='9' style={{ border: '1px solid #E8EAED', borderRadius: '10px', paddingRight: '5px', paddingLeft: '5px', paddingTop: '5px', paddingBottom: '5px', backgroundColor: '#ffffff' }}>
                <DashboardForm></DashboardForm>
              </Col>}>
          </Route>

          <Route path="/ticketmanage/tickets"
            component={() =>
              <Col sm='7' style={{ border: '1px solid #E8EAED', borderRadius: '10px', paddingRight: '5px', paddingLeft: '5px', paddingTop: '5px', paddingBottom: '5px', backgroundColor: '#ffffff' }}>
                <ViewTicketsBundlesForm handleTicketBundleClick={this.updateRouteAndShowTicketBundleDetails} />
              </Col>}>
          </Route>
          <Route path="/ticketmanage/tickets"
            component={() =>
              <Col sm='3'>
                <div style={{ position: 'sticky', top: 100, zIndex: 1 }}>
                  <ViewTicketBundleDetailsForm showSelectTicketMsg={this.state.showSelectTicketMsg}></ViewTicketBundleDetailsForm>
                </div>
              </Col>}>
          </Route>

          <Route path="/ticketmanage/ticketslistview"
            component={() =>
              <Col sm='7' style={{ border: '1px solid #E8EAED', borderRadius: '10px', paddingRight: '5px', paddingLeft: '5px', paddingTop: '5px', paddingBottom: '5px', backgroundColor: '#ffffff' }}>
                <ViewTicketsForm handleListViewTicketClick={this.updateRouteAndShowTicketDetails}></ViewTicketsForm>
              </Col>}>
          </Route>

          {/* <Route path="/ticketmanage/profile"
            component={() =>
              <Col sm='3'>
                <EngineerProfileForm ></EngineerProfileForm>
              </Col>}>
          </Route> */}
          <Route path="/ticketmanage/profile"
            component={() =>
              <Col sm='7' style={{ border: '1px solid #E8EAED', borderRadius: '10px', paddingRight: '5px', paddingLeft: '5px', paddingTop: '5px', paddingBottom: '5px', backgroundColor: '#ffffff' }}>
                <EngineerDashboard></EngineerDashboard>
              </Col>}>
          </Route>
          <Route path="/ticketmanage/profile"
            component={() =>
              <Col sm='3'>
                <EngineerProfileForm></EngineerProfileForm>
              </Col>}>
          </Route>
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