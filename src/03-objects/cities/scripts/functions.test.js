import functions from './functions.js';
import {Controller} from './class.js';
import {postData} from './fetch.js';

test('id closure', () => {
  expect(functions.idCounter()).toBe(1);
  expect(functions.idCounter()).toBe(2);
});

describe('city event callbacks', () => {

  const url = 'http://localhost:5000/';

  const sampleCities = [
    {name: 'city1', lat: 1, lon: 2, pop: 3},
    {name: 'city2', lat: -1, lon: -2, pop: 101}
  ];

  // input nodes
  let manyInputArr = sampleCities.map(sampleCity => {
    let cityInputArr = [];
    for(let i = 0; i < 4; i++) { // make 4 input nodes
      cityInputArr.push(document.createElement('input'));
    };
    cityInputArr[0].value = sampleCity.name; // name
    cityInputArr[1].value = sampleCity.lat; // lat
    cityInputArr[2].value = sampleCity.lon; // lon
    cityInputArr[3].value = sampleCity.pop; // pop
    return cityInputArr;
  });
  const errorNode = document.createElement('div');
  functions.error(true, errorNode);
  const cardsNode = document.createElement('div');
  // functions.cards(cardsNode);

  beforeEach(async () => {
    // // Check that the server is running and clear any data
    let data = await postData(url + 'clear');
    expect(data.status).toEqual(200);
    data = await postData(url + 'all');
    expect(data.length).toBe(0);
    errorNode.classList.add('hidden');

    // // clear cards
    while (cardsNode.firstChild) { // inspired by stackoverflow 3955229
      cardsNode.firstChild.remove();
    };
    expect(cardsNode.childElementCount).toBe(0);
  });
  afterEach(async () => {
    // // Check that the server is running and clear any data
    let data = await postData(url + 'clear');
    expect(data.status).toEqual(200);
    data = await postData(url + 'all');
    expect(data.length).toBe(0);
    errorNode.classList.add('hidden');

    // // clear cards
    while (cardsNode.firstChild) { // inspired by stackoverflow 3955229
      cardsNode.firstChild.remove();
    };
    expect(cardsNode.childElementCount).toBe(0);
  });

  test('get object key by value', () => {
    const obj = {1: 10, 2: 20};
    expect(functions.objKeyByValue(obj, 20)).toBe(2);
  });

  test('error div', () => {
    functions.error(undefined, errorNode);
    expect(errorNode.classList.contains('hidden')).toBe(true);
  });

  test('add node', () => {
    const parent = document.createElement('div');
    const element = 'p';
    const text = 'text';
    const node = functions.addNode(parent, element, text);
    expect(node.parentElement).toBe(parent);
    expect(node.tagName).toBe('P');
    expect(node.textContent).toBe('text');
  });

  test('create card', () => {
    const controllerInst = new Controller();
    sampleCities.forEach((sampleCity,i) => {
      const cityObj = controllerInst.createCity(
        sampleCity.name, 
        sampleCity.lat, 
        sampleCity.lon, 
        sampleCity.pop
      );
      let key = Object.keys(controllerInst.cities).find(
        key => controllerInst.cities[key][name] === sampleCity[name]
      );
      functions.createCard(cardsNode, controllerInst, cityObj, key);
      expect(cardsNode.childElementCount).toBe(i+1);
      expect(cardsNode.children[i].childElementCount).toBe(4);
    });
  });

  test('create city', async () => {
    const controllerInst = new Controller();
    let i=0;
    for (let sampleCity of sampleCities) {
      await functions.createCity(controllerInst, manyInputArr[i], url, cardsNode);
      let data = await postData(url + 'all');
      expect(data.status).toEqual(200);
      expect(data.length).toBe(i+1);
      let key;
      for (let prop in sampleCity) {
        key = +Object.keys(controllerInst.cities).find(
          key => controllerInst.cities[key][prop] === sampleCity[prop]
        );
        expect(key).toBeTruthy();
      };
      expect(data.find(e => e.key === key).info).toEqual(sampleCity);
      i++;
    };
  });

  test('create city blank input error', async() => {
    const controllerInst = new Controller();
    const inputArr = [];
    for (let i=0; i<4; i++) {
      inputArr.push(document.createElement('input'));
    };
    try {
      await functions.createCity(controllerInst, inputArr, url, cardsNode);
    } catch (error) {
      expect(error).toBeTruthy;
    };
  });

  test('create city server error', async() => {
    const controllerInst = new Controller();
    expect(errorNode.textContent).toBeTruthy();
    expect(errorNode.classList.contains('hidden')).toBe(true);
    await functions.createCity(controllerInst, manyInputArr[0], '', cardsNode); //no url
    expect(errorNode.classList.contains('hidden')).toBe(false);
  });
  
  test('pull from server', async () => {
    // add cities to server
    const controllerInst = new Controller();
    await functions.pull(controllerInst, url, cardsNode); // pull without data
    for (let cityInputArr of manyInputArr) {
      await functions.createCity(controllerInst, cityInputArr, url, cardsNode);
    };
    // pull to new controller
    const controllerInst2 = new Controller();
    await functions.pull(controllerInst2, url, cardsNode);
    
    sampleCities.forEach(sampleCity => {
      let key = Object.keys(controllerInst2.cities).find(
        key => controllerInst2.cities[key].name === sampleCity.name
      );
      expect(key).toBeTruthy();
    });
  });
  
  test('pull error', async () => {
    // add cities to server
    try {
      await functions.pull();
    } catch (error) {
      expect(error).toBeTruthy();
      expect(errorNode.classList.contains('hidden')).toBe(false);
    };
  });

  test('update db', async () => {
    const parent = document.createElement('div');
    const target = functions.addNode(parent, 'p');
    const popNode = functions.addNode(target, 'span');
    popNode.classList.add('pop');
    const controllerInst = new Controller();
    for (let cityInputArr of manyInputArr) {
      await functions.createCity(controllerInst, cityInputArr, url, cardsNode);
    };

    let key = +Object.keys(controllerInst.cities).find(
      key => controllerInst.cities[key].name === sampleCities[0].name
    );

    const keyedCity = {
      key: key,
      info: {
        name: 'city3',
        lat: 10,
        lon: 10,
        pop: 10
      }
    };

    let data;
    data = await postData(url + 'all');
    expect(data.status).toEqual(200);
    expect(data.length).toEqual(manyInputArr.length);

    await functions.update(keyedCity, url, target);

    data = await postData(url + 'all');
    expect(data.status).toEqual(200);
    expect(data.length).toEqual(manyInputArr.length);

    expect(data.find(e => e.key === key)).toEqual(keyedCity);
  });

  test('update error', async () => {
    const parent = document.createElement('div');
    const target = functions.addNode(parent, 'button');
    const popNode = functions.addNode(target, 'span');
    popNode.classList.add('pop');
    try {
      await functions.update();
    } catch (error) {
      expect(error).toBeTruthy();
      expect(errorNode.classList.contains('hidden')).toBe(false);
    };
  });

  test('delete', async () => {
    const controllerInst = new Controller();
    for (let cityInputArr of manyInputArr) {
      await functions.createCity(controllerInst, cityInputArr, url, cardsNode);
    };
    expect(cardsNode.children.length).toBe(manyInputArr.length);

    let key = +Object.keys(controllerInst.cities).find(
      key => controllerInst.cities[key].name === sampleCities[1].name
    );

    let data;
    data = await postData(url + 'all');
    expect(data.status).toEqual(200);
    expect(data.length).toEqual(manyInputArr.length);

    await functions.delete(key, url, cardsNode);
    data = await postData(url + 'all');
    expect(data.find(e => e.key === key)).toBe(undefined);
    expect(data.length).toEqual(manyInputArr.length-1);
    expect(cardsNode.children.length).toBe(manyInputArr.length-1);
  });

  test('delete error', async () => {
    try {
      await functions.delete();
    } catch (error) {
      expect(error).toBeTruthy();
      expect(errorNode.classList.contains('hidden')).toBe(false);
    };
  });

  test('card click', async () => {
    const parent = document.createElement('div');
    const target = functions.addNode(parent, 'button');
    const popNode = functions.addNode(target, 'span');
    popNode.classList.add('pop');
    const controllerInst = new Controller();
    for (let cityInputArr of manyInputArr) {
      await functions.createCity(controllerInst, cityInputArr, url, cardsNode);
    };
    let key = Object.keys(controllerInst.cities).find(
      key => controllerInst.cities[key].name === sampleCities[0].name
    );
    target.dataset.key = key;
    let pop;

    pop = controllerInst.cities[key].pop;
    target.classList.add('minusBtn');
    await functions.cardClick(target, controllerInst, url, cardsNode);
    expect(controllerInst.cities[key].pop).toBe(pop-1);
    target.classList.remove('minusBtn');

    pop = controllerInst.cities[key].pop;
    target.classList.add('plusBtn');
    await functions.cardClick(target, controllerInst, url, cardsNode);
    expect(controllerInst.cities[key].pop).toBe(pop+1);
    target.classList.remove('plusBtn');
    
    let len = Object.keys(controllerInst.cities).length;
    target.classList.add('deleteBtn');
    await functions.cardClick(target, controllerInst, url, cardsNode);
    expect(Object.keys(controllerInst.cities).length).toBe(len-1);
    expect(controllerInst.cities[key]).toBe(undefined);
  });
});