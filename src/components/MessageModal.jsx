import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Form, FormGroup } from 'reactstrap';

class MessageModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: this.props.data.isOpen,
            unmountOnClose: true
        };

        this.toggle = this.toggle.bind(this);
        this.changeUnmountOnClose = this.changeUnmountOnClose.bind(this);
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
    }

    render() {
        console.log('From MessageModal render');
        console.log(this.props);
        console.log(this.state);
        return (
            <div>
                <Modal isOpen={this.props.data.isOpen} toggle={this.props.handleToggle} className={this.props.className} unmountOnClose={this.state.unmountOnClose}>
                    <ModalHeader toggle={this.props.handleToggle}>Modal title</ModalHeader>
                    <ModalBody>
                        <Input type="textarea" placeholder="Write something (data should remain in modal if unmountOnClose is set to false)" rows={5} />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default MessageModal;