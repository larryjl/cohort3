import React, {useState, useEffect} from 'react';

function Link(props) {
  const [position, setPosition] = useState(0);
  useEffect(() => {
    // side effect
    return function cleanup() {
      // cleanup
    };
  });

  const nodeList = {
    head: new linkNode('a', 0, new linkNode('b', 1, new linkNode('c', 2, null)))
  };

  return (
    <div>
    </div>
  );
};

const linkNode = class {
  constructor(subject, amount, forwardNode) {
    this.forwardNode = forwardNode;
    this.subject = subject;
    this.amount = amount;
  }
  show() {
    return `subject: ${this.subject}, amount: ${this.amount}`
  }
};

const linkList = class {
  constructor(data) {
    const n = data.length;
    for (let i=n-1; i>=0; i--) {
      // this.linkAdd(this.head, ...data[i]);
      this.head = this.linkAdd(this.head, ...data[i]);
    };
  }
  // add to beginning
  linkAdd(previous, subject, amount) {
    const node = new linkNode(subject, amount, previous);
    // previous = node;
    return node;
  }
  // add to end
  linkTail(subject, amount) {
    // const node = new linkNode(subject, amount, null);
    let current = this.head;
    if (!current) {
      // this.head = node;
      this.head = linkAdd(this.head, subject, amount);
    } else {
      while (current.forwardNode) {
        current = current.forwardNode;
      };
      // current.forwardNode = node;
      current.forwardNode = this.linkAdd(current.forwardNode, subject, amount)
    };
    // return this.head;
    return current.forwardNode; 
  }
  // print list
  printList() {
    let current = this.head;
    while (current) {
      console.log(current.subject, current.amount);
      current = current.forwardNode;
    };
    console.log('null');
  }
  // show list
  showList() {
    let current = this.head;
    let string = '';
    while (current) {
      string = string + current.show() + '; ' ;
      current = current.forwardNode;
    };
    return string + 'null';
  }
};

const functions = {
  // first ⇒ position to the first node
  first: () => {},

  // last ⇒ position to the last node
  last: () => {},

  // next ⇒ move to the next node
  next: () => {},

  // previous ⇒ backup one node (how are we going to do this?)
  previous: () => {},

  // insert ⇒ inserts a new node after the current node (which node will be the current node after the insertion?)
  insert: () => {},

  // delete ⇒ delete the current node (which node will be the current node after the deletion?)
  delete: () => {},

  // We need to have a total function that will show the total of all the amounts of all the ListNodes
  total: () => {}
};

export { 
  Link, 
  linkNode,
  linkList,
  functions
};