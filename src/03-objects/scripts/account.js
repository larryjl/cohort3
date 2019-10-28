const Account = class {
  constructor(name, bal) {
    this.name = name;
    this.bal = bal;
  }
  deposit(input) {
    this.bal += input; // -- inspired by Pitsini
  }
  withdraw(input) {
    if (this.bal >= input) {
      this.bal -= input; // -- inspired by Pitsini
    } else return 'error';
  }
  balance() {
    return this.bal;
  }
};

const AccountController = class {
  constructor(person) {
    this.name = person;
    this.accounts = [];
  }
  add(accountName, bal) {
    const match = this.accounts.find(
      (element) => {element.name === accountName}
    );
    if (match === undefined) {
      const account = new Account(accountName, bal);
      this.accounts.push(account);
    } else return 'error';
  }
  remove(accountName) {
    const index = this.accounts.findIndex(
      account => account.name === accountName
    );
    if ( index > -1) {
      this.accounts.splice(index, 1);
    } else return 'error';

  }
  total() {
    if (this.accounts.length > 0) {
      const balances = this.accounts.map((v) => v.bal);
      const total = balances.reduce((a, b) => a + b);
      return total;
    } else return 'error';
  }
  highest() {
    if (this.accounts.length > 0) {
      const balances = this.accounts.map((v) => v.bal);
      const maxBalance = Math.max.apply(null, balances)
      // -- alternate array max:
      // const maxBalance = balances.reduce((a, b) => Math.max(a, b));
      const account = this.accounts.find(
        (account) => account.bal === maxBalance
      );
      return account;
    } else return 'error';
  }
  lowest() {
    if (this.accounts.length > 0) {
      const balances = this.accounts.map((v) => v.bal);
      const minBalance = Math.min.apply(null, balances)
      const account = this.accounts.find((account) => 
        account.bal === minBalance
      );
      return account;
    } else return 'error';
  }
}

export {Account, AccountController};