import hello

class Test_hello:
    def test_hello(self):
        assert hello.hello() == "Hello World"