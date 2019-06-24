import React from 'react';
import { Row, Col, Container, Label } from 'reactstrap';
import { connect } from 'react-redux';
import { faqs } from '../masterdata/ApplicationMasterData'

class FAQsForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div style={{ marginLeft: '1%', marginRight: '1%' }}>
                <Container style={{ marginTop: '3%' }}><Row style={{ textAlign: 'left' }}>
                    <h4>Frequently Asked Questions</h4>
                </Row>
                    <Row style={{ textAlign: 'left' }}>
                        <p>Please write to admin@itshelpdesk if your question is not listed.</p>
                    </Row>
                </Container>
                <hr></hr>
                <div style={{
                    marginTop:'1%'
                }}>
                    {faqs.map(faq => {
                        return (
                            <div style={{
                                marginBottom: '2%'
                            }}>
                                <Row>
                                    <Col>
                                        <Label size='sm' style={{
                                            fontWeight: '600',
                                            margin: '0',
                                            padding: '0'
                                        }}>{faq.question}</Label>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Label size='sm' style={{
                                            margin: '0',
                                            padding: '0'
                                        }}>{faq.answer}</Label>
                                    </Col>
                                </Row>
                            </div>
                        );
                    })}
                </div>


            </div>

        );
    }



}

const mapDispatchToProps = dispatch => {

    return {

    };
}

const mapStateToProps = function (state) {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FAQsForm);