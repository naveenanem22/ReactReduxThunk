import React from 'react';
import { Toast, ToastBody, ToastHeader, Spinner } from 'reactstrap';
import { FaCheckCircle } from 'react-icons/fa';

class SuccessToast extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      show: !this.state.show
    });
  }

  render() {
    return (
      <div>
        <Toast isOpen={this.state.show}>
          <ToastHeader toggle={this.toggle}>Toast title</ToastHeader>
          <ToastBody>
            This is a toast with a custom icon — check it out!
          </ToastBody>
        </Toast>
      </div>
    );
  }
}

export default SuccessToast;