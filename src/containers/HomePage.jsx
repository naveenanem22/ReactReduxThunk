import React from 'react';
import { Row, Col } from 'reactstrap';
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
                    <Col sm='6' style={{
                        padding: '0',
                        margin: '0',
                        height:'100%'
                    }}>
                        <div class='leftHome' style={{
                            height:'100%'
                        }}>
                            Text
                        </div>
                    </Col>
                    <Col sm='6' style={{
                        padding: '0',
                        height:'100%'
                    }}>
                        <div class='rightHome' style={{
                            height:'100%'
                        }}>
                        </div>
                    </Col>
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