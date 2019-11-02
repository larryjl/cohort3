const City = class {
  constructor(nameStr, latNum, lonNum, popNum) {
    this.name = nameStr;
    this.lat = latNum;
    this.lon = lonNum;
    this.pop = popNum;
  }
  show() {
    // const string = `${this.name},${this.lat},${this.lon},${this.pop}`;
    // -- to adapt to any number of properties:
    let string = '';
    const properties = Object.getOwnPropertyNames(this);
    properties.forEach((prop,i) => {
      string = string + this[prop] + ',';
    });
    string = string.slice(0,-1); // remove last ','
    return string;
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
      {size: 'city', min: 100.001*1000, max:8*Math.pow(10,9)}, // -- 8Bil limit
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
  constructor(startingCityArray) {
    this.cities = [];
    if (startingCityArray) {
      this.cities = startingCityArray;
    };
  }
  whichSphere() {
    const sphere = '';
    return sphere;
  }
  getMostNorthern() {
    const mostNorth = '';
    return mostNorth;
  }
  getMostSouthern() {
    const mostSouth = '';
    return mostSouth;
  }
  getPopulation() {
    const total = 0;
    return total;
  }
  createCity() {
    const city = '';
    return city;
  }
  deleteCity() {
    const cities = [];
    return cities;
  }
};

export {City, Controller};