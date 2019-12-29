// // counter closure
const idCounter = (() => {
  let nextId = 0; // initialized only once
  return () => {
    nextId++; // nextId available from parent function
    return nextId;
  };
})(); // call to initialize nextId when function is first read

const arrayToSentence = (equalCitiesArr) => {
  // // make sentence from array: 'a, b and c'
  let citiesStr;
  switch (equalCitiesArr.length) {
    case 0:
      throw Error('no values');
    case 1:
      citiesStr = equalCitiesArr[0];
      break;
    case 2:
      citiesStr = equalCitiesArr.join(' and ');
      break;
    default:
      citiesStr = equalCitiesArr.slice(0, equalCitiesArr.length - 1)
        .join(', ') + 
        ', and ' + equalCitiesArr.slice(-1);
  };
  return citiesStr;
};

const equalObjectValues = (itemsObj, reference, measure, out) => {
  // // get array of values of items with measure equal to reference item
  const equalItemsArr = [];
  for(let k in itemsObj) {
    if (itemsObj[k][measure] === reference[measure]) {
      equalItemsArr.push(itemsObj[k][out]);
    };
  };
  return equalItemsArr;
};


const City = class {
  constructor(nameStr, latNum, lonNum, popNum=0) {
    if (lonNum === undefined) {
      throw Error('missing city info');
    };
    this.name = nameStr;
    this.lat = latNum;
    this.lon = lonNum;
    this.pop = popNum; 
  }
  // show() {
  //   return `${this.name},${this.lat},${this.lon},${this.pop}`;
  // }
  movedIn(num=0) {
    this.pop += num;
    return this.pop;
  }
  // movedOut(num=0) {
  //   this.pop -= num;
  //   return this.pop;
  // }
  howBig() {
    const sizes = [ // -- modified values to not overlap
      {size: 'city', min: 100.001*1000, max:Infinity},
      {size: 'large town', min: 20.001*1000, max:100*1000},
      {size: 'town', min: 1001, max: 20*1000},
      {size: 'village', min: 101, max: 1000},
      {size: 'hamlet', min: 1, max: 100}
    ];
    for (let i in sizes) {
      if (this.pop >= sizes[i].min && this.pop <= sizes[i].max) {
        return sizes[i].size;
      };
    };
  }
};


const CityController = class {
  constructor() {
    this.cities = {};
  }
  whichSphere(keyNum) {
    if (this.cities[keyNum]) {
      return (this.cities[keyNum].lat > 0)
        ? "Northern Hemisphere"
        : (this.cities[keyNum].lat < 0)
          ? "Southern Hemisphere"
          : 'Equator';
    } else {
      throw Error('city not found');
    };
  }
  getMost(pole) {
    if (Object.keys(this.cities).length) {
      const furthest = Object.values(this.cities).reduce(
        (a, b) => {
          if (pole==='N') {
              return (a.lat > b.lat) ? a : b;
          } else if (pole==='S') {
              return (a.lat < b.lat) ? a : b;
          } else {
              throw Error('desired hemisphere unknown');
          };
        }
      );
      // // get equal cities
      const equalCitiesArr = equalObjectValues(this.cities, furthest, 'lat', 'name');
      
      // // make sentence from array: 'a, b and c'
      return arrayToSentence(equalCitiesArr);
      
    } else {
      throw Error('no cities');
    };
  }
  // getMostNorthern() {
  //   return this.getMost('north');
  // }
  // getMostSouthern() {
  //   return this.getMost('south');
  // }
  getPopulation() {
    if (Object.keys(this.cities).length === 0) {
      return 0;
    } else {
      const popArr= Object.values(this.cities).map(e => e.pop);
      return popArr.reduce((a, v) => a + v);
    };
  }
  add(nameStr, latNum, lonNum, popNum=0) {
    if (
        !nameStr ||
        (!latNum && latNum !== 0)|| 
        (!lonNum && lonNum !== 0)
      ) {
      throw Error('Missing city info.');
    };
    const city = new City(nameStr, latNum, lonNum, popNum);
    const key = idCounter(); // behind closure
    this.cities[key]=city;
    const cityClone = Object.assign({}, city);
    return {
      key: key,
      info: cityClone
    };
  }
  remove(id, name) {
    const key = (id) ? id : this.identify(name);
    const cityClone = Object.assign({}, this.cities[key]);
    delete this.cities[key];
    return {
      key: key,
      info: cityClone
    };
  }
  migration(action, amount, id, name) {
    const key = (id) ? id : this.identify(name);
    this.cities[key].movedIn(
      (action==='move in') ? amount : -amount
    );
    const cityClone = Object.assign({}, this.cities[key]);
    return {
      key: key,
      info: cityClone
    };
  }
  identify(name) {
    const key = Object.keys(this.cities).find(
      key => this.cities[key].name === name
    );
    if (key) {
      return key;
    } else {
      throw Error('City not found.');
    };
  }
};

export {CityController, idCounter};