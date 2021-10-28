import React from "react";
export const simpleFunction = () => {
  return "sample function message";
};
const Title = ({ children }) => {
  const sampleFunction = () => {
    return children;
  };
  const getSample = (indent) => {
    return indent;
  }
  return <h1>{sampleFunction()}</h1>;
};
export default Title;
