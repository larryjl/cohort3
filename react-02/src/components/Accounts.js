import React from 'react';
import './Accounts.css';
import {AccountController} from './account.js';


class Accounts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      total: '--',
      highest: '--',
      lowest: '--',
      action: null,
      defineMsg: null,
      defineName: '',
      defineBalance: 0,
      manipAmount: 0,
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
        highest: `${this.controller.highest().name}: ${this.controller.highest().bal.toFixed(2)}`,
        lowest: `${this.controller.lowest().name}: ${this.controller.lowest().bal.toFixed(2)}`
      });
    };
  };

  accountList() {
    let list = [];
    for (let account of this.controller.accounts) {
      list.push(
        <tr key={account.id}>
          <td>
            {account.id}
          </td>
          <td>
            {account.name}
          </td>
          <td>
            {account.bal.toFixed(2)}
          </td>
        </tr>
      );
    };
    return list;
  }

  defineConfirm(accountName, accountBalance=0) {
    console.log('ctlconfim');
    let msg;
    if (this.state.action === 'delete') {
      msg = this.controller.remove(accountName);
      if (msg === 'error') {
        this.setState({
          defineMsg: `Account does not exist: ${accountName}`
        });
      } else {
        this.setState({
          defineMsg: `Removed account: ${accountName}`
        });
        // functions.accountSelectUpdate(event.target.id, accountName, select);
        // functions.accountHeadingUpdate(heading, select);
      };
    } else if (this.state.action === 'create') {
      msg = this.controller.add(accountName, accountBalance);
      if (msg === 'error') {
        this.setState({
          defineMsg: `Account already exists: ${accountName}`
        });
      } else {
        this.setState({
          defineMsg: `Added account: ${accountName}`
        });
        // functions.accountSelectUpdate(event.target.id, accountName, select);
        // functions.accountHeadingUpdate(heading, select);
      };
    };
  }

  manipConfirm(amount=0) {

  }

  render() {
    return (
      <main id="idMainAccounts">
        <h2>Accounts</h2>

        <div>
          <h3>Account Summary</h3>
          <div></div>
          <div>
            <table>
              <tbody>
                <tr>
                  <td>Total Balance</td>
                  <td>{this.state.total}</td>
                </tr><tr>
                  <td>Highest Balance</td>
                  <td>{this.state.highest}</td>
                </tr><tr>
                  <td>Lowest Balance</td>
                  <td>{this.state.lowest}</td>
                </tr>
              </tbody>
            </table>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Account</th>
                  <th>Balance</th>
                </tr>
              </thead>
              <tbody>
                {this.accountList()}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h3>Your Accounts</h3>
          <p>
            {this.state.defineMsg}
          </p>
          <button onClick={() => {
            this.setState({
              action: 'create'
            })
          }}>
            Create a New Account
          </button>
          <button onClick={() => {
            this.setState({
              action: 'delete'
            })
          }}>
            Delete an Account
          </button>
        </div>

        <div>
          <div>
            <span>Account Name </span>
            <input type="text" value={this.state.defineName} onChange={event => {
              this.setState({
                defineName: event.target.value.trim()
              });
            }}></input>
          </div>
          <div>
            <span>Starting Balance </span>
            <span>$</span>
            <input type="number" min={0} placeholder={0.00} step={0.01} value={this.state.defineBalance} onChange={event => {
              this.setState({
                defineBalance: this.roundDown(event.target.value, 2)
              });
            }}></input>
          </div>
          <button onClick={() => this.defineConfirm(
            this.state.defineName, this.state.defineBalance
          )}>
            Confirm
          </button>
        </div>

        <div>
          <h3>Make a Transaction</h3>
          <div>{this.state.manipMsg}</div>
          <div>
            <button onClick={() => {
            this.setState({
              action: 'deposit'
            })
          }}>
              Make a Deposit
            </button>
            <button onClick={() => {
            this.setState({
              action: 'withdraw'
            })
          }}>
              Make a Withdrawal
            </button>
          </div>

          <div>
            <div>
              <span>$</span>
              <input type="number" min={0} placeholder={0.00} step={0.01} value={this.state.manipAmount} onChange={event => {
              this.setState({
                manipAmount: this.roundDown(event.target.value, 2)
              });
            }}></input>
            </div>
            <button onClick={() => this.manipConfirm(
              this.state.manipAmount
            )}>
              Confirm
            </button>
          </div>
        </div>
      </main>
    );
  }
};

export default Accounts;
