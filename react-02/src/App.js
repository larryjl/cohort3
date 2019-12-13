import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Nav from './components/NavComp';
import Game from './components/TicComp';
import Transform from './components/TransformComp';
import Accounts from './components/AccountsComp';
import Cities from './components/CitiesComp';

class App extends Component {

  constructor() {
    super();
    this.state = {
      activePage: "home"
    };
  };

  setPage = (page) => {
    this.setState({
      activePage: page
    });
  };

  render() {
    let main;
    switch(this.state.activePage){
      case "game":
        main = <Game/>
        break;
      case "transform":
        main = <Transform/>
        break;
      case "accounts":
        main = <Accounts/>
        break;
      case "cities":
        main = <Cities/>
        break;
      default: // home
        main = 
          <div className="main--home">
            <img src={logo} className="logo bounceIn" alt="logo" />
          </div>;
    };
    return (
      <div className="app">
        <Nav
          setPage={this.setPage}
        />
        <main>
          {main}
        </main>
        <footer>
        </footer>
      </div>
    );
  }
};

export default App;
