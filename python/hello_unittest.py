import hello    # The code to test
import unittest   # The test framework

class Test_TestIncrementDecrement(unittest.TestCase):
    def test_increment(self):
        self.assertEqual(hello.hello(), "Hello World")

if __name__ == '__main__':
    unittest.main()

