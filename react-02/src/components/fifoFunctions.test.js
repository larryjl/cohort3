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
    expect(functions.forward([0,0], 1, [1,0]).point).toEqual([1,0]);
    expect(functions.forward([0,0], 10, [1,0]).point).toEqual([10,0]);
    expect(functions.forward([0,0], 2, [-1,0]).point).toEqual([-2,0]);
    expect(functions.forward([0,0], 2, [0,1]).point).toEqual([0,2]);
    expect(functions.forward([0,0], 2, [0,-1]).point).toEqual([0,-2]);

    expect(functions.forward([1,1], 2, [1,0]).point).toEqual([3,1]);
    expect(functions.forward([1,1], 2, [-1,0]).point).toEqual([-1,1]);
    expect(functions.forward([1,1], 2, [0,1]).point).toEqual([1,3]);
    expect(functions.forward([1,1], 2, [0,-1]).point).toEqual([1,-1]);


    expect(functions.forward([-1,-1], 2, [1,0]).point).toEqual([1,-1]);
    expect(functions.forward([-1,-1], 2, [-1,0]).point).toEqual([-3,-1]);
    expect(functions.forward([-1,-1], 2, [0,1]).point).toEqual([-1,1]);
    expect(functions.forward([-1,-1], 2, [0,-1]).point).toEqual([-1,-3]);
  });

  it('left turn', () => {
    const p = [0,0];
    expect(functions.turnLeft(p, [0,1]).direction).toEqual([-1,0]);
    expect(functions.turnLeft(p, [-1,0]).direction).toEqual([0,-1]);
    expect(functions.turnLeft(p, [0,-1]).direction).toEqual([1,0]);
    expect(functions.turnLeft(p, [1,0]).direction).toEqual([0,1]);
  });

  it('right turn', () => {
    const p = [0,0];
    expect(functions.turnRight(p, [0,1]).direction).toEqual([1,0]);
    expect(functions.turnRight(p, [-1,0]).direction).toEqual([0,1]);
    expect(functions.turnRight(p, [0,-1]).direction).toEqual([-1,0]);
    expect(functions.turnRight(p, [1,0]).direction).toEqual([0,-1]);
  });
});