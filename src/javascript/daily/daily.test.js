import functions from './daily.js'

test('Check equality', () => {
    expect(functions.assertEquals('a','b')).toBe(false);
    expect(functions.assertEquals('a','a')).toBe(true);
    expect(functions.assertEquals(1,2)).toBe(false);
    expect(functions.assertEquals(2,2)).toBe(true);
    expect(functions.assertEquals('2',2)).toBe(false); // tbd
    expect(functions.assertEquals(2.0,2)).toBe(true);
    expect(functions.assertEquals('this value','this value')).toBe(true);
});

test('email builder from an array', () => {
    const name = ["first", "last"];
    expect(functions.makeEmailArr(name))
        .toEqual("first.last@evolveu.ca");
    expect(functions.makeEmailArr(["First", "Last"]))
        .toEqual("first.last@evolveu.ca");
    expect(functions.makeEmailArr(["Bill", "Smith"]))
        .toEqual("bill.smith@evolveu.ca");
});