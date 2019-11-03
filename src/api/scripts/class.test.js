import {City, Controller} from './class.js';

const testCities = [
  {name: 'aname', lat: -1, lon: 0, pop: 1, size: 'hamlet'},
  {name: 'cityname', lat: 90, lon: 180, pop: 100.001*1000, size: 'city'},
  {name: 'ltownname', lat: -90, lon: -180, pop: 100*1000, size: 'large town'},
  {name: 'ltownname2', lat: -90, lon: 180, pop: 20.001*1000, size: 'large town'},
  {name: 'townname', lat: 90, lon: -180, pop: 20*1000, size: 'town'},
  {name: 'townname2', lat: 90, lon: -180, pop: 1001, size: 'town'},
  {name: 'villagename', lat: 0, lon: 0, pop: 1000, size: 'village'},
  {name: 'villagename2', lat: 90, lon: -180, pop: 101, size: 'village'},
  {name: 'hamletname', lat: 0, lon: 0, pop: 100, size: 'hamlet'},
  {name: 'hamletname2', lat: 0.5, lon: -0.5, pop: 1, size: 'hamlet'},
];

describe('city class', () => {
  test('city constructor', () => {
    const city = new City('aname', -1, 0, 1);
    expect(city.name).toBe('aname');
    expect(city.lat).toBe(-1);
    expect(city.lon).toBe(0);
    expect(city.pop).toBe(1);
  });
  test('city show', () => {
    const city = new City('aname', -1, 0, 1);
    const result = city.show();
    expect(result).toBe('aname,-1,0,1');
  });
  test('city movedIn', () => {
    const city = new City('aname', -1, 0, 1);
    const result = city.movedIn(2);
    expect(result).toBe(3);
  });
  test('city movedOut', () => {
    const city = new City('aname', -1, 0, 2);
    const result = city.movedOut(2);
    expect(result).toBe(0);
  });
  test('city howBig', () => {
    testCities.forEach((v,i) => {
      let city = new City(v.name, v.lat, v.lon, v.pop);
      let result = city.howBig();
      expect(result).toBe(v.size);
    });
  });
});

describe('controller class', () => {
  test('controller constructor', () => {
    const controller = new Controller();
    expect(controller.cities).toEqual([]);
  });
  test('controller create', () => {
    const controller = new Controller();
    controller.createCity('springfield', 90, 180, 100*1000);
    controller.createCity('shelbyville', -90, -180, 20*1000);
    expect(controller.cities[0].show()).toBe(
      'springfield,90,180,100000');
    expect(controller.cities[1].id).toBe(controller.cities[0].id+1);
  });
  test('controller create blank, catch error', () => {
    const controller = new Controller();
    try {
      controller.createCity();
    } catch(error) {
      expect(error.error).toBe('missing city info');
    }
  });
  test('controller delete', () => {
    const controller = new Controller();
    controller.createCity('springfield', 90, 180, 100*1000);
    controller.createCity('shelbyville', -90, -180, 20*1000);
    const id = controller.cities[0].id;
    controller.deleteCity(id);
    expect(controller.cities.length).toBe(1);
    expect(controller.cities[0].show()).toBe(
      'shelbyville,-90,-180,20000');
  });
  test('controller sphere', () => {
    const controller = new Controller();
    controller.createCity('springfield', 90, -180, 100*1000);
    controller.createCity('shelbyville', -90, 180, 20*1000);
    controller.createCity('equatorville', 0, 10, 100);
    let result;

    result = controller.whichSphere(controller.cities[0].id)
    expect(result).toEqual('Northern Hemisphere');

    result = controller.whichSphere(controller.cities[1].id)
    expect(result).toEqual('Southern Hemisphere');
  });  
  test('controller northern southern', () => {
    const controller = new Controller();
    controller.createCity('springfield', 90, -180, 100*1000);
    controller.createCity('shelbyville', -90, 180, 20*1000);
    controller.createCity('springfield2', 90, -180, 100*1000);
    controller.createCity('shelbyville2', -90, 180, 20*1000);
    let resultArr; 
    let result;

    resultArr = controller.getMostNorthern();
    result = (resultArr.length > 1)
      ? resultArr.reduce((a, b) => (a.name + ',' + b.name))
      : resultArr[0].name;
    expect(result).toBe('springfield,springfield2');

    resultArr = controller.getMostSouthern()
    result = (resultArr.length > 1)
      ? resultArr.reduce((a, b) => (a.name + ',' + b.name))
      : resultArr[0].name;
    expect(result).toBe('shelbyville,shelbyville2');
  });
  test('controller total population', () => {
    const controller = new Controller();
    controller.createCity('springfield', 90, -180, 100*1000);
    controller.createCity('shelbyville', -90, 180, 20*1000);
    let result = controller.getPopulation();
    expect(result).toBe(120000);
  });
});

test('object reference test', () => {
  const controller = new Controller();
  const myCity = controller.createCity('aname', 1, 2, 3);
  const myFav = myCity;
  const cloneCity = Object.assign(myCity);
  const deepClone = JSON.parse(JSON.stringify(myCity))
  expect(myCity.pop).toBe(3);
  expect(myFav.pop).toBe(3);
  expect(cloneCity.pop).toBe(3);
  expect(deepClone.pop).toBe(3);
  myCity.movedIn(2);
  expect(myCity.pop).toBe(5);
  expect(myFav.pop).toBe(5);
  expect(cloneCity.pop).toBe(5);
  expect(deepClone.pop).toBe(3);
  myFav.movedOut(1);
  expect(myCity.pop).toBe(4);
  expect(myFav.pop).toBe(4);
  expect(cloneCity.pop).toBe(4);
  expect(deepClone.pop).toBe(3);
});