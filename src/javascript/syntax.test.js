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

test('test function with loops', () => {
    expect(functions.funLoop(0)).toBe('9a3b3');
});

test('test objects', () => {
    expect(functions.funObject(['a','b'])).toBe('ab');
});