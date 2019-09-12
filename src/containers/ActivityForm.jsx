import React from 'react';
import { addMessageAPICall, closeTicketAPICall, downloadAttachmentAPICall, fetchTicketDetailsAPICall } from '../actions/TicketActions'
import { connect } from 'react-redux';
import { Badge, Row, Col, Container, Input, FormGroup, Label, FormText } from 'reactstrap';
import { Button, Card, CardBody, CardHeader, CardText, CardTitle } from 'reactstrap';
import { FaEnvelope, FaMobile, FaHome, FaBuilding } from 'react-icons/fa';
import { loadFileIcon } from '../util/UIUtils';
import history from '../history';
import queryString from 'query-string';
import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar'


class ActivityForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
    };

  }


  componentDidMount() {
    //Extracing params from url
    console.log("Search string: ");
    var searchString = history.location.search;
    console.log(searchString);
    var params = queryString.parse(searchString);
    console.log("Extracted params: ");
    console.log(params);

    //Show SelectTicketMessage if search-string contains the key: status
    if (params.status) {
      this.setState({
        showSelectTicketMsg: true
      })
    }

    //Make fetchTicketDetailsAPICall if the search-string contains key: ticketId
    if (params.ticketId) {
      this.props.fetchTicketDetails({
        ticketId: params.ticketId
      });
    }
  }


  render() {


    return (
      <PerfectScrollbar style={{
        height: '100%',
        width: '100%'
      }}>
        <div>

          <Card style={{
            marginTop:'1%'
          }}>
            <CardHeader style={{
                  margin: '0',
                  paddingLeft: '2%',
                  paddingRight: '2%',
                  paddingTop:'1%',
                  paddingBottom:'1%'

                }}>
              <Label size='sm' style={{
                margin: '0',
                padding: '0'
              }}>TicketID: 112233</Label>
            </CardHeader>
            <CardBody style={{
                  margin: '0',
                  paddingLeft: '2%',
                  paddingRight: '2%',
                  paddingTop:'0',
                  paddingBottom:'0'
                }}>
                <CardText style={{
                  margin: '0',
                  padding: '0'
                }}><Label size='sm' style={{
                  margin: '0',
                  padding: '0'
                }}>With supporting text below as a natural lead-in to additional content</Label></CardText>
              </CardBody>
          </Card>

          <Card style={{
            marginTop:'1%'
          }}>
            <CardHeader style={{
                  margin: '0',
                  paddingLeft: '2%',
                  paddingRight: '2%',
                  paddingTop:'1%',
                  paddingBottom:'1%'

                }}>
              <Label size='sm' style={{
                margin: '0',
                padding: '0'
              }}>TicketID: 112233</Label>
            </CardHeader>
            <CardBody style={{
                  margin: '0',
                  paddingLeft: '2%',
                  paddingRight: '2%',
                  paddingTop:'0',
                  paddingBottom:'0'
                }}>
                <CardText style={{
                  margin: '0',
                  padding: '0'
                }}><Label size='sm' style={{
                  margin: '0',
                  padding: '0'
                }}>With supporting text below as a natural lead-in to additional content</Label></CardText>
              </CardBody>
          </Card><Card style={{
            marginTop:'1%'
          }}>
            <CardHeader style={{
                  margin: '0',
                  paddingLeft: '2%',
                  paddingRight: '2%',
                  paddingTop:'1%',
                  paddingBottom:'1%'

                }}>
              <Label size='sm' style={{
                margin: '0',
                padding: '0'
              }}>TicketID: 112233</Label>
            </CardHeader>
            <CardBody style={{
                  margin: '0',
                  paddingLeft: '2%',
                  paddingRight: '2%',
                  paddingTop:'0',
                  paddingBottom:'0'
                }}>
                <CardText style={{
                  margin: '0',
                  padding: '0'
                }}><Label size='sm' style={{
                  margin: '0',
                  padding: '0'
                }}>With supporting text below as a natural lead-in to additional content</Label></CardText>
              </CardBody>
          </Card><Card style={{
            marginTop:'1%'
          }}>
            <CardHeader style={{
                  margin: '0',
                  paddingLeft: '2%',
                  paddingRight: '2%',
                  paddingTop:'1%',
                  paddingBottom:'1%'

                }}>
              <Label size='sm' style={{
                margin: '0',
                padding: '0'
              }}>TicketID: 112233</Label>
            </CardHeader>
            <CardBody style={{
                  margin: '0',
                  paddingLeft: '2%',
                  paddingRight: '2%',
                  paddingTop:'0',
                  paddingBottom:'0'
                }}>
                <CardText style={{
                  margin: '0',
                  padding: '0'
                }}><Label size='sm' style={{
                  margin: '0',
                  padding: '0'
                }}>With supporting text below as a natural lead-in to additional content</Label></CardText>
              </CardBody>
          </Card><Card style={{
            marginTop:'1%'
          }}>
            <CardHeader style={{
                  margin: '0',
                  paddingLeft: '2%',
                  paddingRight: '2%',
                  paddingTop:'1%',
                  paddingBottom:'1%'

                }}>
              <Label size='sm' style={{
                margin: '0',
                padding: '0'
              }}>TicketID: 112233</Label>
            </CardHeader>
            <CardBody style={{
                  margin: '0',
                  paddingLeft: '2%',
                  paddingRight: '2%',
                  paddingTop:'0',
                  paddingBottom:'0'
                }}>
                <CardText style={{
                  margin: '0',
                  padding: '0'
                }}><Label size='sm' style={{
                  margin: '0',
                  padding: '0'
                }}>With supporting text below as a natural lead-in to additional content</Label></CardText>
              </CardBody>
          </Card>

            {/*  <Row style={{
            margin: '0',
            padding: '0'
          }}>
            <Col style={{
              textAlign: 'left',
              fontSize: 'small',
              fontWeight: 500,
              margin: '0',
              padding: '0'
            }}>Activity Log</Col>
          </Row>
          <Row style={{
            margin: '0',
            padding: '0'
          }}>
            <Col style={{  margin: '0',
            padding: '0',textAlign: 'left', fontSize: '70%', fontWeight: 400 }}>Organizational Ticket activity</Col>
          </Row>

          <Row style={{ marginLeft: '0',marginRight:'0',
            padding: '0',marginTop: '5%' }}>
            <Col><hr></hr></Col>
          </Row>

          <Row style={{
            margin: '0',
            padding: '0'
          }}>
            <Col style={{  margin: '0',
            padding: '0',
            textAlign: 'left', fontSize: 'small', fontWeight: 500 }}>About Me</Col>
          </Row>
          <Row style={{
            margin: '0',
            padding: '0'
          }}>
            <Col style={{
              margin: '0',
              padding: '0', textAlign: 'left', fontSize: '75%', fontWeight: 400
            }}>Madison id multi-million-dollar campaigns. Her background in brand strategy, visual d
              Madison id multi-million-dollar campaigns. Her background in brand strategy, visual
              Madison id multi-million-dollar campaigns. Her background in brand strategy, visual
              Madison id multi-million-dollar campaigns. Her background in brand strategy, visual
              Madison id multi-million-dollar campaigns. Her background in brand strategy, visual
              Madison id multi-million-dollar campaigns. Her background in brand strategy, visual
              Madison id multi-million-dollar campaigns. Her background in brand strategy, visual
          Madison id multi-million-dollar campaigns. Her background in brand strategy, visualesign, and account management inform her mindful but competitive approach.</Col>
          </Row>

          <Row style={{
            margin: '0',
            padding: '0'
          }}>
            <Col><hr></hr></Col>
          </Row> */}
        </div>
      </PerfectScrollbar>

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
        downloadAttachment: downloadAttachmentAPICall,
        fetchTicketDetails: fetchTicketDetailsAPICall
      }
      
export default connect(mapStateToProps, mapActionsToProps)(ActivityForm);