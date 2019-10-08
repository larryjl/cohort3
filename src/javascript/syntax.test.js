import functions from './syntax';

test('test comment', () => {
    expect(functions.define()).toBe(1);
});