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

test('Test calc function.', () => {
    expect(functions.calcSubmit(null,3,4,'add')).toBe(7);
    expect(functions.calcSubmit(null,3,4,'minus')).toBe(-1);
    expect(functions.calcSubmit(null,3,4,'times')).toBe(12);
    expect(functions.calcSubmit(null,3,4,'divide')).toBe(0.75);
});