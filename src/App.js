import React, { Component } from "react";
import FunctionalDemo from "./components/FunctionalDemo/FunctionalDemo";
import DropDown from "./components/DropDown/DropDown";

const items = [
  { id: 1, value: "Red" },
  { id: 2, value: "Blue" },
  { id: 3, value: "Green" },
];

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <h1> Hello, World!!!</h1>
        <p>The component below is a functional component.</p>
        <FunctionalDemo></FunctionalDemo>
        <DropDown items={items} title="Custom DropDown"></DropDown>
      </React.Fragment>
    );
  }
}
