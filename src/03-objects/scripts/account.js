const Account = class {
  constructor(name, bal) {
    this.name = name;
    this.bal = bal;
  }
  deposit(input=0) {
    this.bal += input; // -- inspired by Pitsini
  }
  withdraw(input=0) {
    if (this.bal >= input) {
      this.bal -= input;
    } else return 'error';
  }
  balance() {
    return this.bal;
  }
};

const AccountController = class {
  constructor() {
    this.accounts = [];
  }
  add(accountName, bal=0) {
    // const account = 
    if (
      this.accounts.find((element) => {
        return element.name === accountName;
      }) === undefined
    ) {
      const account = new Account(accountName, bal);
      this.accounts.push(account);
    } else return 'error';
  }
  remove(accountName) {
    const index = this.accounts.findIndex(
      account => {return account.name === accountName}
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
  // names() {
  //   const names = this.accounts.map((v) => v.name);
  //   return names;
  // }
}

export {Account, AccountController};