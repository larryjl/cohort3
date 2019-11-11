import functions from './functions.js'

const City = class {
  constructor(nameStr, latNum, lonNum, popNum=0) {
    if (lonNum === undefined) {
      throw {error: 'missing city info'};
    };
    this.key = functions.idCounter();
    this.name = nameStr;
    this.lat = latNum;
    this.lon = lonNum;
    this.pop = popNum; 
  }
  show() {
    return `${this.name},${this.lat},${this.lon},${this.pop}`;
  }
  movedIn(num) {
    this.pop += num;
    return this.pop;
  }
  movedOut(num) {
    this.pop -= num;
    return this.pop;
  }
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

const Controller = class {
  constructor() {
    this.cities = [];
    }
  whichSphere(keyNum) {
    for (let i in this.cities) {
      if (this.cities[i].key === keyNum) {
        const sphere = (this.cities[i].lat > 0)
          ? "Northern Hemisphere"
          : (this.cities[i].lat < 0)
            ? "Southern Hemisphere"
            : 'Equator';
        return sphere;
      };
    };
  }
  getMostNorthern() {
    const mostNorth = this.cities.reduce((a, b) => {
      return (a.lat > b.lat) ? a : b; // inspired by Michael
    });
    // -- check for equal cities
    const northernCities = [];
    this.cities.forEach((v) => {
      if (mostNorth.lat === v.lat) {
        northernCities.push(v);
      };
    });
    return northernCities;
  }
  getMostSouthern() {
    const mostSouth = this.cities.reduce((a, b) => {
      return (a.lat < b.lat) ? a : b; // inspired by Michael
    });
    // -- check for equal cities
    const southernCities = [];
    this.cities.forEach((v) => {
      if (mostSouth.lat === v.lat) {
        southernCities.push(v);
      };
    });
    return southernCities;
  }
  getPopulation() {
    return this.cities.reduce((a, b) => a.pop + b.pop);
  }
  createCity(nameStr, latNum, lonNum, popNum) {
    const city = new City(nameStr, latNum, lonNum, popNum);
    this.cities.push(city);
    return city;
  }
  deleteCity(keyNum) {
    for(let i in this.cities) {
      if (this.cities[i].key === keyNum) {
        this.cities.splice(i,1);
        return this.cities;
      };
    };
    throw({error: 'city not found'});
  }
};

export {City, Controller};