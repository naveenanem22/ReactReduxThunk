import React from 'react';
import { Row, Card, Button, Form, FormGroup, FormFeedback, Label, Input, Container, Col } from 'reactstrap';
import { loginAPICall } from '../actions/UserActions'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { fetchTicketsAPICall } from '../actions/TicketActions'
import { Role, employeeSideMenuOptions, managerSideMenuOptions } from '../masterdata/ApplicationMasterData';
import history from '../history';
import { HalfCircleSpinner } from 'react-epic-spinners';
import { setEmployeeActiveSideMenuOption, setManagerActiveSideMenuOption } from '../actions/ActiveSideMenuActions';


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
        //Unfocus all the side-menu options for Employee view
        this.props.setEmployeeActiveSideMenuItem('');
        break;

      case Role.ROLE_EMPLOYEE:
        history.push({
          pathname: "/ticketing/home"
        });
        break;

      case Role.ROLE_MANAGER:
        history.push({
          pathname: "/ticketmanage/dashboard",
          search: "?cioKey=MDB"
        });

        //Set Active Item for Manager-SideMenu
        this.props.setManagerActiveSideMenuItem(managerSideMenuOptions.DASHBOARD);
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
      <Card color='light' style={{
        marginTop: '5%',
        marginLeft: '35%',
        marginRight: '35%',
        padding: '1%'
      }}>
        <h4>Sign In</h4>
        <Form className="form">
          {this.props.isLoginFailure && <Label className="text-danger">{this.props.loginFailureMessage}</Label>}
          <Col>
            <FormGroup>
              <Label size='sm' style={{
                fontWeight: '600'
              }}>UserId</Label>
              <Input
                size='sm'
                name="userId"
                id="userId"
                placeholder="myemail@email.com"
                onChange={this.handleChange}
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label size='sm' style={{
                fontWeight: '600'
              }}>Password</Label>
              <Input
                size='sm'
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
              textAlign: 'left'
            }}>
              <Button size='sm' onClick={this.onSubmitLogin}>Submit</Button>
            </Col>
            <Col sm='auto' style={{
              textAlign: 'left',
              paddingTop: '1%'
            }}>
              {this.props.loginAPICallStatus.requested && <HalfCircleSpinner
                color='#17A2B8'
                size='20'></HalfCircleSpinner>}
            </Col>

          </Row>

        </Form>
      </Card>
    );
  }
}

/* const mapActionsToProps = {
  onLogin: loginAPICall,
  fetchTickets: fetchTicketsAPICall
} */

const mapActionsToProps = dispatch => {

  return {
    onLogin: (params) => {
      dispatch(loginAPICall(params));
    },
    fetchTickets: (params) => {
      dispatch(fetchTicketsAPICall(params));
    },
    setEmployeeActiveSideMenuItem: (activeSideMenuItem) => {
      dispatch(setEmployeeActiveSideMenuOption(activeSideMenuItem));
    },
    setManagerActiveSideMenuItem: (activeSideMenuItem) => {
      dispatch(setManagerActiveSideMenuOption(activeSideMenuItem));
    }


  };
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