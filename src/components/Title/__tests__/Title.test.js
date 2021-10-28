import React from "react";
import { shallow } from "enzyme";
import Title, { simpleFunction } from "../Title";
const title = "Test Title";
let wrapped = shallow(<Title>{title}</Title>);
describe("Title", () => {
  it("should render the Title Component correctly", () => {
    expect(wrapped).toMatchSnapshot();
  });
  it("renders the Titles children", () => {
    expect(wrapped.find("h1").text()).toEqual(title);
  });
  it("simpleFunction returns the expected message", () => {
    expect(simpleFunction()).toEqual("sample function message");
  });  
});
