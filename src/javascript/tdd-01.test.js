import emailBuilder from './tdd-01.js'


test('hello world console.log1', () => {
    console.log("Hello World 1");
});


test('hello world console.log2', () => {
    console.log("Hello World 2");
});
 
test('check a string to see if it is the same', () => {
    expect('abcd').toEqual('abcd');
});

test('check an array see if it is the same', () => {
    expect([1, 2, 3, 4]).toEqual([1, 2, 3, 4]);
});


// The email will be: first initial + last name
// larry shumlich should create an email l.shumlich@evolveu.ca
test('email', () => {
    expect(emailBuilder('larry','shumlich')).toBe('l.shumlich@evolveu.ca');
});