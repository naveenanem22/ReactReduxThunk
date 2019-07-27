import React from 'react';
import { Container,UncontrolledTooltip, Row, Col, Button, Form, FormGroup, Label, Input, FormText, Alert } from 'reactstrap';
import history from '../history';
import { createTicketAPICall } from '../actions/TicketActions'
import { connect } from 'react-redux';
import { ScaleLoader } from 'react-spinners';
import { TicketStatus, TicketStatusCode, TicketType, TicketTypeCode, Priority, PriorityCode, Role, applicationMessages, toolTips } from '../masterdata/ApplicationMasterData';
import { componentInfoObj, TicketsSortBy, PAGINATION_START_PAGE, TICKETS_PER_PAGE_EMPLOYEE, SortOrder } from '../masterdata/ApplicationMasterData';
import queryString from 'query-string';
import { HalfCircleSpinner } from 'react-epic-spinners';
import CustomAlert from '../components/CustomAlert';
import { glbColorCodes } from '../masterdata/ApplicationMasterData';
import {FaExclamationCircle} from 'react-icons/fa';


class CreateNewTicketForm extends React.Component {

  constructor(props) {
    super(props);

    //State
    this.state = {
      ticketTitle: '',
      ticketDescription: '',
      department: '',
      priority: '',
      serviceCategory: '',
      officeLocation: '',
      deskNumber: '',
      serviceType: '',
      additionalInfo: '',
      file1: '',
      file2: '',
      file3: '',
      status: '',
      isCreateTicketFormVisible: true,
      isAlertSectionVisible: false,
      isAlertVisible: true
    }

    this.handleChange = this.handleChange.bind(this);
    this.onSubmitCreateTicket = this.onSubmitCreateTicket.bind(this);
    this.onFileUpload = this.onFileUpload.bind(this);
    this.onDismissAlert = this.onDismissAlert.bind(this);

  }

  onDismissAlert() {
    this.setState({ isAlertVisible: false });
    this.setState((prevState, props) => ({
      isAlertSectionVisible: false
    }), () => {
      if (localStorage.getItem('role') === Role.ROLE_MANAGER)
        history.push("/ticketmanage/tickets?status=" + TicketStatus.ALL);
      if (localStorage.getItem('role') === Role.ROLE_EMPLOYEE) {
        history.push({
          pathname: '/ticketing/tickets',
          search: '?status=' + TicketStatus.ALL + '&' +
            'cioKey=ALT' + '&' +
            'pageNumber=' + PAGINATION_START_PAGE + '&' + 'pageSize=' + TICKETS_PER_PAGE_EMPLOYEE + '&' +
            'sortOrder=' + SortOrder.DESCENDING + '&' + 'sortBy=' + TicketsSortBy.TICKET_UPDATED_DATE
        });
      }
    });
  }


  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSubmitCreateTicket(e) {
    e.preventDefault();
    this.setState((prevState, props) => ({
      status: TicketStatus.NEW,
      //isCreateTicketFormVisible: false,
      isAlertSectionVisible: true

    }), () => {
      this.props.onCreateTicket(this.state);
    });


  }

  onFileUpload(e) {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.files[0]
    })
  }

  componentDidUpdate(prevProps) {
    //Check the change in value(false -> true) for createTicketAPICallStatus.success 
    //and createTicketAPICallStatus.error.
    if (this.props.createTicketAPICallStatus.success === true &&
      this.props.createTicketAPICallStatus.success !== prevProps.createTicketAPICallStatus.success) {
      console.log("Create ticket success. Now hide the CreateTicketForm");
      this.setState({
        isCreateTicketFormVisible: false
      })
    }

    if (this.props.createTicketAPICallStatus.error === true &&
      this.props.createTicketAPICallStatus.error !== prevProps.createTicketAPICallStatus.error) {
      console.log("Create ticket failure. Now hide the CreateTicketForm");
      this.setState({
        isCreateTicketFormVisible: false
      })
    }
  }
  render() {
    //Processing ttsKey to fetch Form Title and SubTitle data
    console.log("From Create Ticket");
    console.log(this.state);
    const params = queryString.parse(history.location.search);

    const title = params.cioKey ? componentInfoObj.getInfo(params.cioKey).title : componentInfoObj.getDefaultInfo().title;
    const subTitle = params.cioKey ? componentInfoObj.getInfo(params.cioKey).subTitle : componentInfoObj.getDefaultInfo().subTitle;


    return (
      <div style={{ overflowX: 'hidden', overflowY: 'auto', 
      height: '100%', 
      marginLeft: '1%', 
      marginRight: '1%',
      marginBottom: '2%' }}>


        {this.state.isCreateTicketFormVisible
          &&
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
            <Container style={{ marginTop: '3%' }}>
              <FormGroup>
                <Label size='sm' style={{paddingRight: '4px'}}for="ticketTitle">Title</Label>
                <span id='titleToolTip' href='#'>
                  <FaExclamationCircle style={{
                    marginBottom: '1px'
                  }}></FaExclamationCircle></span>

                <UncontrolledTooltip placement="right" target="titleToolTip">
                  {toolTips.createTicketForm.TITLE}
                </UncontrolledTooltip>
                <Input size='sm' type="text" name="ticketTitle" id="ticketTitle"
                  value={this.state.ticketTitle} onChange={this.handleChange} required />
              </FormGroup>
              <FormGroup>
                <Label size='sm' style={{paddingRight: '4px'}} for="ticketDescription">Description</Label>
                <span id='descriptionToolTip' href='#'>
                  <FaExclamationCircle style={{
                    marginBottom: '1px'
                  }}></FaExclamationCircle></span>

                <UncontrolledTooltip placement="right" target="descriptionToolTip">
                {toolTips.createTicketForm.DESCRIPTION}
                </UncontrolledTooltip>
                <Input size='sm' type="textarea" name="ticketDescription" id="ticketDescription"
                  value={this.state.titleDescription}
                  onChange={this.handleChange} required />
              </FormGroup>
              <FormGroup>
                <Label size='sm' for="department">Department</Label>
                <Input size='sm' type="select" name="department" id="department" value={this.state.department} onChange={this.handleChange} required>
                  <option>Choose department...</option>
                  {this.props.departments.map((department) =>
                    <option>{department.name}</option>
                  )}

                </Input>
              </FormGroup>
              <FormGroup>
                <Label size='sm' for="priority">Priority</Label>
                <Input size='sm' type="select" name="priority" id="priority" value={this.state.priority} onChange={this.handleChange} required>
                  <option>Choose priority...</option>
                  <option>{Priority.HIGH}</option>
                  <option>{Priority.LOW}</option>
                  <option>{Priority.MEDIUM}</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label size='sm' for="serviceCategory">Category</Label>
                <Input size='sm' type="select" name="serviceCategory" id="serviceCategory" value={this.state.serviceCategory}
                  onChange={this.handleChange}
                  required>
                  <option>Choose category...</option>
                  {this.props.serviceCategories.map((serviceCategory) =>
                    <option>{serviceCategory.name}</option>
                  )}
                </Input>
              </FormGroup>
              <FormGroup>
                <Label size='sm' for="officeLocation">Office</Label>
                <Input size='sm' type="select" name="officeLocation" id="officeLocation" value={this.state.officeLocation}
                  onChange={this.handleChange}
                  required>
                  <option>Choose office...</option>
                  <option>Office-Hyderabad</option>
                  <option>Office-Bangalore</option>
                  <option>Office-Chennai</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label size='sm' for="deskNumber">Desk</Label>
                <Input size='sm' type="text" name="deskNumber" id="deskNumber"
                  value={this.state.deskNumber}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label size='sm' for="serviceType">Type</Label>
                <Input size='sm' type="select" name="serviceType" id="serviceType"
                  value={this.state.serviceType}
                  onChange={this.handleChange}
                  required>
                  <option>--Select--</option>
                  <option>{TicketType.TASK}</option>
                  <option>{TicketType.ISSUE}</option>
                  <option>{TicketType.PROBLEM}</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label size='sm' style={{paddingRight: '4px'}} for="notes">Additional Information</Label>
                <span id='additionalInfoToolTip' href='#'>
                  <FaExclamationCircle style={{
                    marginBottom: '1px'
                  }}></FaExclamationCircle></span>

                <UncontrolledTooltip placement="right" target="additionalInfoToolTip">
                {toolTips.createTicketForm.ADDITIONAL_INFO}
                </UncontrolledTooltip>
                <Input size='sm' type="textarea" name="additionalInfo" id="additionalInfo"
                  value={this.state.additionalInfo}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label size='sm' for="attachments">Attachments</Label>
                <Input size='sm' type="file" name="file1" id="file1" onChange={this.onFileUpload} />
                <Input size='sm' type="file" name="file2" id="file2" onChange={this.onFileUpload} />
                <Input size='sm' type="file" name="file3" id="file3" onChange={this.onFileUpload} />
                <FormText size='sm' color="muted">
                  Any files that can assist the corresponding team to resolve the issues at the earliest.
          </FormText>
              </FormGroup>
              <Row>
                <Col sm='auto'>
                  <Button size='sm' color="success" type="submit" bsSize="large"
                    onClick={this.onSubmitCreateTicket}>Create Ticket</Button>
                </Col>
                {this.props.createTicketAPICallStatus.requested
                  &&
                  <Col sm='auto' style={{
                    paddingTop: '1%'
                  }}>
                    <HalfCircleSpinner
                      size='20'
                      color='green'>

                    </HalfCircleSpinner>

                  </Col>}


              </Row>
            </Container>
          </Form>}

        {false && this.props.createTicketAPICallStatus.requested && <div className='view-ticket-loading'>
          <ScaleLoader
            color='#00d8ff'
            loading='true'
          />
        </div>
        }

        {this.state.isAlertSectionVisible && this.props.createTicketAPICallStatus.success && <div>
          <CustomAlert data={{
            alertColor: glbColorCodes.SUCCESS,
            isOpen: true,
            messageHeader: applicationMessages.messageHeaders.TICKET_CREATION_SUCCESS,
            detailedMessage: applicationMessages.successMessages.TICKET_CREATION_SUCCESS,
            defaultFooterMessage: applicationMessages.defaultFooterMessages.TICKET_CREATION_SUCCESS
          }} toggle={this.onDismissAlert} >

          </CustomAlert>
        </div>}

        {this.state.isAlertSectionVisible && this.props.createTicketAPICallStatus.error && <div>
          <CustomAlert data={{
            alertColor: glbColorCodes.DANGER,
            isOpen: true,
            messageHeader: applicationMessages.messageHeaders.TICKET_CREATION_FAILURE,
            detailedMessage: applicationMessages.errorMessages.TICKET_CREATION_FAILURE,
            defaultFooterMessage: applicationMessages.defaultFooterMessages.TICKET_CREATION_FAILURE
          }} toggle={this.onDismissAlert} >

          </CustomAlert>
          {/* <Alert color="danger" isOpen={true} toggle={this.onDismissAlert}>
            <h4 className="alert-heading">Failure!</h4>
            <p>
              Ticket creation unsuccessful.
        </p>
            <hr />
            <p className="mb-0">
              Please try again.
        </p>
          </Alert> */}
        </div>}


      </div>
    );
  }
}

const mapActionsToProps = {
  onCreateTicket: createTicketAPICall
}

const mapStateToProps = function (state) {
  return {
    departments: state.departments,
    serviceCategories: state.serviceCategories,
    createTicketAPICallStatus: state.serviceCallStatus.createTicketAPI
  }
}

export default connect(mapStateToProps, mapActionsToProps)(CreateNewTicketForm);