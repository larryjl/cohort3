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
    # pick a folder you have ...
    contents = []
    i = 0
    for (dirpath, dirnames, filenames) in os.walk(path):
        contents.extend(filenames)
        break
    return contents
