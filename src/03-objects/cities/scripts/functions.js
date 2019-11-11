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

  cardsNode: undefined,
  cards: (node) => {
      functions.cardsNode = node;
  },

  createCard: (controllerInst, cityObj) => {
    const key = cityObj.key;
    const card = document.createElement('div');
    functions.cardsNode.appendChild(card);
    card.setAttribute('data-key', key);
    const title = document.createElement('h3');
    title.textContent = cityObj.name;
    card.appendChild(title);
    const coords = document.createElement('p');
    const sphere = controllerInst.whichSphere(key);
    coords.textContent = `
      ${cityObj.lat.toFixed(2)},
      ${cityObj.lon.toFixed(2)} (${sphere})
    `;
    card.appendChild(coords);
    const pop = document.createElement('p');
    const size = cityObj.howBig();
    pop.textContent = `${cityObj.name} (${size})`;
    card.appendChild(pop);
    const btnPlus = document.createElement('button');
    btnPlus.textContent = '+';
    btnPlus.classList.add('popBtn', 'plusBtn')
    btnPlus.setAttribute('data-key', key);
    pop.appendChild(btnPlus);
    const btnMinus = document.createElement('button');
    btnMinus.textContent = '-';
    btnMinus.classList.add('popBtn', 'minusBtn')
    btnMinus.setAttribute('data-key', key);
    pop.appendChild(btnMinus);
    const btnDelete = document.createElement('button');
    btnDelete.textContent = 'Delete this city';
    btnDelete.classList.add('deleteBtn');
    btnDelete.setAttribute('data-key', key);
    card.appendChild(btnDelete);
  },

  createCity: async (controllerInst, cityInputArr, url) => {
    //values
    const cityValuesArr = cityInputArr.map(
      (v,i) => (i===0)
        ? v.value
        : Number(v.value)
    );
    //local array
    const cityObj = controllerInst.createCity(...cityValuesArr);
    //server data
    try {
      await postData(url + 'add', cityObj);
    } catch (error) {
      functions.error(true);
    };
    //ux
    functions.createCard(controllerInst, cityObj);
  },

};

export default functions;