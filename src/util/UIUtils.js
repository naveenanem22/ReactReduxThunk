import { FaFilePdf, FaFileAlt, FaFileImage, FaFile, FaFileWord } from 'react-icons/fa';
import React from 'react';
export function loadFileIcon(fileType) {
    switch (fileType) {
      case 'txt':
        return (<FaFileAlt style={{ color: 'red', marginRight: '1%' }} />);
      case 'pdf':
        return (<FaFilePdf style={{color : 'red', marginRight: '1%'}} />);
      case 'doc':
        return (<FaFileWord style={{color : 'red', marginRight : '1%'}} />);
      default :
        return (<FaFile style = {{color : 'red', marginRight: '1%'}} />);
    }
}