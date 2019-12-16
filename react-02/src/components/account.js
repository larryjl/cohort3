const Account = class {
  constructor(name, bal, id) {
    this.id = id;
    this.name = name;
    this.bal = Number(bal);
  }
  // balance() {
  //   return this.bal;
  // }
  deposit(input=0) {
    this.bal += Number(input);
  }
  withdraw(input=0) {
    input = Number(input);
    if (this.bal >= input) {
      this.bal -= input;
    } else return 'error';
  }
};

const AccountController = class {
  constructor() {
    this.id = 1000;
    this.accounts = [];
  }
  add(accountName, bal=0) {
    if (!accountName) {
      return 'error'
    } else if (
      this.accounts.find(a => a.name === accountName)
    ) {
      return 'error'
    } else {
      const account = new Account(accountName, Number(bal), this.id);
      this.id++;
      this.accounts.push(account);
    };
  }
  remove(accountName) {
    const index = this.accounts.findIndex(a => a.name === accountName);
    if ( index > -1) {
      this.accounts.splice(index, 1);
    } else return 'error';
  }
  total() {
    if (this.accounts.length > 0) {
      // const balances = this.accounts.map((v) => v.bal);
      // const total = balances.reduce((a, b) => a + b);
      const total = this.accounts.reduce((a, b) => a + b.bal, 0);
      return total;
    } else return 'error';
  }
  highest() {
    if (this.accounts.length > 0) {
      const balances = this.accounts.map((v) => v.bal);
      const maxBalance = Math.max(...balances);
      // const maxBalance = this.accounts.reduce((a, b) => Math.max(a, b.bal), 0);
      return (this.accounts.find(
        a => a.bal === maxBalance
      ))
    } else return 'error';
  }
  lowest() {
    if (this.accounts.length > 0) {
      const balances = this.accounts.map((v) => v.bal);
      const minBalance = Math.min(...balances)
      return (this.accounts.find(
        a => a.bal === minBalance
      ))
    } else return 'error';
  }
  transaction(action, amount, id, name) {
    let account;
    if (id) {
      account = this.accounts.find(a => a.id === id)
    } else if (name) {
      account = this.accounts.find(a => a.name === name)
    } else {
      return 'error';
    };
    if (action==='deposit') {
      return account.deposit(amount);
    } else if (action==='withdraw') {
      return account.withdraw(amount);
    };
  }
}

export {Account, AccountController};