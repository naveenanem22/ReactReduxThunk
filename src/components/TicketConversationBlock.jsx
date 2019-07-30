import React from 'react';
import { connect } from 'react-redux';
import { Button, Row, Col, Container, Input, FormGroup, Label, FormText } from 'reactstrap';
import { NavLink } from 'reactstrap';

class TicketConversationBlock extends React.Component{
    constructor(props){
        super(props);
        this.state={

        };
        this.onFileUpload = this.onFileUpload.bind(this);
        this.onSubmitAddMessage = this.onSubmitAddMessage.bind(this);
        this.onSubmitCloseTicket = this.onSubmitCloseTicket.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.toggleUpload = this.toggleUpload.bind(this);

    }
    onFileUpload(){

    }

    onSubmitAddMessage(){

    }

    onSubmitCloseTicket(){

    }
    handleChange(){

    }

    toggleUpload(){

    }


    render(){
        return <div style={{ border: '1px solid #CED4DA'}} >
        <div style={{backgroundColor: '#F8F9FA'}}>
          <Row style={{ 'height': '100%' }}>
            <Col md={6} style={{ 'text-align': 'left', 'paddingLeft': '3%', 'padding-top': '.75rem', 'padding-bottom': '.75rem' }}>TestAuthor</Col>
            <Col md={6} style={{ 'text-align': 'right', 'paddingRight': '3%', 'padding-top': '.75rem', 'padding-bottom': '.75rem' }}>27th Sep 2019</Col>
          </Row>
        </div>
        <hr />

        <div class="message" style={{ 'paddingBottom': '1%' }}>
          <Row >
            <Col style={{ 'paddingLeft': '3%' }}>There is no need to raise a ticket for this issue.</Col>
          </Row>
          {true && <Row style={{ 'marginBottom': '3px', 'paddingLeft': '2%', 'paddingRight': '0%' }}>Attachment(s):</Row>}
          
          {true && <div>
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
           { true && <Row>
                <Label for="attachments">Attachments</Label>
                <Input type="file" name="file1" id="file1" onChange={this.onFileUpload} />
                <Input type="file" name="file2" id="file2" onChange={this.onFileUpload} />
                <Input type="file" name="file3" id="file3" onChange={this.onFileUpload} />
                

            </Row>}

          </div>}

        </div>

      </div>
    }
}

const mapStateToProps = function (state) {
    return {
    }
  }
  
  const mapActionsToProps = {
  }
  
  export default connect(mapStateToProps, mapActionsToProps)(TicketConversationBlock);