import React from 'react';
import {Row, Button, Form, FormGroup, FormFeedback, Label, Input, Container, Col } from 'reactstrap';
import { loginAPICall } from '../actions/UserActions'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { fetchTicketsAPICall } from '../actions/TicketActions'
import { Role } from '../masterdata/ApplicationMasterData';
import history from '../history';
import { HalfCircleSpinner } from 'react-epic-spinners';

class LoginForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      userId: '',
      password: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.onSubmitLogin = this.onSubmitLogin.bind(this);
    this.onLoginSuccess = this.onLoginSuccess.bind(this);

  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSubmitLogin(e) {
    e.preventDefault();
    this.props.onLogin(this.state);
  }

  onLoginSuccess() {
    switch (this.props.user.profile.role) {
      case Role.ROLE_ENGINEER:
        history.push({
          pathname: "/ticketmaint/dashboard",
          search: "?cioKey=ENDB"
        });
        break;

      case Role.ROLE_EMPLOYEE:
        history.push({
          pathname: "/ticketing/newticket",
          search: "?cioKey=NT"
        });
        break;

      case Role.ROLE_MANAGER:
        history.push({
          pathname: "/ticketmanage/dashboard",
          search: "?cioKey=MDB"
        });
        break;

      default:
        return;
    }
  }


  render() {
    //Redirecting upon login
    if (this.props.user.isLoggedIn) {
      this.onLoginSuccess();
    }

    return (
      <Container style={{ 'width': '60%', paddingBottom: '3%', paddingTop: '3%', marginTop: '2%', backgroundColor: '#E8EAED' }}>
        <h2>Sign In</h2>
        <Form className="form">
          {this.props.isLoginFailure && <Label className="text-danger">{this.props.loginFailureMessage}</Label>}
          <Col>
            <FormGroup>
              <Label>UserId</Label>
              <Input
                name="userId"
                id="userId"
                placeholder="myemail@email.com"
                onChange={this.handleChange}
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label>Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="********"

                value={this.state.password}
                onChange={this.handleChange}
              />
            </FormGroup>
          </Col>
          <Row>
            <Col sm='auto' style={{
              textAlign : 'left'
            }}>
              <Button onClick={this.onSubmitLogin}>Submit</Button>
            </Col>
            <Col sm='auto' style={{
              textAlign: 'left',
              paddingTop:'1%'
            }}>
              {this.props.loginAPICallStatus.requested && <HalfCircleSpinner
                color='green'
                size='20'></HalfCircleSpinner>}
            </Col>

          </Row>

        </Form>
      </Container>
    );
  }
}

const mapActionsToProps = {
  onLogin: loginAPICall,
  fetchTickets: fetchTicketsAPICall
}

const mapStateToProps = function (state) {
  return {
    user: state.user,
    isLoginFailure: state.user.isLoginFailure,
    loginFailureMessage: state.user.loginFailureMessage,
    loginAPICallStatus: state.serviceCallStatus.loginAPI
  }
}

export default connect(mapStateToProps, mapActionsToProps)(LoginForm);