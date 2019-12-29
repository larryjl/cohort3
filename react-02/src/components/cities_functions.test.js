import functions from './cities_functions.js';

test('cities functions idcounter', () => {
  let id = functions.idCounter();
  expect(functions.idCounter()).toBe(+id+1);
  expect(functions.idCounter()).toBe(+id+2);
});

test('cities functions arrayToSentence', () => {
  let array = [];
  let sentence;
  try {
    sentence = functions.arrayToSentence(array);
  } catch(error) {
    expect(error.message).toBe('no values')
  };

  array.push('a');
  sentence = functions.arrayToSentence(array);
  expect(sentence).toBe('a');

  array.push('b');
  sentence = functions.arrayToSentence(array);
  expect(sentence).toBe('a and b');

  array.push('c');
  sentence = functions.arrayToSentence(array);
  expect(sentence).toBe('a, b, and c');
});

test('cities functions equalObjectValues', () => {
  let itemsObj = {
    1: {name: 'a', lat: -1},
    2: {name: 'b', lat: 0}
  };
  const reference = {name: 'z', lat: 0}
  const measure = 'lat'
  const name = 'name'
  let equalItemsArr = [];
  equalItemsArr = functions.equalObjectValues(
    itemsObj, 
    reference, 
    measure, 
    name
  );
  expect(equalItemsArr).toEqual(['b']);

  let k;
  k = 3;
  itemsObj[k] = {name: 'c', lat: 0};
  k = 4;
  itemsObj[k] = {name: 'd', lat: 1};
  k = 5;
  itemsObj[k] = {name: 'e', lat: 0};
  equalItemsArr = functions.equalObjectValues(
    itemsObj, 
    reference, 
    measure, 
    name
  );
  expect(equalItemsArr).toEqual(['b', 'c', 'e']);
});