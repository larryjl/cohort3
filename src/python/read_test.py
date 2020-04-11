import pytest
import read


class Test_read:
    path = "../javascript/syntax.js"

    def test_read(self):
        assert read.read(self.path) == "const func"

    def test_lines(self):
        assert read.lines(self.path) == 105

    def test_substrings(self):
        assert read.substrings(self.path, "for") == 5


class Test_folder:
    path = "../javascript/"

    def test_lines(self):
        result = read.folderFiles(self.path)
        print(result)
        assert len(result) == 12


class Test_csv:
    path = "./data/Census_by_Community_2019.csv"
    fields = ("CLASS", "SECTOR")

    def test_lineToList(self):
        assert read.lineToList("a,  b,  c,  d  ,  ") == ["a", "b", "c", "d", ""]

    def test_csv(self):
        result = read.communityReport(self.path, self.fields)
        assert result == (307, 142, 2)
