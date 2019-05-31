import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Card, CardHeader, CardBody, CardTitle, CardText, Button, CardFooter } from 'reactstrap';
import { Badge } from 'reactstrap';

class TicketDetailCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isAlertVisible: true,
            ticket: this.props.ticket
        };

        this.onDismiss = this.onDismiss.bind(this);
    }

    onDismiss() {
        this.setState({ isAlertVisible: false });
    }

    render() {
        return (
            <Card style={{ width: '100%', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' }}>
                <CardHeader style={{ paddingTop: '1%', paddingBottom: '1%', paddingRight: '0' }}><Row>
                    <Col sm='2' style={{ textAlign: 'left' }}><Badge color="danger">{this.state.ticket.priority}</Badge></Col>
                    <Col sm='4' style={{ textAlign: 'center' }}>{this.state.ticket.id}</Col>
                    <Col sm='3' style={{ textAlign: 'right', color: '#0000008a', fontSize: '80%', margin: '0', paddingRight: '0' }}><i>Created by</i></Col>
                    <Col sm='3' style={{ textAlign: 'left', fontWeight: '500', color: '#0000008a', fontSize: '80%', margin: '0' }}>
                        {this.state.ticket.createdBy.firstName + ' ' + this.state.ticket.createdBy.lastName}
                    </Col>
                </Row></CardHeader>
                <CardBody style={{ paddingTop: '1%', paddingBottom: '1%' }}>
                    <Row>
                        <Col sm='8'>
                            <Row><Col sm='12' style={{ fontSize: '90%', fontWeight: 600, color: '#222426' }}>{this.state.ticket.title}</Col></Row>
                            <Row><Col sm='12' style={{ fontSize: '90%', fontWeight: 300, color: '#222426' }}>Need internet connectivity based on the project demand and {this.state.ticket.description}</Col></Row>

                        </Col>
                        <Col sm='4' style={{ borderLeft: '1px solid rgba(0,0,0,.125)' }}>
                            <Row><Col sm='5' style={{ fontFamily: 'Lato,Helvetica Neue,Arial,Helvetica,sans-serif', color: '#0000008a', fontSize: '80%', textAlign: 'left', paddingRight: '0' }}><i>Status</i></Col><Col sm='7' style={{ color: '#0000008a', fontSize: '80%', textAlign: 'left', paddingLeft: '0', paddingRight: '0' }}>: {this.state.ticket.status}</Col></Row>
                            <Row><Col sm='5' style={{ fontFamily: 'Lato,Helvetica Neue,Arial,Helvetica,sans-serif', color: '#0000008a', fontSize: '80%', textAlign: 'left', paddingRight: '0' }}><i>Days Open</i></Col><Col sm='7' style={{ color: '#0000008a', fontSize: '80%', textAlign: 'left', paddingLeft: '0', paddingRight: '0' }}>: 28</Col></Row>
                            <Row><Col sm='5' style={{ fontFamily: 'Lato,Helvetica Neue,Arial,Helvetica,sans-serif', color: '#0000008a', fontSize: '80%', textAlign: 'left', paddingRight: '0' }}><i>Department</i></Col><Col sm='7' style={{ color: '#0000008a', fontSize: '80%', textAlign: 'left', paddingLeft: '0', paddingRight: '0' }}>: {this.state.ticket.department.name}</Col></Row>
                            <Row><Col sm='5' style={{ fontFamily: 'Lato,Helvetica Neue,Arial,Helvetica,sans-serif', color: '#0000008a', fontSize: '80%', textAlign: 'left', paddingRight: '0' }}><i>Updated On</i></Col><Col sm='7' style={{ color: '#0000008a', fontSize: '80%', textAlign: 'left', paddingLeft: '0', paddingRight: '0' }}>: {this.state.ticket.updatedDate}</Col></Row>
                        </Col>
                    </Row>

                </CardBody>
                <CardFooter style={{ paddingTop: '0.5%', paddingBottom: '1%' }}>
                    <Row>
                        {false && <Col sm='8' style={{ textAlign: 'left' }}><Button style={{ width: '25%', paddingTop: '0', paddingBottom: '0', marginRight: '1%' }} size="sm" outline color="success">Close</Button><Button style={{ width: '25%', paddingTop: '0', paddingBottom: '0', marginLeft: '1%' }} size="sm" outline color="warning">Message</Button></Col>}
                        <Col sm='auto' style={{ textAlign: 'left', color: '#0000008a', fontSize: '80%', margin: '0', paddingRight: '0' }}><i>Updated by</i></Col>
                        <Col sm='auto' style={{ textAlign: 'left', fontWeight: '500', color: '#0000008a', fontSize: '80%', margin: '0' }}>Mike Brenner</Col>
                    </Row>
                </CardFooter>
            </Card>
        );

    }
}

const mapDispatchToProps = dispatch => {

    return {
        fetchTickets: (params) => {
            //dispatch(fetchTicketsAPICall(params))
        }
    };
}

const mapStateToProps = function (state) {

};

export default connect(mapStateToProps, mapDispatchToProps)(TicketDetailCard);