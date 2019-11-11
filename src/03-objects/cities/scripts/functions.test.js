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
    {key: 1, name: 'city1', lat: 1, lon: 2, pop: 3},
    {key: 2, name: 'city2', lat: -1, lon: -2, pop: 101}
  ];

  // input nodes
  let manyInputArr = sampleCities.map(v => {
    let cityInputArr = [];
    for(let i = 0; i < 4; i++) { // make 4 input nodes
      cityInputArr.push(document.createElement('input'));
    };
    cityInputArr[0].value = v.name; // name
    cityInputArr[1].value = v.lat; // lat
    cityInputArr[2].value = v.lon; // lon
    cityInputArr[3].value = v.pop; // pop
    return cityInputArr;
  });

  const errorNode = document.createElement('div');
  functions.error(undefined, errorNode);
  const cardsNode = document.createElement('div');
  functions.cards(cardsNode);

  beforeEach(async () => {
    // Check that the server is running and clear any data
    let data = await postData(url + 'clear');
    expect(data.status).toEqual(200);
    data = await postData(url + 'all');
    expect(data.length).toBe(0);
  });

  test('create card', () => {
    const controllerInst = new Controller();
    sampleCities.forEach((city,i) => {
      const cityObj = controllerInst.createCity(
        city.name, 
        city.lat, 
        city.lon, 
        city.pop)
      functions.createCard(controllerInst, cityObj);
      expect(cardsNode.childElementCount).toBe(i+1);
      expect(cardsNode.children[i].childElementCount).toBe(4);
    });
  });

  test('create city', async () => {
    const controllerInst = new Controller();
    functions.cards(cardsNode);
    let i = 0;
    for (let city of sampleCities) {
      await functions.createCity(controllerInst, manyInputArr[i], url);
      let data = await postData(url + 'all');
      expect(data.status).toEqual(200);
      expect(data.length).toBe(i+1);
      for (let k in city) {
        if (k != 'key') {
          expect(controllerInst.cities[i][k]).toEqual(city[k]);
          expect(data[i][k]).toBe(city[k]);
        };
      };
      i++;
    };
  });

  test('create city error', async() => {
    const controllerInst = new Controller();
    expect(errorNode.textContent).toBeTruthy();
    expect(errorNode.classList.contains('hidden')).toBe(false);
    await functions.createCity(controllerInst, manyInputArr[0], ''); //no url
    expect(errorNode.classList.contains('hidden')).toBe(true);
  });
  
  test('pull from server', async () => {
    // add cities to server
    const controllerInst = new Controller();
    controllerInst.cities=[];
    for (let cityInputArr of manyInputArr) {
      await functions.createCity(controllerInst, cityInputArr, url);
    };
    // pull to new controller
    const controllerInst2 = new Controller();
    await functions.pull(controllerInst2, url);
    sampleCities.forEach((city,i) => {
      for (let k in city) {
        if (k != 'key') {
          expect(controllerInst2.cities[i][k]).toEqual(city[k]);
        };
      };
    });
  });
});