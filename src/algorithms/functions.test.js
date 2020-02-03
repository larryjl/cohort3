import functions from './functions'

describe('permutations', () => {
  test('permutations', () => {
    expect(functions.permutations(5,3)).toBe(60);
  });
  test('r=0', () => {
    try {
      functions.permutations(5,0)
    } catch (error) {
      expect(error).toBeTruthy();
    }
  });
  test('n=0', () => {
    try {
      functions.permutations(0,3)
    } catch (error) {
      expect(error).toBeTruthy();
    }
  });
  test('n<r', () => {
    try {
      functions.permutations(3,5)
    } catch (error) {
      expect(error).toBeTruthy();
    }
  });
  test('missing r', () => {
    expect(functions.permutations(5)).toBe(120);
  });
});
describe('combinations', () => {
  test('combinations', () => {
    expect(functions.combinations(6,4)).toBe(15);
    expect(functions.combinations(5,3)).toBe(10);
  });
  test('r=0', () => {
    try {
      functions.combinations(5,0)
    } catch (error) {
      expect(error).toBeTruthy();
    }
  });
  test('n=0', () => {
    try {
      functions.combinations(0,3)
    } catch (error) {
      expect(error).toBeTruthy();
    }
  });
  test('n<r', () => {
    try {
      functions.combinations(3,5)
    } catch (error) {
      expect(error).toBeTruthy();
    }
  });
  test('missing r', () => {
    expect(functions.combinations(5)).toBe(1);
  });
});
describe.only('binary search', () => {
  test('upper half', ()=> {
    const array=[1,2,3,5,7,9];
    const target=7;
    expect(functions.bsearch(array, target)).toBe(4);
  });
  test('lower half', ()=> {
    const array=[1,2,3,5,7,9];
    const target=3;
    expect(functions.bsearch(array, target)).toBe(2);
  });
  test('target dne', ()=> {
    const array=[2,3,5,7,9];
    const target=1;
    expect(functions.bsearch(array, target)).toBe(-1);
  });
});