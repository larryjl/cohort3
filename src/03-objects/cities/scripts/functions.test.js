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

    // // clear cards
    while (cardsNode.firstChild) { // inspired by stackoverflow 3955229
      cardsNode.firstChild.remove();
    };
    expect(cardsNode.childElementCount).toBe(0);
  });
  afterEach(async () => {
    // // clear data again
    let data = await postData(url + 'clear');
    expect(data.status).toEqual(200);
    errorNode.classList.add('hidden');
  });

  test('get object key by value', () => {
    const obj = {1: 10, 2: 20};
    expect(functions.objKeyByValue(obj, 20)).toBe(2);
  });

  test('error div', () => {
    functions.error(undefined, errorNode);
    expect(errorNode.classList.contains('hidden')).toBe(true);
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

  test('create city error', async() => {
    const controllerInst = new Controller();
    expect(errorNode.textContent).toBeTruthy();
    expect(errorNode.classList.contains('hidden')).toBe(true);
    await functions.createCity(controllerInst, manyInputArr[0], '', cardsNode); //no url
    expect(errorNode.classList.contains('hidden')).toBe(false);
  });
  
  test('pull from server', async () => {
    // add cities to server
    const controllerInst = new Controller();
    for (let cityInputArr of manyInputArr) {
      await functions.createCity(controllerInst, cityInputArr, url, cardsNode);
    };
    // pull to new controller
    const controllerInst2 = new Controller();
    await functions.pull(controllerInst2, url);
    
    sampleCities.forEach(sampleCity => {

      let key = Object.keys(controllerInst.cities).find(
        key => controllerInst.cities[key].name === sampleCity.name
      );
      expect(key).toBeTruthy();
    });
  });

  test('update db', async () => {
    const controllerInst = new Controller();
    for (let cityInputArr of manyInputArr) {
      await functions.createCity(controllerInst, cityInputArr, url, cardsNode);
    };

    let key = +Object.keys(controllerInst.cities).find(
      key => controllerInst.cities[key].name === sampleCities[0].name
    );

    const updatedKeyedCity = {
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

    await functions.update(updatedKeyedCity, url);

    data = await postData(url + 'all');
    expect(data.status).toEqual(200);
    expect(data.length).toEqual(manyInputArr.length);

    expect(data.find(e => e.key === key)).toEqual(updatedKeyedCity);
  });

  test('update error', async () => {
    await functions.update();
    expect(errorNode.classList.contains('hidden')).toBe(false);
  });

  test('delete', async () => {
    const controllerInst = new Controller();
    for (let cityInputArr of manyInputArr) {
      await functions.createCity(controllerInst, cityInputArr, url, cardsNode);
    };

    let key = +Object.keys(controllerInst.cities).find(
      key => controllerInst.cities[key].name === sampleCities[0].name
    );

    let data;
    data = await postData(url + 'all');
    expect(data.status).toEqual(200);
    expect(data.length).toEqual(manyInputArr.length);

    await functions.delete(key, url);
    data = await postData(url + 'all');
    expect(data.find(e => e.key === key)).toBe(undefined);
  });

  test('delete error', async () => {
    await functions.delete();
    expect(errorNode.classList.contains('hidden')).toBe(false);
  });

  test('card click', async () => {
    const controllerInst = new Controller();
    for (let cityInputArr of manyInputArr) {
      await functions.createCity(controllerInst, cityInputArr, url, cardsNode);
    };
    let key = Object.keys(controllerInst.cities).find(
      key => controllerInst.cities[key].name === sampleCities[0].name
    );

    const target = document.createElement('button');
    target.dataset.key = key;

    let pop;
    let len;

    pop = controllerInst.cities[key].pop;
    target.classList.add('minusBtn');
    functions.cardClick(target, controllerInst, url);
    expect(controllerInst.cities[key].pop).toBe(pop-1);
    target.classList.remove('minusBtn');

    pop = controllerInst.cities[key].pop;
    target.classList.add('plusBtn');
    functions.cardClick(target, controllerInst, url);
    expect(controllerInst.cities[key].pop).toBe(pop+1);
    target.classList.remove('plusBtn');
    
    len = Object.keys(controllerInst.cities).length;
    target.classList.add('deleteBtn');
    functions.cardClick(target, controllerInst, url);
    expect(Object.keys(controllerInst.cities).length).toBe(len-1);
    expect(controllerInst.cities[key]).toBe(undefined);
  });
});