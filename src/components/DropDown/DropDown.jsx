import React, { Component } from "react";
import "./DropDown.css";

class DropDown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
    this.toggle = this.toggle.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  toggle() {
    this.setState((prevState) => ({
      isOpen: !prevState.isOpen,
    }));
  }

  render() {
    return (
      <div className="dd-wrapper">
        <div
          role="button"
          tabIndex={0}
          onClick={() => this.toggle()}
          className="dd-header"
        >
          <div className="dd-header-title" onClick={() => this.toggle()}>
            <p className="dd-header-title-bold">{this.props.title}</p>
          </div>
          <div className="dd-header-action">
            <p>{this.state.isOpen ? "Close" : "Open"}</p>
          </div>
        </div>
        {this.state.isOpen && (
          <ul className="dd-list">
            {this.props.items.map((item) => (
              <li className="dd-list-item" key={item.id}>
                <button type="button" onClick={() => this.handleOnClick(item)}>
                  <span>{item.value}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

export default DropDown;
