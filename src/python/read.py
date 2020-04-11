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


# write a python program that will:
# only read the csv file once. Do not load the file into memory and then process it. The intent of this exercise is to pretend that the file is so massive it can only be read once and can not fit into memory.
# use a dictionary to total “res_cnt” by “CLASS” and “SECTOR”. Do not use lists, or sort the file, or any other library. You do not know from execution to execution what the Class or Sector names will be. Write the code so there is only one loop through the data.
# Create a total line for each of the following independently:
# CLASS
# SECTOR
# count the number of lines
# print a nice little report at the end
# as a stretch goal; can you do this with no “if” statement
# write the report to a file called report.txt.


def lineToList(line):
    return [item.strip() for item in line.split(",")]


def communityReport(path, selectFields):
    with open("data/Census_by_Community_2019.csv", "r") as f:
        i = 0
        for line in f:
            if i == 0:
                fields = lineToList(line)
                indices = [fields.index(item) for item in selectFields]
            i += 1
    return i, len(fields), len(indices)
