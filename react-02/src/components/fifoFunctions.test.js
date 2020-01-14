import React, {useState, useEffect} from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import functions from './fifoFunctions';

describe('inputs', () => {
  const mockCallback = jest.fn();

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

  it('forward', () => {

  });

  it('left turn', () => {

  });

  it('right turn', () => {

  });
});