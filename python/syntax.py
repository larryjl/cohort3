# data types
def datatype(a):
    b = a
    return type(b)


# sample if / else
def ifElse(bool):
    if bool:
        return True
    else:
        return False


#  in keyword
def ifIn(set, target):
    if target in set:
        return True
    else:
        return False


# casting and switch
def castSwitch(input, datatype):
    switch = {
        "int": int,
        "float": float,
        "str": str,
        "bool": bool
    }
    return switch.get(datatype, None)(input)

# list comprehension comparison
def notComprehension(numList):
    doubled = []
    for num in numList:
        doubled.append(num*2)
    return doubled
    
# list comprehension
def comprehension(numList):
    doubled = [num * 2 for num in numList]
    return doubled

# function arguments
def args(*args):
    argList = []
    for num in args:
        argList.append(num)
    return sum(argList)

def kwargs(num, string):
    return f'There are {num} {string}s!'

# lists
def funList(method, myList, *params):
    newList = myList.copy()
    listMethods = {
        "append": newList.append,
        "remove": newList.remove,
        "pop": newList.pop,
        "clear": newList.clear,
        "count": newList.count,
        "extend": newList.extend,
        "insert": newList.insert,
        "sort": newList.sort,
        "reverse": newList.reverse
    }
    result = listMethods[method](*params)
    if not result:
        result = newList
    return result

# loops
def funWhile():
    i = 0
    iList = []
    while i < 6:
        i += 1
        if (i % 2 == 0):
            continue
        iList.append(i)
    else: 
        iList.append(99)
    return iList

def funFor():
    iList = []
    for i in range(3,7):
        if (i % 2 == 0):
            continue
        iList.append(i)
    else:
        iList.append(99)
    return iList

funLambda = lambda n: n+1
