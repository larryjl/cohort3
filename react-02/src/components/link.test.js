import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import {Link, linkNode, linkList, functions} from './link';

describe('Link component', () => {

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

test('', () => {
    act(() => {
      // render components
      render(<Link />, container);
    });
    // make assertions
  });
});

describe.only('linkNode', () => {
  test('show', () => {
    const node = new linkNode('a', 0, null);
    node.show('subject: a, amount: 0');
  });

  test('naive list', () => {
    const list = {
      node0: new linkNode('a', 0),
      node1: new linkNode('b', 1),
      node2: new linkNode('c', 2),
    };
    list.head = list.node0;
    list.node0.forwardNode = list.node1;
    list.node1.forwardNode = list.node2;
    
    expect(list.head.amount).toBe(0);
    expect(list.head.forwardNode.amount).toBe(1);
    expect(list.head.forwardNode.forwardNode.amount).toBe(2);
  });

test('single line nested list', () => {
    const list = {
        head: new linkNode('a', 0, 
        new linkNode('b', 1, 
        new linkNode('c', 2, null)))
    };
    expect(list.head.amount).toBe(0);
    expect(list.head.forwardNode.amount).toBe(1);
    expect(list.head.forwardNode.forwardNode.amount).toBe(2);
  });

  test('generic iterated list', () => {
    const data = [
      ['a', 0],
      ['b', 1],
      ['c', 2]
    ];
    const n = data.length;
    let list = {head: null};
    let node = null;
    for (let i=n-1; i>=0; i--) {
      node = new linkNode(...data[i], node);
    };
    list.head = node;
    expect(list.head.amount).toBe(0);
    expect(list.head.forwardNode.amount).toBe(1);
    expect(list.head.forwardNode.forwardNode.amount).toBe(2);
  });

  test('list as class, add to start', () => {
    const data = [
      ['a', 0],
      ['b', 1],
      ['c', 2]
    ];
    const list = new linkList(data)
    expect(list.head.amount).toBe(0);
    expect(list.head.forwardNode.amount).toBe(1);
    expect(list.head.forwardNode.forwardNode.amount).toBe(2);

    list.head = list.linkAdd(list.head, 'd', 3);
    expect(list.head.amount).toBe(3);
    expect(list.head.forwardNode.amount).toBe(0);
  });

  test('list as class, add to end', () => {
    const data = [
      ['a', 0],
      ['b', 1],
      ['c', 2]
    ];
    const list = new linkList(data)
    expect(list.head.amount).toBe(0);
    expect(list.head.forwardNode.amount).toBe(1);
    expect(list.head.forwardNode.forwardNode.amount).toBe(2);

    list.tail = list.linkTail('d', 3);
    expect(list.head.amount).toBe(0);
    expect(list.head.forwardNode.forwardNode.forwardNode.amount).toBe(3);
    expect(list.tail.amount).toBe(3);
  });
});

describe('functions', () => {
  test('first', () => {
    const result = functions.first();
    expect(result).toEqual({});
  });
  test('last', () => {
    const result = functions.last();
    expect(result).toEqual({});
  });
  test('next', () => {
    const resu = functions.next();
    expect(result).toEqual({});
  });
  test('previous', () => {
    const result = functions.previous();
    expect(result).toEqual({});
  });
  test('insert', () => {
    const result = functions.insert();
    expect(result).toEqual({});
  });
  test('delete', () => {
    const result = functions.delete();
    expect(result).toEqual({});
  });
  test('total', () => {
    const result = functions.total();
    expect(result).toEqual({});
  });
});