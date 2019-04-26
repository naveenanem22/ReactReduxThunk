import React from 'react';
import HeaderNavBar from "../components/ManagerHeaderNavBar";
import { connect } from 'react-redux';
import CreateTicketForm from './CreateTicketForm';
import DashboardForm from './DashboardForm';
import ViewTicketsBundlesForm from './ViewTicketBundlesForm';
import ViewTicketsForm from './ViewTicketsForm';
import { Route } from 'react-router-dom'
import SideNavBar from '../components/ManagerSideNavBar';
import {Row, Col} from 'reactstrap';
import ViewTicketBundleDetailsForm from './ViewTicketBundleDetailsForm';
import EngineerProfileForm from './EngineerProfile';
import history from '../history';
import ViewTicketDetailsForm from './ViewTicketDetailsForm';

class SPAEngineerMainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSelectTicketMsg : true
    }
    this.updateRouteAndShowTicketBundleDetails = this.updateRouteAndShowTicketBundleDetails.bind(this);
    this.updateRouteAndShowTicketDetails = this.updateRouteAndShowTicketDetails.bind(this);
  }

  updateRouteAndShowTicketDetails(e, ticket) {


    if (e.target.type == 'checkbox') {

    } else if (e.target.type == 'text') {

    } else if (e.target.type == 'suggestion') {

    } else{
      history.push({
        pathname: "/ticketmanage/ticketdetails",
        search: "?ticketId=" + ticket.id
      });
    }
  }

  updateRouteAndShowTicketBundleDetails(ticketId){
    history.push({
      pathname:'/ticketmanage/tickets',
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
              <Route path="/ticketmanage/dashboard" component={DashboardForm}></Route>
              <Route path="/ticketmanage/newticket" component={CreateTicketForm}></Route>
              <Route path="/ticketmanage/tickets" component={() => <ViewTicketsBundlesForm handleTicketBundleClick={this.updateRouteAndShowTicketBundleDetails}/>}></Route>
              <Route path="/ticketmanage/ticketslistview" component={() => <ViewTicketsForm handleListViewTicketClick={this.updateRouteAndShowTicketDetails}></ViewTicketsForm>}></Route>
              <Route path="/ticketmanage/ticketdetails" component={ViewTicketDetailsForm}></Route>
            </Col>
            <Col sm='3'>            
              <div style={{ position: 'sticky', top: 100, zIndex: 1 }}>
              <Route path="/ticketmanage/tickets" component={() =><ViewTicketBundleDetailsForm showSelectTicketMsg={this.state.showSelectTicketMsg}></ViewTicketBundleDetailsForm>}> </Route>
              
              </div>
              <Route path="/ticketmanage/dashboard" component={() =><EngineerProfileForm ></EngineerProfileForm>}> </Route>
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