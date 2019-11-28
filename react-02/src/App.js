import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Nav from './components/NavComp';
import Game from './components/TicComp';

class App extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

  render () {
    return (
      <div className="App">
        <a name="top"></a>
        <Nav
        />
        <header className="App-header svgStyle">
          <img src={logo} className="App-logo bounceIn" alt="logo" />
          {/* <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a> */}
        </header>
        <main>
          <hr/>
          <a name="game"></a>
          <Game
          />
          <hr/>
          <a name="accounts"></a>
          <hr/>
          <a name="cities"></a>
        </main>
        <footer>
        </footer>
      </div>
    );
  }
};

export default App;
