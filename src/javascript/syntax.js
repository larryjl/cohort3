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
funArray: (array,first,last) => {
    array.unshift(first);
    array.push(last);
    console.log(array);
    return array;
},

// loops 
funLoop: (a) => {
    return undefined;
}

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