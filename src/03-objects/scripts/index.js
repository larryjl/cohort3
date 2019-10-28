import functions from './functions.js';
import {Account, AccountController} from './account.js';

const idDivControl = document.getElementById('idDivControl');
const idInpAccountName = document.getElementById('idInpAccountName');
const idInpAccountBalance = document.getElementById('idInpAccountBalance');
const idOutputController = document.getElementById('idOutputController');
const idDivAccount = document.getElementById('idDivAccount');
const idInpTransaction = document.getElementById('idInpTransaction');
const idOutputAccount = document.getElementById('idOutputAccount');

const controller = new AccountController('Lawrence');

// 130c add, remove, total, highest, lowest
idDivControl.addEventListener('click', (event) => {
  const inputName = idInpAccountName.value;
  const inputBalance = Math.floor(idInpAccountBalance.valueAsNumber * 100) / 100; // 2 decimal
  idInpAccountBalance.value = inputBalance;
  const output = idOutputController;
  functions.controlClick(event, controller, inputName, inputBalance, output);
});

// 130b deposit, withdraw, show balance
idDivAccount.addEventListener('click', (event) => {
  const accountName = idInpAccountName.value;
  const account = controller.accounts.find(
    (element) => element.name === accountName
  );
  // -- 2 decimal
  const input = Math.floor(idInpTransaction.valueAsNumber * 100) / 100; 
  idInpTransaction.value = input;
  const output = idOutputAccount;
  functions.accountClick(event, account, input, output);
});