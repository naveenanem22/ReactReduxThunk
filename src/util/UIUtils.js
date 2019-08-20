import { FaFilePdf, FaFileAlt, FaFileImage, FaFile, FaFileWord } from 'react-icons/fa';
import React from 'react';
import history from '../history';
import queryString from 'query-string';
import { TicketStatus, TicketStatusColorCode, Priority, TicketPriorityColorCode, TicketsSortByAsArray } from '../masterdata/ApplicationMasterData';

export const uiUtil = {

  loadFileIcon: function (fileType) {
    switch (fileType) {
      case 'txt':
        return (<FaFileAlt style={{ color: 'red', marginRight: '1%' }} />);
      case 'pdf':
        return (<FaFilePdf style={{ color: 'red', marginRight: '1%' }} />);
      case 'doc':
        return (<FaFileWord style={{ color: 'red', marginRight: '1%' }} />);
      default:
        return (<FaFile style={{ color: 'red', marginRight: '1%' }} />);
    }
  },

  getTicketStatusColorCode: function (ticketStatus) {
    switch (ticketStatus) {
      case TicketStatus.OPEN:
        return TicketStatusColorCode.OPEN;
      case TicketStatus.CLOSE:
        return TicketStatusColorCode.CLOSE;
      case TicketStatus.NEW:
        return TicketStatusColorCode.NEW;
      case TicketStatus.IN_PROCESS:
        return TicketStatusColorCode.IN_PROCESS;
      case TicketStatus.PENDING:
        return TicketStatusColorCode.PENDING;
      case TicketStatus.AWAIT_RESPONSE:
        return TicketStatusColorCode.AWAIT_RESPONSE;
      default:
        return TicketStatusColorCode.LIGHT

    }
  },
  getTicketPriorityColorCode: function (ticketPriority) {
    switch (ticketPriority) {
      case Priority.LOW:
        return TicketPriorityColorCode.LOW;
      case Priority.MEDIUM:
        return TicketPriorityColorCode.MEDIUM;
      case Priority.HIGH:
        return TicketPriorityColorCode.HIGH;
      default:
        return TicketPriorityColorCode.LOW;

    }
  },

  getTicketsSortByCode: function (ticketsSortByDisplayName) {
    console.log("ticketsSortByDisplayName: "+ticketsSortByDisplayName)
    var matchedOptionsArray = TicketsSortByAsArray.filter(item => {
      return item.displayName === ticketsSortByDisplayName;
    });

    if (matchedOptionsArray.length === 1) {
      console.log("matchedOptionsArray:");
      console.log(matchedOptionsArray);
      return matchedOptionsArray[0].code;
    }

    else
      return false;

  },

  truncate: function (n, useWordBoundary) {
    if (this.length <= n) { return this; }
    var subString = this.substr(0, n - 1);
    return (useWordBoundary
      ? subString.substr(0, subString.lastIndexOf(' '))
      : subString) + "...";
  }

}

export const urlUtil = {
  getURLParams: function () {
    var searchString = history.location.search;
    console.log(searchString);
    var params = queryString.parse(searchString);
    console.log("Extracted params: ");
    console.log(params);
    return params;
  }

}

export function loadFileIcon(fileType) {
  switch (fileType) {
    case 'txt':
      return (<FaFileAlt style={{ color: 'red', marginRight: '1%' }} />);
    case 'pdf':
      return (<FaFilePdf style={{ color: 'red', marginRight: '1%' }} />);
    case 'doc':
      return (<FaFileWord style={{ color: 'red', marginRight: '1%' }} />);
    default:
      return (<FaFile style={{ color: 'red', marginRight: '1%' }} />);
  }
}

export function getTicketStatusColorCode(ticketStatus) {
  switch (ticketStatus) {
    case TicketStatus.OPEN:
      return TicketStatusColorCode.OPEN;
    case TicketStatus.CLOSE:
      return TicketStatusColorCode.CLOSE;
    case TicketStatus.NEW:
      return TicketStatusColorCode.NEW;
    case TicketStatus.IN_PROCESS:
      return TicketStatusColorCode.IN_PROCESS;
    case TicketStatus.PENDING:
      return TicketStatusColorCode.PENDING;
    case TicketStatus.AWAIT_RESPONSE:
      return TicketStatusColorCode.AWAIT_RESPONSE;
    default:
      return TicketStatusColorCode.LIGHT

  }
}

export function getTicketPriorityColorCode(ticketPriority) {
  switch (ticketPriority) {
    case Priority.LOW:
      return TicketPriorityColorCode.LOW;
    case Priority.MEDIUM:
      return TicketPriorityColorCode.MEDIUM;
    case Priority.HIGH:
      return TicketPriorityColorCode.HIGH;
    default:
      return TicketPriorityColorCode.LOW;

  }
}

export function truncate(n, useWordBoundary) {
  if (this.length <= n) { return this; }
  var subString = this.substr(0, n - 1);
  return (useWordBoundary
    ? subString.substr(0, subString.lastIndexOf(' '))
    : subString) + "...";
};

/********URL Utils START******/
export function getURLParams() {
  var searchString = history.location.search;
  console.log(searchString);
  var params = queryString.parse(searchString);
  console.log("Extracted params: ");
  console.log(params);
  return params;
}

/********URL Utils END******/