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
funLoop: (x) => {

    // for
    for (let i=0;i<3;i++) { // loop 3x
        x++;
    }; // add 3 to x
        // e.g. x=3

    // for/in
    let obj = {a:'a',b:'b'}; // loop 2x
    for (let i in obj) {
        obj[i]=obj[i]+x;
    }; // obj = {a:`a${x+3}`,b:`b${x+3}`}
        // e.g. x=3; obj={a:'a3',b:'b3'}
    
    // while 
    let n=0;
    while (n<3) { // loop 3x
        x++;
        n++;
    }; // add 3 more to x
        // e.g. x=6; n=3

    // do while
    do {
        x++;
        n++;
    } while (n<6); // add 3 more to x
        // e.g. x=9; n=6

    // forEach 
    let arr = Object.values(obj); // e.g. arr=['a3','b3']
    let str = x.toString(); // e.g. x='6'
    arr.forEach( function(v) {
        str=str+v;
    }); // e.g. '6a3b3'

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