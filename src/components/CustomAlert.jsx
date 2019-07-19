import React from 'react';
import { Alert } from 'reactstrap';

class CustomAlert extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }

    }


    render() {
        return (<Alert color={this.props.data.alertColor} isOpen={this.props.data.isOpen} toggle={this.onDismissAlert}>
            <h4 className="alert-heading">{this.props.data.messageHeader}</h4>
            <p>{this.props.data.detailedMessage}</p>
            <hr />
            <p className="mb-0">{this.props.data.defaultFooterMessage}</p>
        </Alert>)
    }
}

export default CustomAlert;