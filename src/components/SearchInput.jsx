import React from 'react';
import { ListGroup, ListGroupItem, Input } from 'reactstrap';
import { FaUser, FaAngleDoubleRight } from 'react-icons/fa';
import history from '../history';

export default class SearchInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showList: false,
            selectedValue: ''
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleSelectOption = this.handleSelectOption.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleClick(e) {

        this.setState({ showList: true });
    }

    handleSelectOption(e) {
        this.setState({ selectedValue: e.target.innerText })
    }

    handleFocusOut(e) {
        this.setState({ showList: false });
    }

    handleChange(e) {
        this.setState({
            selectedValue: e.target.value
        });
    }

    render() {
        return (
            <div >
                <Input style={{ height: '25px', textSizeAdjust: 'auto' }}
                    type="text"
                    name="search"
                    id="exampleSearch"
                    placeholder=""
                    onClick={(e) => this.handleClick(e)}
                    onBlur={(e) => this.handleFocusOut(e)}
                    value={this.state.selectedValue}
                    onChange={this.handleChange}
                />
                {this.state.showList && <ListGroup style={{ position: 'absolute' }}>
                    {this.props.suggestions.map((suggestion) =>
                        <ListGroupItem type='suggestion' onMouseDown={(e) => this.handleSelectOption(e)}>{suggestion.userFullName}</ListGroupItem>)}

                </ListGroup>}

            </div>
        );
    }
}