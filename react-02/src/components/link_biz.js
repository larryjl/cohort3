const linkNode = class {
  constructor(info, forwardNode) {
    this.forwardNode = forwardNode;
    if (info) {
      // this.subject = info.subject;
      // this.amount = info.amount;
      for (let i in info) {
        this[i] = info[i];
      };
    };
  }
  show() {
    // return `subject: ${this.subject}, amount: ${this.amount}`;
    const clone = Object.assign({}, this);
    delete clone.forwardNode;
    let info = Object.entries(clone);
    info.sort((a,b) => (
      (a[0] > b[0]) ? 1 : -1
    ));
    let string = '';
    for (let e of info) {
      string += `${e[0]}: ${e[1]}, `
    };
    string = string.slice(0, -2);
    return string;
  }
};

const linkList = class {
  constructor(data) {
    const n = data.length;
    for (let i=n-1; i>=0; i--) {
      this.head = this.linkAdd(this.head, data[i]);
      if (i===n-1) {
        this.tail = this.head;
      };
    };
  }
  // add before
  linkAdd(node, data) {
    const newNode = new linkNode(data, node);
    // previous = node;
    return newNode;
  }
  // add to end
  linkTail(data) {
    // const node = new linkNode(data, null);
    let current = this.head;
    if (!current) {
      // this.head = node;
      this.head = this.linkAdd(this.head, data);
    } else {
      while (current.forwardNode) {
        current = current.forwardNode;
      };
      // current.forwardNode = node;
      current.forwardNode = this.linkAdd(current.forwardNode, data)
    };
    this.tail = current.forwardNode;
    // return this.head;
    return current.forwardNode; 
  }
  
  printList() {
    let current = this.head;
    while (current) {
      console.log(current.subject, current.amount);
      current = current.forwardNode;
    };
  }
  
  showList() {
    let current = this.head;
    let string = '';
    while (current) {
      string += current.show() + '; ';
      current = current.forwardNode;
    };
    string = string.slice(0,-2);
    return string;
  }
};

const linkListDummy = class {
  constructor(data) {
    const dummy = new linkNode();
    this.tail = dummy;
    for(let v of data) {
      this.tail.forwardNode = this.linkAdd(this.tail.forwardNode, v);
      this.tail = this.tail.forwardNode;
    };
    this.head = dummy.forwardNode;
  }
  linkAdd(node, data) {
    const newNode = new linkNode(data, node);
    return newNode;
  }
};

const linkListDouble = class {
  constructor(data) {
    const n = data.length;
    for (let i=n-1; i>=0; i--) {
      this.head = this.linkAdd(this.head, data[i]);
      if (i===n-1) {
        this.tail = this.head;
      };
    };
  }
  // add before
  linkAdd(node, data) {
    const newNode = new linkNode(data, node);
    if (node) {
      node.prevNode = newNode;
    };
    return newNode;
  }
  // insert after
  linkInsert(node, data) { 
    const newNode = new linkNode(data, node.forwardNode);
    node.forwardNode = newNode;
    newNode.prevNode = node;
    if (newNode.forwardNode) {
      newNode.forwardNode.prevNode = newNode;
    };
    return newNode;
  }
};

const functions = {
  // first ⇒ position to the first node
  first: (linkList) => {
    return linkList.head;
  },

  // last ⇒ position to the last node
  last: (linkList) => {
    return linkList.tail;
  },

  // next ⇒ move to the next node
  next: (node) => {
    return node.forwardNode;
  },

  // previous ⇒ backup one node (how are we going to do this?)
  previous: (linkList, node) => {
    let current = linkList.head;
    while (current) {
      if (current.forwardNode === node) return current;
      current = current.forwardNode;
    };
  },

  // previous - using doubly linked list?
  previousDouble: (node) => {
    return node.prevNode;
  },

  // insert ⇒ inserts a new node after the current node (which node will be the current node after the insertion?)
  insert: (node, info) => {
    let newNode = new linkNode(info, node.forwardNode);
    node.forwardNode = newNode;
    return newNode;
  },

  // delete ⇒ delete the current node (which node will be the current node after the deletion?)
  delete: (list, node) => {
    functions.previous(list, node).forwardNode = node.forwardNode;
    return node.forwardNode;
  },

  // We need to have a total function that will show the total of all the amounts of all the ListNodes
  total: (linkList, key) => {
    let current = linkList.head;
    let total = 0;
    while (current) {
      total += current[key];
      current = current.forwardNode;
    };
    return total;
  },
  length: (linkList) => {
    let current = linkList.head;
    let length = 0;
    while (current) {
      length++;
      current = current.forwardNode;
    };
    return length;
  }
};

export { 
  linkNode,
  linkList,
  linkListDummy,
  linkListDouble,
  functions
};