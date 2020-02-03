const f = {
  
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

  // Binary search
  bsearch: function (arr, target) {
    // search space is between left and right indexes
    let left = 0;
    let right = arr.length -1;
    while (left <= right) {
      // find the mid-point
      let mid = Math.floor((left+right)/2);
      if (arr[mid]===target) {
        // value found
        return mid;
      } else if (arr[mid] < target) {
        // search the right half
        left = mid +1;
      } else {
        // search left half
        right = mid -1;
      };
    };
    // searched all values without match
    return -1;
  },
  bsearchRecursive: function (arr, target, left=0, right=arr.length-1) {
    // no match after recursion
    if (left > right) {
      return -1;
    };
    // find midpoint
    let mid = Math.floor((left + right) /2);
    if (arr[mid]===target) {
      return mid;
    } else if (arr[mid] < target) {
      // search right half
      return f.bsearchRecursive(arr, target, mid +1, right);
    } else {
      // search left half
      return f.bsearchRecursive(arr, target, left, mid -1);
    };
  },

  // Swap two indices in arr
  swap: function (arr, i, j) {
    const temp = arr[i];
    arr[i]=arr[j];
    arr[j]=temp;
  },

  // Bubble sort
  bubbleSort: function (arr) {
    for (let j=0; j<arr.length-1; j++) {
      for (let i=0; i<arr.length-1; i++) {
        if (arr[i] > arr[i+1]) {
          f.swap(arr, i, i+1);
        };
      };
    };
  },
  bubbleSortRecursive: function (arr, n=arr.length) {
    for (let i=0; i<n-1; i++) {
      if (arr[i] > arr[i+1]) {
        f.swap(arr, i, i+1);
      };
    };
    if (n-1 > 1) {
      f.bubbleSortRecursive(arr, n-1);
    };
  }
};

export default f;