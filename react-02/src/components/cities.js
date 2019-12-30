import React from 'react';
import './cities.css';
import {CityController} from './cities_class';
import functions from './cities_functions';
import postData from './fetch';
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

  async confirm(name, amountNum, latNum, lonNum) {
    const lat = (latNum) ? latNum : 0;
    const lon = (lonNum) ? lonNum : 0;
    const amount = (amountNum) ? amountNum : 0;
    switch (this.state.action) {
      case 'create':
        try {
          await this.update(name, amount, lat, lon);
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
          await this.update(name);
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
          await this.update(name, amount);
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

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleInputBlur(event) {
    const targetValue = event.target.value;
    const stateProp = event.target.name;
    this.setState({
      [stateProp]: (stateProp==='amount') ?
      Math.floor(targetValue) :
        (stateProp==='lat' || stateProp==='lon') ?
          functions.roundDown(targetValue,8) :
          targetValue.trim() // name
    });
  }

  async pull(url) {
    try {
      let data = await postData(url + 'all');
      if (data.status===200) {
        //
      };
      if (data.length > 0) {
        this.setState({action: 'create'})
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
            // let cityValuesArr = Array[4];
            // cityValuesArr[0] = city.info.name;
            // cityValuesArr[1] = city.info.lat;
            // cityValuesArr[2] = city.info.lon;
            // cityValuesArr[3] = city.info.pop;

            await this.createCity(
              city.info.name, 
              city.info.lat,
              city.info.lon,
              city.info.pop,
              false
              );
          } else {
            functions.idCounter();
          };
        };
      };
    } catch (error) {
      //
    };
  }

  async update(name, pop, lat, lon, push=true) {
    this.setState({
      controller: JSON.parse(JSON.stringify(this.controller))
    });
    let keyedCity;
    switch (this.state.action) {
      case 'create':
        keyedCity = this.controller.add(name, pop, lat, lon);
        break;
      case 'delete':
        keyedCity = this.controller.remove(null, name);
        break;
      case 'move in':
      case 'move out':
        keyedCity = this.controller.migration(
          this.state.action, pop, null, name
        );
        break;
      default:
    }
    const key = keyedCity.key;
    
    if (push) {
      // console.log(cityObj)
      // const key = +functions.objKeyByValue(this.controller.cities, cityObj);

      // const cityClone = JSON.parse(JSON.stringify(cityObj));
      // const keyedCity = {
      //   key: key,
      //   info: cityClone
      // };
      try {
        let data;
        if (this.state.action.match(/create|move in|move out/)) {
          data = await postData(
            url + (
              (this.state.action==='create') ? 'add' : 'update'
            ),
            keyedCity
          );
        } else if (this.state.action === 'delete') {
          data = await postData(url + 'delete', {key: key});
        };
        if (data.status===200) {
          await postData(url + 'save');
          console.log('saved')
        };
      } catch (error) {
        if (this.state.action === 'create') {
          delete this.controller.cities[key];
        };
        throw Error(error);
      };
    } else {
      // do nothing
    };
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
            this.state.name, 
            this.state.lat, 
            this.state.lon, 
            this.state.amount
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
