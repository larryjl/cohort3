import React, {Component} from 'react';
import {ReactComponent as Logo} from './logo.svg';
import './App.css';
import Nav from './components/nav';
import Game from './components/game';
// import Transform from './components/Transform';
import Accounts from './components/accounts';
import Cities from './components/cities';
import Link from './components/link';
import Fifo from './components/Fifo';

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
    const pages = {
      home: 
        <main id="idMainHome">
            <Logo className="logo logo--orbit" alt="logo" />
        </main>
      ,
      game: <Game/>,
      accounts: <Accounts/>,
      cities: <Cities/>,
      link: <Link/>,
      fifo: <Fifo/>,
    };
    let main = pages[this.state.activePage];
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
