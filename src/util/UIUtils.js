import { FaFilePdf, FaFileAlt, FaFileImage, FaFile, FaFileWord } from 'react-icons/fa';
import React from 'react';
import history from '../history';
import queryString from 'query-string';
import {TicketStatus, TicketStatusColorCode} from '../masterdata/ApplicationMasterData';

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