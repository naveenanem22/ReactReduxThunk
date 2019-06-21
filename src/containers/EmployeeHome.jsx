import React from 'react';
import history from '../history';
import { connect } from 'react-redux';
import { Row, Col, Container, Label, Badge } from 'reactstrap';

class EmployeeHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div style={{ marginLeft: '1%', marginRight: '1%' }}>
                <Container style={{ marginTop: '3%' }}><Row style={{ textAlign: 'left' }}>
                    <h4>Welcome, {this.props.profile.firstName}{this.props.profile.lastname}!</h4>
                </Row>
                    <Row style={{ textAlign: 'left' }}>
                        <p>Last login: 11th May 2019: 11:25:30Hrs</p>
                    </Row>
                </Container>
                <hr></hr>
                <Row style={{
                    marginTop: '1%'
                }}>
                    <Col>
                        <Label size='sm'>Here are the 3 simple steps to make
                            the best use of ItsHelpdesk to cater for your IT needs.</Label>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <ul>
                            <li><Label size='sm'>Raise the ticket with <Badge color="info" pill>New Ticket</Badge>.</Label></li>
                            <li><Label size='sm'>Track the ticket under <Badge color='info' pill>My Tickets</Badge>.</Label></li>
                            <li><Label size='sm'><Badge color='info' pill>Add Message</Badge> to converse and <Badge color='info' pill>
                                Close</Badge> the ticket if resolved.</Label></li>
                        </ul>
                    </Col>
                </Row>

                <Row>
                    <Col sm='auto'>
                        <Label size='sm'><span style={{ fontWeight: '700' }}>
                            Note 1:</span> Refer Ticket <Badge color='info' pill>Workflow</Badge> to check where your ticket is holding off.
                        And contact the concerned person to hasten the resolution. </Label>
                    </Col>
                </Row>
                <Row>
                    <Col sm='auto'>
                        <Label size='sm'><span style={{ fontWeight: '700' }}>
                            Note 2:</span> Refer <Badge color='info' pill>Policy</Badge> page to know the Dos and Donts with ItsHelpdesk. </Label>
                    </Col>
                </Row>
            </div>

        );
    }

}

const mapDispatchToProps = dispatch => {

    return {

    };
}

const mapStateToProps = function (state) {
    return {
      profile: state.user.profile
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeHome);