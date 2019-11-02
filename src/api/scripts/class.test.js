import {City, Controller} from './class.js';

describe('city class', () => {
  test('city constructor', () => {
    const city = new City('name', -90, -180, 1000);
    expect(city.name).toBe('name');
    expect(city.lat).toBe(-90);
    expect(city.lon).toBe(-180);
    expect(city.pop).toBe(1000);
  });
  test('city show', () => {
    const city = new City('name', -90, -180, 1000);
    const result = city.show();
    expect(result).toBe('name,-90,-180,1000');
  });
  test('city movedIn', () => {
    const city = new City('name', -90, -180, 1000);
    const result = city.movedIn(2);
    expect(result).toBe(1002);
  });
  test('city movedOut', () => {
    const city = new City('name', -90, -180, 1000);
    const result = city.movedOut(2);
    expect(result).toBe(998);
  });
  test('city howBig', () => {
    const city = new City('name', -90, -180, 1000);
    const result = city.howBig();
    expect(result).toBe('village');
  });
});

describe('controller class', () => {
  test('controller constructor', () => {
    const controller = new Controller();
    expect(controller.cities).toEqual([]);
  });
});