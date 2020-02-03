const functions = {
  
  factorial: function (n) {
    if (n>0) {
      let i=n;
      let arrangements = [];
      while (i > 0) {
        arrangements.push(i--);
      };
      return (arrangements.reduce((a,b)=>a*b));
    } else throw Error('invalid parameters');
  },

  // Permutations
  // nPr = n!/(n-r)!
  // where n = number of items in set
  // and r = number of items selected
  // e.g. n=5,r=3, nPr = 5*4*3 = 60
  permutations: function (n,r=n) {
    if (n>=r && r>0) {
      let i=n;
      let seats = [];
      while (i > n-r) {
        seats.push(i--);
      };
      return (seats.reduce((a,b)=>a*b));
    } else throw Error('invalid parameters');
  },

  // Combinations
  // nCr = (n!/(n-r)!)/r!
  //     = n!/(r!(n-r)!)
  // e.g. n=6, r=4, nCr = 6*5/(2*1) = 15
  combinations: function (n,r=n) {
    return (
      (n===r)?1
      :functions.permutations(n,r)/functions.factorial(r)
    );
  },
  bsearch: function (array, target) {
    // search space is between left and right indexes
    let left = 0;
    let right = array.length -1;
    while (left <= right) {
      // find the mid-point
      let mid = Math.floor((left+right)/2);
      if (array[mid]===target) {
        // value found
        return mid;
      } else if (array[mid] < target) {
        // search the right half
        left = mid +1;
      } else {
        // search left half
        right = mid -1;
      };
    };
    // searched all values without match
    return -1;
  }
};

export default functions;