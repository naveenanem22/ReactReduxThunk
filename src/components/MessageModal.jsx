import React from 'react';
import { Button, Container, Modal, FormText, Row, Col, ModalHeader, ModalBody, ModalFooter, Input, Label, CardFooter, Form, FormGroup } from 'reactstrap';
import { HalfCircleSpinner } from 'react-epic-spinners';
import { modalMessageAndUpdateTicketAPICall, closeTicketAPICall, downloadAttachmentAPICall, fetchCreatedTicketDetailsAPICall } from '../actions/TicketActions'
import { connect } from 'react-redux';
import { TicketStatus, Role } from '../masterdata/ApplicationMasterData';

class MessageModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: this.props.data.isOpen,
            unmountOnClose: true,
            isUpload: false,
            isCommentInvalid: false,
            commentedOn: '',
            id: this.props.ticket.id,
            status: ''
        };

        this.toggle = this.toggle.bind(this);
        this.changeUnmountOnClose = this.changeUnmountOnClose.bind(this);
        this.toggleUpload = this.toggleUpload.bind(this);
        this.handleCommentChange = this.handleCommentChange.bind(this);
        this.handleAddMessage = this.handleAddMessage.bind(this);
        this.onFileUpload = this.onFileUpload.bind(this);
    }

    onFileUpload(e) {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.files[0]
        })
    }

    handleCommentChange(e) {
        this.setState({
            comment: e.target.value,
            isCommentInvalid: false
        })
    }

    handleAddMessage() {
        var params = {};
        if (this.state.comment === '') {
            this.setState({
                isCommentInvalid: true
            });
        }
        else {
            params.comment = this.state.comment;
            params.commentedOn = new Date(Date.now()).toISOString();
            params.id = this.props.ticket.id;
            if (this.state.isUpload) {
                if (this.state.file1)
                    params.file1 = this.state.file1;
                if (this.state.file2)
                    params.file2 = this.state.file2;
                if (this.state.file2)
                    params.file3 = this.state.file2;
            }

            var queryParams = {};
            //if (localStorage.getItem('role') === Role.ROLE_MANAGER)
                queryParams.managedByMe = true;
            this.props.addMessage(params, queryParams);

        }


    }

    toggleUpload() {

        this.setState(prevState => ({
            isUpload: !prevState.isUpload
        }));
    }


    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    changeUnmountOnClose(e) {
        let value = e.target.value;
        this.setState({ unmountOnClose: JSON.parse(value) });
    }

    componentDidUpdate(prevProps) {
        if(prevProps.modalMessageAndUpdateTicketAPICallStatus.success !== 
            this.props.modalMessageAndUpdateTicketAPICallStatus.success 
            && this.props.modalMessageAndUpdateTicketAPICallStatus.success)
            this.props.handleAddMessageComplete(this.props.modalMessageAndUpdateTicketAPICallStatus);
    }

    render() {
        console.log('From MessageModal render');
        console.log(this.props);
        console.log(this.state);
        return (
            <div>
                <Modal isOpen={this.props.data.isOpen} toggle={this.props.handleToggle} className={this.props.className} unmountOnClose={this.state.unmountOnClose}>
                    <ModalHeader toggle={this.props.handleToggle}>Modal title</ModalHeader>
                    <ModalBody >
                        {/* <Input type="textarea" placeholder="Write something (data should remain in modal if unmountOnClose is set to false)" rows={5} /> */}
                        <Container>
                            <Row >
                                <Col >
                                    <Input invalid={this.state.isCommentInvalid} size='sm' type="textarea" name="comment" id="comment" onChange={this.handleCommentChange} rows={5} />
                                </Col>
                            </Row>
                        </Container>

                    </ModalBody>
                    <ModalFooter style={{
                        paddingLeft: '0',
                        paddingRight: '0'
                    }}>
                        <Container>
                            <Row style={{ 'height': '8%', 'width': '99%', 'marginLeft': '1%', 'marginTop': '1%' }}>
                                <Col>
                                    <Button onClick={this.toggleUpload}
                                        type="submit"
                                        outline
                                        color="secondary"
                                        size="sm"
                                    >Attach Files</Button>
                                </Col>
                                {this.props.closeTicketAPICallStatus.requested
                                    && <Col sm='auto' style={{
                                        textAlign: 'right',
                                        paddingTop: '1%',
                                        paddingRight: '0'
                                    }}>
                                        <HalfCircleSpinner
                                            size='20'
                                            color='blue'>
                                        </HalfCircleSpinner>
                                    </Col>}
                                <Col sm='auto' style={{
                                    paddingLeft: '0',
                                    paddingRight: '0'
                                }}>
                                    <Button disabled={this.props.closeTicketAPICallStatus.requested}
                                        type="submit"
                                        color="link"
                                        size="sm"
                                        onClick={this.onSubmitCloseTicket}>
                                        Close Ticket</Button>
                                </Col>

                                <Col sm='auto' style={{
                                    paddingTop: '0.7%',
                                    paddingLeft: '0',
                                    paddingRight: '0'
                                }}>
                                    or
                        </Col>
                                {this.props.modalMessageAndUpdateTicketAPICallStatus.requested
                                    && <Col sm='auto' style={{
                                        textAlign: 'right',
                                        paddingTop: '1%',
                                        paddingRight: '0'
                                    }}>
                                        <HalfCircleSpinner
                                            size='20'
                                            color='blue'>
                                        </HalfCircleSpinner>
                                    </Col>}

                                <Col sm='auto'>
                                    <Button
                                        type="submit"
                                        color="info"
                                        size="sm"
                                        disabled={this.props.modalMessageAndUpdateTicketAPICallStatus.requested}
                                        style={{ 'marginLeft': '2%' }}
                                        onClick={this.handleAddMessage}>
                                        Message</Button>
                                </Col>
                            </Row>

                        </Container>
                    </ModalFooter>
                    {this.state.isUpload && <CardFooter style={{
                        padding: '0',
                        marginTop: '1%'
                    }}>
                        <Container>
                            <Row>
                                <FormGroup style={{ 'width': '90%', 'paddingLeft': '5%', 'paddingTop': '2%' }}>
                                    <Label size='sm' for="attachments">Attachments</Label>
                                    <Input size='sm' type="file" name="file1" id="file1" onChange={this.onFileUpload} />
                                    <Input size='sm' type="file" name="file2" id="file2" onChange={this.onFileUpload} />
                                    <Input size='sm' type="file" name="file3" id="file3" onChange={this.onFileUpload} />
                                    <FormText color="muted">
                                        Any files that can assist the corresponding team to resolve the issues at the earliest.
</FormText>
                                </FormGroup>

                            </Row>
                        </Container>
                    </CardFooter>}
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = function (state) {
    return {
        ticket: state.ticketDetails.ticket,
        modalMessageAndUpdateTicketAPICallStatus: state.serviceCallStatus.modalMessageAndUpdateTicketAPI,
        closeTicketAPICallStatus: state.serviceCallStatus.closeTicketAPI,

    }
}



const mapActionsToProps = dispatch => {

    return {

        addMessage: (params,queryParams) => {
            dispatch(modalMessageAndUpdateTicketAPICall(params, queryParams));
        },
        closeTicket: (params) => {
            dispatch(closeTicketAPICall(params));
        }

    };
}

export default connect(mapStateToProps, mapActionsToProps)(MessageModal);
