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
  error: (
    hide = true, 
    message = 'Error communicating with server.', 
    node
  ) => {
    if (node) {
      functions.errorNode = node;
    };
    functions.errorNode.textContent = message;
    functions.errorNode.classList.toggle('hidden', hide);
  },
  // // old version
  // error: (errorNode) => {
  //   errorNode.textContent = 'Error communicating with server.';
  //   errorNode.classList.toggle('hidden', true);
  // },

  pull: async (controllerInst, url, cardsNode) => {
    try {
      let data = await postData(url + 'all');
      if (data.status===200) {
        functions.error(true);
      };
      if (data.length > 0) {
        const keys = [];
        for (let city of data) {
          keys.push(city.key);
        };
        // const keys = data.map(city => city.key);
        const maxKey = keys.reduce((a,b) => (a > b) ? a : b);
        controllerInst.cities = {};
        for (let k=1; k<=maxKey; k++) { 
          const city = data.find(city => city.key === k);
          if (city) {
            controllerInst.cities[k] = controllerInst.createCity(
              city.info.name,
              city.info.lat,
              city.info.lon,
              city.info.pop
            );
          } else {
            functions.idCounter();
          };
        };
      };
    } catch (error) {
      functions.error(false, 'Failed to download server data.');
      return;
    };
  },

  showStats: (controllerInst, statsNode) => {
    const pop = controllerInst.getPopulation();
    if (pop > 0) {
      if (Object.keys(controllerInst.cities).length > 1) {
        const northern = controllerInst.getMostNorthern();
        const southern = controllerInst.getMostSouthern();
        statsNode.textContent = 
          `${pop} visitor${(pop>1)?'s':''}, from ${northern} to ${southern}.`;
      } else if (Object.keys(controllerInst.cities).length > 0) {
        statsNode.textContent = 
          `${pop} visitor${(pop>1)?'s':''} from ${Object.values(controllerInst.cities)[0].name}.`;
      };
    } else {
      statsNode.textContent = 'No visitors... yet.';
    };
  },

  addNode: (parentNode, elementStr, textStr) => {
    const node = document.createElement(elementStr);
    node.textContent = textStr;
    parentNode.appendChild(node);
    return node;
  },

  createCard: (cardsNode, controllerInst, cityObj, key) => {

    const card = functions.addNode(cardsNode, 'div');
    card.setAttribute('data-key', key);

    const size = cityObj.howBig();
    const title = functions.addNode(card, 'h3', `${cityObj.name} (${size})`);

    const sphere = controllerInst.whichSphere(key);
    const coords = functions.addNode(
      card, 
      'p', 
      `${cityObj.lat.toFixed(2)}, ${cityObj.lon.toFixed(2)} (${sphere})`
    );

    const pop = functions.addNode(card, 'p');

    const btnMinus = functions.addNode(pop, 'button', '-');
    btnMinus.classList.add('popBtn', 'minusBtn');
    btnMinus.setAttribute('data-key', key);

    const popValue = functions.addNode(pop, 'span', cityObj.pop);
    popValue.classList.add('pop');

    const btnPlus = functions.addNode(pop, 'button', '+');
    btnPlus.classList.add('popBtn', 'plusBtn');
    btnPlus.setAttribute('data-key', key);

    const btnDelete = functions.addNode(card, 'button', 'Delete this city');
    btnDelete.classList.add('deleteBtn');
    btnDelete.setAttribute('data-key', key);
  },

  createCity: async (controllerInst, cityInputArr, url, cardsNode, statsNode) => {
    // // values
    const cityValuesArr = cityInputArr.map( // loop through input nodes
      (v,i) => {
        if (i != 3 && v.value === '') { // blank name, lat or lon
          functions.error(false, 'Missing city info.');
          throw Error('missing city info');
        } else {
          return (i===0) ? v.value // name
            : Number(v.value); // lat, lon, pop
        };
      }
    );
    // // local object, cloned into a new object with the key
    const cityObj = controllerInst.createCity(...cityValuesArr);
    const key = functions.objKeyByValue(controllerInst.cities, cityObj);
    const cityClone = JSON.parse(JSON.stringify(cityObj));
    const keyedCity = {
      key: key,
      info: cityClone
    };
    try {
      let data = await postData(url + 'add', keyedCity); // server data
      if (data.status===200) {
        functions.error(true);
      };
      functions.createCard(cardsNode, controllerInst, cityObj, key); // ux
      functions.showStats(controllerInst, statsNode);
    } catch (error) {
      delete controllerInst.cities[key];
      functions.error(false, 'Failed to add city: server did not respond.');
    }; 
  },

  update: async (cityObj, url, target, controllerInst, statsNode) => {
    try {
      let data = await postData(url + 'update', cityObj);
      if (data.status===200) {
        functions.error(true);
      };
      target.parentElement.getElementsByClassName('pop')[0].textContent =
        cityObj.info.pop;
      functions.showStats(controllerInst, statsNode);
    } catch (error) {
      functions.error(false);
      throw Error('failed to update');
    };
  },

  delete: async (key, url, cardsNode, controllerInst, statsNode) => {
    try {
      let data = await postData(url + 'delete', {key: key});
      if (data.status===200) {
        functions.error(true);
      };
      for (let card of cardsNode.children) {
        if (+card.dataset.key === key) {
          card.remove();
          break;
        };
      };
      functions.showStats(controllerInst, statsNode);
    } catch (error) {
      functions.error(false);
      throw Error('failed to delete');
    };
  },

  cardClick: async (target, controllerInst, url, cardsNode, statsNode, moveNum=1) => {
    const key = Number(target.dataset.key);
    forloop: // label to break out once class is found
    for (let targetClass of target.classList) {
      let keyedCity;
      switchloop: // this label is just for show
      switch (targetClass) {
        case 'minusBtn':
          try {
            keyedCity = {
              key: key,
              info: JSON.parse(JSON.stringify(controllerInst.cities[key]))
            };
            keyedCity.info.pop -= moveNum;
            await functions.update(keyedCity, url, target, controllerInst,statsNode);
            controllerInst.cities[key].movedOut(moveNum);
          } catch (error) {
            functions.error(false, 'Failed to update population: server did not respond');
          };
          break forloop;
        case 'plusBtn':
          try {
            keyedCity = {
              key: key,
              info: JSON.parse(JSON.stringify(controllerInst.cities[key]))
            };
            keyedCity.info.pop += moveNum;
            await functions.update(keyedCity, url, target, controllerInst, statsNode);
            controllerInst.cities[key].movedIn(moveNum);
          } catch (error) {
            functions.error(false, 'Failed to update population: server did not respond.');
          };
          break forloop;
        case 'deleteBtn':
          try {
            await functions.delete(key, url, cardsNode, controllerInst, statsNode);
            delete controllerInst.cities[key];
          } catch (error) {
            functions.error(false, 'Failed to delete city: server did not respond.');
          };
          break forloop;
      };
    };
  }

};

export default functions;