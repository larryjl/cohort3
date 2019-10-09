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
    expect(functions.funParameters(['a',1])).toBe(['a',1]);
});