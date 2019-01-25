import React from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Col } from 'reactstrap';
import {loginAPICall} from '../actions/UserActions'
import {connect} from 'react-redux';
import {Redirect} from 'react-router';

class LoginForm extends React.Component {

  constructor(props){
    super(props);
   
    this.state = {
      
    }

    this.handleChange = this.handleChange.bind(this);
    this.onSubmitLogin = this.onSubmitLogin.bind(this);

  }

  handleChange(e){
    this.setState({
      [e.target.name] : e.target.value
    });
  }

  onSubmitLogin(e){
    e.preventDefault();
    this.props.onLogin(this.state);
  }

 
  render() {
     if (this.props.redirectToHomePage) {
        return <Redirect push to={{
          pathname: "/tickets"          
        }} />;
      } 
    return (
        <Container style={{'width':'60%', paddingBottom :'3%', paddingTop : '3%', marginTop : '2%', backgroundColor : '#E8EAED'}}>
        <h2>Sign In</h2>
        <Form className="form">
          <Col>
            <FormGroup>
              <Label>Email</Label>
              <Input
                type="email"
                name="email"
                id="loginEmail"
                placeholder="myemail@email.com"
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="examplePassword">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="********"
              />
            </FormGroup>
          </Col>
          <Button onClick = {this.onSubmitLogin}>Submit</Button>
        </Form>
      </Container>
    );
  }
}

const mapActionsToProps = {  
  onLogin : loginAPICall  
}

const mapStateToProps = function (state){
    return {
      redirectToHomePage: state.user.isLoggedIn
    }
  }

export default connect(mapStateToProps, mapActionsToProps)(LoginForm);