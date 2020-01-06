const linkNode = class {
  constructor(info, forwardNode) {
    this.forwardNode = forwardNode;
    if (info) {
      this.subject = info.subject;
      this.amount = info.amount;
    //   for (let i in info) {
    //     this[i] = info[i];
    //   };
    };
  }
  show() {
    return `subject: ${this.subject}, amount: ${this.amount}`;
    // let info = Object.entries(this);
    // delete info.forwardNode;
    // info.sort((a,b) => (
    //   (a[0] > b[0]) ? 1 : -1
    // ));
    // let string = '';
    // for (let e of info) {
    //   string = `${string}, ${e[0]}: ${e[1]}`
    // };
    // return string;
  }
};

const linkList = class {
  constructor(data) {
    const n = data.length;
    for (let i=n-1; i>=0; i--) {
      // this.linkAdd(this.head, data[i]);
      this.head = this.linkAdd(this.head, data[i]);
    };
  }
  // add to beginning
  linkAdd(head, data) {
    const node = new linkNode(data, head);
    // previous = node;
    return node;
  }
  // add to end
  linkTail(data) {
    // const node = new linkNode(data, null);
    let current = this.head;
    if (!current) {
      // this.head = node;
      this.head = linkAdd(this.head, data);
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
  linkAdd(head, data) {
    const node = new linkNode(data, head);
    return node;
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
  linkNode,
  linkList,
  linkListDummy,
  functions
};