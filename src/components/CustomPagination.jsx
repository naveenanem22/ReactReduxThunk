import React, { Component } from "react";
import ReactDOM from "react-dom";
//import ReactPaginate from 'react-paginate';
import Pagination from "react-js-pagination";

class CustomPagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  handlePageChange(selectedPageNumber) {
    if (this.props.data.number !== selectedPageNumber) {
      this.props.onPaginationPageChange(selectedPageNumber);
    }

  }

  componentDidMount() {
  }

  componentDidUpdate(prevProps) {

  }

  render() {
    return (
      <div>
        <Pagination size='sm'
          activePage={this.props.data.number}
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
