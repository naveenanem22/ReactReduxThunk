import React from 'react';
import { addMessageAPICall, closeTicketAPICall, downloadAttachmentAPICall, fetchCreatedTicketDetailsAPICall } from '../actions/TicketActions'
import { connect } from 'react-redux';
import { UncontrolledTooltip, CardText, Badge, Alert, Button, Row, Form, Col, Container, Input, FormGroup, Label, FormText } from 'reactstrap';
import { Table, NavLink } from 'reactstrap';
import { FaFilePdf, FaFileAlt, FaFileImage, FaFile, FaExclamationCircle } from 'react-icons/fa';
import { loadFileIcon, getTicketStatusColorCode, getTicketPriorityColorCode } from '../util/UIUtils';
import { fetchTicketDetailsAPICall } from '../actions/TicketActions'
import { ScaleLoader } from 'react-spinners';
import history from '../history';
import queryString from 'query-string';
import { Role, TicketStatus, PAGINATION_START_PAGE, TICKETS_PER_PAGE_EMPLOYEE, glbHexColorCodes } from '../masterdata/ApplicationMasterData';
import { componentInfoObj, glbColorCodes, applicationMessages } from '../masterdata/ApplicationMasterData';
import { HalfCircleSpinner } from 'react-epic-spinners';
import CustomAlert from '../components/CustomAlert';
import { getLocalTimeStamp, timeAgo } from '../util/CalendarUtil';




class ViewTicketDetailsForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      id: this.props.ticket.id,
      status: '',
      comment: '',
      isCommentInvalid: false,

      commentedOn: '',
      isUpload: false,
      isViewTicketDetailsSectionVisible: true,
      isAlertSectionVisible: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.onSubmitAddMessage = this.onSubmitAddMessage.bind(this);
    this.onFileUpload = this.onFileUpload.bind(this);
    this.onSubmitCloseTicket = this.onSubmitCloseTicket.bind(this);
    this.onClickLink = this.onClickLink.bind(this);
    this.toggleUpload = this.toggleUpload.bind(this);
    this.onDismissAlert = this.onDismissAlert.bind(this);
    this.handleCommentChange = this.handleCommentChange.bind(this);

  }

  onDismissAlert() {

    switch (localStorage.getItem('role')) {
      case Role.ROLE_EMPLOYEE:
        history.push({
          pathname: '/ticketing/tickets',
          search: '?status=' + TicketStatus.ALL + '&' +
            'cioKey=ALT' + '&' +
            'pageNumber=' + PAGINATION_START_PAGE + '&' + 'pageSize=' + TICKETS_PER_PAGE_EMPLOYEE
        });
        break;

      case Role.ROLE_ENGINEER:
        history.push("/ticketmaint/tickets?status=all");
        break;

      default:
        break;
    }

  }

  toggleUpload() {
    this.setState({
      isUpload: !this.state.isUpload
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

  handleCommentChange(e) {
    this.setState({
      comment: e.target.value,
      isCommentInvalid: false
    })
  }

  onSubmitAddMessage(e) {
    e.preventDefault();
    //Validate the comment is not empty while adding a message to the ticket
    if (this.state.comment === '') {
      this.setState({
        isCommentInvalid: true
      })
    }
    else
      this.setState((prevState, props) => ({
        id: this.props.ticket.id,
        commentedOn: new Date(Date.now()).toISOString(),
        file1: this.state.isUpload ? prevState.file1 : undefined,
        file2: this.state.isUpload ? prevState.file2 : undefined,
        file3: this.state.isUpload ? prevState.file3 : undefined,

        //isViewTicketDetailsSectionVisible: false,
        isAlertSectionVisible: true
      }), () => {
        this.props.addMessage(this.state);
      });

  }

  onSubmitCloseTicket(e) {
    e.preventDefault();

    //Validate the comment is not empty while closing the ticket
    if (this.state.comment === '') {
      this.setState({
        isCommentInvalid: true
      })
    }
    else
      this.setState((prevState, props) => ({
        commentedOn: new Date(Date.now()).toISOString(),
        status: TicketStatus.CLOSE,
        file1: this.state.isUpload ? prevState.file1 : undefined,
        file2: this.state.isUpload ? prevState.file2 : undefined,
        file3: this.state.isUpload ? prevState.file3 : undefined,
        id: this.props.ticket.id,

        //isViewTicketDetailsSectionVisible: false,
        isAlertSectionVisible: true
      }), () => {
        this.props.closeTicket(this.state);
      });
  }

  onFileUpload(e) {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.files[0]
    })
  }

  componentDidUpdate(prevProps) {
    //Comparing previous and current props to make the ViewTicketDetailsForm hide or visible.
    if (this.props.addMessageAPICallStatus.success === true &&
      this.props.addMessageAPICallStatus.success !== prevProps.addMessageAPICallStatus.success) {
      this.setState({
        isViewTicketDetailsSectionVisible: false
      });
    }

    if (this.props.addMessageAPICallStatus.error === true &&
      this.props.addMessageAPICallStatus.error !== prevProps.addMessageAPICallStatus.error) {
      this.setState({
        isViewTicketDetailsSectionVisible: false
      });
    }

    if (this.props.closeTicketAPICallStatus.success === true &&
      this.props.closeTicketAPICallStatus.success !== prevProps.closeTicketAPICallStatus.success) {
      this.setState({
        isViewTicketDetailsSectionVisible: false
      });
    }

    if (this.props.closeTicketAPICallStatus.error === true &&
      this.props.closeTicketAPICallStatus.error !== prevProps.closeTicketAPICallStatus.error) {
      this.setState({
        isViewTicketDetailsSectionVisible: false
      });
    }



  }

  componentDidMount() {
    //Making service call to fetch Ticket Details based on the key available in the URL or Route
    //Extracing params from url
    console.log("Search string: ");
    var searchString = history.location.search;
    console.log(searchString);
    var params = queryString.parse(searchString);
    console.log("Extracted params: ");
    console.log(params);

    //Make fetchTicketDetailsAPICall if the search-string contains key: ticketId
    if (params.ticketId) {
      switch (localStorage.getItem('role')) {
        case Role.ROLE_MANAGER:
          this.props.fetchCreatedTicketDetails({
            ticketId: params.ticketId
          });
          break;
        case Role.ROLE_EMPLOYEE:
          this.props.fetchCreatedTicketDetails({
            ticketId: params.ticketId
          });
          break;
        default:
          break;

      }

    }


    /* console.log(this.props);
    const queryParams = new URLSearchParams(this.props.location.search);
    const ticketId = queryParams.get('ticketId');

    this.props.fetchTicketDetails({
      ticketId: 11
    }); */

  }
  render() {
    console.log("viewticketdteialsform render");
    console.log(this.props);
    const ticket = this.props.ticket;
    //Processing ttsKey to fetch Form Title and SubTitle data
    const params = queryString.parse(history.location.search);

    const title = params.cioKey ? componentInfoObj.getInfo(params.cioKey).title : componentInfoObj.getDefaultInfo().title;
    const subTitle = params.cioKey ? componentInfoObj.getInfo(params.cioKey).subTitle : componentInfoObj.getDefaultInfo().subTitle;

    return (

      <div style={{ marginLeft: '1%', marginRight: '1%' }}>
        {this.state.isViewTicketDetailsSectionVisible && <div>
          <Container style={{ marginTop: '3%' }}>
            <Row style={{ textAlign: 'left' }}>
              <h4>{title}</h4>
            </Row>
            <Row style={{ textAlign: 'left' }}>
              <p>{subTitle}</p>
            </Row>
          </Container>
          <hr style={{
            marginBottom: '2%'
          }} />
          {(this.props.fetchTicketDetailsAPICallStatus.requested
            || this.props.fetchCreatedTicketDetailsAPICallStatus.requested)
            && <div className='view-ticket-loading'>
              <ScaleLoader
                color='#00d8ff'
                loading='true'
              />
            </div>}
          {(this.props.fetchTicketDetailsAPICallStatus.success ||
            this.props.fetchCreatedTicketDetailsAPICallStatus.success)
            && <div class="ticket-details-body">

              <Row>
                <Col sm={6} style={{ 'text-align': 'left', 'padding-top': '.75rem' }}>
                  <Label size='sm' style={{
                    margin: '0'
                  }}>{ticket.createdBy.firstName + ' ' + ticket.createdBy.lastName}</Label>
                </Col>
                <Col sm={6} style={{ 'text-align': 'right', 'padding-top': '.75rem' }}>
                  <Label size='sm' style={{
                    paddingRight: '1%',
                    margin: '0'
                  }}>{getLocalTimeStamp(ticket.createdDate) + ' '}</Label>

                  <span id='createdDateToolTip' href='#'>
                    <FaExclamationCircle style={{
                      marginBottom: '1%'
                    }}></FaExclamationCircle></span>
                </Col>
                <UncontrolledTooltip placement="right" target="createdDateToolTip">
                  Created Date
              </UncontrolledTooltip>
              </Row>

              <Row>
                <Col sm={12}><h6>{ticket.title}</h6></Col>
              </Row>
              <hr />
              <Row>
                <Col style={{ 'text-align': 'left', 'padding-top': '.30rem' }}>
                  <Badge color={getTicketStatusColorCode(ticket.status)}>{ticket.status}</Badge>

                </Col>
                <Col style={{ 'text-align': 'left', 'padding-top': '.30rem' }}>
                  <Label size='sm' style={{
                    paddingRight: '1%'
                  }}>Updated:</Label>
                  <Label size='sm'>{getLocalTimeStamp(ticket.updatedDate)}</Label>
                </Col>
                <Col style={{ 'text-align': 'right', 'padding-top': '.30rem' }}>
                  <Label size='sm' style={{
                    paddingRight:'2%'
                  }}>Ticket ID:</Label>
                  <Badge style={{
                    backgroundColor: glbHexColorCodes.TYRIANPURPLE
                  }}>{ticket.id}</Badge>
                </Col>
              </Row>
              <hr />
              <Row>
                <Col sm={12}><Label size='sm'>{ticket.description}</Label></Col>
              </Row>
              <hr />

              <div class="ticket-table-summary">
                <Table bordered size="sm">

                  <tbody>
                    <tr >
                      <td style={{ width: '20%' }}>
                        <Label size='sm' style={{
                          margin: '0', padding: '0',
                          fontWeight: '600'
                        }}>Category:
                        </Label>
                      </td>
                      <td ><Label size='sm' style={{
                        margin: '0', padding: '0',
                        fontStyle: 'italic'
                      }}>{ticket.serviceCategory}
                      </Label></td>
                    </tr>
                    <tr>
                      <td>
                        <Label size='sm' style={{
                          margin: '0', padding: '0',
                          fontWeight: '600'
                        }}>Priority:
                        </Label></td>

                      <td>
                        <Label size='sm' style={{
                          margin: '0', padding: '0'
                        }}><Badge color={getTicketPriorityColorCode(ticket.priority)}>
                        {ticket.priority}</Badge>
                        </Label>
                      </td>
                    </tr>
                    <tr>
                      <td> <Label size='sm' style={{
                        margin: '0', padding: '0',
                        fontWeight: '600'
                      }}>Department:
                        </Label></td>
                      <td >
                        <Label size='sm' style={{
                          margin: '0', padding: '0',
                          fontStyle: 'italic'
                        }}>{ticket.department.name}
                        </Label></td>
                    </tr>
                    <tr>
                      <td> <Label size='sm' style={{
                        margin: '0', padding: '0',
                        fontWeight: '600'
                      }}>Office:
                        </Label></td>
                      <td >
                        <Label size='sm' style={{
                          margin: '0', padding: '0',
                          fontStyle: 'italic'
                        }}>{ticket.officeLocation}
                        </Label>
                      </td>
                    </tr>
                    <tr>
                      <td> <Label size='sm' style={{
                        margin: '0', padding: '0',
                        fontWeight: '600'
                      }}>Service Type:
                        </Label>
                      </td>
                      <td >
                        <Label size='sm' style={{
                          margin: '0', padding: '0',
                          fontStyle: 'italic'
                        }}>{ticket.ticketType}
                        </Label>
                      </td>
                    </tr>

                  </tbody>
                </Table>
              </div>

              {/* Single Add-Conversation-block when there is no history*/}
              {(ticket.ticketHistory.length === 0
                && ticket.status !== TicketStatus.CLOSE)
                &&
                <div>
                  <Row style={{ 'height': '8%', 'width': '99%', 'marginLeft': '1%' }}>
                    <Col >
                      <FormGroup>
                        <Input invalid={this.state.isCommentInvalid} size='sm' type="textarea" name="comment" id="comment" onChange={this.handleCommentChange} />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row style={{ 'height': '8%', 'width': '99%', 'marginLeft': '1%', 'marginTop': '1%' }}>
                    <Col>
                      <Button onClick={this.toggleUpload}
                        type="submit"
                        outline
                        color="secondary"
                        size="sm"
                      >Attach Files</Button>
                    </Col>
                    <Col style={{ 'text-align': 'right' }}>
                      <Button type="submit" color="link" size="sm" onClick={this.onSubmitCloseTicket}>
                        Close Ticket</Button>or
                 <Button type="submit" color="info" size="sm" style={{ 'marginLeft': '2%' }} onClick={this.onSubmitAddMessage}>
                        Add Message</Button>
                    </Col>
                  </Row>
                  {this.state.isUpload && <Row>
                    <FormGroup style={{ 'width': '90%', 'paddingLeft': '5%', 'paddingTop': '2%' }}>
                      <Label size='sm' for="attachments">Attachments</Label>
                      <Input size='sm' type="file" name="file1" id="file1" onChange={this.onFileUpload} />
                      <Input size='sm' type="file" name="file2" id="file2" onChange={this.onFileUpload} />
                      <Input size='sm' type="file" name="file3" id="file3" onChange={this.onFileUpload} />
                      <FormText color="muted">
                        Any files that can assist the corresponding team to resolve the issues at the earliest.
          </FormText>
                    </FormGroup>

                  </Row>}

                </div>}

              {/* Add-Conversation-block only in the first message block of the history when the history is present*/}
              {ticket.ticketHistory.map((item) =>
                <div class="ticket-conv-block" >
                  <div class="author">
                    <Row style={{ 'height': '50px' }}>
                      <Col sm={6} style={{ 'text-align': 'left', 'paddingLeft': '3%', 'padding-top': '.75rem', 'padding-bottom': '.75rem' }}>
                        <Label size='sm' style={{
                          margin: '0', padding: '0'
                        }}>
                          {item.author.firstName + ' ' + item.author.lastName}</Label>

                      </Col>
                      <Col sm={6} style={{
                        'text-align': 'right',
                        'paddingRight': '3%',
                        'padding-top': '.75rem',
                        'padding-bottom': '.75rem'
                      }}>
                        <CardText>
                          <small className="text-muted">{timeAgo(getLocalTimeStamp(item.commentedOn))}</small>
                        </CardText>
                      </Col>
                    </Row>
                  </div>
                  <hr />

                  <div class="message" style={{ 'paddingBottom': '1%' }}>
                    <Row >
                      <Col style={{ 'paddingLeft': '3%' }}>
                        <Label size='sm' style={{
                          margin: '0', padding: '0'
                        }}>{item.comment}
                        </Label>
                      </Col>
                    </Row>
                    {(item.attachments.length > 0) && <Row style={{ 'marginBottom': '3px', 'paddingLeft': '2%', 'paddingRight': '0%' }}>Attachment(s):</Row>}
                    {(item.attachments.length > 0) && item.attachments.map((attachment) =>
                      <Row style={{ 'marginBottom': '3px', 'paddingLeft': '2%', 'paddingRight': '0%' }}>
                        <Col ><NavLink style={{ padding: '0%' }} onClick={this.onClickLink} href="#">{loadFileIcon(attachment.fileType)}<code style={{ 'color': '#c7254e' }}>{attachment.name}</code></NavLink></Col>
                      </Row>)}
                    {(ticket.ticketHistory.indexOf(item) === 0
                      &&
                      ticket.status !== TicketStatus.CLOSE
                    ) &&
                      <div>
                        <Row style={{ 'height': '8%', 'width': '99%', 'marginLeft': '1%' }}>
                          <Col >
                            <Input invalid={this.state.isCommentInvalid} size='sm' type="textarea" name="comment" id="comment" onChange={this.handleCommentChange} />
                          </Col>
                        </Row>

                        <Row style={{ 'height': '8%', 'width': '99%', 'marginLeft': '1%', 'marginTop': '1%' }}>
                          <Col>
                            <Button onClick={this.toggleUpload}
                              type="submit"
                              outline
                              color="secondary"
                              size="sm"
                            >Attach Files</Button>
                          </Col>
                          {this.props.closeTicketAPICallStatus.requested
                            && <Col sm='auto' style={{
                              textAlign: 'right',
                              paddingTop: '1%',
                              paddingRight: '0'
                            }}>
                              <HalfCircleSpinner
                                size='20'
                                color='blue'>
                              </HalfCircleSpinner>
                            </Col>}
                          <Col sm='auto' style={{
                            paddingLeft: '0',
                            paddingRight: '0'
                          }}>
                            <Button disabled={this.props.closeTicketAPICallStatus.requested}
                              type="submit"
                              color="link"
                              size="sm"
                              onClick={this.onSubmitCloseTicket}>
                              Close Ticket</Button>
                          </Col>

                          <Col sm='auto' style={{
                            paddingTop: '0.7%',
                            paddingLeft: '0',
                            paddingRight: '0'
                          }}>
                            or
                        </Col>
                          {this.props.addMessageAPICallStatus.requested
                            && <Col sm='auto' style={{
                              textAlign: 'right',
                              paddingTop: '1%',
                              paddingRight: '0'
                            }}>
                              <HalfCircleSpinner
                                size='20'
                                color='blue'>
                              </HalfCircleSpinner>
                            </Col>}

                          <Col sm='auto'>
                            <Button
                              type="submit"
                              color="info"
                              size="sm"
                              disabled={this.props.addMessageAPICallStatus.requested}
                              style={{ 'marginLeft': '2%' }}
                              onClick={this.onSubmitAddMessage}>
                              Add Message</Button>
                          </Col>
                        </Row>
                        {this.state.isUpload && <Row>
                          <FormGroup style={{ 'width': '90%', 'paddingLeft': '5%', 'paddingTop': '2%' }}>
                            <Label size='sm' for="attachments">Attachments</Label>
                            <Input size='sm' type="file" name="file1" id="file1" onChange={this.onFileUpload} />
                            <Input size='sm' type="file" name="file2" id="file2" onChange={this.onFileUpload} />
                            <Input size='sm' type="file" name="file3" id="file3" onChange={this.onFileUpload} />
                            <FormText color="muted">
                              Any files that can assist the corresponding team to resolve the issues at the earliest.
          </FormText>
                          </FormGroup>

                        </Row>}

                      </div>}

                  </div>

                </div>
              )}

            </div>
          }
        </div>}
        {this.state.isAlertSectionVisible &&
          <div>
            {(this.props.closeTicketAPICallStatus.success ||
              this.props.addMessageAPICallStatus.success)
              && <div>
                <CustomAlert data={{
                  alertColor: glbColorCodes.SUCCESS,
                  isOpen: true,
                  messageHeader: applicationMessages.messageHeaders.TICKET_UPDATE_SUCCESS,
                  detailedMessage: applicationMessages.successMessages.TICKET_UPDATE_SUCCESS,
                  defaultFooterMessage: applicationMessages.defaultFooterMessages.TICKET_UPDATE_SUCCESS
                }} toggle={this.onDismissAlert} >

                </CustomAlert>
              </div>}

            {(this.props.closeTicketAPICallStatus.error ||
              this.props.addMessageAPICallStatus.error)
              && <div>
                <Alert color="danger" isOpen={true} toggle={this.onDismissAlert}>
                  <h4 className="alert-heading">Failure!</h4>
                  <p>
                    Update ticket failed. Please try again after sometime.
        </p>
                  <hr />
                  <p className="mb-0">
                    Please try again after sometime.
        </p>
                </Alert>
              </div>}
          </div>}

      </div>
    );
  }
}

const mapStateToProps = function (state) {
  return {
    ticket: state.ticketDetails.ticket,
    fetchTicketDetailsAPICallStatus: state.serviceCallStatus.fetchTicketDetailsAPI,
    fetchCreatedTicketDetailsAPICallStatus: state.serviceCallStatus.fetchCreatedTicketDetailsAPI,
    addMessageAPICallStatus: state.serviceCallStatus.addMessageAPI,
    closeTicketAPICallStatus: state.serviceCallStatus.closeTicketAPI
  }
}

const mapActionsToProps = {
  addMessage: addMessageAPICall,
  closeTicket: closeTicketAPICall,
  downloadAttachment: downloadAttachmentAPICall,
  fetchTicketDetails: fetchTicketDetailsAPICall,
  fetchCreatedTicketDetails: fetchCreatedTicketDetailsAPICall
}

export default connect(mapStateToProps, mapActionsToProps)(ViewTicketDetailsForm);