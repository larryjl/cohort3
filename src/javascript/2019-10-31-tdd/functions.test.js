import functions from './functions.js';

test('hello', () => {
  const bar = 'hello from functions.test';
  console.log(bar);
  expect(bar).toBe('hello from functions.test');
});

test('foo', () => {
  expect(functions.hello()).toBe('hello from functions');
});