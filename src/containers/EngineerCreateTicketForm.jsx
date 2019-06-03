import React from 'react';
import { Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText, Alert } from 'reactstrap';
import history from '../history';
import { createTicketAPICall } from '../actions/TicketActions'
import { connect } from 'react-redux';
import { ScaleLoader } from 'react-spinners';
import { TicketStatus, TicketStatusCode, TicketType, TicketTypeCode, Priority, PriorityCode } from '../masterdata/ApplicationMasterData';
import { componentInfoObj } from '../masterdata/ApplicationMasterData';
import queryString from 'query-string';
import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar';

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
      isAlertVisible: false
    }), () => {
      history.push("/ticketing/tickets?status=" + TicketStatus.ALL);
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
      isCreateTicketFormVisible: false,
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
  render() {
    //Processing ttsKey to fetch Form Title and SubTitle data
    const params = queryString.parse(history.location.search);

    const title = params.cioKey ? componentInfoObj.getInfo(params.cioKey).title : componentInfoObj.getDefaultInfo().title;
    const subTitle = params.cioKey ? componentInfoObj.getInfo(params.cioKey).subTitle : componentInfoObj.getDefaultInfo().subTitle;


    return (
      <PerfectScrollbar style={{
        height: '100%'
      }}>
        <div style={{
          marginLeft: '1%',
          marginRight: '1%'
        }}>


          {this.state.isCreateTicketFormVisible && <Form>
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
                <Label for="ticketTitle">Title</Label>
                <Input type="text" name="ticketTitle" id="ticketTitle"
                  value={this.state.ticketTitle} onChange={this.handleChange} required />
              </FormGroup>
              <FormGroup>
                <Label for="ticketDescription">Description</Label>
                <Input type="textarea" name="ticketDescription" id="ticketDescription"
                  value={this.state.titleDescription}
                  onChange={this.handleChange} required />
              </FormGroup>
              <FormGroup>
                <Label for="department">Department</Label>
                <Input type="select" name="department" id="department" value={this.state.department} onChange={this.handleChange} required>
                  <option>Choose department...</option>
                  {this.props.departments.map((department) =>
                    <option>{department.name}</option>
                  )}

                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="priority">Priority</Label>
                <Input type="select" name="priority" id="priority" value={this.state.priority} onChange={this.handleChange} required>
                  <option>Choose priority...</option>
                  <option>{Priority.HIGH}</option>
                  <option>{Priority.LOW}</option>
                  <option>{Priority.MEDIUM}</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="serviceCategory">Category</Label>
                <Input type="select" name="serviceCategory" id="serviceCategory" value={this.state.serviceCategory}
                  onChange={this.handleChange}
                  required>
                  <option>Choose category...</option>
                  {this.props.serviceCategories.map((serviceCategory) =>
                    <option>{serviceCategory.name}</option>
                  )}
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="officeLocation">Office</Label>
                <Input type="select" name="officeLocation" id="officeLocation" value={this.state.officeLocation}
                  onChange={this.handleChange}
                  required>
                  <option>Choose office...</option>
                  <option>Office-Hyderabad</option>
                  <option>Office-Bangalore</option>
                  <option>Office-Chennai</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="deskNumber">Desk</Label>
                <Input type="text" name="deskNumber" id="deskNumber"
                  value={this.state.deskNumber}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="serviceType">Type</Label>
                <Input type="select" name="serviceType" id="serviceType"
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
                <Label for="notes">Additional Information</Label>
                <Input type="textarea" name="additionalInfo" id="additionalInfo"
                  value={this.state.additionalInfo}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="attachments">Attachments</Label>
                <Input type="file" name="file1" id="file1" onChange={this.onFileUpload} />
                <Input type="file" name="file2" id="file2" onChange={this.onFileUpload} />
                <Input type="file" name="file3" id="file3" onChange={this.onFileUpload} />
                <FormText color="muted">
                  Any files that can assist the corresponding team to resolve the issues at the earliest.
          </FormText>
              </FormGroup>
              <Button color="success" type="submit" bsSize="large"
                onClick={this.onSubmitCreateTicket}>Create Ticket</Button>
            </Container>
          </Form>}

          {this.props.createTicketAPICallStatus.requested && <div className='view-ticket-loading'>
            <ScaleLoader
              color='#00d8ff'
              loading='true'
            />
          </div>
          }


          {this.state.isAlertSectionVisible && this.props.createTicketAPICallStatus.success && <div>
            <Alert color="success" isOpen={this.state.isAlertVisible} toggle={this.onDismissAlert}>
              <h4 className="alert-heading">Well done!</h4>
              <p>
                Aww yeah, you successfully read this important alert message. This example text is going
                to run a bit longer so that you can see how spacing within an alert works with this kind
                of content.
        </p>
              <hr />
              <p className="mb-0">
                Whenever you need to, be sure to use margin utilities to keep things nice and tidy.
        </p>
            </Alert>
          </div>}


        </div>
      </PerfectScrollbar>
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