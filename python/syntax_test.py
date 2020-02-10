import pytest
import syntax


class TestVariable:
    def test1(self):
        assert syntax.define(1) == 1

    def test2(self):
        assert syntax.define("string") == "string"

    def test3(self):
        assert syntax.define(True) == True

    def test4(self):
        assert syntax.define(["a", 1]) == ["a", 1]

    def test5(self):
        assert syntax.define({"a": 1, "b": 2}) == {"a": 1, "b": 2}

    def test6(self):
        assert syntax.define(None) == None


class TestIfElse:
    def test7(self):
        assert syntax.ifElse(True) == True

    def test8(self):
        assert syntax.ifElse(False) == False


class TestFunParameters:
    def test9(self):
        assert syntax.funParameters(True) == True

    def test10(self):
        assert syntax.funParameters("a") == "a"


class TestFunList:
    def test11(self):
        list = [1, 2, 3]
        assert syntax.funList(list, 4, 1.5, [5, 6], 3) == [6, 5, 4, 2, 1.5]


# test('test array manipulation', () => {
#     expect(JSON.stringify(functions.funArray([0,1],'a','z'))).toBe(JSON.stringify(['a',0,1,'z']));
# });

# test('test function with for loop', () => {
#     expect(functions.funFor(0)).toBe(3);
# });

# test('test function with for in loop', () => {
#     expect(JSON.stringify(functions.funForIn(0))).toBe(JSON.stringify({a:'a0',b:'b0'}));
# });

# test('test function with while loop', () => {
#     expect(functions.funWhile(0)).toBe(3);
# });

# test('test function with do-while loop', () => {
#     expect(functions.funDoWhile(0)).toBe(3);
# });

# test('test function with for-each loop', () => {
#     expect(functions.funForEach(0)).toBe('0ab');
# });

# test('test objects', () => {
#     expect(functions.funObject(['a','b'])).toBe('ab');
# });
