import React from 'react';
import { Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import HeaderNavBar from "../components/HeaderNavBarHome";
import { connect } from 'react-redux';

import { ScaleLoader } from 'react-spinners';


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
                                <p>However, if you want only the background to change,
                                     while the text or other child elements would remain opaque,
                                     there is a way around it using RGBA. If you’re used to hex codes,
                                     you can learn about the other ways to define colors in CSS,
                                    namely predefined, RGB/RGBA, and HSL/HSLA colors</p>
                                <ol>
                                    <li>Coffee</li>
                                    <li>Tea</li>
                                    <li>Milk</li>
                                </ol>
                                <p>Login...</p>
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