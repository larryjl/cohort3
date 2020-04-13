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


def dictToString(lineDict, keys, keyLength, valueLength):
    string = ""
    for key in keys:
        name = key + ":"
        value = str(lineDict[key])
        string += f"{name:{keyLength}} {value:{valueLength}}, "
    return string
    

def csvReport(inPath, outPath, valueFields, groupFields):
    with open(inPath, "r") as inFile, open(outPath, "w") as outFile:
        results = []
        i = 0
        for line in inFile:
            lineList = lineToList(line)
            if i == 0:
                fieldList = lineList
                groupIndices = getIndices(lineList, groupFields)
                valueIndices = getIndices(lineList, valueFields)
            else:
                lineDict = lineListToDict(fieldList, lineList, groupIndices, valueIndices)
                resultIndex = findDict(results, lineDict, groupFields)
                if resultIndex != None:
                    addListDictValues(results, resultIndex, lineDict, valueFields)
                else:
                    results.append(lineDict)
            i += 1
        for j in range(len(groupFields)-1,-1,-1):
            results.sort(key=lambda item: item[groupFields[j]])
        for lineDict in results:
            string = ""
            string += dictToString(lineDict, groupFields, 8, 20)
            string += dictToString(lineDict, valueFields, 8, 20)
            string = string[:-2] + "\r\n"
            outFile.write(string)
    return results
