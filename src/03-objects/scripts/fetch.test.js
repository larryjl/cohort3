import functions from './fetch.js'

const data = [
  {"name":"Ivan","surname":"Căciulescu","gender":"male","region":"Romania"},{"name":"Paul","surname":"Garcia","gender":"male","region":"France"},{"name":"Semenica","surname":"Donici","gender":"female","region":"Romania"},{"name":"Alida","surname":"Ceaușescu","gender":"female","region":"Romania"},{"name":"","surname":"Rahat  Murtazaev","gender":"female","region":"Kyrgyz Republic"},
  {"name":"Nicolas","surname":"Costa","gender":"male","region":"Brazil"},{"name":"Laura","surname":"Udrea","gender":"female","region":"Romania"},{"name":"Amza","surname":"Lipă","gender":"male","region":"Romania"},{"name":"Delia","surname":"Firulescu","gender":"female","region":"Romania"},{"name":"Александр","surname":"Уткин","gender":"male","region":"Russia"}
]

test('fetch first person', () => {
    expect(functions.getFirstName(data)).toBe('Ivan');
});

test('fetch array of names ', () => {
  expect(functions.getAllFirstNames(data)).toEqual([
    'Ivan',
    'Paul',
    'Semenica',
    'Alida',
    '',
    'Nicolas',
    'Laura',
    'Amza',
    'Delia',
    'Александр'
  ]);
});

test('fetch problem', () => {
  expect(functions.showDelayProblem()).toBe('One,Three');
});

test('fetch solution', async () => {
  const result = await functions.showDelaySolution();
  expect(result).toBe('One,Two,Three');
});

test('fetch solution error', async () => {
  const error = true;
  try {
    await functions.showDelaySolution(error);
  } catch (error) {
    expect(error).toBe('promise error');
  }
});

// test('fetch get users', () => {
//   return functions.getUsers()
//     .then(
//       result => {
//         expect(result.length).toBe(10);
//         expect(typeof result[0]).toBe('object');
//       }
//     );
// });

test('fetch get users', async () => {
  const result = await functions.getUsers();
  expect(result.length).toBe(10);
  expect(typeof result[0]).toBe('object');
});

test('fetch work with data', () => {
  return functions.workWithData().then(result => {
    expect(typeof result[0]).toBe('string');
    expect(typeof result[1]).toBe('object');
    expect(result[1].length).toBe(10);
  });
});

test('fetch get users error', async () => {
  try {
    const error = true;
    await functions.getUsers(error);
  } catch (error) {
    expect(error).toBe('fetch error');
  }
});