import pytest
import hello

# def setup_module(module):
#     print("\nSetup module")

# def teardown_module(module):
#     print("\nTeardown module")

# @classmethod
# def setup_class(cls):
#     print("\nSetup class")

# @classmethod
# def teardown_class(cls):
#     print("\nTeardown class")

# def setup_function(function):
#     print("\nSetup for function")
#     yield
#     print("\nSetup yield")

# def teardown_function(function):
#     print("\nTeardown for function")
#     yield
#     print("\nTeardown yield")

@pytest.fixture(params=[0,1])
def setup_function(request):
    value = request.param
    print("\nSetup for function")
    print(value)
    return value

@pytest.mark.usefixtures("setup_function")
class Test_hello:
    def test_hello(setup_function):
        print(setup_function)
        assert hello.hello() == "Hello World"