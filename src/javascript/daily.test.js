import functions from './daily.js'


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


// Daily 2019-10-11
/*    
    Write the function to format an email based on an object / map
*/

test('email builder from an object / map', () => {
    const name = { fname: 'first', lname: 'last' };
    expect(functions.makeEmailObj(name))
        .toEqual("first.last@evolveu.ca");
    expect(functions.makeEmailObj({ fname: 'First', lname: 'Last' }))
        .toEqual("first.last@evolveu.ca");
    expect(functions.makeEmailObj({ fname: "Bill", lname: "Smith" }))
        .toEqual("bill.smith@evolveu.ca");
});
