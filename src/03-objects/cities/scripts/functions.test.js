import functions from './functions.js'

test('id closure', () => {
  expect(functions.idCounter()).toBe(1);
  expect(functions.idCounter()).toBe(2);
});