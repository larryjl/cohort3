const functions = {
  idCounter: (() => {
    let nextId = 0; // -- initialized only once
    return () => { // -- closure function
      nextId += 1; // -- nextId accessed through closure
      return nextId;
    };
  })() // -- closure call

};

export default functions;