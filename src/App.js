import React, { Component } from 'react';
import FunctionalDemo from './components/FunctionalDemo/FunctionalDemo'
//import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
//import './App.css';


export default class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    return <div>
      <h1> Hello, World!!!</h1>
      <p>The component below is a functional component.</p>
      <FunctionalDemo></FunctionalDemo>
    </div>;


  }


}
