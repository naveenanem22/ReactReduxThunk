import React from 'react';
import { Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import HeaderNavBar from "../components/HeaderNavBarHome";
import { connect } from 'react-redux';

import { ScaleLoader } from 'react-spinners';
import { FaTicketAlt, FaChartLine, FaChartBar, FaHandshake } from 'react-icons/fa';
import { subHeading1, subHeading2, raiseTicket, resolveTicket, ticketAnalytics } from '../masterdata/ApplicationMasterData';


class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }

    }

    render() {
        return (
            <div >
                <div class='sticky'  >
                    <HeaderNavBar></HeaderNavBar>
                </div >
                <Row style={{
                    height: '89.8vh',
                    padding: '0',
                    margin: '0'
                }}>
                    <Col sm='12' style={{
                        padding: '0',
                        margin: '0',
                        height: '100%'
                    }}>
                        <div class='home' style={{
                            height: '100%',
                            width: '100%'
                        }}>
                            <div class="bg-text">
                                <h2>ITS HelpDesk</h2>
                                <p>{subHeading1}</p>
                                <p>{subHeading2}</p>
                                <Row style={{
                                    marginTop: '5%'
                                }}>
                                    <Col sm='4' >
                                        <div style={{
                                            borderRadius: '10px',
                                            border: '2px solid #ffffff'
                                        }}>
                                            <Row>
                                                <Col>
                                                    <FaTicketAlt size='90'></FaTicketAlt>
                                                </Col>

                                            </Row>
                                            <Row>
                                                <Col>
                                                    <div>{raiseTicket}</div>
                                                </Col>
                                            </Row>
                                        </div>

                                    </Col>
                                    <Col sm='4' >
                                        <div style={{
                                            borderRadius: '10px',
                                            border: '2px solid #ffffff'
                                        }}>
                                            <Row>
                                                <Col>
                                                    <FaHandshake size='90'></FaHandshake>
                                                </Col>

                                            </Row>
                                            <Row>
                                                <Col>
                                                    <div>{resolveTicket}</div>
                                                </Col>
                                            </Row>
                                        </div>
                                    </Col>
                                    <Col sm='4' >
                                        <div style={{
                                            borderRadius: '10px',
                                            border: '2px solid #ffffff'
                                        }}>
                                            <Row>
                                                <Col>
                                                    <FaChartLine size='90'></FaChartLine>
                                                </Col>

                                            </Row>
                                            <Row>
                                                <Col>
                                                    <div>{ticketAnalytics}</div>
                                                </Col>
                                            </Row>
                                        </div>

                                    </Col>
                                </Row>
                            </div>

                        </div>
                    </Col>
                    {/* <Col sm='6' style={{
                        padding: '0',
                        height:'100%'
                    }}>
                        <div class='rightHome' style={{
                            height:'100%'
                        }}>
                        </div>
                    </Col> */}
                </Row>


            </div>

        );
    }


}

const mapStateToProps = function (state) {
    return {
        isCreateTicketFormVisible: state.ticketList.isCreateTicketFormVisible,
        isCreateTicketSuccessFormVisible: state.ticketList.isCreateTicketSuccessFormVisible,
        isCreateTicketFailureFormVisible: state.ticketList.isCreateTicketFailureFormVisible

    }
}

export default connect(mapStateToProps)(HomePage);