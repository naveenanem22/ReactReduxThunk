import React from 'react';
import history from '../history';
import { connect } from 'react-redux';
import{Row, Col, Container} from 'reactstrap';

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
                    <h4>Welcome, Naveen Kumar</h4>
                </Row>
                    <Row style={{ textAlign: 'left' }}>
                        <p>Last login: 11th May 2019: 11:25:30Hrs</p>
                    </Row>
                </Container>
            </div>

        );
    }

}

const mapDispatchToProps = dispatch => {

    return {

    };
}

const mapStateToProps = function (state) {

};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeHome);