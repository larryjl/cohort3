import React, {Component} from 'react';
import {ReactComponent as Logo} from './logo.svg';
import './App.css';
import Nav from './components/nav';
import Game from './components/game';
import Transform from './components/Transform';
import Accounts from './components/accounts';
import Cities from './components/cities';

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
          <main id="idMainHome">
            <Logo className="logo bounceIn" alt="logo" />
          </main>;
    };
    return (
      <div className="app">
        <Nav
          setPage={this.setPage}
          activePage={this.state.activePage}
        />
        {main}
        <footer>
        </footer>
      </div>
    );
  }
};

export default App;
