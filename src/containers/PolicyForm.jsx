import React from 'react';
import { Row, Col, Container, Label } from 'reactstrap';

class PolicyForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <div style={{ marginLeft: '1%', marginRight: '1%' }}>
                <Container style={{ marginTop: '3%' }}><Row style={{ textAlign: 'left' }}>
                    <h4>Policy</h4>
                </Row>
                    <Row style={{ textAlign: 'left' }}>
                        <p>Be aware of the following do's and dont's that are applicable for ItsHelpdesk.</p>
                    </Row>
                </Container>
                <hr></hr>

                <Row style={{
                    marginTop: '1%'
                }}>
                    <Col>
                        <Label size='sm'>Do's:</Label>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <ul>
                            <li><Label size='sm'>Raise the ticket with.</Label></li>
                            <li><Label size='sm'>Track the ticket under.</Label></li>
                            <li><Label size='sm'>To converse and the ticket if resolved.</Label></li>
                        </ul>
                    </Col>
                </Row>

                <Row style={{
                    marginTop: '1%'
                }}>
                    <Col>
                        <Label size='sm'>Dont's:</Label>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <ul>
                            <li><Label size='sm'>Raise the ticket with.</Label></li>
                            <li><Label size='sm'>Track the ticket under.</Label></li>
                            <li><Label size='sm'>To converse and the ticket if resolved.</Label></li>
                        </ul>
                    </Col>
                </Row>
            </div>

        );
    }
}

export default PolicyForm;