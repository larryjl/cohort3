import pytest
import readExcel

path = "./excel/Job Search Tracker.xlsx"


def test_dict():
    wbDict = readExcel.workbookToDict(path)
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

def test_report():
    wbDict = readExcel.workbookToDict(path)
    result = readExcel.jobReport(
        wbDict, "Jobs", 1, ("Company", "Location", "Job Title", "Application Date"), "Company", "Connections", ("Name", "Job Title"), "JobID", "Job-Keywords", "Keyword", "Keywords", ("Keyword", "Type"), "Job", "./reports/reportExcel.md"
    )
    print(result)
    assert type(result) == str
