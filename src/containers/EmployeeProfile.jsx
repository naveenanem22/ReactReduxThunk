import React from 'react';
import { addMessageAPICall, closeTicketAPICall, downloadAttachmentAPICall, fetchTicketDetailsAPICall } from '../actions/TicketActions'
import { connect } from 'react-redux';
import { Col, Button, Form, FormGroup, Label, Input, FormText, Row, Container } from 'reactstrap';
import { FaEnvelope, FaMobile, FaHome, FaBuilding } from 'react-icons/fa';
import { loadFileIcon } from '../util/UIUtils';
import history from '../history';
import { componentInfoObj } from '../masterdata/ApplicationMasterData';
import queryString from 'query-string';
import { HalfCircleSpinner } from 'react-epic-spinners';
import { getProfileAPICall } from '../actions/UserActions';


class EngineerProfileForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
    };

  }


  componentDidMount() {

    /* this.props.getProfile({
      employeeId: localStorage.getItem('employeeId')
    }); */
  }


  render() {

    //Processing ttsKey to fetch Form Title and SubTitle data
    console.log(this.props);
    const params = queryString.parse(history.location.search);

    const title = params.cioKey ? componentInfoObj.getInfo(params.cioKey).title : componentInfoObj.getDefaultInfo().title;
    const subTitle = params.cioKey ? componentInfoObj.getInfo(params.cioKey).subTitle : componentInfoObj.getDefaultInfo().subTitle;

    return (
      <div style={{
        overflowX: 'hidden',
        overflowY: 'auto',
        height: '100%',
        marginLeft: '1%',
        marginRight: '1%'
      }}>
        <Form>
          <FormGroup>
            <Container style={{ marginTop: '2%' }}>
              <Row style={{ textAlign: 'left' }}>
                <h4>{title}</h4>
              </Row>
              <Row style={{ textAlign: 'left' }}>
                <p>{subTitle}</p>
              </Row>
            </Container>
            <hr />
          </FormGroup>
          <Container style={{
            paddingLeft: '10%',
            paddingRight: '20%'
          }}>
            <FormGroup row>
              <Label size='sm' style={{
                textAlign: 'right',
                fontWeight: '600'
              }} for="firstName" sm={3}>
                First Name
              </Label>
              <Col sm={9}>
                <Input size='sm' value={this.props.profile.firstName} type="text" name="firstName" id="firstName" placeholder="" />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label size='sm' style={{
                textAlign: 'right',
                fontWeight: '600'
              }} for="middleName" sm={3}>Middle Name</Label>
              <Col sm={9}>
                <Input size='sm' value={this.props.profile.middleName} type="text" name="middleName" id="middleName" placeholder="" />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label size='sm' style={{
                textAlign: 'right',
                fontWeight: '600'
              }} for="lastName" sm={3}>Last Name</Label>
              <Col sm={9}>
                <Input size='sm' value={this.props.profile.lastName} type="text" name="lastName" id="lastName" placeholder="" />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label size='sm' style={{
                textAlign: 'right',
                fontWeight: '600'
              }} for="address" sm={3}>Address</Label>
              <Col sm={9}>
                <Input size='sm' value={this.props.profile.individualAddress.addressLine1} type="textarea" name="address" id="address" placeholder="" />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label size='sm' style={{
                textAlign: 'right',
                fontWeight: '600'
              }} for="officePhone" sm={3}>Office Phone</Label>
              <Col sm={9}>
                <Input size='sm'
                  value={this.props.profile.contactInfo.officePhoneCountryCode + ' ' +
                    this.props.profile.contactInfo.officePhone}
                  type="text" name="officePhone" id="officePhone" placeholder="" />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label size='sm' style={{
                textAlign: 'right',
                fontWeight: '600'
              }} for="homePhone" sm={3}>Home Phone</Label>
              <Col sm={9}>
                <Input size='sm' 
                value={this.props.profile.contactInfo.homePhoneCountryCode + ' ' +
                this.props.profile.contactInfo.homePhone}
                 type="text" name="homePhone" id="homePhone" placeholder="" />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label size='sm' style={{
                textAlign: 'right',
                fontWeight: '600'
              }} for="mobilePhone" sm={3}>Mobile Phone</Label>
              <Col sm={9}>
                <Input size='sm' 
                value={this.props.profile.contactInfo.primaryMobileCountryCode + ' ' +
                this.props.profile.contactInfo.primaryMobile}
                type="text" name="mobilePhone" id="mobilePhone" placeholder="" />
              </Col>
            </FormGroup>
            {false && <Row style={{
              textAlign: 'center'
            }}>
              <Col sm={{ size: 'auto', offset: 6 }}
                style={{
                  paddingRight: '0'
                }}>
                <Button size='sm' color='primary'>
                  Done
                </Button>
              </Col>
              <Col size='sm' sm='auto' style={{
                paddingTop: '1%'
              }}>
                <HalfCircleSpinner
                  size='15'
                  color='green'
                >

                </HalfCircleSpinner>
              </Col>
            </Row>}
          </Container>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = function (state) {
  return {
    profile: state.user.profile
  }
}

const mapActionsToProps = (dispatch) => {

  return {
    getProfile: (params) => {
        dispatch(getProfileAPICall(params, dispatch))
    }
}
}

export default connect(mapStateToProps, mapActionsToProps)(EngineerProfileForm);