import React from 'react';
import { addMessageAPICall, closeTicketAPICall, downloadAttachmentAPICall, fetchTicketDetailsAPICall } from '../actions/TicketActions'
import { connect } from 'react-redux';
import { Badge, Row, Col, Container, Input, FormGroup, Label, FormText } from 'reactstrap';
import { Button, Card, CardBody, CardHeader, CardText, CardTitle } from 'reactstrap';
import { FaEnvelope, FaMobile, FaHome, FaBuilding } from 'react-icons/fa';
import { loadFileIcon } from '../util/UIUtils';
import history from '../history';
import queryString from 'query-string';


class EngineerProfileForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
    };

  }


  componentDidMount() {
    //Extracing params from url
    console.log("Search string: ");
    var searchString = history.location.search;
    console.log(searchString);
    var params = queryString.parse(searchString);
    console.log("Extracted params: ");
    console.log(params);

    //Show SelectTicketMessage if search-string contains the key: status
    if (params.status) {
      this.setState({
        showSelectTicketMsg: true
      })
    }

    //Make fetchTicketDetailsAPICall if the search-string contains key: ticketId
    if (params.ticketId) {
      this.props.fetchTicketDetails({
        ticketId: params.ticketId
      });
    }
  }


  render() {
    console.log("From Engineer Profile");
    console.log(this.props);
    const data = this.props.profile.base64ProfilePic;
    const ProfilePic = ({ data }) => <img style={{ borderRadius: '50%', height: '100px' }} src={`data:image/jpeg;base64,${data}`} />

    return (
      <div style={{
        overflowY: 'auto',
        overflowX: 'hidden',
        height: '100%',
        border: '1px solid #E8EAED',
        borderRadius: '10px',
        paddingRight: '10px',
        paddingLeft: '10px',
        paddingTop: '5px',
        paddingBottom: '5px',
        backgroundColor: '#ffffff'
      }}>
        <Row style={{ paddingTop: '5%' }}>
          <Col style={{ textAlign: 'center', height: '100px' }}><ProfilePic data={data} /></Col>
        </Row>
        <Row>
          <Col style={{ textAlign: 'center', fontSize: 'small', fontWeight: 500 }}>{this.props.profile.firstName} {this.props.profile.lastName}</Col>
        </Row>
        <Row>
          <Col style={{ textAlign: 'center', fontSize: '70%', fontWeight: 400 }}>{this.props.profile.designation}</Col>
        </Row>

        <Row style={{ marginTop: '5%' }}>
          <Col><hr></hr></Col>
        </Row>


        <Row>
          <Col style={{
            textAlign: 'left',
            fontSize: 'small',
            fontWeight: 500
          }}>About Me</Col>
        </Row>
        <Row>
          <Col style={{ textAlign: 'left', fontSize: '75%', fontWeight: 400 }}>{this.props.profile.aboutMe}</Col>
        </Row>

        <Row style={{ marginTop: '5%' }}>
          <Col><hr></hr></Col>
        </Row>


        <Row style={{ marginTop: '5%' }}>
          <Col sm='1' style={{ paddingRight: '0' }}><FaEnvelope style={{ color: 'green', fontSize: '80%' }}></FaEnvelope></Col>
          <Col sm='11' style={{ paddingTop: '1%', fontSize: '80%', fontWeight: '600' }}> mike.brenner@pmapi.com</Col>
        </Row>
        <Row style={{ marginTop: '2%' }}>
          <Col sm='1' style={{ paddingRight: '0' }}><FaMobile style={{ color: 'indigo', fontSize: '80%' }}></FaMobile></Col>
          <Col sm='11' style={{ paddingTop: '1%', fontSize: '80%', fontWeight: '600' }}>{this.props.profile.contactInfo.primaryMobileCountryCode}-{this.props.profile.contactInfo.primaryMobile}</Col>
        </Row>
        <Row style={{ marginTop: '2%' }}>
          <Col sm='1' style={{ paddingRight: '0' }}><FaHome style={{ color: 'red', fontSize: '80%' }}></FaHome></Col>
          <Col sm='11' style={{ paddingTop: '1%', fontSize: '80%', fontWeight: '600' }}> {this.props.profile.contactInfo.homePhoneCountryCode}-{this.props.profile.contactInfo.homePhone}</Col>
        </Row>
        <Row style={{ marginTop: '2%' }}>
          <Col sm='1' style={{ paddingRight: '0' }}><FaBuilding style={{ color: 'orange', fontSize: '80%' }}></FaBuilding></Col>
          <Col sm='11' style={{ paddingTop: '1%', fontSize: '80%', fontWeight: '600' }}> {this.props.profile.contactInfo.officePhoneCountryCode}-{this.props.profile.contactInfo.officePhone}</Col>
        </Row>

        <Row style={{ marginTop: '5%' }}>
          <Col><hr></hr></Col>
        </Row>

      </div>



    );
  }
}

const mapStateToProps = function (state) {
  return {
    ticket: state.ticketDetails.ticket,
    profile: state.user.profile
  }
}

const mapActionsToProps = {
  addMessage: addMessageAPICall,
  closeTicket: closeTicketAPICall,
  downloadAttachment: downloadAttachmentAPICall,
  fetchTicketDetails: fetchTicketDetailsAPICall
}

export default connect(mapStateToProps, mapActionsToProps)(EngineerProfileForm);