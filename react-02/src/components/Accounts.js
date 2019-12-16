import React from 'react';
import './Accounts.css';
import {AccountController} from './account.js';
import {ReactComponent as IconCheck} from '../svg/Icon_check.svg';
import {ReactComponent as IconAttention} from '../svg/Icon_attention_circle.svg';


class Accounts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      highest: {name: null, bal: 0},
      lowest: {name: null, bal: 0},
      action: null,
      message: null,
      messageType: null,
      accountName: '',
      amount: 0,
    };
    this.controller = new AccountController();
  }

  roundDown(num, digits) {
    return Math.floor(num * 10**digits) / 10**digits;
  }

  report() {
    if (this.controller.accounts.length > 0) {
      this.setState({ 
        total: this.controller.total().toFixed(2),
        highest: {
          name: this.controller.highest().name,
          bal: this.controller.highest().bal.toFixed(2)
        },
        lowest: {
          name: this.controller.lowest().name, 
          bal:this.controller.lowest().bal.toFixed(2)
        }
      });
    } else {
      this.setState({
        total: 0,
        highest: {name: null, bal: 0},
        lowest: {name: null, bal: 0}
      })
    }
  }

  clearInputs() {
    this.setState({
      accountName: '',
      amount: 0,
      action: null
    });
  }

  confirm(name='', amount=0) {
    let msg;
    switch (this.state.action) {
      case 'create':
        msg = this.controller.add(name, amount);
        if (msg === 'error') {
          this.setState({
            message: `Account already exists: ${name}.`,
            messageType: 'warn'
          });
        } else {
          this.setState({
            message: `Added account: ${name}.`,
            messageType: 'check'
          });
          this.clearInputs();
        };
        break;
      case 'delete':
        msg = this.controller.remove(name);
        if (msg === 'error') {
          this.setState({
            message: `Account does not exist: ${name}.`,
            messageType: 'warn'
          });
        } else {
          this.setState({
            message: `Removed account: ${name}.`,
            messageType: 'check',
          });
          this.clearInputs();
        };
        break;
      case 'deposit':
      case 'withdraw':
        msg = this.controller.transaction(this.state.action, amount, null, name);
        if (msg === 'error') {
          this.setState({
            message: `Account does not exist: ${name}.`,
            messageType: 'warn'
          });
        } else {
          
          this.setState({
            message: 
              (this.state.action==='deposit')?
                `Deposited $${amount} into ${name}.`:
                `Withdrew $${amount} from ${name}.`,
            messageType: 'check',
          });
          this.clearInputs();
        };
        break;
      default:
    }; 
    this.report();
  }

  renderButton(label, stateKeyValues, classNames){
    let state = {};
    for (let key in stateKeyValues) {
      state[key] = stateKeyValues[key];
    };
    return(
      <button onClick={() => {this.setState(state)}} className={classNames}>
        {label}
      </button>
  )}

  render() {

    let list = [];
    if (!this.controller.accounts.length) {
      list = 'There are no accounts.';
    } else {
      for (let account of this.controller.accounts) {
        list.push(
          <div key={account.id} className="accounts--card">
            <h4>[{account.id}] {account.name}</h4>
            <p>Balance: {account.bal.toFixed(2)}</p>
            <div>
              {this.renderButton(
                'Deposit', 
                {action: 'deposit', accountName: account.name}
              )}
              {this.renderButton(
                'Withdraw', 
                {action: 'withdraw', accountName: account.name}
              )}
              {this.renderButton(
                'Delete Account', 
                {action: 'delete', accountName: account.name},
                'button--alert'
              )}
            </div>
          </div>
        );
      };
    };
    let accountsList =
      <div id="idAccountsList">
        {list}
      </div>
    ;

    let accountsReport =
      <div id="idAccountsReport">
        <div>
          <div className="kpi rag--g">${this.state.total}</div>
          <div className="kpi--caption">Total Balance</div>
        </div>
        <div>
          <div className="kpi rag--a">${this.state.highest.bal}</div>
          <div className="kpi--caption">Highest Balance</div>
          <div className="kpi--caption">{
            (this.state.highest.name)?`(${this.state.highest.name})`:null
          }</div>
        </div>
        <div>
          <div className="kpi rag--r">${this.state.lowest.bal}</div>
          <div className="kpi--caption">Lowest Balance</div>
          <div className="kpi--caption">{
            (this.state.lowest.name)?`(${this.state.highest.name})`:null
          }</div>
        </div>
      </div>
    ;
    
    let accountsInputs = 
      <div id="idAccountsInputs">
        {(this.state.action && this.state.action.match(/delete/))?
          <div className="input--message button--alert">
            Confirm the name of the account to delete.
          </div>
        :null}
        {(this.state.action && this.state.action.match(/create|delete/))?
          <div className="input--row">
            <span className="input--caption">Account Name: </span>
            <input type="text" 
              value={this.state.accountName} 
              onChange={event => {this.setState({
                accountName: event.target.value.trim()
              })}}
            ></input>
          </div>
        :null}
        {(this.state.action && !this.state.action.match(/delete/))?
          <div className="input--row">
            <span className="input--caption">{(this.state.action==='create')?
              'Starting Balance: ':
              'Amount: '}
            </span>
            <span className="input--prefix">$</span>
            <input type="number" min={0} placeholder={0.00} step={0.01} 
              value={this.state.amount} 
              onChange={event => {this.setState({
                amount: this.roundDown(event.target.value, 2)
              })}}
            ></input>
          </div>
        :null}
        <div id="idAccountsInputsButtons">
          <button className="button--check" onClick={() => this.confirm(
            this.state.accountName, this.state.amount
          )}>
            Confirm
          </button>
          {this.renderButton('Cancel', {action: null})}
        </div>
      </div>
    ;

    let accountsMessage = 
      <p id="idAccountsMessage">
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
      <main id="idMainAccounts">
        <h2>Accounts</h2>
        {accountsReport}
        {accountsMessage}
        <div id="idAccountsContainer">
          <div>
          {accountsList}
          {this.renderButton('Create Account', {action: 'create'})}
          </div>
          <div>
            {(this.state.action)?accountsInputs:null}
          </div>
        </div>
      </main>
    );
  }
};

export default Accounts;