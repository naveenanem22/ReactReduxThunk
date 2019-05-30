import { FaFilePdf, FaFileAlt, FaFileImage, FaFile, FaFileWord } from 'react-icons/fa';
import React from 'react';
import history from '../history';
import queryString from 'query-string';

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