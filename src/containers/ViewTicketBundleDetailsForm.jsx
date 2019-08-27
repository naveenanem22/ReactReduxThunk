import React from 'react';
import { Fragment } from 'react';
import { assignAndUpdateTicketAPICall, messageAndUpdateTicketAPICall, closeAndUpdateTicketAPICall, downloadAttachmentAPICall, fetchTicketDetailsAPICall, fetchAssignedTicketDetailsAPICall } from '../actions/TicketActions'
import { connect } from 'react-redux';
import { Badge, Row, Col, NavLink, Input, FormGroup, Label, FormText } from 'reactstrap';
import { Spinner, Button, Card, CardBody, CardHeader, CardText, CardTitle, CardFooter } from 'reactstrap';
import { FaFilePdf, FaFileAlt, FaFileImage, FaFile } from 'react-icons/fa';
import history from '../history';
import queryString from 'query-string';
import { ScaleLoader } from 'react-spinners';
import { Role, TicketStatus, Priority, PriorityArrary } from '../masterdata/ApplicationMasterData';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'react-bootstrap-typeahead/css/Typeahead-bs4.css';
import { fetchEngineersAPICall } from '../actions/UserActions';
import SuccessAlertWithTick from '../components/SuccessAlertWithTick';
import FailureAlertWithIcon from '../components/FailureAlertWithIcon';
import { HalfCircleSpinner } from 'react-epic-spinners';
import { getURLParams, getTicketStatusColorCode } from '../util/UIUtils';
import BlankForm from '../components/BlankForm';
import SuccessToast from '../components/SuccessToast';
import { timeUtil, calendarUtil } from '../util/CalendarUtil';
import { uiUtil } from '../util/UIUtils';

class ViewTicketBundleDetailsForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      id: this.props.ticket.id,
      status: '',
      comment: '',
      isCommentInvalid: false,
      isAssignedToInvalid: false,
      isPriorityInvalid: false,
      isDepartmentInvalid: false,
      isAssignButtonDisabled: true,
      commentedOn: '',
      isUpload: false,
      assignedTo: '',
      isSelectTicketMsgVisibleInit: true,
      isAlertSectionVisibleInit: false,
      isTicketDetailsSectionVisibleInit: false,
      priority: '',
      department: {
        name: ''
      }

    };

    this.handleChange = this.handleChange.bind(this);
    this.onSubmitAddMessage = this.onSubmitAddMessage.bind(this);
    this.onFileUpload = this.onFileUpload.bind(this);
    this.onSubmitCloseTicket = this.onSubmitCloseTicket.bind(this);
    this.onClickLink = this.onClickLink.bind(this);
    this.toggleUpload = this.toggleUpload.bind(this);
    this.onAssigneeSelection = this.onAssigneeSelection.bind(this);
    this.onSubmitAssignTicket = this.onSubmitAssignTicket.bind(this);
    this.onPrioritySelection = this.onPrioritySelection.bind(this);
    this.onDepartmentSelection = this.onDepartmentSelection.bind(this);
    this.handleCommentChange = this.handleCommentChange.bind(this);
    this.getAssignedTo = this.getAssignedTo.bind(this);
  }

  getAssignedTo() {
    return this.props.ticket.assignedTo ? `${this.props.ticket.assignedTo.firstName} ${this.props.ticket.assignedTo.lastName}` : 'Unassigned';
  }

  handleCommentChange(e) {
    this.setState({
      comment: e.target.value,
      isCommentInvalid: false
    })
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
        assignedTo: selectedEngineer[0].userName,
        isAssignButtonDisabled: false
      });
  }

  onPrioritySelection(selectedPriority) {
    //selectedPriority is returned as an array rather than an object

    if (selectedPriority.length > 0)
      this.setState({
        priority: selectedPriority[0].name,
        isAssignButtonDisabled: false
      })
  }

  onDepartmentSelection(selectedDepartment) {
    //selectedDepartment is returned as an array rather than an object
    if (selectedDepartment.length > 0)
      this.setState({
        department: {
          name: selectedDepartment[0].name,
          isAssignButtonDisabled: false
        }
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
      commentedOn: new Date(Date.now()).toISOString(),
      isAlertSectionVisibleInit: true,
      file1: this.state.isUpload ? prevState.file1 : undefined,
      file2: this.state.isUpload ? prevState.file2 : undefined,
      file3: this.state.isUpload ? prevState.file3 : undefined
    }), () => {
      console.log(this.state);
      var params = {};
      if (this.state.comment)
        params.comment = this.state.comment;

      if (this.state.isUpload && (this.state.file1 || this.state.file2 || this.state.file3)) {
        params.file1 = this.state.file1;
        params.file2 = this.state.file2;
        params.file3 = this.state.file3;
      }

      if (this.state.commentedOn)
        params.commentedOn = this.state.commentedOn;

      params.id = this.props.ticket.id;

      var queryParams = {};
      if (localStorage.getItem('role') === Role.ROLE_MANAGER)
        queryParams.managedByMe = true;

      this.props.addMessage(params, queryParams);
    });



  }

  onSubmitCloseTicket(e) {
    e.preventDefault();

    this.setState((prevState, props) => ({
      commentedOn: new Date(Date.now()).toISOString(),
      status: TicketStatus.CLOSE,
      isAlertSectionVisibleInit: true,
      file1: this.state.isUpload ? prevState.file1 : undefined,
      file2: this.state.isUpload ? prevState.file2 : undefined,
      file3: this.state.isUpload ? prevState.file3 : undefined
    }), () => {
      console.log(this.state);
      var params = {};
      if (this.state.status)
        params.status = this.state.status;
      if (this.state.comment)
        params.comment = this.state.comment;

      if (this.state.isUpload && (this.state.file1 || this.state.file2 || this.state.file3)) {
        params.file1 = this.state.file1;
        params.file2 = this.state.file2;
        params.file3 = this.state.file3;
      }

      if (this.state.commentedOn)
        params.commentedOn = this.state.commentedOn;

      params.id = this.props.ticket.id;

      var queryParams = {};
      if (localStorage.getItem('role') === Role.ROLE_MANAGER)
        queryParams.managedByMe = true;

      this.props.closeTicket(params, queryParams);
    });
  }

  onSubmitAssignTicket(e) {
    e.preventDefault();
    this.setState((prevState, props) => ({
      status: TicketStatus.OPEN,
      isAlertSectionVisibleInit: true
      //isTicketDetailsSectionVisibleInit: false
    }), () => {

      var params = {};
      params.status = this.state.status;
      if (this.state.assignedTo &&
        this.state.assignedTo.userName !== this.props.ticket.assignedTo.userName)
        params.assignedTo = this.state.assignedTo

      if (this.state.status)
        params.status = this.state.status;

      if (this.state.priority &&
        this.state.priority !== this.props.ticket.priority)
        params.priority = this.state.priority

      if (this.state.department.name &&
        this.state.department.name !== this.props.ticket.department.name)
        params.departmentName = this.state.department.name

      params.id = this.props.ticket.id;
      var queryParams = {};
      if (localStorage.getItem('role') === Role.ROLE_MANAGER)
        queryParams.managedByMe = true;

      console.log("params before call");
      console.log(params);
      if (params.assignedTo || params.priority || params.departmentName) {
        console.log("params inside making call:");
        console.log(params);
        //this.props.assignTicket(params, queryParams);
      }
    });
  }

  onFileUpload(e) {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.files[0]
    })
  }

  componentDidUpdate(prevProps) {
    console.log("Inside componentdidupdate of viewticketbundledetails");
    console.log("PrevProps");
    console.log(prevProps);
    console.log("currentprops");
    console.log(this.props);
    if ((this.props.assignAndUpdateTicketAPICallStatus.requested !==
      prevProps.assignAndUpdateTicketAPICallStatus.requested &&
      !this.props.assignAndUpdateTicketAPICallStatus.requested)

      || (this.props.messageAndUpdateTicketAPICallStatus.requested !==
        prevProps.messageAndUpdateTicketAPICallStatus.requested &&
        !this.props.messageAndUpdateTicketAPICallStatus.requested)

      ||
      (this.props.closeAndUpdateTicketAPICallStatus.requested !==
        prevProps.closeAndUpdateTicketAPICallStatus.requested &&
        !this.props.closeAndUpdateTicketAPICallStatus.requested))
      this.setState({
        isTicketDetailsSectionVisibleInit: false
      });
  }

  componentDidMount() {
    //Extracing params from url
    var searchString = history.location.search;
    console.log(searchString);
    var params = queryString.parse(searchString);
    console.log("Extracted params: ");
    console.log(params);

    //Show SelectTicketMessage if search-string contains the key: status
    if (localStorage.getItem('role') === Role.ROLE_MANAGER)
      if (params.ticketId) {
        this.setState({
          isSelectTicketMsgVisibleInit: false,
          isTicketDetailsSectionVisibleInit: true
        });
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
    console.log("Rendering viewticktbundledetailsform");
    console.log(this.props);
    console.log(this.state);
    //    const isAssignButtonSectionVisible = !this.props.assignAndUpdateTicketAPICallStatus.requested;
    const isAlertSectionVisible = ((this.props.assignAndUpdateTicketAPICallStatus.success ||
      this.props.assignAndUpdateTicketAPICallStatus.error)
      || (this.props.messageAndUpdateTicketAPICallStatus.success ||
        this.props.messageAndUpdateTicketAPICallStatus.error)

      || (this.props.closeAndUpdateTicketAPICallStatus.success ||
        this.props.closeAndUpdateTicketAPICallStatus.error)
    );

    console.log("isAlertSectionVisible value: ");
    console.log(isAlertSectionVisible);


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
        {this.state.isTicketDetailsSectionVisibleInit
          &&
          (this.props.fetchTicketDetailsAPICallStatus.success
            || this.props.fetchAssignedTicketDetailsAPICallStatus.success
          ) && <div style={{ overflowY: 'auto', overflowX: 'hidden', height: '84.5vh', border: '1px solid #E8EAED', borderRadius: '10px', paddingRight: '10px', paddingLeft: '10px', paddingTop: '5px', paddingBottom: '5px', backgroundColor: '#ffffff' }}>
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
              <Col style={{ color: '#0000008a', fontSize: '80%', textAlign: 'right', fontWeight: 500, paddingRight: '0' }}>Status :</Col><Col style={{ textAlign: 'left' }}><Badge color={getTicketStatusColorCode(this.props.ticket.status)}>{this.props.ticket.status.toUpperCase()}</Badge></Col>
            </Row>
            <Row>
              <Col style={{ color: '#0000008a', fontSize: '80%', textAlign: 'right', fontWeight: 500, paddingRight: '0' }}>Priority :</Col>
              {(this.props.ticket.status !== TicketStatus.CLOSE)
                && <Col>
                  <Row style={{ marginTop: '2%' }}>
                    <Col size='auto' style={{ textAlign: 'center' }}>
                      <Fragment>
                        <Typeahead
                          disabled={this.props.assignAndUpdateTicketAPICallStatus.requested}
                          onChange={(selectedOption) => this.onPrioritySelection(selectedOption)}
                          bsSize='small'
                          labelKey={option => `${option.name}`}
                          dropup={true}
                          /*  optionsBackup={[{ name: Priority.HIGH},{ name: Priority.MEDIUM},{ name: Priority.LOW}]} */
                          options={PriorityArrary.map(priorityItem => {
                            return {
                              name: priorityItem.name,
                              code: priorityItem.code
                            }
                          })}
                          placeholder={this.props.ticket.priority}
                        />
                      </Fragment>
                    </Col>

                  </Row>
                </Col>}
              {(this.props.ticket.status === TicketStatus.CLOSE) &&
                <Col style={{ fontSize: '80%', textAlign: 'left', fontWeight: 400 }}>{this.props.ticket.priority}</Col>
              }
            </Row>
            <Row>
              <Col style={{ color: '#0000008a', fontSize: '80%', textAlign: 'right', fontWeight: 500, paddingRight: '0' }}>Open since :</Col><Col style={{ fontSize: '80%', textAlign: 'left', fontWeight: 400 }}><Badge style={{ width: '20%', height: '90%' }} color="secondary">{timeUtil.daysSince(this.props.ticket.createdDate)}</Badge> Days</Col>
            </Row>
            <Row>
              <Col style={{ color: '#0000008a', fontSize: '80%', textAlign: 'right', fontWeight: 500, paddingRight: '0' }}>Department :</Col>
              {this.props.ticket.status !== TicketStatus.CLOSE
                &&
                <Col>
                  <Row style={{ marginTop: '2%' }}>
                    <Col size='auto' style={{ textAlign: 'center' }}>
                      <Fragment>
                        <Typeahead
                          disabled={this.props.assignAndUpdateTicketAPICallStatus.requested}
                          onChange={(selectedOption) => this.onDepartmentSelection(selectedOption)}
                          bsSize='small'
                          labelKey={option => `${option.name}`}
                          dropup={true}
                          options={this.props.departments}
                          /* options={[{ firstName: 'Art', lastName: 'Blakey', userName: 'art.blakey@pmapi.com' },
                          { firstName: 'Jimmy', lastName: 'Cobb', userName: 'jimmy.cobb@pmapi.com' },                            
                          { firstName: 'Tony', lastName: 'Williams', userName: 'tony.williams@pmapi.com'}]} */
                          placeholder={this.props.ticket.department.name}
                        />
                      </Fragment>
                    </Col>

                  </Row></Col>}
              {this.props.ticket.status === TicketStatus.CLOSE && <Col style={{ fontSize: '80%', textAlign: 'left', fontWeight: 400 }}>{this.props.ticket.department.name}</Col>}
            </Row>
            <Row>
              <Col style={{ color: '#0000008a', fontSize: '80%', textAlign: 'right', fontWeight: 500, paddingRight: '0' }}>
                Updated On :
                </Col>
              <Col style={{ fontSize: '80%', textAlign: 'left', fontWeight: 400 }}>
                {timeUtil.timeAgo(calendarUtil.getLocalTimeStamp(this.props.ticket.updatedDate))}</Col>
            </Row>

            {localStorage.getItem('role') === Role.ROLE_MANAGER &&
              <div>
                {!this.props.assignAndUpdateTicketAPICallStatus.requested &&
                  (localStorage.getItem('role') === Role.ROLE_MANAGER) &&
                  (this.props.ticket.status !== TicketStatus.CLOSE) &&
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
                            { firstName: 'Tony', lastName: 'Williams', userName: 'tony.williams@pmapi.com'}]} */
                            /* placeholder={() => {
                              console.log("processing assignedTo");
                              return this.props.ticket.assignedTo ? 'Unassigned' : `${this.props.ticket.assignedTo.firstName} ${this.props.ticket.assignedTo.lastName}`
                            }
                            } */
                            placeholder={this.getAssignedTo()}
                          />
                        </Fragment>
                      </Col>

                    </Row>
                  </div>}
                {!this.props.assignAndUpdateTicketAPICallStatus.requested &&
                  (localStorage.getItem('role') === Role.ROLE_MANAGER) &&
                  (this.props.ticket.status !== TicketStatus.CLOSE) &&
                  <Row style={{ marginTop: '2%' }}>
                    <Col sm='12'
                      style={{ textAlign: 'center' }}>
                      <Button
                        disabled={this.state.isAssignButtonDisabled}
                        onClick={this.onSubmitAssignTicket}
                        style={{
                          paddingTop: '0',
                          paddingBottom: '0'
                        }} size="sm" color="success">Assign</Button>
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
                      paddingTop: '0',
                      paddingLeft: '0'
                    }}>
                      <Spinner size='sm' color="primary" />
                    </Col>
                  </Row>}
              </div>}
            <hr style={{
              marginTop: '10%'
            }}></hr>
            <Row style={{ marginTop: '5%' }}>
              <Col style={{ color: '#0000008a', fontSize: '80%', textAlign: 'left', fontWeight: 700 }}>Attachments:</Col>
            </Row>
            <Row style={{ marginTop: '5%' }}>
              <Col style={{ color: '#0000008a', fontSize: '80%', textAlign: 'left', fontWeight: 700 }}>Conversation:</Col>
            </Row>


            {/* Single Add-Conversation-block when there is no history*/}
            {(localStorage.getItem('role') === Role.ROLE_ENGINEER ||
              localStorage.getItem('role') === Role.ROLE_MANAGER)
              &&
              (this.props.ticket.ticketHistory.length === 0
                && this.props.ticket.status !== TicketStatus.CLOSE)
              &&
              <Card>
                <CardFooter>
                  <Row >
                    <Col style={{ padding: '0' }}>
                      <Input invalid={this.state.isCommentInvalid} size='sm' type="textarea" name="comment" id="comment" onChange={this.handleCommentChange} />
                    </Col>
                  </Row>

                  <Row >
                    <Col size='auto' style={{ textAlign: 'left', padding: '0' }}>
                      <Button onClick={this.toggleUpload}
                        style={{ fontSize: '70%', width: '90%', paddingTop: '0', paddingBottom: '0', marginRight: '1%' }}
                        type="submit"
                        outline
                        color="secondary"
                        size="sm"
                      >Files</Button>
                    </Col>


                    <Col size='auto' style={{ textAlign: 'center', padding: '0' }}>
                      <Button
                        style={{ fontSize: '70%', width: '90%', paddingTop: '0', paddingBottom: '0', marginLeft: '1%' }}
                        type="submit"
                        color="success"
                        size="sm"
                        disabled={this.props.closeAndUpdateTicketAPICallStatus.requested}
                        onClick={this.onSubmitCloseTicket}>
                        Close</Button>
                    </Col>


                    <Col size='auto' style={{ textAlign: 'center', padding: '0' }}>
                      <Button
                        style={{ fontSize: '70%', width: '90%', paddingTop: '0', paddingBottom: '0', marginLeft: '1%' }}
                        type="submit"
                        color="warning"
                        size="sm"
                        disabled={this.props.messageAndUpdateTicketAPICallStatus.requested}
                        onClick={this.onSubmitAddMessage}>
                        Message</Button>
                    </Col>
                  </Row>
                  {(this.props.messageAndUpdateTicketAPICallStatus.requested
                    || this.props.closeAndUpdateTicketAPICallStatus.requested)
                    && <Row>
                      <Col sm='12' sm={{ size: 6, offset: 5 }}><Spinner size='sm' color="primary" /></Col>
                    </Row>}
                  {this.state.isUpload &&
                    <Row>
                      <FormGroup style={{ 'width': '90%', 'paddingLeft': '5%', 'paddingTop': '2%' }}>
                        <Label size='sm' for="attachments">Attachments</Label>
                        <Input style={{ fontSize: '70%' }} size='sm' type="file" name="file1" id="file1" onChange={this.onFileUpload} />
                        <Input style={{ fontSize: '70%' }} size='sm' type="file" name="file2" id="file2" onChange={this.onFileUpload} />
                        <Input style={{ fontSize: '70%' }} size='sm' type="file" name="file3" id="file3" onChange={this.onFileUpload} />
                        <FormText color="muted">
                          Any files that can assist the corresponding team to resolve the issues at the earliest.          </FormText>
                      </FormGroup>

                    </Row>}

                </CardFooter>

              </Card>}


            {/* Add-Conversation-block only in the first message block of the history when the history is present*/}
            {this.props.ticket.ticketHistory.map((item) =>
              <div>
                <div>
                  <Row style={{ marginTop: '4%' }}>
                    <Col >
                      <Card >
                        <CardHeader style={{ verticalAlign: 'middle', paddingLeft: '2%', paddingRight: '0', paddingTop: '1%', paddingBottom: '1%' }}>
                          <Row>
                            <Col sm={{ size: '5' }} style={{ textAlign: 'left' }}>
                              <CardText >
                                <small>{item.author.firstName + ' ' + item.author.lastName}</small>
                              </CardText>
                            </Col>
                            <Col sm={{ size: '7' }} style={{ textAlign: 'right' }}>
                              <CardText style={{ paddingRight: '5%' }}>
                                <small className="text-muted">{timeUtil.timeAgo(calendarUtil.getLocalTimeStamp(item.commentedOn))}</small>
                              </CardText>
                            </Col>
                          </Row>
                        </CardHeader>
                        <CardBody style={{ padding: '2%' }}>
                          <Row>
                            <Col><CardText style={{ fontSize: '75%' }}>{item.comment}</CardText></Col>
                          </Row>
                          {(item.attachments.length > 0) &&
                            <Row >
                              <Col>Attachment(s):</Col>
                            </Row>}

                          {(item.attachments.length > 0) && item.attachments.map((attachment) =>
                            <Row >
                              <Col ><NavLink style={{ padding: '0%' }} onClick={this.onClickLink} href="#">{uiUtil.loadFileIcon(attachment.fileType)}<code style={{ 'color': '#c7254e' }}>{attachment.name}</code></NavLink></Col>
                            </Row>)}
                        </CardBody>
                        {(this.props.ticket.ticketHistory.indexOf(item) === 0
                          &&
                          this.props.ticket.status !== TicketStatus.CLOSE
                        ) &&
                          <CardFooter>
                            <Row >
                              <Col style={{ padding: '0' }}>
                                <Input invalid={this.state.isCommentInvalid} size='sm' type="textarea" name="comment" id="comment" onChange={this.handleCommentChange} />
                              </Col>
                            </Row>

                            <Row >
                              <Col size='auto' style={{ textAlign: 'left', padding: '0' }}>
                                <Button onClick={this.toggleUpload}
                                  style={{ fontSize: '70%', width: '90%', paddingTop: '0', paddingBottom: '0', marginRight: '1%' }}
                                  type="submit"
                                  outline
                                  color="secondary"
                                  size="sm"
                                >Files</Button>
                              </Col>

                              <Col size='auto' style={{ textAlign: 'center', padding: '0' }}>
                                <Button
                                  style={{ fontSize: '70%', width: '90%', paddingTop: '0', paddingBottom: '0', marginLeft: '1%' }}
                                  type="submit"
                                  color="success"
                                  size="sm"
                                  disabled={this.props.closeAndUpdateTicketAPICallStatus.requested}
                                  onClick={this.onSubmitCloseTicket}>
                                  Close</Button>
                              </Col>

                              <Col size='auto' style={{ textAlign: 'center', padding: '0' }}>
                                <Button
                                  style={{ fontSize: '70%', width: '90%', paddingTop: '0', paddingBottom: '0', marginLeft: '1%' }}
                                  type="submit"
                                  color="warning"
                                  size="sm"
                                  disabled={this.props.messageAndUpdateTicketAPICallStatus.requested}
                                  onClick={this.onSubmitAddMessage}>
                                  Message</Button>
                              </Col>
                            </Row>
                            {(this.props.messageAndUpdateTicketAPICallStatus.requested
                              || this.props.closeAndUpdateTicketAPICallStatus.requested)
                              && <Row>
                                <Col sm='12' sm={{ size: 6, offset: 5 }}><Spinner size='sm' color="primary" /></Col>
                              </Row>}
                            {this.state.isUpload &&
                              <Row>
                                <FormGroup style={{ 'width': '90%', 'paddingLeft': '5%', 'paddingTop': '2%' }}>
                                  <Label size='sm' for="attachments">Attachments</Label>
                                  <Input style={{ fontSize: '70%' }} size='sm' type="file" name="file1" id="file1" onChange={this.onFileUpload} />
                                  <Input style={{ fontSize: '70%' }} size='sm' type="file" name="file2" id="file2" onChange={this.onFileUpload} />
                                  <Input style={{ fontSize: '70%' }} size='sm' type="file" name="file3" id="file3" onChange={this.onFileUpload} />
                                  <FormText color="muted">
                                    Any files that can assist the corresponding team to resolve the issues at the earliest.          </FormText>
                                </FormGroup>

                              </Row>}

                          </CardFooter>}
                      </Card>
                    </Col>
                  </Row>



                </div>

              </div>
            )}

          </div>}

        {/* Show SelectTicket section when no ticket is selected */}
        {this.state.isSelectTicketMsgVisibleInit && <BlankForm></BlankForm>}


        {/* Show succcess or failure alert */}
        {this.state.isAlertSectionVisibleInit
          && isAlertSectionVisible
          &&
          (this.props.assignAndUpdateTicketAPICallStatus.success
            || this.props.messageAndUpdateTicketAPICallStatus.success
            || this.props.closeAndUpdateTicketAPICallStatus.success
          )
          && <Row style={{ marginTop: '2%' }}>
            <Col
              style={{ textAlign: 'center' }}>
              <SuccessAlertWithTick>
              </SuccessAlertWithTick>
            </Col>
          </Row>}
        {this.state.isAlertSectionVisibleInit
          && isAlertSectionVisible
          && (this.props.assignAndUpdateTicketAPICallStatus.error
            || this.props.messageAndUpdateTicketAPICallStatus.error
            || this.props.closeAndUpdateTicketAPICallStatus.error)
          && <Row style={{ marginTop: '2%' }}>
            <Col
              style={{ textAlign: 'center' }}>
              <FailureAlertWithIcon>
              </FailureAlertWithIcon>
            </Col>
          </Row>}



      </div>

    );
  }
}

const mapStateToProps = function (state) {
  return {
    departments: state.departments,
    ticket: state.ticketDetails.ticket,
    engineers: state.engineerList.engineers,
    managerCioKey: state.ticketList.managerTicketSearchCriteria.cioKey,
    fetchTicketDetailsAPICallStatus: state.serviceCallStatus.fetchTicketDetailsAPI,
    fetchAssignedTicketDetailsAPICallStatus: state.serviceCallStatus.fetchAssignedTicketDetailsAPI,
    fetchEngineersAPICallStatus: state.serviceCallStatus.fetchEngineersAPI,
    closeTicketAPICallStatus: state.serviceCallStatus.closeTicketAPI,
    closeAndUpdateTicketAPICallStatus: state.serviceCallStatus.closeAndUpdateTicketAPI,
    messageAndUpdateTicketAPICallStatus: state.serviceCallStatus.messageAndUpdateTicketAPI,
    assignAndUpdateTicketAPICallStatus: state.serviceCallStatus.assignAndUpdateTicketAPI

  }
}

const mapActionsToProps = {
  addMessage: messageAndUpdateTicketAPICall,
  closeTicket: closeAndUpdateTicketAPICall,
  downloadAttachment: downloadAttachmentAPICall,
  fetchTicketDetails: fetchTicketDetailsAPICall,
  fetchAssignedTicketDetails: fetchAssignedTicketDetailsAPICall,
  assignTicket: assignAndUpdateTicketAPICall,
  fetchEngineers: fetchEngineersAPICall
}

export default connect(mapStateToProps, mapActionsToProps)(ViewTicketBundleDetailsForm);