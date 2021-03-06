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
            keyword:'',
            isInValid:this.props.isInValid
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleSelectOption = this.handleSelectOption.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    static getDerivedStateFromProps(props, current_state) {
        if (current_state.isInValid !== props.isInValid) {
            return {
                isInValid: props.isInValid              
            }
          }
          return null
      }

    handleKeyDown(e){
        if (e.keyCode === 8) {
            console.log('delete');
           }
    }

    

    handleClick(e) {

        this.setState({ showList: true });
    }

    handleSelectOption(e) {
        this.props.onSelectSuggestion(e.target.innerText);
        this.setState({ selectedValue: e.target.innerText })
    }

    handleFocusOut(e) {
        this.setState({ showList: false });
    }

    handleChange(e) {
        console.log(e.target.value);
        //Filter suggestions list with key
        this.props.onSelectSuggestion(e.target.value);

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
                <Input invalid={this.state.isInValid} style={{ height: '25px', textSizeAdjust: 'auto' }}
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
                {this.state.showList && <ListGroup style={{ width:'15%', position: 'absolute' }}>
                    { filteredSuggetions.map((suggestion) =>
                        <ListGroupItem action tag="a" href="#" type='suggestion' onMouseDown={(e) => this.handleSelectOption(e)}>{suggestion.name}</ListGroupItem>)}

                </ListGroup>}

            </div>
        );
    }
}