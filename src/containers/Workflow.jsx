import React from 'react';
import diag from '../Workflow.png';
import {Row, Col, Container} from 'reactstrap';
class Workflow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div style={{ marginLeft: '1%', marginRight: '1%' }}>
                <Container style={{ marginTop: '3%' }}><Row style={{ textAlign: 'left' }}>
                    <h4>Workflow</h4>
                </Row>
                    <Row style={{ textAlign: 'left' }}>
                        <p>The workflow assists in finding the stage of the ticket.</p>
                    </Row>
                </Container>
                <hr></hr>
                <div style={{
                    paddingLeft: '20%'
                }}>
                    <img src={diag} alt="Cinque Terre" width="633" height="1263"></img>
                </div>
            </div>


        );
    }

}

export default Workflow;