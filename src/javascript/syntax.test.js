import functions from './syntax';

test('test return variable types', () => {
    expect(functions.define(1)).toBe(1);
    expect(functions.define('string')).toBe('string');
    expect(functions.define(true)).toBe(true);
    expect(JSON.stringify(functions.define(['a',1]))).toBe(JSON.stringify(['a',1]));
    expect(JSON.stringify(functions.define({a:1,b:2}))).toBe(JSON.stringify({a:1,b:2}));
    expect(functions.define(undefined)).toBe(undefined);
});

test('test if else', () => {
    expect(functions.ifElse(true)).toBe(true);
    expect(functions.ifElse(false)).toBe(false);
});

test('test function with parameters', () => {
    expect(functions.funParameters('a')).toBe('a');
});

test('test array manipulation', () => {
    expect(JSON.stringify(functions.funArray([0,1],'a','z'))).toBe(JSON.stringify(['a',0,1,'z']));
});

test('test function with for loop', () => {
    expect(functions.funFor(0)).toBe(3);
});

test('test function with for in loop', () => {
    expect(JSON.stringify(functions.funForIn(0))).toBe(JSON.stringify({a:'a0',b:'b0'}));
});

test('test function with while loop', () => {
    expect(functions.funWhile(0)).toBe(3);
});

test('test function with do-while loop', () => {
    expect(functions.funDoWhile(0)).toBe(3);
});

test('test function with for-each loop', () => {
    expect(functions.funForEach(0)).toBe('0ab');
});

test('test objects', () => {
    expect(functions.funObject(['a','b'])).toBe('ab');
});