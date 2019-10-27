const Account = class {
  constructor(name, bal) {
    this.name = name;
    this.bal = bal;
  }
  deposit(input) {
    this.bal = this.bal + input;
  }
  withdraw(input) {
    this.bal = this.bal - input;
  }
  balance() {
    return this.bal;
  }
}



export default Account;