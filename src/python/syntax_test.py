import pytest
import syntax


class TestType:
    def test_type_int(self):
        assert syntax.datatype(1) == int

    def test_type_float(self):
        assert syntax.datatype(1.0) == float

    def test_type_complex(self):
        assert syntax.datatype(1j) == complex

    def test_type_string(self):
        assert (
            syntax.datatype(
                """multi
                line
                string"""
            )
            == str
        )

    def test_type_string_multi(self):
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
        assert syntax.ifIn({"a", "b"}, "a") == True

    def test_if_in_true(self):
        assert syntax.ifIn({"a", "b"}, "A") == False


class TestCastSwitch:
    def test_cast_switch_int(self):
        assert syntax.castSwitch(1.9, "int") == 1

    def test_cast_switch_float(self):
        assert syntax.castSwitch("1", "float") == 1.0

    def test_cast_switch_str(self):
        assert syntax.castSwitch(1.0, "str") == "1.0"

    def test_cast_switch_bool_true(self):
        assert syntax.castSwitch("hello", "bool") == True

    def test_cast_switch_bool_false(self):
        assert syntax.castSwitch(0, "bool") == False


class Test_comprehension:
    def test_notComprehension(self):
        assert syntax.notComprehension([1, 2, 3]) == [2, 4, 6]

    def test_comprehension(self):
        assert syntax.comprehension([1, 2, 3]) == [2, 4, 6]


class Test_args:
    def test_args1(self):
        assert syntax.args(1) == 1
    def test_args2(self):
        assert syntax.args(1,2) == 3

class Test_kwargs:
    def test_kwargs1(self):
        assert syntax.kwargs(2, 'apple') == 'There are 2 apples!'
    def test_kwargs2(self):
        assert syntax.kwargs(string = 'apple', num = 2) == 'There are 2 apples!'

class TestFunList:
    def test_list(self):
        myList = [1, 2, 3]
        assert syntax.funList("append", myList, 4) == [1, 2, 3, 4]
        assert syntax.funList("remove", myList, 2) == [1, 3]
        assert syntax.funList("pop", myList, 1) == 2
        assert syntax.funList("clear", myList) == []
        assert syntax.funList("count", myList, 2) == 1
        assert syntax.funList("extend", myList, [4,5]) == [1, 2, 3, 4, 5]
        assert syntax.funList("insert", myList, 2, 4) == [1, 2, 4, 3]
        assert syntax.funList("sort", myList) == [1, 2, 3]
        assert syntax.funList("reverse", myList) == [3, 2, 1]


class TestLoop:
    def test_while(self):
        assert syntax.funWhile() == [1, 3, 5, 99]
    def test_for(self):
        assert syntax.funFor() == [3, 5, 99]

class TestLambda:
    def test_lambda(self):
        assert syntax.funLambda(1) == 2

