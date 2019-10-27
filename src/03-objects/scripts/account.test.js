import Account from './account.js';
import functions from './functions.js';

test('account new', () => {
  const account = new Account('checkingAccount', 25);
  expect(account.name).toBe('checkingAccount');
  expect(account.bal).toBe(25);

  account.deposit(10);
  expect(account.bal).toBe(35);

  account.withdraw(30);
  expect(account.bal).toBe(5);

  expect(account.balance()).toBe(5);
});

test('account click', () => {
  const account = new Account('checkingAccount', 25);
  let event = {};
  let input;
  const output = document.createElement('div');

  // test deposit
  event = {
    target: {
      id: 'idBtnDeposit'
    }
  };
  input = 10;
  functions.hearClick(event, account, input);
  expect(account.bal).toBe(35);

  // test withdraw
  event = {
    target: {
      id: 'idBtnWithdraw'
    }
  };
  input = 30;
  functions.hearClick(event, account, input);
  expect(account.bal).toBe(5);

  // test balance
  event = {
    target: {
      id: 'idBtnBalance'
    }
  };
  functions.hearClick(event, account, input, output);
  expect(output.textContent).toBe('Current balance: $5.00');
});