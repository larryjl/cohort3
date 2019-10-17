import functions from './daily.js'


// Daily 2019-10-16
test('today: advanced js', () => {
    expect(functions.arraySlice([0,1,2,3])).toEqual([1,2]);
    expect(functions.arraySplice([0,1,2])).toEqual([0,'a','b',2]);
    expect(functions.arrayForEach([0,1,2])).toEqual([0,2,4]);
    expect(functions.arrayMap([0,1,2])).toEqual([0,2,4]);
    expect(functions.arrayReduce([0,1,2])).toBe(4);
    expect(functions.arrayFilter([0,1,2])).toEqual([1,2]);
    expect(functions.arraySort([0,1,2])).toEqual([2,1,0]);
});

// Daily 2019-10-15
test('array loops', () => {
    expect(functions.loopFor([0,1,2])).toEqual([0,2,4]);
    expect(functions.loopWhile([0,1,2])).toEqual([0,2,4]);
    expect(functions.loopDoWhile([0,1,2])).toEqual([0,2,4]);
    expect(functions.loopForIn([0,1,2])).toEqual([0,2,4]);
    expect(functions.loopForOf([0,1,2])).toEqual([0,2,4]);
});

// Daily 2019-10-11
test('email builder from an object / map', () => {
    const name = { fname: 'first', lname: 'last' };
    expect(functions.makeEmailObj(name))
        .toEqual("first.last@evolveu.ca");
    expect(functions.makeEmailObj({ fname: 'First', lname: 'Last' }))
        .toEqual("first.last@evolveu.ca");
    expect(functions.makeEmailObj({ fname: "Bill", lname: "Smith" }))
        .toEqual("bill.smith@evolveu.ca");
});

// Daily 2019-10-09
test('email builder from an array', () => {
    const name = ["first", "last"];
    expect(functions.makeEmailArr(name))
        .toEqual("first.last@evolveu.ca");
    expect(functions.makeEmailArr(["First", "Last"]))
        .toEqual("first.last@evolveu.ca");
    expect(functions.makeEmailArr(["Bill", "Smith"]))
        .toEqual("bill.smith@evolveu.ca");
});

// Daily 2019-10-07
test('Check equality', () => {
    expect(functions.assertEquals('a','b')).toBe(false);
    expect(functions.assertEquals('a','a')).toBe(true);
    expect(functions.assertEquals(1,2)).toBe(false);
    expect(functions.assertEquals(2,2)).toBe(true);
    expect(functions.assertEquals('2',2)).toBe(false); // tbd
    expect(functions.assertEquals(2.0,2)).toBe(true);
    expect(functions.assertEquals('this value','this value')).toBe(true);
});