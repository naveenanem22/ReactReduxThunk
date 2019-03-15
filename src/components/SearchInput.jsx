import React from 'react';
import { ListGroup, ListGroupItem, Input } from 'reactstrap';
import { FaUser, FaAngleDoubleRight, FaTruckMonster } from 'react-icons/fa';
import history from '../history';

export default class SearchInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showList: false,
            selectedValue: '',
            keyword:''
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
        console.log(e.target.value);
        //Filter suggestions list with key
        

        this.setState({
            selectedValue: e.target.value,
            keyword:e.target.value,
            showList : e.target.value==''?false:true
        });

    }

    render() {
        const filteredSuggetions = this.props.suggestions.filter((suggestion) => {
            return suggestion.name.includes(this.state.keyword);
        })
        return (
            <div >
                <Input style={{ height: '25px', textSizeAdjust: 'auto' }}
                    type="text"
                    name="search"
                    id="exampleSearch"
                    placeholder=""
                    //onClick={(e) => this.handleClick(e)}
                    onBlur={(e) => this.handleFocusOut(e)}
                    value={this.state.selectedValue}
                    onChange={this.handleChange}
                    autoComplete = "off"
                />
                {this.state.showList && <ListGroup style={{ position: 'absolute' }}>
                    { filteredSuggetions.map((suggestion) =>
                        <ListGroupItem type='suggestion' onMouseDown={(e) => this.handleSelectOption(e)}>{suggestion.name}</ListGroupItem>)}

                </ListGroup>}

            </div>
        );
    }
}