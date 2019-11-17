import {postData} from './fetch.js'

const functions = {

  // // closure below
  idCounter: (() => {
    let nextId = 0; // initialized only once
    return () => {
      nextId++; // nextId available from parent function
      return nextId;
    };
  })(), // call to initialize nextId when function is first read

  objKeyByValue: (object, value) => { // stackoverflow 9907419
    return +Object.keys(object).find(key => object[key] === value);
  },

  errorNode:undefined, // store so it does not need to be passed all the time
  error: (hide = true, node) => {
    if (node) {
      functions.errorNode = node;
    };
    functions.errorNode.textContent = 'Error communicating with server.';
    functions.errorNode.classList.toggle('hidden', hide);
  },
  // // old version
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

  createCard: (controllerInst, cityObj, key) => {

    const card = document.createElement('div');
    card.setAttribute('data-key', key);
    functions.cardsNode.appendChild(card);

    const title = document.createElement('h3');
    const size = cityObj.howBig();
    title.textContent = `${cityObj.name} (${size})`;
    card.appendChild(title);

    const coords = document.createElement('p');
    const sphere = controllerInst.whichSphere(key);
    coords.textContent = `
      ${cityObj.lat.toFixed(2)},
      ${cityObj.lon.toFixed(2)} (${sphere})
    `;
    card.appendChild(coords);

    const pop = document.createElement('p');
    card.appendChild(pop);

    const btnMinus = document.createElement('button');
    btnMinus.textContent = '-';
    btnMinus.classList.add('popBtn', 'minusBtn')
    btnMinus.setAttribute('data-key', key);
    pop.appendChild(btnMinus);

    const popValue = document.createElement('span');
    popValue.textContent = cityObj.pop;
    pop.appendChild(popValue);

    const btnPlus = document.createElement('button');
    btnPlus.textContent = '+';
    btnPlus.classList.add('popBtn', 'plusBtn')
    btnPlus.setAttribute('data-key', key);
    pop.appendChild(btnPlus);

    const btnDelete = document.createElement('button');
    btnDelete.textContent = 'Delete this city';
    btnDelete.classList.add('deleteBtn');
    btnDelete.setAttribute('data-key', key);
    card.appendChild(btnDelete);
  },

  createCity: async (controllerInst, cityInputArr, url) => {
    // // values
    const cityValuesArr = cityInputArr.map( // loop through input nodes
      (v,i) => (i===0)
        ? v.value // name
        : Number(v.value) // lat, lon, pop
    );
    // // local object, cloned into a new object with the key
    const cityObj = controllerInst.createCity(...cityValuesArr);
    const key = functions.objKeyByValue(controllerInst.cities, cityObj);
    const cityClone = Object.assign({}, cityObj);
    const keyedCity = {
      key: key,
      info: cityClone
    };
    // // server data
    try {
      let data = await postData(url + 'add', keyedCity);
    } catch (error) {
      functions.error(false);
    }; 
    // // ux
    functions.createCard(controllerInst, cityObj, key);
  },

  update: async (cityObj, url) => {
    try {
      await postData(url + 'update', cityObj);
    } catch (error) {
      functions.error(false);
    };
  },

  delete: async (key, url) => {
    try {
      await postData(url + 'delete', {key: key});
    } catch (error) {
      functions.error(false);
    };
  },

  cardClick: (target, controllerInst, url) => {
    const key = Number(target.dataset.key);
    forloop: // label to break out once class is found
    for (let targetClass of target.classList) {
      let updatedKeyedCity;
      switchloop: // this label is just for show
      switch (targetClass) {
        case 'minusBtn':
          controllerInst.cities[key].movedOut(1);
          updatedKeyedCity = {
            key: key,
            info: Object.assign(controllerInst.cities[key])
          }
          functions.update(updatedKeyedCity, url);
          break forloop;
        case 'plusBtn':
          controllerInst.cities[key].movedIn(1);
          updatedKeyedCity = {
            key: key,
            info: Object.assign(controllerInst.cities[key])
          }
          functions.update(updatedKeyedCity, url);
          break forloop;
        case 'deleteBtn':
          delete controllerInst.cities[key];
          functions.delete(key, url);
          break forloop;
      };
    };
  }

};

export default functions;