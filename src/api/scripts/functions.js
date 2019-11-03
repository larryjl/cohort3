const functions = {
  idCounter: (() => { // -- nextId in closure
    let nextId = 0;
    return () => {
      nextId += 1; 
      return nextId;
    };
  })()
};

export default functions;