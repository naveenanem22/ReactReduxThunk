import React from 'react';
import { ListGroup, ListGroupItem, Input} from 'reactstrap';
import { FaUser, FaAngleDoubleRight } from 'react-icons/fa';
import history from '../history';

export default class SearchInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showList:false
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleSelectOption = this.handleSelectOption.bind(this);
    }

    handleClick(e){
        
        this.setState({ showList: true});
    }

    handleSelectOption(e){
        console.log("Suggestion clicked");
    }

    handleFocusOut(e){
        console.log("onblur");
        this.setState({showList: false});
    }

    render() {
        return (
            <div >
                <Input
                    type="search"
                    name="search"
                    id="exampleSearch"
                    placeholder=""
                    onClick={(e)=>this.handleClick(e)}
                    onBlur={(e)=>this.handleFocusOut(e)}
                />
                {this.state.showList && <ListGroup style={{ position: 'absolute' }}>
                    <ListGroupItem type='suggestion' onMouseDown={(e)=>this.handleSelectOption(e)}>Cras justo odio</ListGroupItem>
                    <ListGroupItem type='suggestion' onMouseDown={(e)=>this.handleSelectOption(e)}>Dapibus ac facilisis in</ListGroupItem>
                    <ListGroupItem type='suggestion' onMouseDown={(e)=>this.handleSelectOption(e)}>Morbi leo risus</ListGroupItem>
                    <ListGroupItem type='suggestion' onMouseDown={(e)=>this.handleSelectOption(e)}>Porta ac consectetur ac</ListGroupItem>
                    <ListGroupItem type='suggestion' onMouseDown={(e)=>this.handleSelectOption(e)}>Vestibulum at eros</ListGroupItem>
                </ListGroup>}

            </div>
        );
    }
}