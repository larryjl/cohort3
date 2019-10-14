import functions from './functions'

test('Check the sizes', () => {
    expect(functions.size(-1)).toBe("negative"); // Consider the edge cases
    expect(functions.size(0)).toBe("small");
    expect(functions.size(10)).toBe("medium");
    expect(functions.size(15)).toBe("medium");
    expect(functions.size(20)).toBe("large");
    expect(functions.size(101)).toBe("extra large");
    expect(functions.size(2000000)).toBe("extra large");
});

// calculator
test('Does that add function work?', () => {
    expect(functions.add(1,2)).toBe(3);
    expect(functions.add(101,202)).toBe(303);
});
test('Does that minus function work?', () => {
    expect(functions.minus(1,2)).toBe(-1);
    expect(functions.minus(101,202)).toBe(-101);
});
test('Does that times function work?', () => {
    expect(functions.times(1,2)).toBe(2);
    expect(functions.times(101,202)).toBe(20402);
});
test('Does that divide function work?', () => {
    expect(functions.divide(2,1)).toBe(2);
    expect(functions.divide(303,101)).toBe(3);
});

test('calculator', () => {
    expect(functions.calcSubmit(3,4,'add')).toBe(7);
    expect(functions.calcSubmit(-3,4,'add')).toBe(1);
    expect(functions.calcSubmit(3.1,4,'add')).toBe(7.1);
    expect(functions.calcSubmit(3,4,'minus')).toBe(-1);
    expect(functions.calcSubmit(3,4,'times')).toBe(12);
    expect(functions.calcSubmit(3,4,'divide')).toBe(0.75);
    expect(functions.calcSubmit(3,0,'divide')).toBe(Infinity);
});

// tax
test('tax', () => {
    expect(functions.tax(1)).toBe(.15);
    expect(functions.tax(2)).toBe(.3);
    expect(functions.tax(50000)).toBe(7630.35);
    expect(functions.tax(100000)).toBe(18141.11); // corrected from 18541.11
    expect(functions.tax(150000)).toBe(31211.10);
    expect(functions.tax(250000)).toBe(61796.26);
});

test('tax net', () => {
    expect(functions.taxNet(0,0)).toBe(NaN);
    expect(functions.taxNet(1,.15)).toBe(15);
    expect(functions.taxNet(250000, 61796.26)).toBe(24.72);
});

test('array add', () => {
    let array=[0];
    expect(functions.arrayAdd('1',array)).toEqual([[0,1],'"1" added to array.']);
    array=[0];
    expect(functions.arrayAdd('a',array)).toEqual([[0],'"a" is not a valid number.']);
});
test('array show', () => {
    let array=[0,1];
    expect(functions.arrayShow(1,array)).toEqual([[0,1],'0,1']);
});
test('array total', () => {
    let array=[3,4];
    expect(functions.arrayTotal(0,array)).toEqual([[3,4],'The total of [3, 4] is 7.']);
});
test('array clear', () => {
    let array=[0];
    expect(functions.arrayClear(0,array)).toEqual([[],'Array cleared.']);
});