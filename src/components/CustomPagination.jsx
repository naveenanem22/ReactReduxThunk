import React, { Component } from "react";
import ReactDOM from "react-dom";
//import ReactPaginate from 'react-paginate';
import Pagination from "react-js-pagination";
 
class CustomPagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: this.props.data.number
    };
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({activePage: pageNumber});
  }

  render() {
    return (
      <div>
        <Pagination size='sm'
          activePage={this.state.activePage}
          itemsCountPerPage={this.props.data.size}
          totalItemsCount={this.props.data.totalElements}
          pageRangeDisplayed={5}
          onChange={this.handlePageChange}
        />
      </div>
    );
  }
}


export default CustomPagination;
 