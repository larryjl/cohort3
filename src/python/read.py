import os


def read(path):
    fh = open(path)
    content = fh.read(10)
    fh.close()
    return content


def lines(path):
    with open(path) as fh:
        for i, v in enumerate(fh):
            pass
    return i + 1


def substrings(path, substring):
    with open(path) as fh:
        # count = fh.read().count(substring)
        count = 0
        for line in fh:
            if line.lstrip()[0:2] != "//":  # exclude comment
                count += line.count(substring)
    return count


def folderFiles(path):
    fileList = list()
    for fname in os.listdir(path):
        fpath = os.path.join(path, fname)
        if os.path.isdir(fpath):
            continue
        fsize = os.stat(fpath).st_size
        fileList.append({"filename": fname, "size": fsize})
        print(f"Filename: {fname:20} Size: {fsize:6} Bytes")
    return fileList


def lineToList(line):
    return [item.strip() for item in line.split(",")]


def getIndices(itemList, items):
    return [itemList.index(item) for item in items]


def lineListToDict(fieldList, lineList, groupIndices, valueIndices):
    resultGroup = {}
    for groupIndex in groupIndices:
        resultGroup[fieldList[groupIndex]] = lineList[groupIndex]
    for valueIndex in valueIndices:
        resultGroup[fieldList[valueIndex]] = float(lineList[valueIndex])
    return resultGroup


def findDict(dictList, matchDict, fields):
    resultIndex = 0
    for existingDict in dictList:
        match = None
        for field in fields:
            if existingDict[field] != matchDict[field]:
                match = False
                break
        if match != False:
            return resultIndex
        resultIndex += 1


def addListDictValues(list, index, item, valueFields):
    for field in valueFields:
        list[index][field] += item[field]


def outputReport():
    # write the report to a file called report.txt.
    pass


def csvReport(path, valueFields, groupFields):
    with open(path, "r") as f:
        results = []
        i = 0
        for line in f:
            lineList = lineToList(line)
            if i == 0:
                fieldList = lineList
                valueIndices = getIndices(lineList, valueFields)
                groupIndices = getIndices(lineList, groupFields)
            else:
                lineDict = lineListToDict(fieldList, lineList, groupIndices, valueIndices)
                resultIndex = findDict(results, lineDict, groupFields)
                if resultIndex != None:
                    addListDictValues(results, resultIndex, lineDict, valueFields)
                else:
                    results.append(lineDict)
            i += 1
    print(results)
    return results
