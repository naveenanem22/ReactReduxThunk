import React from 'react';
import { Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import { FaToolbox } from 'react-icons/fa';

class PageUnderConstruction extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <div>
                <Row style={{
                    paddingTop: '200px',
                    paddingBottom: '200px',
                    paddingLeft: '350px'
                }}>

                    <Col size='sm' sm='12' style={{
                        height: '100%'
                    }}>Page under construction...</Col>
                </Row>


            </div>);

    }



}

const mapStateToProps = function (state) {
}
const mapActionsToProps = {
}



export default connect(mapStateToProps, mapActionsToProps)(PageUnderConstruction);