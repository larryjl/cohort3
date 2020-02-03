import f from './functions'

describe('permutations', () => {
  test('permutations', () => {
    expect(f.permutations(5,3)).toBe(60);
  });
  test('r=0', () => {
    try {
      f.permutations(5,0)
    } catch (error) {
      expect(error).toBeTruthy();
    }
  });
  test('n=0', () => {
    try {
      f.permutations(0,3)
    } catch (error) {
      expect(error).toBeTruthy();
    }
  });
  test('n<r', () => {
    try {
      f.permutations(3,5)
    } catch (error) {
      expect(error).toBeTruthy();
    }
  });
  test('missing r', () => {
    expect(f.permutations(5)).toBe(120);
  });
});
describe('combinations', () => {
  test('combinations', () => {
    expect(f.combinations(6,4)).toBe(15);
    expect(f.combinations(5,3)).toBe(10);
  });
  test('r=0', () => {
    try {
      f.combinations(5,0)
    } catch (error) {
      expect(error).toBeTruthy();
    }
  });
  test('n=0', () => {
    try {
      f.combinations(0,3)
    } catch (error) {
      expect(error).toBeTruthy();
    }
  });
  test('n<r', () => {
    try {
      f.combinations(3,5)
    } catch (error) {
      expect(error).toBeTruthy();
    }
  });
  test('missing r', () => {
    expect(f.combinations(5)).toBe(1);
  });
});
describe('binary search', () => {
  test('upper half', ()=> {
    const array=[1,2,3,5,7,9];
    const target=7;
    expect(f.bsearch(array, target)).toBe(4);
  });
  test('lower half', ()=> {
    const array=[1,2,3,5,7,9];
    const target=3;
    expect(f.bsearch(array, target)).toBe(2);
  });
  test('target dne', ()=> {
    const array=[2,3,5,7,9];
    const target=1;
    expect(f.bsearch(array, target)).toBe(-1);
  });
});
describe('recursive binary search', () => {
  test('upper half', ()=> {
    const array=[1,2,3,5,7,9];
    const target=7;
    expect(f.bsearchRecursive(array, target)).toBe(4);
  });
  test('lower half', ()=> {
    const array=[1,2,3,5,7,9];
    const target=3;
    expect(f.bsearchRecursive(array, target)).toBe(2);
  });
  test('target dne', ()=> {
    const array=[2,3,5,7,9];
    const target=1;
    expect(f.bsearchRecursive(array, target)).toBe(-1);
  });
});
test('swap', () => {
  const arr=[3,2,1,0];
  f.swap(arr,1,2);
  expect(arr).toEqual([3,1,2,0]);
});
describe('bubble sort', () => {
  test('sort', () => {
    const arr=[3,2,1,0];
    f.bubbleSort(arr);
    expect(arr).toEqual([0,1,2,3]);
  });
  test('recursive sort', () => {
    const arr=[3,2,1,0];
    f.bubbleSortRecursive(arr);
    expect(arr).toEqual([0,1,2,3]);
  });
});
describe('quick sort', () => {
  test('partition', () => {
    const arr=[3,2,1,0];
    expect(f.partition(arr,0,3)).toBe(0);
    expect(arr).toEqual([0,2,1,3]);
  });
  test('partition', () => {
    const arr=[4,2,1,3];
    expect(f.partition(arr,0,3)).toBe(2);
    expect(arr).toEqual([2,1,3,4]);
  });
  test('sort', () => {
    const arr=[3,2,1,0];
    f.quickSort(arr);
    expect(arr).toEqual([0,1,2,3]);
  });
});