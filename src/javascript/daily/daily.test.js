import assertEquals from './daily'

test('Check equality', () => {
    expect(assertEquals('a','b')).toBe(false);
    expect(assertEquals('a','a')).toBe(true);
    expect(assertEquals(1,2)).toBe(false);
    expect(assertEquals(2,2)).toBe(true);
    expect(assertEquals('2',2)).toBe(false); // tbd
    expect(assertEquals(2.0,2)).toBe(true);
    expect(assertEquals('this value','this value')).toBe(true);
});
