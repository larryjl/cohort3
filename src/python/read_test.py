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
    # path = "./data/Census_by_Community_2018.csv"
    path = "./data/Census_test.csv"
    values = ("RES_CNT",)
    groups = ("CLASS", "SECTOR")

    # def test_length(self):
    #     assert read.communityReport(self.path) == 307

    def test_lineToList(self):
        assert read.lineToList("a,  b,  c,  d  ,  ") == ["a", "b", "c", "d", ""]

    def test_getIndices(self):
        assert read.getIndices(["a","b","c"], ("b","c")) == [1,2]

    def test_lineListToDict(self):
        fieldList = ["a","b","x","y"]
        lineList = ["a1","b1", 1, 2]
        groupIndices = [0,1]
        valueIndices = [2,3]
        assert read.lineListToDict(fieldList, lineList, groupIndices, valueIndices) == {"a": "a1", "b": "b1", "x": 1, "y": 2}

    def test_findDict(self):
        dictList = [
            {"a": "a1", "b": "b1", "x": 1, "y": 2},
            {"a": "a2", "b": "b2", "x": 2, "y": 3},
            {"a": "a3", "b": "b3", "x": 3, "y": 4}
        ]
        matchDict = {"a": "a2", "b": "b2", "x": 1, "y": 1}
        fields = ["a", "b"]
        assert read.findDict(dictList, matchDict, fields) == 1


    def test_findDictFail(self):
        dictList = [
            {"a": "a1", "b": "b1", "x": 1, "y": 2},
            {"a": "a2", "b": "b2", "x": 2, "y": 3},
            {"a": "a3", "b": "b3", "x": 3, "y": 4}
        ]
        matchDict = {"a": "a0", "b": "b0", "x": 1, "y": 1}
        fields = ["a", "b"]
        assert read.findDict(dictList, matchDict, fields) == None

    def test_addListDictValues(self):
        dictList = [
            {"a": "a1", "b": "b1", "x": 0, "y": 0},
            {"a": "a2", "b": "b2", "x": 1, "y": 2},
            {"a": "a3", "b": "b3", "x": 0, "y": 0}
        ]
        newDict = {"a": "a0", "b": "b0", "x": 3, "y": 4}
        fields = ["x", "y"]
        read.addListDictValues(dictList, 1, newDict, fields)
        assert dictList == [
            {"a": "a1", "b": "b1", "x": 0, "y": 0},
            {"a": "a2", "b": "b2", "x": 4, "y": 6},
            {"a": "a3", "b": "b3", "x": 0, "y": 0}
        ]

    def test_output(self):
        assert read.outputReport()

    def test_csv(self):
        result = read.csvReport(self.path, self.values, self.groups)
        assert type(result) == list
        assert len(result) > 0
