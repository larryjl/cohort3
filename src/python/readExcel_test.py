import pytest
import readExcel

path = "./excel/Job Search Tracker.xlsx"
path1 = "./excel/Job Search Tracker (1).xlsx"
boundsDict1 = {
    "Jobs": {"minRow": 3, "maxRow": 100, "minCol": 2, "maxCol": 100},
    "Keywords": {"minRow": 3, "maxRow": 100, "minCol": 2, "maxCol": 100},
    "Job-Keywords": {"minRow": 3, "maxRow": 100, "minCol": 2, "maxCol": 100},
    "Connections": {"minRow": 3, "maxRow": 100, "minCol": 2, "maxCol": 100},
}


def test_dict():
    wbDict = readExcel.workbookToDict(path)
    assert type(wbDict) == dict
    for sheet in wbDict.values():
        assert type(sheet) == dict
        for row in sheet.values():
            assert type(row) == dict
            assert len(row) > 0


def test_dictSourceNum():
    wbDict = readExcel.workbookToDict(path, 1)
    assert type(wbDict) == dict
    for sheet in wbDict.values():
        assert type(sheet) == dict
        for row in sheet.values():
            assert type(row) == dict
            assert len(row) > 0


def test_dictSpecifyBounds():
    wbDict = readExcel.workbookToDict(path1, boundsDict1)
    assert type(wbDict) == dict
    for sheet in wbDict.values():
        assert type(sheet) == dict
        for row in sheet.values():
            assert type(row) == dict
            assert len(row) > 0



def test_dictSpecifySomeBounds():
    boundsDict = {
        "Jobs": {"minRow": 1, "maxRow": 100},
        "Keywords": {"minRow": 1, "minCol": 1},
        "Job-Keywords": {"maxRow": 100, "maxCol": 100},
    }
    wbDict = readExcel.workbookToDict(path, boundsDict)
    assert type(wbDict) == dict
    for sheet in wbDict.values():
        assert type(sheet) == dict
        for row in sheet.values():
            assert type(row) == dict
            assert len(row) > 0


def test_dictString():
    lineDict = {"ID": 1, "Company": "Amazon", "Job Title": "CSA"}
    groupFields = ["Company", "Job Title"]
    result = readExcel.dictToString(lineDict, groupFields, 10, 10)
    assert result == "Company:   Amazon    , Job Title: CSA       "


def test_match():
    wbDict = readExcel.workbookToDict(path)
    result = readExcel.matching(wbDict, "Connections", "Company", "Amazon")
    print(result)
    assert type(result) == list


def test_matchWithKey():
    wbDict = readExcel.workbookToDict(path)
    result = readExcel.matching(wbDict, "Connections", "Company", "Amazon", "ID")
    print(result)
    assert type(result) == list


def test_duplicate():
    dupList = ("a", "b", "a")
    result = readExcel.duplicateCheck(dupList)
    print(result)
    assert result == "a"


def test_duplicateNone():
    dupList = ("a", "b", "c")
    result = readExcel.duplicateCheck(dupList)
    print(result)
    assert result == False


def test_merge():
    pathDict = {path: None, path1: boundsDict1}
    result = readExcel.mergeWorkbooksToDict(pathDict)
    print(result)
    assert type(result) == dict


def test_report():
    wbDict = readExcel.workbookToDict(path)
    jobFields = ("Company", "Location", "Job Title", "Application Date")
    connectionFields = ("Name", "Job Title")
    keywordFields = ("Keyword", "Type")
    result = readExcel.jobReport(
        wbDict,
        1,
        "Jobs",
        "ID",
        jobFields,
        "Company",
        "Connections",
        connectionFields,
        "JobID",
        "Job-Keywords",
        "Keyword",
        "Keywords",
        keywordFields,
        "Job",
    )
    print(result)
    assert type(result) == str


def test_reportDefaults():
    wbDict = readExcel.workbookToDict(path)
    result = readExcel.jobReport(wbDict, 1,)
    print(result)
    assert type(result) == str


def test_mergeReport():
    pathDict = {path: None, path1: boundsDict1}
    jobFields = ("Company", "Location", "Job Title", "Application Date")
    connectionFields = ("Name", "Job Title")
    keywordFields = ("Keyword", "Type")
    result = readExcel.reportJobWorkbooks(
        pathDict,
        "./reports/reportExcel.md",
        1,
        "Jobs",
        "ID",
        jobFields,
        "Company",
        "Connections",
        connectionFields,
        "JobID",
        "Job-Keywords",
        "Keyword",
        "Keywords",
        keywordFields,
        "Job",
    )
    print(result)
    assert type(result) == str


def test_mergeReportDefaults():
    pathDict = {path: None, path1: boundsDict1}
    result = readExcel.reportJobWorkbooks(pathDict, "./reports/reportExcel.md", 1)
    print(result)
    assert type(result) == str
