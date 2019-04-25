import React from 'react';
import { addMessageAPICall, closeTicketAPICall, downloadAttachmentAPICall } from '../actions/TicketActions'
import { connect } from 'react-redux';
import { Button, Row, Col, Container, Input, FormGroup, Label, FormText } from 'reactstrap';
import { Table, NavLink } from 'reactstrap';
import { FaFilePdf, FaFileAlt, FaFileImage, FaFile } from 'react-icons/fa';
import {loadFileIcon} from '../util/UIUtils';
class ViewTicketDetailsForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      id: this.props.ticket.id,
      status: '',
      comment: '',

      commentedOn: '',
      isUpload: false
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
      id: this.props.ticket.id,
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
  render() {
    const ticket = this.props.ticket;
    return (

      <div class="ticket-details-form">
        <div class="ticket-details-header">
          <h3>Ticket Details</h3>
          <p> Ticket details such as - attachments, converstaion and status.</p>
        </div>
        <div class="ticket-details-body">

          <div>
            <Row>
              <Col md={6} style={{ 'text-align': 'left', 'padding-top': '.75rem' }}><strong>Naveen Anem</strong> - naveen.anem@kony.com</Col>
              <Col md={6} style={{ 'text-align': 'right', 'padding-top': '.75rem' }}>{ticket.createdDate}</Col>
            </Row>
          </div>

          <Row>
            <Col md={12}><h4>{ticket.title}</h4></Col>
          </Row>
          <hr />
          <Row>
            <Col style={{ 'text-align': 'left', 'padding-top': '.30rem', 'padding-bottom': '.75rem' }}>{ticket.status}</Col>
            <Col style={{ 'text-align': 'left', 'padding-top': '.30rem', 'padding-bottom': '.75rem' }}>Updated: {ticket.updatedDate}</Col>
            <Col style={{ 'text-align': 'right', 'padding-top': '.30rem', 'padding-bottom': '.75rem' }}>Ticket ID: {ticket.id}</Col>
          </Row>

          <div class="ticket-table-summary">
            <Table bordered size="sm">

              <tbody>
                <tr >
                  <td style={{ width: '20%' }}><strong>Category:</strong></td>
                  <td style={{ fontStyle: 'italic' }}>{ticket.serviceCategory}</td>
                </tr>
                <tr>
                  <td><strong>Priority:</strong></td>
                  <td style={{ fontStyle: 'italic' }}>{ticket.priority}</td>
                </tr>
                <tr>
                  <td><strong>Department:</strong></td>
                  <td style={{ fontStyle: 'italic' }}>{ticket.department.name}</td>
                </tr>
                <tr>
                  <td><strong>Office:</strong></td>
                  <td style={{ fontStyle: 'italic' }}>{ticket.officeLocation}</td>
                </tr>
                <tr>
                  <td><strong>Service Type:</strong></td>
                  <td style={{ fontStyle: 'italic' }}>{ticket.ticketType}</td>
                </tr>

              </tbody>
            </Table>
          </div>

          {/* Single Add-Conversation-block when there is no history*/}
          {ticket.ticketHistory.length === 0 && <div>
                  <Row style={{ 'height': '8%', 'width': '99%', 'marginLeft': '1%' }}>
                    <Col >
                      <Input type="textarea" name="comment" id="comment" onChange={this.handleChange} />
                    </Col>
                  </Row>

                  <Row style={{ 'height': '8%', 'width': '99%', 'marginLeft': '1%', 'marginTop': '1%' }}>
                    <Col>
                      <Button onClick = {this.toggleUpload} type="submit" outline color="secondary" bsSize="small"
                      >Attach Files</Button>
                    </Col>
                    <Col style={{ 'text-align': 'right' }}>
                      <Button type="submit" color="link" bsSize="small" onClick={this.onSubmitCloseTicket}>
                        Close Ticket</Button>or
                 <Button type="submit" color="info" bsSize="small" style={{ 'marginLeft': '2%' }} onClick={this.onSubmitAddMessage}>
                        Add Message</Button>
                    </Col>
                  </Row>
                 { this.state.isUpload && <Row>
                    <FormGroup style={{ 'width': '90%', 'paddingLeft': '5%', 'paddingTop': '2%' }}>
                      <Label for="attachments">Attachments</Label>
                      <Input type="file" name="file1" id="file1" onChange={this.onFileUpload} />
                      <Input type="file" name="file2" id="file2" onChange={this.onFileUpload} />
                      <Input type="file" name="file3" id="file3" onChange={this.onFileUpload} />
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
                  <Col md={6} style={{ 'text-align': 'left', 'paddingLeft': '3%', 'padding-top': '.75rem', 'padding-bottom': '.75rem' }}>{item.authorName}</Col>
                  <Col md={6} style={{ 'text-align': 'right', 'paddingRight': '3%', 'padding-top': '.75rem', 'padding-bottom': '.75rem' }}>{item.commentedOn}</Col>
                </Row>
              </div>
              <hr />

              <div class="message" style={{ 'paddingBottom': '1%' }}>
                <Row >
                  <Col style={{ 'paddingLeft': '3%' }}>{item.comment}</Col>
                </Row>
                {(item.attachments.length > 0) && <Row style={{ 'marginBottom': '3px', 'paddingLeft': '2%', 'paddingRight': '0%' }}>Attachment(s):</Row>}
                {(item.attachments.length > 0) && item.attachments.map((attachment) =>
                  <Row style={{ 'marginBottom': '3px', 'paddingLeft': '2%', 'paddingRight': '0%' }}>
                    <Col ><NavLink style={{ padding: '0%' }} onClick={this.onClickLink} href="#">{loadFileIcon(attachment.fileType)}<code style={{ 'color': '#c7254e' }}>{attachment.name}</code></NavLink></Col>
                  </Row>)}
                {(ticket.ticketHistory.indexOf(item) === 0) && <div>
                  <Row style={{ 'height': '8%', 'width': '99%', 'marginLeft': '1%' }}>
                    <Col >
                      <Input type="textarea" name="comment" id="comment" onChange={this.handleChange} />
                    </Col>
                  </Row>

                  <Row style={{ 'height': '8%', 'width': '99%', 'marginLeft': '1%', 'marginTop': '1%' }}>
                    <Col>
                      <Button onClick = {this.toggleUpload} type="submit" outline color="secondary" bsSize="small"
                      >Attach Files</Button>
                    </Col>
                    <Col style={{ 'text-align': 'right' }}>
                      <Button type="submit" color="link" bsSize="small" onClick={this.onSubmitCloseTicket}>
                        Close Ticket</Button>or
                 <Button type="submit" color="info" bsSize="small" style={{ 'marginLeft': '2%' }} onClick={this.onSubmitAddMessage}>
                        Add Message</Button>
                    </Col>
                  </Row>
                 { this.state.isUpload && <Row>
                    <FormGroup style={{ 'width': '90%', 'paddingLeft': '5%', 'paddingTop': '2%' }}>
                      <Label for="attachments">Attachments</Label>
                      <Input type="file" name="file1" id="file1" onChange={this.onFileUpload} />
                      <Input type="file" name="file2" id="file2" onChange={this.onFileUpload} />
                      <Input type="file" name="file3" id="file3" onChange={this.onFileUpload} />
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
  downloadAttachment: downloadAttachmentAPICall
}

export default connect(mapStateToProps, mapActionsToProps)(ViewTicketDetailsForm);