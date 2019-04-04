import React from 'react';
import HeaderNavBar from "../components/EngineerHeaderNavBar";
import { connect } from 'react-redux';
import CreateTicketForm from './CreateTicketForm';
import DashboardForm from './DashboardForm';
import ViewTicketsForm from './ViewTicketBundlesForm';
import { Route } from 'react-router-dom'
import SideNavBar from '../components/EngineerSideNavBar';
import {Row, Col} from 'reactstrap';

class SPAEngineerMainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
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
            <Col sm='2'><SideNavBar></SideNavBar></Col>
            <Col sm='7' style={{border: '1px solid #E8EAED', borderRadius: '10px',  paddingRight: '5px',  paddingLeft:'5px',  paddingTop:'5px',  paddingBottom:'5px',  backgroundColor: '#E8EAED'}}>
              <Route path="/ticketmaint/dashboard" component={DashboardForm}></Route>
              <Route path="/ticketmaint/newticket" component={CreateTicketForm}></Route>
              <Route path="/ticketmaint/tickets" component={ViewTicketsForm}></Route>
            </Col>
            <Col sm='3'>
              <div style={{ position: 'sticky', top: 100, zIndex: 1 }}>This is where the sub content to be displayed..like Org uupdates, new tickets, closed ticets</div>
            </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = function (state) {
  return {
    isLoadingScreenVisible: state.loadingScreen.isLoadingScreenVisible
  }
}

const mapActionsToProps = {
}
export default connect(mapStateToProps, mapActionsToProps)(SPAEngineerMainPage);