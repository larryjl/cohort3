import {postData} from './fetch.js'

const functions = {

  // closure
  idCounter: (() => {
    let nextId = 0; // initialized only once
    return () => {
      nextId++; // nextId available from parent function
      return nextId;
    };
  })(), // call to initialize nextId when function is first read

  errorNode:undefined, // store so it does not need to be passed all the time
  error: (hideBoo = false, node) => {
    if (node) {
      functions.errorNode = node;
    };
    functions.errorNode.textContent = 'Error communicating with server.';
    functions.errorNode.classList.toggle('hidden', hideBoo);
  },

  // -- old version
  // error: (errorNode) => {
  //   errorNode.textContent = 'Error communicating with server.';
  //   errorNode.classList.toggle('hidden', true);
  // },

  pull: async (controllerInst, url) => {
    const data = await postData(url + 'all');
    controllerInst.cities = [...data]; // spread clone
  },

  createCity: async (controllerInst, cityInputArr, url) => {
    const cityValuesArr = cityInputArr.map(
      (v,i) => (i===0)
        ? v.value
        : Number(v.value)
    );
    const cityObj = controllerInst.createCity(...cityValuesArr);
    try {
      await postData(url + 'add', cityObj);
    } catch (error) {
      functions.error(true);
    };
  },

};

export default functions;