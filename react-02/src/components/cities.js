import React, {Component} from 'react';
import './cities.css';
import {CityController} from './cities_class';
import functions from './cities_functions';
import postData from './fetch';
import Toggle from './toggle';
import {ReactComponent as IconCheck} from '../svg/Icon_check.svg';
import {ReactComponent as IconAttention} from '../svg/Icon_attention_circle.svg';

const url = 'http://localhost:5000/';

class Cities extends Component {
  constructor(props) {
    super(props);
    this.state = {
      controller: {},
      data: {},

      total: 0,
      highest: '--',
      lowest: '--',

      action: null,

      message: null,
      messageType: null,

      id: null,
      name: '',
      lat: '',
      lon:'',
      amount: '',

      online: false,
      update: false
    };
    this.controller = new CityController();
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputBlur = this.handleInputBlur.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }

  async componentDidMount() {
    try {
      // const online = await postData(url + 'hi');
      const data = await this.pull(url);
      this.setState({
        data: data,
        online: true,
        update: true
      });
    } catch (error) {
      this.setMessage(error, 'warn')
    };
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
      id: null,
      name: '',
      lat: '',
      lon: '',
      amount: '',
      action: null
    });
  }

  async confirm(action, id, name, amount, lat, lon) {
    amount = (amount)?amount:0;
    lat = (lat)?lat:0;
    lon = (lon)?lon:0;
    switch (action) {
      case 'create':
        try {
          await this.update(action, undefined, name, amount, lat, lon);
          this.setState({
            message: `Added city: ${name}.`,
            messageType: 'check'
          });
          this.clearInputs();
        } catch(error) {
          console.log(error);
          this.setState({
            message: `${error}`,
            messageType: 'warn'
          });
        };
        break;
      case 'delete':
        try {
          if (this.controller.cities[this.state.id].name !== this.state.name) {
            throw Error('name does not match');
          }
          await this.update(action, id);
          this.setState({
            message: `Removed city: ${name}.`,
            messageType: 'check',
          });
          this.clearInputs();
        } catch (error) {
          console.log(error);
          this.setState({
            message: `${error}`,
            messageType: 'warn'
          });
        };
        break;
      case 'move in':
      case 'move out':
        try {
          await this.update(action, id, undefined, amount);
          this.setState({
            message: 
              (this.state.action==='move in')?
                `Moved ${amount} into ${name}.`:
                `Moved ${amount} from ${name}.`,
            messageType: 'check',
          });
          this.clearInputs();
        } catch (error) {
          console.log(error);
          this.setState({
            message: `${error}`,
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

  setController() {
    this.setState({
      controller: JSON.parse(JSON.stringify(this.controller))
    });
  }

  setMessage(message, type) {
    console.log(message);
    this.setState({
      message: message,
      messageType: type,
    })
  }

  async pull(url) {
    try {
      let data = await postData(url + 'all');
      if (data.status!==200) {
        console.log(data.status);
        throw Error(data.status);
      } else if (data.length > 0) {
        this.setState({action: 'create'})
        const maxKey = data.reduce(
          (a,b) => (a.key > b.key) ? a : b
        ).key;
        for (let k=1; k<=maxKey; k++) { 
          const keyedCity = data.find(e => e.key === k);
          if (keyedCity) {
            await this.controller.add(
              keyedCity.info.name, 
              keyedCity.info.lat,
              keyedCity.info.lon,
              keyedCity.info.pop,
              false
            );
          } else {
            functions.idCounter();
          };
        };
        this.setController();
        this.setMessage('Retrieved saved data.', 'check');
      } else {
        this.setMessage('No saved data.', 'check');
      };
    } catch (error) {
      console.log(error);
      this.setMessage('Unable to connect to API.', 'warn');
    };
  }

  async update(action, id, name, pop, lat, lon, push=true) {
    this.setController();
    let keyedCity;
    switch (action) {
      case 'create':
        keyedCity = this.controller.add(name, lat, lon, pop);
        break;
      case 'delete':
        keyedCity = this.controller.remove(id);
        break;
      case 'move in':
      case 'move out':
        keyedCity = this.controller.migration(action, pop, id);
        break;
      default:
        // do nothing
        return;
    };
    const key = keyedCity.key;
    
    if (this.state.update && push) {
      try {
        let data;
        if (this.state.action === 'create') {
          data = await postData(url + 'add', keyedCity);
        } else if (this.state.action.match(/move in|move out/)) {
          data = await postData(url + 'update', keyedCity);
        } else if (this.state.action === 'delete') {
          data = await postData(url + 'delete', {key: key});
        };
        if (data.status === 200) {
          const saveData = await postData(url + 'save');
          if (saveData.status === 200) {
            console.log('saved to file');
          } else {
            console.log('error saving to file');
          }
        } else if (data.msg) {
          console.log(data.msg);
          throw Error(data.msg);
        } else {
          console.log('unknown database error');
          throw Error('unknown database error');
        };
      } catch (error) {
        console.log(error);
        // if (this.state.action === 'create') {
        //   delete this.controller.cities[key];
        // };
        throw Error(error);
      };
    } else {
      // do nothing
    };
  }

  handleToggle(toggle) {
    this.setState({update: toggle});
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
            <p>Location: ({this.controller.cities[key].lat}, {this.controller.cities[key].lon})</p>
            <p>({this.controller.cities[key].whichSphere()})</p>
            <p>Population: {this.controller.cities[key].pop}</p>
            <div>
              {this.renderButton(
                'Add People', 
                {action: 'move in', 
                id: key}
              )}
              {this.renderButton(
                'Subtract People', 
                {action: 'move out', 
                id: key}
              )}
              {this.renderButton(
                'Delete City', 
                {action: 'delete',
                id: key},
                'button--alert'
              )}
            </div>
          </div>
        );
      };
    };
    const citiesList =
      <div id="idCitiesList">
        {list}
      </div>
    ;

    const citiesToggle = 
      <div id="idCitiesToggle">
        <Toggle 
          name="toggleDatabase" 
          disabled={!this.state.online} 
          checked={this.state.update}
          onChange={this.handleToggle}
        />
        {(this.state.online)
          ?<span>Auto-Save</span>
          :<span className="disabled">Auto-Save Unavailable: No Local Server</span>
        }
      </div>
    ;

    const citiesReport =
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
    
    const citiesInputs = 
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
          <button 
            className="button--check"
            onClick={() => this.confirm(
              this.state.action,
              this.state.id,
              this.state.name, 
              this.state.amount,
              this.state.lat, 
              this.state.lon, 
            )}
          >
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

    const citiesMessage = 
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
        {citiesToggle}
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
