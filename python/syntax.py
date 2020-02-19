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


# functions
def fun(a):
    return ifElse(a)


# lists
def funList(list, last, second, extension, remove):
    #     add to the end
    list.append(last)
    #     insert
    list.insert(2, second)
    #     add second list to first
    list.extend(extension)
    #     sort reverse
    list.sort(reverse=True)
    # remove index (default last)
    list.pop()
    # remove value
    list.remove(remove)
    return list


# loops
# for
# funFor: (a) => {
#     for (let i=0;i<3;i++) {loop 3x
#         a++;
#     };add 3 to a
#     return a;
# }

# for/in
# funForIn: (a) => {
#     let obj = {a:'a',b:'b'};
#     for (let i in obj) {
#         obj[i]=obj[i]+a;
#     };
#     return obj;
# }

# while
# funWhile: (a) => {
#     let n=0;
#     while (n<3) {loop 3x
#         a++;
#         n++;
#     };add 3 to a
#     return a;
# }

# do while
# funDoWhile: (a) => {
#     let n=0;
#     do {
#         a++;
#         n++;
#     } while (n<3);add 3 to a
#     return a;
# }

# forEach
# funForEach: (x) => {
#     let arr = ['a','b'];
#     let str = x.toString();
#     arr.forEach( function(v) {
#         str=str+v;
#     });e.g. '0ab'
#     return str;
# }

# Objects / Dictionaries
# funObject: (arr) => {
#     declare object
#     let obj=[];
#     arr.forEach( function(v, i) {
#         obj[i]=v;
#     });e.g. obj = {0:'a',1:'b'}
#     lookup key to retrieve value
#     let values = Object.values(obj);
#     let keys = Object.keys(obj);
#     let str = '';
#     for (let i in obj) {
#         str = str + obj[i];
#     };
#     return str;
# }
