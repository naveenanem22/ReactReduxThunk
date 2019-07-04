import React from 'react';
import { Fragment } from 'react';
import { assignAndUpdateTicketAPICall, addMessageAPICall, closeTicketAPICall, downloadAttachmentAPICall, fetchTicketDetailsAPICall, fetchAssignedTicketDetailsAPICall } from '../actions/TicketActions'
import { connect } from 'react-redux';
import { Badge, Row, Col, Container, Input, FormGroup, Label, FormText } from 'reactstrap';
import { Button, Card, CardBody, CardHeader, CardText, CardTitle } from 'reactstrap';
import { FaFilePdf, FaFileAlt, FaFileImage, FaFile } from 'react-icons/fa';
import history from '../history';
import queryString from 'query-string';
import { ScaleLoader } from 'react-spinners';
import { Role, TicketStatus } from '../masterdata/ApplicationMasterData';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'react-bootstrap-typeahead/css/Typeahead-bs4.css';
import { fetchEngineersAPICall } from '../actions/UserActions';
import SuccessAlertWithTick from '../components/SuccessAlertWithTick';
import FailureAlertWithIcon from '../components/FailureAlertWithIcon';
import { HalfCircleSpinner } from 'react-epic-spinners';
import { getURLParams } from '../util/UIUtils';
import BlankForm from '../components/BlankForm';

class ViewTicketBundleDetailsForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      id: this.props.ticket.id,
      status: '',
      comment: '',

      commentedOn: '',
      isUpload: false,
      assignedTo: '',
      showSelectTicketMsg: this.props.showSelectTicketMsg,
      isAlertSectionVisible: false,
      isAssignButtonSectionVisible: true

    };

    this.handleChange = this.handleChange.bind(this);
    this.onSubmitAddMessage = this.onSubmitAddMessage.bind(this);
    this.onFileUpload = this.onFileUpload.bind(this);
    this.onSubmitCloseTicket = this.onSubmitCloseTicket.bind(this);
    this.onClickLink = this.onClickLink.bind(this);
    this.toggleUpload = this.toggleUpload.bind(this);
    this.onAssigneeSelection = this.onAssigneeSelection.bind(this);
    this.onSubmitAssignTicket = this.onSubmitAssignTicket.bind(this);
  }

  toggleUpload() {
    this.setState({
      isUpload: !this.state.isUpload
    })
  }

  onAssigneeSelection(selectedEngineer) {
    //selectedEngineer is returned as an array rather than an object
    if (selectedEngineer.length > 0)
      this.setState({
        assignedTo: selectedEngineer[0].userName
      });
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
      commentedOn: new Date(Date.now()).toISOString(),
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
      status: TicketStatus.CLOSE,
      file1: this.state.isUpload ? prevState.file1 : undefined,
      file2: this.state.isUpload ? prevState.file2 : undefined,
      file3: this.state.isUpload ? prevState.file3 : undefined
    }), () => {
      console.log(this.state);
      this.props.closeTicket(this.state);
    });
  }

  onSubmitAssignTicket(e) {
    e.preventDefault();
    this.setState((prevState, props) => ({
      status: TicketStatus.OPEN,
      isAlertSectionVisible: true,
      isAssignButtonSectionVisible: false
    }), () => {
      this.props.assignTicket(this.props.ticket.id, {
        status: this.state.status,
        assignedTo: {
          userName: this.state.assignedTo
        }
      });
    });
  }

  onFileUpload(e) {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.files[0]
    })
  }

  componentDidMount() {
    //Extracing params from url
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
    if (localStorage.getItem('role') === Role.ROLE_MANAGER && params.ticketId) {
      this.props.fetchTicketDetails({
        ticketId: params.ticketId
      });
    }

    //Make fetchUsers with Role ENGINEER to assign stories
    if (localStorage.getItem('role') === Role.ROLE_MANAGER && params.ticketId) {
      this.props.fetchEngineers({
        roleName: Role.ROLE_ENGINEER
      });
    }

    if (localStorage.getItem('role') === Role.ROLE_ENGINEER && params.ticketId) {
      this.props.fetchAssignedTicketDetails({
        ticketId: params.ticketId
      });
    }


  }


  render() {
    console.log("Inside viewticktbundledetailsform");
    console.log(this.props);
    console.log(this.state);
    return (
      <div>
        {(this.props.fetchTicketDetailsAPICallStatus.requested
          || this.props.fetchAssignedTicketDetailsAPICallStatus.requested
        ) &&
          <div className='view-ticket-loading'>
            <ScaleLoader
              color='#00d8ff'
              loading='true'
            />
          </div>
        }
        {(this.props.fetchTicketDetailsAPICallStatus.success
          || this.props.fetchAssignedTicketDetailsAPICallStatus.success
        ) && !this.state.showSelectTicketMsg && this.props.ticket.id && <div style={{ overflowY: 'auto', overflowX: 'hidden', height: '84.5vh', border: '1px solid #E8EAED', borderRadius: '10px', paddingRight: '10px', paddingLeft: '10px', paddingTop: '5px', paddingBottom: '5px', backgroundColor: '#ffffff' }}>
            <Row>
              <Col style={{ color: '#0000008a', fontSize: '80%', textAlign: 'left', fontWeight: 700 }}>Ticket Number:</Col>
            </Row>
            <Row>
              <Col style={{ fontSize: '90%', textAlign: 'left', fontWeight: 400, color: 'olive' }}>{this.props.ticket.id}</Col>
            </Row>
            <Row style={{ marginTop: '5%' }}>
              <Col style={{ color: '#0000008a', fontSize: '80%', textAlign: 'left', fontWeight: 700 }}>Title:</Col>
            </Row>
            <Row>
              <Col style={{ fontSize: '80%', textAlign: 'left', fontWeight: 400 }}>{this.props.ticket.title}</Col>
            </Row>
            <Row style={{ marginTop: '5%' }}>
              <Col style={{ color: '#0000008a', fontSize: '80%', textAlign: 'left', fontWeight: 700 }}>Description:</Col>
            </Row>
            <Row>
              <Col style={{ fontSize: '80%', textAlign: 'left', fontWeight: 400 }}>{this.props.ticket.description}</Col>
            </Row>
            <Row style={{ marginTop: '5%' }}>
              <Col style={{ color: '#0000008a', fontSize: '80%', textAlign: 'left', fontWeight: 700 }}>Quick Look data:</Col>
            </Row>
            <Row>
              <Col style={{ color: '#0000008a', fontSize: '80%', textAlign: 'right', fontWeight: 500, paddingRight: '0' }}>Status :</Col><Col style={{ textAlign: 'left' }}><Badge color="danger">{this.props.ticket.status.toUpperCase()}</Badge></Col>
            </Row>
            <Row>
              <Col style={{ color: '#0000008a', fontSize: '80%', textAlign: 'right', fontWeight: 500, paddingRight: '0' }}>Priority :</Col><Col style={{ fontSize: '80%', textAlign: 'left', fontWeight: 400 }}>{this.props.ticket.priority}</Col>
            </Row>
            <Row>
              <Col style={{ color: '#0000008a', fontSize: '80%', textAlign: 'right', fontWeight: 500, paddingRight: '0' }}>Open since :</Col><Col style={{ fontSize: '80%', textAlign: 'left', fontWeight: 400 }}><Badge style={{ width: '20%', height: '90%' }} color="secondary">24</Badge> Days</Col>
            </Row>
            <Row>
              <Col style={{ color: '#0000008a', fontSize: '80%', textAlign: 'right', fontWeight: 500, paddingRight: '0' }}>Department :</Col><Col style={{ fontSize: '80%', textAlign: 'left', fontWeight: 400 }}>{this.props.ticket.department.name}</Col>
            </Row>
            <Row>
              <Col style={{ color: '#0000008a', fontSize: '80%', textAlign: 'right', fontWeight: 500, paddingRight: '0' }}>Updated On :</Col><Col style={{ fontSize: '80%', textAlign: 'left', fontWeight: 400 }}>{this.props.ticket.updatedDate}</Col>
            </Row>
            <Row style={{ marginTop: '5%' }}>
              <Col style={{ color: '#0000008a', fontSize: '80%', textAlign: 'left', fontWeight: 700 }}>Attachments:</Col>
            </Row>
            <Row style={{ marginTop: '5%' }}>
              <Col style={{ color: '#0000008a', fontSize: '80%', textAlign: 'left', fontWeight: 700 }}>Conversation:</Col>
            </Row>
            {this.props.ticket.ticketHistory.map((historyItem) => <Row style={{ marginTop: '4%' }}>
              <Col >
                <Card >
                  <CardHeader style={{ color: '#0000008a', verticalAlign: 'middle', fontSize: '80%', paddingLeft: '2%', paddingRight: '0', paddingTop: '1%', paddingBottom: '1%' }}>{historyItem.authorName}</CardHeader>
                  <CardBody style={{ padding: '2%' }}>
                    <CardText style={{ fontSize: '75%' }}>{historyItem.comment}</CardText>
                  </CardBody>
                </Card>
              </Col>
            </Row>)}
            {localStorage.getItem('role') === Role.ROLE_ENGINEER &&
              <div>
                <Row style={{ marginTop: '5%' }}>
                  <Col style={{ color: '#0000008a', fontSize: '80%', textAlign: 'left', fontWeight: 700 }}>Engineer Action:</Col>
                </Row>
                <Row>
                  <Col>
                    <Input style={{ marginTop: '2%', fontSize: '70%' }} type="textarea" name="text" id="exampleText" />
                  </Col>

                </Row>
                {this.state.isUpload && <Row>
                  <Col>
                    <Label size='sm' style={{ fontSize: '70%', marginBottom: '0' }} for="attachments">Attachments</Label>
                    <Input style={{ fontSize: '70%' }} size='sm' type="file" name="file1" id="file1" onChange={this.onFileUpload} />
                    <Input style={{ fontSize: '70%' }} size='sm' type="file" name="file2" id="file2" onChange={this.onFileUpload} />
                    <Input style={{ fontSize: '70%' }} size='sm' type="file" name="file3" id="file3" onChange={this.onFileUpload} />
                  </Col>
                </Row>}
                <Row>
                  <Col size='auto' style={{ textAlign: 'left' }}>
                    <Button
                      style={{ fontSize: '70%', width: '90%', paddingTop: '0', paddingBottom: '0', marginRight: '1%' }}
                      onClick={this.toggleUpload}
                      type="submit"
                      outline
                      color="secondary"
                      size="sm"
                    >Files</Button>
                  </Col>
                  <Col size='auto' style={{ textAlign: 'center' }}>
                    <Button
                      style={{ fontSize: '70%', width: '90%', paddingTop: '0', paddingBottom: '0', marginRight: '1%' }} size="sm"
                      outline
                      color="success">Close</Button>
                  </Col>

                  <Col size='auto' style={{ textAlign: 'center' }}>
                    <Button
                      style={{ fontSize: '70%', width: '90%', paddingTop: '0', paddingBottom: '0', marginLeft: '1%' }}
                      size="sm"
                      outline
                      color="warning">Message</Button>
                  </Col>
                </Row>


              </div>
            }
            {localStorage.getItem('role') === Role.ROLE_MANAGER &&
              (getURLParams().cioKey === 'AST') &&

              <div>
                {this.state.isAssignButtonSectionVisible &&
                  <div>
                    <Row style={{ marginTop: '5%' }}>
                      <Col style={{ color: '#0000008a', fontSize: '80%', textAlign: 'left', fontWeight: 700 }}>Assigned To:</Col>
                    </Row>
                    <Row style={{ marginTop: '2%' }}>
                      <Col size='auto' style={{ textAlign: 'center' }}>
                        <Fragment>
                          <Typeahead
                            disabled={this.props.assignAndUpdateTicketAPICallStatus.requested}
                            onChange={(selectedOption) => this.onAssigneeSelection(selectedOption)}
                            bsSize='small'
                            labelKey={option => `${option.firstName} ${option.lastName}`}
                            dropup={true}
                            options={this.props.engineers}
                            /* options={[{ firstName: 'Art', lastName: 'Blakey', userName: 'art.blakey@pmapi.com' },
                            { firstName: 'Jimmy', lastName: 'Cobb', userName: 'jimmy.cobb@pmapi.com' },
                            { firstName: 'Elvin', lastName: 'Jones', userName: 'elvin.jones@pmapi.com' },
                            { firstName: 'Max', lastName: 'Roach', userName: 'max.roach@pmapi.com' },
                            { firstName: 'Tony', lastName: 'Williams', userName: 'tony.williams@pmapi.com' }]} */
                            placeholder="Choose an Engineer..."
                          />
                        </Fragment>
                      </Col>

                    </Row>
                  </div>}
                {this.state.isAssignButtonSectionVisible &&
                  (localStorage.getItem('role') === Role.ROLE_MANAGER) &&
                  (getURLParams().cioKey === 'AST') &&

                  <Row style={{ marginTop: '2%' }}>
                    <Col sm='12'
                      style={{ textAlign: 'center' }}>
                      <Button
                        disabled={false}
                        onClick={this.onSubmitAssignTicket}
                        style={{
                          paddingTop: '0',
                          paddingBottom: '0'
                        }} size="sm" outline color="success">Assign</Button>
                    </Col>
                  </Row>}
                {this.props.assignAndUpdateTicketAPICallStatus.requested
                  && <Row style={{ marginTop: '2%' }}>
                    <Col sm='8'
                      style={{ textAlign: 'right' }}>
                      <Button
                        disabled={true}
                        onClick={this.onSubmitAssignTicket}
                        style={{
                          paddingTop: '0',
                          paddingBottom: '0',
                          marginRight: '1%'
                        }} size="sm" outline color="success">Assigning...</Button>
                    </Col>
                    <Col sm='4' style={{
                      paddingTop: '2%',
                      paddingLeft: '0px'
                    }}>
                      <HalfCircleSpinner
                        color='green'
                        size='20'>

                      </HalfCircleSpinner>
                    </Col>
                  </Row>}
                {this.state.isAlertSectionVisible
                  &&
                  this.props.assignAndUpdateTicketAPICallStatus.success
                  && <Row style={{ marginTop: '2%' }}>
                    <Col
                      style={{ textAlign: 'center' }}>
                      <SuccessAlertWithTick>
                      </SuccessAlertWithTick>
                    </Col>
                  </Row>}
                {this.state.isAlertSectionVisible
                  &&
                  this.props.assignAndUpdateTicketAPICallStatus.error
                  && <Row style={{ marginTop: '2%' }}>
                    <Col
                      style={{ textAlign: 'center' }}>
                      <FailureAlertWithIcon>
                      </FailureAlertWithIcon>
                    </Col>
                  </Row>}
              </div>}
          </div>}

        {this.state.showSelectTicketMsg && <BlankForm></BlankForm>}



      </div>

    );
  }
}

const mapStateToProps = function (state) {
  return {
    ticket: state.ticketDetails.ticket,
    engineers: state.engineerList.engineers,
    fetchTicketDetailsAPICallStatus: state.serviceCallStatus.fetchTicketDetailsAPI,
    fetchAssignedTicketDetailsAPICallStatus: state.serviceCallStatus.fetchAssignedTicketDetailsAPI,
    fetchEngineersAPICallStatus: state.serviceCallStatus.fetchEngineersAPI,
    assignAndUpdateTicketAPICallStatus: state.serviceCallStatus.assignAndUpdateTicketAPI

  }
}

const mapActionsToProps = {
  addMessage: addMessageAPICall,
  closeTicket: closeTicketAPICall,
  downloadAttachment: downloadAttachmentAPICall,
  fetchTicketDetails: fetchTicketDetailsAPICall,
  fetchAssignedTicketDetails: fetchAssignedTicketDetailsAPICall,
  assignTicket: assignAndUpdateTicketAPICall,
  fetchEngineers: fetchEngineersAPICall
}

export default connect(mapStateToProps, mapActionsToProps)(ViewTicketBundleDetailsForm);