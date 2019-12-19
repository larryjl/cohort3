import React from 'react';
import './Cities.css';
import {CityController, idCounter} from './city.js';
import postData from './fetch.js';
import {ReactComponent as IconCheck} from '../svg/Icon_check.svg';
import {ReactComponent as IconAttention} from '../svg/Icon_attention_circle.svg';

const url = 'http://localhost:5000/';

class Cities extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      controller: {},
      total: 0,
      highest: '--',
      lowest: '--',
      action: null,
      message: null,
      messageType: null,
      name: '',
      lat: '',
      lon:'',
      amount: '',
    };
    this.controller = new CityController();
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputBlur = this.handleInputBlur.bind(this);
  }

  // roundDown(num, digits) {
  //   return Math.floor(num * 10**digits) / 10**digits;
  // }

  report() {
    if (Object.keys(this.controller.cities).length > 0) {
      this.setState({ 
        total: this.controller.getPopulation(),
        highest: this.controller.getMost('N'),
        lowest: this.controller.getMost('S')
      });
    } else {
      this.setState({
        total: 0,
        highest: '--',
        lowest: '--'
      })
    }
  }

  clearInputs() {
    this.setState({
      name: '',
      lat: '',
      lon: '',
      amount: '',
      action: null
    });
  }

  confirm(name, lat, lon, people) {
    const amount = (people) ? people : 0;
    switch (this.state.action) {
      case 'create':
        try {
          this.controller.add(name, lat, lon, amount);
          this.setState({
            message: `Added city: ${name}.`,
            messageType: 'check'
          });
          this.clearInputs();
        } catch(error) {
          this.setState({
            message: `${name}: ${error}`,
            messageType: 'warn'
          });
        };
        break;
      case 'delete':
        try {
          this.controller.remove(name);
          this.setState({
            message: `Removed city: ${name}.`,
            messageType: 'check',
          });
          this.clearInputs();
        } catch (error) {
          this.setState({
            message: `${name}: ${error}`,
            messageType: 'warn'
          });
        };
        break;
      case 'move in':
      case 'move out':
        try {
          this.controller.migration(this.state.action, amount, null, name);
          this.setState({
            message: 
              (this.state.action==='move in')?
                `Moved ${amount} into ${name}.`:
                `Moved ${amount} from ${name}.`,
            messageType: 'check',
          });
          this.clearInputs();
        } catch (error) {
          this.setState({
            message: `${name}: ${error}`,
            messageType: 'warn'
          });
        };
        break;
      default:
        this.setState({
          message: 'Unknown error.',
          messageType: 'warn'
        });
    }; 
    this.report();
  }

  renderButton(label, state, classNames){
    return(
      <button 
        onClick={() => this.setState(state)} 
        className={classNames}
      >
        {label}
      </button>
  )}

  objKeyByValue(object, value) {
    return +Object.keys(object).find(key => object[key] === value);
  }

  async pull(url) {
    try {
      let data = await postData(url + 'all');
      if (data.status===200) {
        //
      };
      if (data.length > 0) {
        const keys = Object.keys(data);
        // let keys = [];
        // for (let city of data) {
        //   keys.push(city.key);
        // };
        const maxKey = keys.reduce((a,b) => (a > b) ? a : b);
        // controllerInst.cities = {};
        for (let k=1; k<=maxKey; k++) { 
          const city = data.find(city => city.key === k);
          if (city) {
            let cityValuesArr = Array[4];
            cityValuesArr[0] = city.info.name;
            cityValuesArr[1] = city.info.lat;
            cityValuesArr[2] = city.info.lon;
            cityValuesArr[3] = city.info.pop;

            await this.createCity(cityValuesArr, false);
          } else {
            idCounter();
          };
        };
      };
    } catch (error) {
      //
    };
  }

  async createCity(cityValuesArr, push) {
    // // local object, cloned into a new object with the key
    const cityObj = this.controller.createCity(...cityValuesArr);
    const key = this.objKeyByValue(this.controller.cities, cityObj);
    const cityClone = JSON.parse(JSON.stringify(cityObj));
    const keyedCity = {
      key: key,
      info: cityClone
    };
    if (push) {
      try {
        let data = await postData(url + 'add', keyedCity); // server data
        if (data.status===200) {
          await postData(url + 'save');
        };
      } catch (error) {
        delete this.controller.cities[key];
      }; 
    } else {
      //
    };
  }

  roundDown(num, digits) {
    return Math.floor(num * 10**digits) / 10**digits;
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleInputBlur(event) {
    console.log('onblur');
    const targetValue = event.target.value;
    const stateProp = event.target.name;
    this.setState({
      [stateProp]: (stateProp==='amount') ?
      Math.floor(targetValue) :
        (stateProp==='lat' || stateProp==='lon') ?
          this.roundDown(targetValue,8) :
          targetValue.trim() // name
    });
  }

  render() {

    let list = [];
    if (!Object.keys(this.controller.cities).length) {
      list = 
        <p>There are no cities.</p>
      ;
    } else {
      for (let key in this.controller.cities) {
        list.push(
          <div key={key} className="cities--card">
            <h4>[{key}] {this.controller.cities[key].name}</h4>
            <p>Location: ({this.controller.cities[key].lat},{this.controller.cities[key].lon})</p>
            <p>Population: {this.controller.cities[key].pop}</p>
            <div>
              {this.renderButton(
                'Add People', 
                {action: 'move in', 
                name: this.controller.cities[key].name}
              )}
              {this.renderButton(
                'Subtract People', 
                {action: 'move out', 
                name: this.controller.cities[key].name}
              )}
              {this.renderButton(
                'Delete City', 
                {action: 'delete'},
                'button--alert'
              )}
            </div>
          </div>
        );
      };
    };
    let citiesList =
      <div id="idCitiesList">
        {list}
      </div>
    ;

    let citiesReport =
      <div id="idCitiesReport">
        <div>
          <div className="kpi rag--g">{this.state.total}</div>
          <div className="kpi--caption">Total Population</div>
        </div>
        <div>
          <div className="kpi rag--a">{this.state.highest}</div>
          <div className="kpi--caption">Most Northern</div>
        </div>
        <div>
          <div className="kpi rag--r">{this.state.lowest}</div>
          <div className="kpi--caption">Most Southern</div>
        </div>
      </div>
    ;
    
    let citiesInputs = 
      <div id="idCitiesInputs">
        {this.state.action && this.state.action.match(/delete/) &&
          (<div className="input--message button--alert">
            Confirm the name of the city to delete.
          </div>)
        }
        {this.state.action && this.state.action.match(/create|delete/) &&
          (<div className="input--row">
            <span className="input--caption">City Name: </span>
            <input type="text" 
              value={this.state.name} 
              name='name'
              onChange={this.handleInputChange}
              onBlur={this.handleInputBlur}
            ></input>
          </div>)
        }
        {this.state.action && this.state.action.match(/create/) &&
          (<div className="input--row">
            <span className="input--caption">Latitude</span>
            <input
              type="number"
              min={-90}
              max={90}
              step={10**-8}
              placeholder={0.00}
              value={this.state.lat}
              name='lat'
              onChange={this.handleInputChange}
              onBlur={this.handleInputBlur}
            ></input>
          </div>)
        }
        {this.state.action && this.state.action.match(/create/) &&
          (<div className="input--row">
            <span className="input--caption">Longitude</span>
            <input 
              type="number" 
              min={-180} 
              max={180} 
              placeholder={0.00} 
              step={10**-8} 
              value={this.state.lon}
              name='lon'
              onChange={this.handleInputChange}
              onBlur={this.handleInputBlur}
            ></input>
          </div>)
        }
        {this.state.action && this.state.action.match(/create|move in|move out/) &&
          (<div className="input--row">
            <span className="input--caption">
              {(this.state.action==='create')?
                'Population: ':
                'People: '}
            </span>
            <input 
              type="number" 
              min={0} 
              placeholder={0} 
              step={1} 
              value={this.state.amount}
              name='amount'
              onChange={this.handleInputChange}
              onBlur={this.handleInputBlur}
            ></input>
          </div>)
        }
        <div id="idCitiesInputsButtons">
          <button className="button--check" onClick={() => this.confirm(
            this.state.name, this.state.lat, this.state.lon, this.state.amount
          )}>
            Confirm
          </button>
          {this.renderButton('Cancel', {
            action: null,
            name: '',
            lat: 0,
            lon: 0,
            amount: 0,
            message: 'Action canceled',
            messageType: 'check'})}
        </div>
      </div>
    ;

    let citiesMessage = 
      <p id="idCitiesMessage">
        {(this.state.messageType==='check')?
          <IconCheck className="svg--check"/>:
          (this.state.messageType==='warn')?
            <IconAttention className="svg--warn"/>:
              null
        }
        {this.state.message}
      </p>
    ;

    return (

      <main id="idMainCities">
        <h2>Cities</h2>
        {citiesReport}
        {citiesMessage}
        <div id="idCitiesContainer">
          <div>
          {citiesList}
          {this.renderButton('Add City', {action: 'create'})}
          </div>
          <div>
            {this.state.action && citiesInputs}
          </div>
        </div>
      </main>
    );
  }
};

export default Cities;
