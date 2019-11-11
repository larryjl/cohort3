import {Account, AccountController} from './account.js';
import functions from './functions.js';

// *** 130b

test('account new', () => {
  const account = new Account('checkingAccount', 25);
  expect(account.name).toBe('checkingAccount');
  expect(account.bal).toBe(25);

  account.deposit(10);
  expect(account.bal).toBe(35);
  account.deposit();
  expect(account.bal).toBe(35);

  account.withdraw(30);
  expect(account.bal).toBe(5);
  account.withdraw();
  expect(account.bal).toBe(5);

  expect(account.balance()).toBe(5);
});

test('account click', () => {
  let event = {};
  const account = new Account('checkingAccount', 25);
  let input;
  const output = document.createElement('div');
  const transaction = document.createElement('span');

  // test deposit
  event = {
    target: {
      id: 'idBtnTransactionConfirm'
    }
  };
  transaction.textContent = 'Deposit ';
  input = 10;
  expect(account.bal).toBe(25);
  functions.accountClick(event, transaction, account, input, output);
  expect(account.bal).toBe(35);
  expect(output.textContent).toBe('Deposited: $10.00');

  // test invalid input val
  input = 'xyz';
  functions.accountClick(event, transaction, account, input, output);
  expect(account.bal).toBe(35);

  // test withdraw
  event = {
    target: {
      id: 'idBtnTransactionConfirm'
    }
  };
  transaction.textContent = 'Withdrawal ';
  input = 30;
  functions.accountClick(event, transaction, account, input, output);
  expect(account.bal).toBe(5);
  expect(output.textContent).toBe('Withdrew: $30.00');
  // test withdrawal with insufficient balance
  functions.accountClick(event, transaction, account, input, output);
  expect(output.textContent).toBe('Insufficient balance.');
  // test invalid input val
  input = 'xyz';
  functions.accountClick(event, transaction, account, input, output);
  expect(account.bal).toBe(5);

  // test balance
  event = {
    target: {
      id: 'idBtnBalance'
    }
  };
  functions.accountClick(event, transaction, account, input, output);
  expect(output.textContent).toBe('Current balance: $5.00');
});

// test bad event target
test('account click bad target', () => {
  let event = {
    target: {
      id: 'not an id'
    }
  };
  const transaction = document.createElement('span');
  transaction.textContent = 'Deposit ';
  const account = new Account('checkingAccount', 25);
  let input;
  const output = document.createElement('div');
  let msg;

  msg = functions.accountClick(event, transaction, account, input, output);
  expect(msg).toBe(undefined);
  expect(account.bal).toBe(25);
});

// *** 130c

test('controller add, remove', () => {
  const controller = new AccountController('controller');
  let msg;

  // test add
  controller.add('checking', 25);
  expect(controller.accounts[0].name).toBe('checking');
  expect(controller.accounts[0].bal).toBe(25);
  // test add no value
  controller.add('savings');
  expect(controller.accounts[1].name).toBe('savings');
  expect(controller.accounts[1].bal).toBe(0);

  // test remove
  msg = controller.remove('checking');
  expect(controller.accounts.length).toBe(1);
  // test remove non-existing account
  msg = controller.remove('not an account');
  expect(msg).toBe('error');
});

// test total, highest, lowest
test('controller total, highest, lowest', () => {
  const controller = new AccountController('controller');
  controller.accounts = [
    {name: 'checking',
      bal: 1},
    {name: 'savings',
      bal: 2},
    {name: 'investment',
      bal: 3},
  ];

  // test total
  expect(controller.total()).toBe(6);
  // test highest
  expect(controller.highest()).toEqual({name: 'investment', bal: 3});
  // test lowest
  expect(controller.lowest()).toEqual({name: 'checking', bal: 1});
});

// test total, highest, lowest errors with no accounts
test('controller total, highest, lowest', () => {
  const controller = new AccountController('controller');
  controller.accounts = [];

  // test total
  expect(controller.total()).toBe('error');
  // test highest
  expect(controller.highest()).toBe('error');
  // test lowest
  expect(controller.lowest()).toBe('error');
});

// test click fx
test('controller click add, remove', () => {
  let event = {};
  const controller = new AccountController('Lawrence');
  let inputName;
  let inputBalance;
  const output = document.createElement('div');
  const select = document.createElement('select');
  select.id = 'idSelect';
  const heading = document.createElement('h2');

  // test add
  event = {
    target: {
      id: 'idBtnCreateConfirm'
    }
  };
  inputName = 'checking';
  inputBalance = 25;
  functions.controlClick(
    event, 
    controller, 
    inputName, 
    inputBalance, 
    output, 
    select, 
    heading
  );
  expect(controller.accounts.length).toBe(1);
  expect(controller.accounts[0].name).toBe('checking');
  expect(controller.accounts[0].bal).toBe(25);
  expect(output.textContent).toBe('Added account: checking');

  // test add duplicate
  functions.controlClick(event, controller, inputName, inputBalance, output, select, heading);
  expect(output.textContent).toBe('Account already exists: checking');
  expect(controller.accounts.length).toBe(1);

  // test add bad value
  inputName = 'savings';
  inputBalance = 'xyz';
  functions.controlClick(event, controller, inputName, inputBalance, output, select, heading);
  expect(controller.accounts[1].bal).toBe(0);
  expect(output.textContent).toBe('Added account: savings');

  // test remove
  event = {
    target: {
      id: 'idBtnRemove'
    }
  };
  inputName = 'checking';
  functions.controlClick(event, controller, inputName, inputBalance, output, select, heading);
  expect(controller.accounts.length).toBe(1);
  expect(output.textContent).toBe('Removed account: checking');
  // test remove non-existing account
  functions.controlClick(event, controller, inputName, inputBalance, output, select, heading);
  functions.controlClick(event, controller, inputName, inputBalance, output, select, heading);
  expect(output.textContent).toBe('Account does not exist: ');
});

// test click total, highest, lowest
test('controller click total, highest, lowest', () => {
  let event = {};
  const controller = new AccountController('Lawrence');
  let inputName;
  let inputBalance;
  const output = document.createElement('div');

  controller.accounts = [
    {name: 'checking',
      bal: 1},
    {name: 'savings',
      bal: 2},
    {name: 'investment',
      bal: 3},
  ];

  // test total
  event = {
    target: {
      id: 'idBtnTotal'
    }
  };
  functions.controlClick(event, controller, inputName, inputBalance, output);
  expect(output.textContent).toBe('Total balance: $6.00');
  // test highest
  event = {
    target: {
      id: 'idBtnHighest'
    }
  };
  functions.controlClick(event, controller, inputName, inputBalance, output);
  expect(output.textContent).toBe('Highest: name: investment, balance: $3.00');
  // test lowest
  event = {
    target: {
      id: 'idBtnLowest'
    }
  };
  functions.controlClick(event, controller, inputName, inputBalance, output);
  expect(output.textContent).toBe('Lowest: name: checking, balance: $1.00');
});

// test click for total, highest, lowest errors with no accounts
test('controller click total, highest, lowest errors', () => {
  let event = {};
  const controller = new AccountController('Lawrence');
  let inputName;
  let inputBalance;
  const output = document.createElement('div');
  let msg;

  // test total
  event = {
    target: {
      id: 'idBtnTotal'
    }
  };
  functions.controlClick(event, controller, inputName, inputBalance, output);
  expect(output.textContent).toBe('No accounts.');
  // test highest
  event = {
    target: {
      id: 'idBtnHighest'
    }
  };
  functions.controlClick(event, controller, inputName, inputBalance, output);
  expect(output.textContent).toBe('No accounts.');
  // test lowest
  event = {
    target: {
      id: 'idBtnLowest'
    }
  };
  functions.controlClick(event, controller, inputName, inputBalance, output);
  expect(output.textContent).toBe('No accounts.');
});

// test bad event target
test('control click no target', () => {
  let event = {
    target: {
      id: 'not an id'
    }
  };
  const controller = new AccountController('Lawrence');
  let inputName;
  let inputBalance;
  const output = document.createElement('div');
  let msg;

  msg = functions.controlClick(event, controller, inputName, inputBalance, output);
  expect(msg).toBe(undefined);
  expect(controller.accounts.length).toBe(0);
});

// *** dynamic ui

test('select update', () => {
  const targetId = 'idBtnCreateConfirm';
  const inputName = 'savings';
  const select = document.createElement('select');
  functions.accountSelectUpdate(targetId, inputName, select)
  expect(select.childElementCount).toEqual(1);
  functions.accountSelectUpdate(targetId, inputName, select)
  expect(select.childElementCount).toEqual(2);
});

//test bad event target (do not modify select)
test('select update no target', () => {
  const targetId = 'not a target';
  const accountName = '';
  const select = {};
  functions.accountSelectUpdate(targetId, accountName, select)
  expect(select).toEqual({});
});

//test dynamic div displayer
test('div displayer', () => {
  const event = {
    target: {
      id: ''
    }
  };
  const transaction = document.createElement('span');
  const select = document.createElement('select');
  const divSelect = document.createElement('div'); 
  const divCreate = document.createElement('div'); 
  const divReport = document.createElement('div'); 
  const divAccount = document.createElement('div'); 
  const divTransaction = document.createElement('div');
  divSelect.style.display = 'initial';

  const testButtons = [
    ['idBtnAdd', divCreate, 'flex'],
    ['idBtnRemove', divSelect, 'none'],
    ['idBtnCreateConfirm', divCreate, 'none'],
    ['idBtnDeposit', divTransaction, 'flex'],
    ['idBtnWithdraw', divTransaction, 'flex'],
    ['idBtnTransactionConfirm', divTransaction, 'none'],
    ['bad id', divSelect, 'flex']
  ];
  testButtons.forEach( (v) => {
    event.target.id = v[0];
    functions.dynamicDivs(
      event,
      transaction,
      select,
      divSelect, 
      divCreate, 
      divReport, 
      divAccount, 
      divTransaction
    );
    expect(v[1].style.display).toBe(v[2]);
  });

  //do not hide if options remain after remove
  const option = document.createElement('option');
  select.appendChild(option);
  divSelect.style.display = 'flex';
  event.target.id = 'idBtnRemove';
  functions.dynamicDivs(
    event,
    transaction,
    select,
    divSelect, 
    divCreate, 
    divReport, 
    divAccount, 
    divTransaction
  );
  expect(divSelect.style.display).toBe('flex');

});

test('transaction update', () => {
  const event = {
    target: {
      id: ''
    }
  };
  const transaction = document.createElement('span');
  event.target.id = 'idBtnDeposit';
  functions.accountClick(event, transaction);
  expect(transaction.textContent).toBe('Deposit ');
  event.target.id = 'idBtnWithdraw';
  functions.accountClick(event, transaction);
  expect(transaction.textContent).toBe('Withdrawal ');
});