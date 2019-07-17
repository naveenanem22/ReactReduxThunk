import React from 'react';
import { Card, CardBody } from 'reactstrap';
import { connect } from 'react-redux';
import { NavItem, NavLink, Container, InputGroupAddon, InputGroup, Button, Row, Col, ListGroup, ListGroupItem } from 'reactstrap';
import { FaSyncAlt, FaTicketAlt } from 'react-icons/fa';
import { Redirect } from 'react-router-dom';
import SearchInput from '../components/SearchInput';
import { componentInfoObj } from '../masterdata/ApplicationMasterData';
import { assignAndUpdateMultipleTicketsAPICall } from '../actions/TicketActions';
import history from '../history';
import { fetchTicketsAPICall } from '../actions/TicketActions';
import queryString from 'query-string';
import PerfectScrollbar from 'react-perfect-scrollbar'
import 'react-perfect-scrollbar/dist/css/styles.css';

class DashboardForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
    };
    this.handleTicketBundleClick = this.handleTicketBundleClick.bind(this);

  }

  handleTicketBundleClick(e, ticket) {
  }

  componentDidMount() {
  }

  render() {
    //Processing ttsKey to fetch Form Title and SubTitle data
    const params = queryString.parse(history.location.search);

    const title = params.cioKey ? componentInfoObj.getInfo(params.cioKey).title : componentInfoObj.getDefaultInfo().title;
    const subTitle = params.cioKey ? componentInfoObj.getInfo(params.cioKey).subTitle : componentInfoObj.getDefaultInfo().subTitle;

    return (
      <PerfectScrollbar style={{
        width: '100%',
        height: '100%'
      }}>
        <Container style={{ marginTop: '3%' }}>
          <Row >
            <Col style={{ textAlign: 'left' }}><h4>{title}</h4></Col>
          </Row>
          <Row >
            <Col style={{ textAlign: 'left' }}><p>{subTitle}</p></Col>
          </Row>
        </Container>
        <Container>
          <Row>
            <Col>Badges</Col></Row>
          <Row style={{ marginTop: '1%', marginBottom: '1%' }}>
            <Col><hr></hr></Col>
          </Row>
          <Row>
            
              {true && this.props.profile.badges.map(badge =>
              <Col>
                <Row>
                  <Col style={{ textAlign: 'center' }}>
                    <img style={{ borderRadius: '50%', height: '170px', width: '130px' }} src={`data:image/jpeg;base64,${badge.base64Image}`} />
                  </Col>
                </Row>
                <Row>
                  <Col style={{ textAlign: 'center' }}>{badge.title}</Col>
                </Row>
                </Col>

              )}
              
          </Row>
          <Row style={{ marginTop: '10%' }}>
            <Col>Credits</Col>
          </Row>
          <Row style={{ marginTop: '1%', marginBottom: '1%' }}>
            <Col><hr></hr></Col>
          </Row>
          <Row>
            <Col style={{ width: '10%' }}>
              <Card>
                <CardBody>
                  <Row>
                    <Col><FaTicketAlt size={70} style={{ color: 'red' }} /></Col>
                    <Col>
                      <Row><Col ><p style={{ marginBottom: '0%' }}>Points</p></Col></Row>
                      <Row><Col ><h1>296</h1></Col></Row>
                    </Col>
                  </Row>
                  <hr></hr>
                  <p style={{ display: 'flex', alignItems: 'center', color: '#A9A9A9', fontSize: '90%', marginTop: '2%' }}><FaSyncAlt style={{ color: '#A9A9A9', marginRight: '5px' }}></FaSyncAlt>Updated about an hour ago.</p>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>

      </PerfectScrollbar>
    );

  }
}


const mapStateToProps = function (state) {
  return {
    user: state.user,
    profile: state.user.profile
  }
}

const mapActionsToProps = {
  fetchTickets: fetchTicketsAPICall
}


export default connect(mapStateToProps, mapActionsToProps)(DashboardForm);