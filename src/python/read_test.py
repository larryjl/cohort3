import pytest
import read

class Test_read:
    path = '../javascript/syntax.js'
    def test_read(self):
        assert read.read(self.path) == 'const func'
    def test_lines(self):
        path = '../javascript/syntax.js'
        assert read.lines(self.path) == 105
    def test_substrings(self):
        path = '../javascript/syntax.js'
        assert read.substrings(self.path, "for") == 5


class Test_folder:
    path = '../javascript/'
    def test_read(self):
        assert len(read.folderFiles(self.path)) == 12
