const functions = {

// define attributes / variables
//  number
//  string
//  boolean
//  array
//  dictionary / objects
//  undefined
define: (a) => {
    let b=a;
    return b;
},

// sample if / else
ifElse: (bool) => {
    return (bool) ? true : false;
},

// functions
//  parameters
//  returns
funParameters: (a) => {
    let foo = (b) => b;
    return foo(a);
},

// arrays
funArray: (array,first,last) => {
    //  add to the front
    array.unshift(first);
    //  add to the end
    array.push(last);
    //  update values
    return array;
},

// loops 
// for
funFor: (a) => {
    for (let i=0;i<3;i++) { // loop 3x
        a++;
    }; // add 3 to a
    return a;
},

// for/in
funForIn: (a) => {
    let obj = {a:'a',b:'b'};
    for (let i in obj) {
        obj[i]=obj[i]+a;
    }; 
    return obj;
},

// while 
funWhile: (a) => {
    let n=0;
    while (n<3) { // loop 3x
        a++;
        n++;
    }; // add 3 to a
    return a;
},

// do while
funDoWhile: (a) => {
    let n=0;
    do {
        a++;
        n++;
    } while (n<3); // add 3 to a
    return a;
},

// forEach
funForEach: (x) => {
    let obj = {a:'a',b:'b'};
    let arr = Object.values(obj);
    let str = x.toString();
    arr.forEach( function(v) {
        str=str+v;
    }); // e.g. '0ab'
    return str;
},

// Objects / Dictionaries
funObject: (arr) => {
    //  declare object
    let obj=[];
    arr.forEach( function(v, i) {
        obj[i]=v;
    }); // e.g. obj = {0:'a',1:'b'}
    //  lookup key to retrieve value
    let values = Object.values(obj);
    let keys = Object.keys(obj);
    let str = '';
    for (let i in obj) {
        str = str + obj[i];
    };
    return str;
}

};

export default functions;