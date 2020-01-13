const Stack = class {
  constructor(size) {
    this.arr = new Array(size);
    this.capacity = size;
    this.top = -1;
  }
  push(data) {
    if (!this.isFull()) {
      this.arr[++this.top] = data;
      return this.size();
    } else {
      throw Error('stack is full');
    };
  }
  pop() {
    if (!this.isEmpty()) {
      const removed = this.arr[this.top];
      this.arr[this.top--] = undefined;
      return removed;
    } else {
      throw Error('stack is empty');
    }
  }
  isEmpty() {
    // return this.size() === 0;
    return this.top === -1; 
  }
  isFull() {
    // return this.size() === this.capacity;
    return this.top === this.capacity -1;
  }
  peek() {
    if (!this.isEmpty()) {
      return this.arr[this.top];
    };
  }
  size() {
    return this.top + 1;
  }
};

export default Stack;