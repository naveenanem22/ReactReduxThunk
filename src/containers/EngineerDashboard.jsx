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

    const data = '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'

    return (
      <div style={{
        overflowX:'hidden',
        overflow:'auto',
        height: '100%',
        marginLeft: '1%', 
        marginRight: '1%'
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
            <Col>
              <Row>
                <Col style={{ textAlign: 'center' }}>
                  <img style={{ borderRadius: '50%', height: '170px', width: '130px' }} src={`data:image/jpeg;base64,${data}`} />
                </Col>
              </Row>
              <Row>
                <Col style={{ textAlign: 'center' }}>Star Badge</Col>
              </Row>
            </Col>
            <Col>
              <Row>
                <Col style={{ textAlign: 'center' }}>
                  <img style={{ borderRadius: '50%', height: '170px', width: '130px' }} src={`data:image/jpeg;base64,${data}`} />
                </Col>
              </Row>
              <Row>
                <Col style={{ textAlign: 'center' }}>Star Badge</Col>
              </Row>
            </Col>
            <Col>
              <Row>
                <Col style={{ textAlign: 'center' }}>
                  <img style={{ borderRadius: '50%', height: '170px', width: '130px' }} src={`data:image/jpeg;base64,${data}`} />
                </Col>
              </Row>
              <Row>
                <Col style={{ textAlign: 'center' }}>Star Badge</Col>
              </Row>
            </Col>
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

      </div>
    );

  }
}


const mapStateToProps = function (state) {
  return {
    user: state.user
  }
}

const mapActionsToProps = {
  fetchTickets: fetchTicketsAPICall
}


export default connect(mapStateToProps, mapActionsToProps)(DashboardForm);