import React, {useState, useContext} from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import ThemeContext from './themeContext';

import Header from './Header';

describe('header click', () => {

  let container = null;

  beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
  });
  
  afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  test('click', () => {
    const onChange = jest.fn(); // mock function
    function Comp(props) {
      return (
        <ThemeContext.Provider value = {'dark'}>
          <Header
            onChange = {onChange}
          />
        </ThemeContext.Provider>
      );
    };

    act(() => {
      render(
        <Comp 
        />, container
      );
    });
    // button in the Header component which calls onChange
    const button = document.getElementById("themeBtn"); 
  
    act(() => {
      button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(onChange).toHaveBeenCalledTimes(1);

    act(() => {
      button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(onChange).toHaveBeenCalledTimes(2);
  });
});