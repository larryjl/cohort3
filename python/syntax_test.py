import pytest
import syntax


class TestType:
    def test_type_int(self):
        assert syntax.datatype(1) == int
        
    def test_type_float(self):
        assert syntax.datatype(1.0) == float

    def test_type_string(self):
        assert syntax.datatype("string") == str

    def test_type_bool(self):
        assert syntax.datatype(True) == bool

    def test_type_tuple(self):
        assert syntax.datatype(("a", 1)) == tuple

    def test_type_list(self):
        assert syntax.datatype(["a", 1]) == list

    def test_type_set(self):
        assert syntax.datatype({"a", "b"}) == set
        
    def test_type_dictionary(self):
        assert syntax.datatype({"a": 1, "b": 2}) == dict

    def test_type_none(self):
        assert syntax.datatype(None) == type(None)

class TestIfElse:
    def test_if_else_true(self):
        assert syntax.ifElse(True) == True

    def test_if_else_false(self):
        assert syntax.ifElse(False) == False

class TestIfIn:
    def test_if_in_true(self):
        assert syntax.ifIn({"a","b"}, "a") == True

    def test_if_in_true(self):
        assert syntax.ifIn({"a","b"}, "A") == False

class TestFunParameters:
    def test_fun(self):
        assert syntax.funParameters(True) == True

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
