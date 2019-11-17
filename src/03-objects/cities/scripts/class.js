import functions from './functions.js'

const City = class {
  constructor(nameStr, latNum, lonNum, popNum=0) {
    if (lonNum === undefined) {
      throw {message: 'missing city info'};
    };
    this.name = nameStr;
    this.lat = latNum;
    this.lon = lonNum;
    this.pop = popNum; 
  }
  show() {
    return `${this.name},${this.lat},${this.lon},${this.pop}`;
  }
  movedIn(num=0) {
    this.pop += num;
    return this.pop;
  }
  movedOut(num=0) {
    this.pop -= num;
    return this.pop;
  }
  howBig() {
    const sizes = [ // -- modified values to not overlap
      {size: 'city', min: 100.001*1000, max:Infinity}, // inspired by Sally
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

const Controller = class {
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
      throw {message: 'city not found'};
    };
  }
  getMost(pole) {
    if (Object.keys(this.cities).length===0) {
      throw {message: 'no cities'};
    } else {
      const furthest = Object.values(this.cities).reduce(
        (a, b) => {
          switch (pole) {
            case 'north':
              return (a.lat > b.lat) ? a : b; // inspired by Mike
            case 'south':
              return (a.lat < b.lat) ? a : b;
            default:
              throw {message: 'desired hemisphere unknown'};
          }
        }
      );
      // // check for equal cities
      const equalCities = [];
      for(let i in this.cities) {
        if (this.cities[i].lat === furthest.lat) {
          equalCities.push(this.cities[i]);
        };
      };
      return equalCities;
    };
  }
  getMostNorthern() {
    return this.getMost('north');
  }
  getMostSouthern() {
    return this.getMost('south');
  }
  getPopulation() {
    if (Object.keys(this.cities).length===0) {
      return 0;
    } else {
      return Object.values(this.cities).reduce((a, b) => a.pop + b.pop);
    };
  }
  createCity(nameStr, latNum, lonNum, popNum=0) {
    if (lonNum === undefined) {
      throw {message: 'missing city info'};
    };
    const city = new City(nameStr, latNum, lonNum, popNum);
    const key = functions.idCounter(); // protected in closure
    this.cities[key]=city;
    return city;
  }
  deleteCity(keyNum) {
    if (this.cities[keyNum]) {
      delete this.cities[keyNum];
    } else {
      throw {message: 'city not found'};
    };
  }
};

export {City, Controller};