import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

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
    const onChange = jest.fn();

    act(() => {
        render(
        <Header
          onChange = {onChange}
        />, 
        container
      );
    });

    const button = document.getElementById("themeBtn");
    expect(button.state.theme).toBe('dark');
  
    act(() => {
      button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(button.state.theme).toBe('light');
    expect(onChange.mock.calls[0][0]).toBe('light');

    act(() => {
      button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(onChange).toHaveBeenCalledTimes(2);
    expect(button.state.theme).toBe('dark');

    expect(onChange.mock.calls[1][0]).toBe('dark');
  });
});