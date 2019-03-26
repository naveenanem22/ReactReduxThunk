import React, { Component } from 'react';
import {connect} from 'react-redux';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {updateUser} from './actions/UserActions';
import {addProduct} from './actions/ProductActions';
import {getProductsAPICall} from './actions/ProductActions'
import './App.css';



class App extends Component {

  constructor(props){
    super(props);

    this.onUpdateUser = this.onUpdateUser.bind(this);
    this.onAddProduct = this.onAddProduct.bind(this);
    this.onGetProduct = this.onGetProduct.bind(this);

  }

  onUpdateUser(event){
    this.props.onUpdateUser({"name": Math.floor((Math.random() * 1000) + 1)});
    
  }

  onAddProduct(event){    
    this.props.onAddProduct({"name": Math.floor((Math.random() * 1000) + 1)});
    
  }

  onGetProduct(event){
    this.props.onGetProduct();
  }

  

 

  render() {
    //console.log(this.props);
    
    return (

      <div className="App">         
      {/* <CreateTicketPage></CreateTicketPage> */}
    </div>
      /*<div >
       <h2>React-Redux Sample Application - User</h2> 
       <input type="text" onChange = {this.onUpdateUser} />
       <button type="submit" onClick = {this.onAddProduct}>Click to see all Products</button>
       <button type="submit" onClick = {this.onGetProduct}>Product from API Call</button>
       <ul>{this.props.products.map((product) =>
        <li key = {product.name}>{product.name}</li>
        )}</ul>
       
      </div>*/
      
    );
  }
}

const mapStateToProps = function (state){
  return {
    products: state.products,
    user : state.user   

  }
}

 
const mapActionsToProps = {
  onAddProduct : addProduct,
  onUpdateUser : updateUser,
  onGetProduct : getProductsAPICall
  
}

export default connect(mapStateToProps, mapActionsToProps)(App);
