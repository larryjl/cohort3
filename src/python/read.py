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
        fileList.append(
            {"filename": fname, "size": fsize}
        )   
        print(f"Filename: {fname:20} Size: {fsize:6} Bytes")
    return fileList
