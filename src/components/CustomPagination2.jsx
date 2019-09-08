import React, { Component } from "react";
import ReactDOM from "react-dom";
//import ReactPaginate from 'react-paginate';
import Pagination from "react-js-pagination";
import { Row, Col, Input, Label, DropdownMenu, DropdownItem } from 'reactstrap'
import { timingSafeEqual } from "crypto";
import { TicketsSortBy } from "../masterdata/ApplicationMasterData";

class CustomPagination2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemsPerPage: this.props.data.size
    };
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleItemsPerPageChange = this.handleItemsPerPageChange.bind(this);
  }


  handlePageChange(selectedPageNumber) {
    if (this.props.data.number !== selectedPageNumber) {
      this.props.onPaginationPageChange(selectedPageNumber);
    }

  }

  handleItemsPerPageChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    }, () => {
      this.props.onPaginationItemsPerPageChange(this.state.itemsPerPage);
    });

  }


  componentDidMount() {
  }

  componentDidUpdate(prevProps) {

  }

  render() {

    return (
      <div>
        <Row>
          <Col sm='auto'>
            <Pagination size='sm'
              activePage={this.props.data.number}
              itemsCountPerPage={this.props.data.size}
              totalItemsCount={this.props.data.totalElements}
              pageRangeDisplayed={5}
              onChange={this.handlePageChange}
            />
          </Col>
          {/*  <Col sm='auto' style={{
            marginTop: '2%',
            paddingRight: '0'
          }}>
            <Label size='sm'>Page Size:</Label>
          </Col> */}
          <Col sm='auto' style={{
            marginTop: '3.5%'
          }}>
            <Input
              bsSize='sm'
              value={this.state.itemsPerPage}
              type="select"
              name="itemsPerPage"
              id="itemsPerPage"
              onChange={this.handleItemsPerPageChange}
            >
              <option value={3}>Per Page: 3</option>
              <option value={5}>Per Page: 5</option>
              <option value={10}>Per Page: 10</option>
              <option value={25}>Per Page: 25</option>
              <option value={50}>Per Page: 50</option>
              <option value={100}>Per Page: 100</option>

            </Input>
          </Col>

        </Row>


      </div>
    );
  }
}


export default CustomPagination2;
