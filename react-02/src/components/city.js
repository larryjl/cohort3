// // closure counter
const idCounter = (() => {
  let nextId = 0; // initialized only once
  return () => {
    nextId++; // nextId available from parent function
    return nextId;
  };
})(); // call to initialize nextId when function is first read

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
    if (Object.keys(this.cities).length===0) {
      throw Error('no cities');
    } else {
      const furthest = Object.values(this.cities).reduce(
        (a, b) => {
          switch (pole) {
            case 'N':
              return (a.lat > b.lat) ? a : b;
            case 'S':
              return (a.lat < b.lat) ? a : b;
            default:
              throw Error('desired hemisphere unknown');
          }
        }
      );
      // // check for equal cities
      const equalCitiesArr = [];
      for(let k in this.cities) {
        if (this.cities[k].lat === furthest.lat) {
          equalCitiesArr.push(this.cities[k].name);
        };
      };
      // // make sentence from array: 'a, b and c'
      let citiesStr;
      switch (equalCitiesArr.length) {
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
      throw Error('missing city info');
    };
    const city = new City(nameStr, latNum, lonNum, popNum);
    const key = idCounter(); // behind closure
    this.cities[key]=city;
    return city;
  }
  remove(keyNum) {
    if (this.cities[keyNum]) {
      delete this.cities[keyNum];
    } else {
      throw Error('city not found');
    };
  }
  migration(action, amount, id, name) {
    let city;
    if (id) {
      city = this.cities[id];
    } else if (name) {
      city = Object.values(this.cities).find(c => c.name === name);
    } else throw Error('No city specified.')
    if (action==='move in') {
      city.movedIn(amount);
    } else if (action==='move out') {
      city.movedIn(-amount);
    };
  }
};

export {City, CityController, idCounter};