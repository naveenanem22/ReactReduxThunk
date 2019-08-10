import React from 'react';
import { Toast, ToastBody, ToastHeader, Spinner } from 'reactstrap';
import { FaCheckCircle } from 'react-icons/fa';

class SuccessToast extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true
    };

    this.onDismiss = this.onDismiss.bind(this);
  }

  onDismiss() {
    this.setState({ visible: false });
  }

  render() {
    return (
      <Toast>
        <ToastHeader icon={<Spinner size="sm" />}>
          Reactstrap
        </ToastHeader>
        <ToastBody>
          This is a toast with a custom icon — check it out!
        </ToastBody>
      </Toast>
    );
  }
}

export default SuccessToast;