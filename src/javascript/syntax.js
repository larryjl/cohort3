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
    let foo = (a) => a;
    return foo(a);
},

// arrays
//  add to the front
//  add to the end
//  update values
funArray: (a) => {
    return undefined;
}

// loops 
//  for
//  for/in
//  while
//  do while
//  forEach (with array and function)

// Objects / Dictionaries
//  declare object
//  lookup key to retrieve value
};

export default functions;