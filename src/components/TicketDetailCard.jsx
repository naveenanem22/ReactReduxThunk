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
        <Card style={{width:'100%'}}>
        <CardHeader style={{paddingTop:'1%', paddingBottom:'1%'}}><Row>
            <Col style={{textAlign:'left'}}><Badge color="danger">High</Badge></Col>
            <Col style={{textAlign:'right'}}><p style={{color: '#0000008a',fontSize:'90%', margin:'0'}}>Days: 27</p></Col>
            </Row></CardHeader>
        <CardBody style={{paddingTop:'1%', paddingBottom:'1%'}}>
        <Row>
            <Col sm='8'>
            <Row style={{fontSize:'95%', fontWeight:600}}>Special Title Treatment</Row>
          <Row style={{fontSize:'90%', fontWeight:300}}>With supporting text below as a natural lead-in to additional content.</Row>
          </Col>
            <Col sm='4'>Need to paste some sort of image</Col>
        </Row>
          <Row><Button style={{paddingTop:'0', paddingBottom:'0'}} size="sm" outline color="success">Close</Button></Row>          
        </CardBody>
        <CardFooter style={{paddingTop:'0', paddingBottom:'0'}}>Footer</CardFooter>
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