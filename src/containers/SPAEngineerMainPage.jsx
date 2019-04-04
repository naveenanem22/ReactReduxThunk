import React from 'react';
import HeaderNavBar from "../components/EngineerHeaderNavBar";
import { connect } from 'react-redux';
import CreateTicketForm from './CreateTicketForm';
import DashboardForm from './DashboardForm';
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
      <div>        
          <div class='sticky' style={{width:'100%'}}>
            <HeaderNavBar></HeaderNavBar>
          </div>        
        <Row>
          <Col><SideNavBar></SideNavBar></Col>
          <Col>
            <Route path="/ticketmaint/dashboard" component={DashboardForm}></Route>
            <Route path="/ticketmaint/newticket" component={CreateTicketForm}></Route>
          </Col>
          <Col>
            <div>This is where the sub content to be displayed..like Org uupdates, new tickets, closed ticets</div>
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