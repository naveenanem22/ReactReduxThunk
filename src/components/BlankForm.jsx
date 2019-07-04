import React, { Component } from "react";
import {
    Card, Button, CardHeader, CardFooter, CardBody,
    CardTitle, CardText
} from 'reactstrap';
import { FaExclamation, FaExclamationCircle, FaExclamationTriangle } from "react-icons/fa";

class BlankForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (<div>
            <Card>
                <CardHeader tag="h5">No Ticket Selected</CardHeader>
                <CardBody>
                    <CardTitle style={{textAlign:'center'}}><FaExclamationCircle color='gray' size='70'></FaExclamationCircle></CardTitle>
                    <CardText style={{textAlign:'center'}} className="text-muted">Select atleast one ticket to display the details.</CardText>
                    
                </CardBody>
            </Card>

        </div>);
    }
}

export default BlankForm;