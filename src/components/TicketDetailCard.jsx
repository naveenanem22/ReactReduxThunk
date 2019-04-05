import React from 'react';
import {connect} from 'react-redux';
import { Row, Col, Card, CardHeader, CardBody, CardTitle, CardText, Button, CardFooter} from 'reactstrap';
import { Badge} from 'reactstrap';

class TicketDetailCard extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isAlertVisible : true
        };

        this.onDismiss = this.onDismiss.bind(this);
    }

    onDismiss() {
        this.setState({ isAlertVisible: false });
    }    

    render(){
        return (
            <Card style={{ width: '100%', borderLeft: '1%' }}>
                <CardHeader style={{ paddingTop: '1%', paddingBottom: '1%', paddingRight:'0' }}><Row>
                    <Col sm='2' style={{ textAlign: 'left' }}><Badge color="danger">High</Badge></Col>
                    <Col sm='4' style={{ textAlign: 'center' }}>112658</Col>
                    <Col sm='3' style={{ textAlign: 'right', color: '#0000008a', fontSize: '80%', margin: '0', paddingRight: '0' }}><i>Created by</i></Col>
                    <Col sm='3' style={{ textAlign: 'left', fontWeight: '500', color: '#0000008a', fontSize: '80%', margin: '0' }}>Naveen Kumar Anem</Col>
                </Row></CardHeader>
                <CardBody style={{ paddingTop: '1%', paddingBottom: '1%' }}>
                    <Row>
                        <Col sm='8'>
                            <Row><Col style={{ fontSize: '90%', fontWeight: 600 }}>Special Title Treatment</Col></Row>
                            <Row><Col style={{ fontSize: '90%', fontWeight: 300 }}>With supporting text below as a natural lead-in to additional content.</Col></Row>

                        </Col>
                        <Col sm='4' style={{ borderLeft: '1px solid rgba(0,0,0,.125)' }}>
                            <Row><Col style={{ color: '#0000008a', fontSize: '80%', textAlign: 'left' }}><i>Status</i></Col><Col></Col></Row>
                            <Row><Col style={{ color: '#0000008a', fontSize: '80%', textAlign: 'left' }}><i>Days Open</i></Col></Row>
                            <Row><Col style={{ color: '#0000008a', fontSize: '80%', textAlign: 'left' }}><i>Department</i></Col></Row>
                        </Col>
                    </Row>

                </CardBody>
                <CardFooter style={{ paddingTop: '0.5%', paddingBottom: '1%' }}>
                    <Row>
                    <Col sm='8'style={{ textAlign: 'left' }}><Button style={{ width: '25%', paddingTop: '0', paddingBottom: '0', marginRight: '1%' }} size="sm" outline color="success">Close</Button><Button style={{ width: '25%', paddingTop: '0', paddingBottom: '0', marginLeft: '1%' }} size="sm" outline color="warning">Message</Button></Col>
                        <Col sm='2' style={{ textAlign: 'right', color: '#0000008a', fontSize: '80%', margin: '0', paddingRight: '0' }}><i>Updated by</i></Col>
                        <Col sm='2' style={{ textAlign: 'left', fontWeight: '500', color: '#0000008a', fontSize: '80%', margin: '0' }}>Mike Brenner</Col>
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