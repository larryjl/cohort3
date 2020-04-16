import os
from openpyxl import load_workbook


def workbookToDict(path):
    wb = load_workbook(filename=path, read_only=True, data_only=True)
    wbDict = {}
    for ws in wb:
        wbDict[ws.title] = {}
        for rowNum, rowValues in enumerate(ws.values):
            if rowNum == 0:
                headings = rowValues
                ## todo: check for duplicates
                ## todo: deal with None
                ## todo: specify table location
            else:
                wbDict[ws.title][rowNum] = {}
                for colNum, cellValue in enumerate(rowValues):
                    wbDict[ws.title][rowNum][headings[colNum]] = cellValue
    return wbDict


def dictToString(lineDict, keys, keyLength, valueLength, separator=", "):
    string = ""
    for key in keys:
        name = key + ":"
        value = str(lineDict[key])
        string += f"{name:{keyLength}} {value:{valueLength}}{separator}"
    return string[:-2]


def matching(wbDict, sheet, matchKey, matchValue):
    idList = [
        rowItem[0]
        for rowItem in wbDict[sheet].items()
        if rowItem[1][matchKey] == matchValue
    ]
    return idList


def jobReport(
    wbDict,
    jobSheet,
    jobId,
    jobFields,
    companyField,
    connectionSheet,
    connectionFields,
    jobIdField,
    jobKeywordSheet,
    keywordField,
    keywordSheet,
    keywordFields,
    title,
    outPath
):
    ## todo: differentiate between row num and id value, or make them the same in the dictionary creation
    jobDict = wbDict[jobSheet][jobId]
    jobInfo = dictToString(jobDict, jobFields, 10, 10,"\r\n")
    company = jobDict[companyField]

    connectionIdList = matching(wbDict, connectionSheet, companyField, company)
    connectionStrList = [
        "- " + dictToString(wbDict[connectionSheet][id], connectionFields, 10, 10)
        for id in connectionIdList
    ]
    connectionInfo = "\r\n".join(connectionStrList)

    jobKeywordIdList = matching(wbDict, jobKeywordSheet, jobIdField, jobId)
    
    keywordList = [wbDict[jobKeywordSheet][id][keywordField] for id in jobKeywordIdList]

    keywordStrList = []
    for keyword in keywordList:
        keywordId = matching(wbDict, keywordSheet, keywordField, keyword)[0]
        keywordString = "- " + dictToString(wbDict[keywordSheet][keywordId], keywordFields, 10, 10)
        keywordStrList.append(keywordString)
    keywordInfo = "\r\n".join(keywordStrList)

    string = "\r\n".join(
        (
            "# " + title,
            jobInfo,
            "## " + connectionSheet,
            connectionInfo,
            "## " + keywordSheet,
            keywordInfo,
        )
    )
    with open(outPath, "w") as f:
        f.write(string)
    return string
