import React from 'react';
import { addMessageAPICall, closeTicketAPICall, downloadAttachmentAPICall, fetchTicketDetailsAPICall } from '../actions/TicketActions'
import { connect } from 'react-redux';
import { Badge, Row, Col, Container, Input, FormGroup, Label, FormText } from 'reactstrap';
import { Button, Card, CardBody, CardHeader, CardText, CardTitle } from 'reactstrap';
import { FaFilePdf, FaFileAlt, FaFileImage, FaFile } from 'react-icons/fa';
import {loadFileIcon} from '../util/UIUtils';
import history from '../history';

class ViewTicketBundleDetailsForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      id: this.props.ticket.id,
      status: '',
      comment: '',

      commentedOn: '',
      isUpload: false,
      showSelectTicketMsg: this.props.showSelectTicketMsg
    };

    this.handleChange = this.handleChange.bind(this);
    this.onSubmitAddMessage = this.onSubmitAddMessage.bind(this);
    this.onFileUpload = this.onFileUpload.bind(this);
    this.onSubmitCloseTicket = this.onSubmitCloseTicket.bind(this);
    this.onClickLink = this.onClickLink.bind(this);
    this.toggleUpload = this.toggleUpload.bind(this);
  }

  toggleUpload(){
    this.setState({
      isUpload : !this.state.isUpload
    })
  }


  onClickLink(e) {
    e.preventDefault();
    this.props.downloadAttachment("http://localhost:8080/filestorage/123198_getAlertPackageResponse.txt");
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSubmitAddMessage(e) {
    e.preventDefault();
    this.setState((prevState, props) => ({
      commentedOn : new Date(Date.now()).toISOString(),
      file1: this.state.isUpload ? prevState.file1 : undefined,
      file2: this.state.isUpload ? prevState.file2 : undefined,
      file3: this.state.isUpload ? prevState.file3 : undefined
    }), () => {
      this.props.addMessage(this.state);
    })


    
  }

  onSubmitCloseTicket(e) {
    e.preventDefault();

    this.setState((prevState, props) => ({
      commentedOn: new Date(Date.now()).toISOString(),
      status: 'Closed',
      file1: this.state.isUpload ? prevState.file1 : undefined,
      file2: this.state.isUpload ? prevState.file2 : undefined,
      file3: this.state.isUpload ? prevState.file3 : undefined
    }), () => {
      console.log(this.state);
      this.props.closeTicket(this.state);
    });
  }

  onFileUpload(e) {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.files[0]
    })
  }

  componentDidMount(){
    if(history.location.search.includes('status'))
    {
      this.setState({
        showSelectTicketMsg: true
      })
    }

    if(history.location.search.includes('ticketId')){
      this.props.fetchTicketDetails({
        ticketId:3
      });

    }

    
    
  }


  render() {
    const ticket = this.props.ticket;
    console.log("ViewTicketBundleDetailsForm-Render");
    console.log(ticket);
    return (
      <div>
      {!this.state.showSelectTicketMsg && <div style={{ border: '1px solid #E8EAED', borderRadius: '10px', paddingRight: '10px', paddingLeft: '10px', paddingTop: '5px', paddingBottom: '5px', backgroundColor: '#ffffff' }}>
        <Row>
          <Col style={{ color: '#0000008a', fontSize: '80%', textAlign: 'left', fontWeight: 700 }}>Ticket Number:</Col>
        </Row>
        <Row>
          <Col style={{ color: '#0000008a', fontSize: '90%', textAlign: 'left', fontWeight: 400, color: 'olive' }}>332565</Col>
        </Row>
        <Row style={{ marginTop: '5%' }}>
          <Col style={{ color: '#0000008a', fontSize: '80%', textAlign: 'left', fontWeight: 700 }}>Title:</Col>
        </Row>
        <Row>
          <Col style={{ color: '#0000008a', fontSize: '80%', textAlign: 'left', fontWeight: 400 }}>Need Internet connectivity to the personal device.</Col>
        </Row>
        <Row style={{ marginTop: '5%' }}>
          <Col style={{ color: '#0000008a', fontSize: '80%', textAlign: 'left', fontWeight: 700 }}>Description:</Col>
        </Row>
        <Row>
          <Col style={{ color: '#0000008a', fontSize: '80%', textAlign: 'left', fontWeight: 400 }}>Internet connectivity to personal device is requested as per project neeed.</Col>
        </Row>
        <Row style={{ marginTop: '5%' }}>
          <Col style={{ color: '#0000008a', fontSize: '80%', textAlign: 'left', fontWeight: 700 }}>Quick Look data:</Col>
        </Row>
        <Row>
          <Col style={{ color: '#0000008a', fontSize: '80%', textAlign: 'right', fontWeight: 500, paddingRight:'0' }}>Status :</Col><Col style={{ textAlign: 'left' }}><Badge color="danger">New</Badge></Col>
        </Row>
        <Row>
          <Col style={{ color: '#0000008a', fontSize: '80%', textAlign: 'right', fontWeight: 500, paddingRight:'0' }}>Priority :</Col><Col  style={{ color: '#0000008a', fontSize: '80%', textAlign: 'left', fontWeight: 400 }}>High</Col>
        </Row>
        <Row>
          <Col style={{ color: '#0000008a', fontSize: '80%', textAlign: 'right', fontWeight: 500, paddingRight:'0' }}>Open since :</Col><Col style={{ color: '#0000008a', fontSize: '80%', textAlign: 'left', fontWeight: 400 }}><Badge style={{width:'20%', height:'90%'}} color="secondary">24</Badge> Days</Col>
        </Row>
        <Row>
          <Col style={{ color: '#0000008a', fontSize: '80%', textAlign: 'right', fontWeight: 500, paddingRight:'0' }}>Department :</Col><Col style={{ color: '#0000008a', fontSize: '80%', textAlign: 'left', fontWeight: 400 }}>Network and Admin</Col>
        </Row>
        <Row>
          <Col style={{ color: '#0000008a', fontSize: '80%', textAlign: 'right', fontWeight: 500, paddingRight:'0' }}>Updated On :</Col><Col style={{ color: '#0000008a', fontSize: '80%', textAlign: 'left', fontWeight: 400 }}>28th Sep 2018</Col>
        </Row>
        <Row style={{ marginTop: '5%' }}>
          <Col style={{ color: '#0000008a', fontSize: '80%', textAlign: 'left', fontWeight: 700 }}>Attachments:</Col>
        </Row>
        <Row style={{ marginTop: '5%' }}>
          <Col style={{ color: '#0000008a', fontSize: '80%', textAlign: 'left', fontWeight: 700 }}>Conversation:</Col>
        </Row>
        <Row style={{marginTop:'4%'}}>
          <Col >
            <Card >
              <CardHeader style={{ color: '#0000008a',verticalAlign:'middle', fontSize:'80%', paddingLeft:'2%', paddingRight:'0', paddingTop:'1%', paddingBottom:'1%'}}>Naveen Kumar Anem</CardHeader>
              <CardBody style={{padding:'2%'}}>
                <CardText style={{color: '#0000008a', fontSize:'75%'}}>With supporting text below as a natural lead-in to additional content.</CardText>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row style={{marginTop:'4%'}}>
          <Col >
            <Card >
              <CardHeader style={{color: '#0000008a',verticalAlign:'middle', fontSize:'80%', paddingLeft:'2%', paddingRight:'0', paddingTop:'1%', paddingBottom:'1%'}}>Naveen Kumar Anem</CardHeader>
              <CardBody style={{padding:'2%'}}>
                <CardText style={{color: '#0000008a',fontSize:'75%'}}>With supporting text below as a natural lead-in to additional content.</CardText>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row style={{marginTop:'4%'}}>
          <Col >
            <Card >
              <CardHeader style={{color: '#0000008a',verticalAlign:'middle', fontSize:'80%', paddingLeft:'2%', paddingRight:'0', paddingTop:'1%', paddingBottom:'1%'}}>Naveen Kumar Anem</CardHeader>
              <CardBody style={{padding:'2%'}}>
                <CardText style={{color: '#0000008a',fontSize:'75%'}}>With supporting text below as a natural lead-in to additional content.</CardText>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row style={{marginTop:'4%'}}>
          <Col >
            <Card >
              <CardHeader style={{color: '#0000008a',verticalAlign:'middle', fontSize:'80%', paddingLeft:'2%', paddingRight:'0', paddingTop:'1%', paddingBottom:'1%'}}>Naveen Kumar Anem</CardHeader>
              <CardBody style={{padding:'2%'}}>
                <CardText style={{color: '#0000008a',fontSize:'75%'}}>With supporting text below as a natural lead-in to additional content.</CardText>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row style={{marginTop:'2%'}}>
          <Col style={{ textAlign: 'center' }}><Button style={{ width: '25%', paddingTop: '0', paddingBottom: '0', marginRight: '1%' }} size="sm" outline color="success">Close</Button><Button style={{ width: '25%', paddingTop: '0', paddingBottom: '0', marginLeft: '1%' }} size="sm" outline color="warning">Message</Button></Col>
        </Row>
      </div>}

      {this.state.showSelectTicketMsg && <div>Pls select a ticket to dislay the details.</div>}



      </div>
      
    );
  }
}

const mapStateToProps = function (state) {
  return {
    ticket: state.ticketDetails.ticket
  }
}

const mapActionsToProps = {
  addMessage: addMessageAPICall,
  closeTicket: closeTicketAPICall,
  downloadAttachment: downloadAttachmentAPICall,
  fetchTicketDetails: fetchTicketDetailsAPICall
}

export default connect(mapStateToProps, mapActionsToProps)(ViewTicketBundleDetailsForm);