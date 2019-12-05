import React from 'react';
import './nav.css';
import { ReactComponent as IconExit } from '../svg/Icon_exit.svg';


class Nav extends React.Component {  
  constructor(props) {
    super(props);
    this.state = {
      activeLink: 0
    };
  };
  setActive = (link) => {
    this.setState({activeLink: link});
  };
  render() {
    return (
      <nav id="idNav">
        {/* react 2.0 svg */}
        <a href="#transform" onClick={() => {this.setActive(2)}}>
          <IconExit tabIndex="0" alt="transform" className={
            "rotating icon"+
            ((this.state.activeLink===2)? " icon--active" : "")
          }/>
        </a>

        <a href="#accounts" onClick={() => {this.setActive(3)}}>
          <IconCard tabIndex="0" alt="accounts" className={
            "rotating icon"+
            ((this.state.activeLink===3)? " icon--active" : "")
          }/>
        </a>

        <a href="#cities" onClick={() => {this.setActive(4)}}>
          <IconUserCircle tabIndex="0" alt="cities" className={
            "rotating icon"+
            ((this.state.activeLink===4)? " icon--active" : "")
          }/>
        </a>
      </nav>
    );
  };
};

export default Nav;