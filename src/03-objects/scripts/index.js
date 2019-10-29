import functions from './functions.js';
import {Account, AccountController} from './account.js';

const idDivControl = document.getElementById('idDivControl');
const idSelAccounts = document.getElementById('idSelAccounts');
const idInpAccountName = document.getElementById('idInpAccountName');
const idInpAccountBalance = document.getElementById('idInpAccountBalance');
const idOutputController = document.getElementById('idOutputController');
const idDivAccount = document.getElementById('idDivAccount');
const idInpTransaction = document.getElementById('idInpTransaction');
const idOutputAccount = document.getElementById('idOutputAccount');
const idHControl = document.getElementById('idHControl');
const idHAccount = document.getElementById('idHAccount');
const dynamicDivs = document.getElementsByClassName('classDivDynamic');

// initial controller
const controller = new AccountController('Lawrence');
idHControl.textContent = `Welcome back, ${controller.name}`;

// Hide dynamic divs
for(const element of dynamicDivs) {
  element.style.display="none";
};

// *** Listeners ***

// ui updater
idSelAccounts.addEventListener('change', () => {
  functions.accountHeadingUpdate(idHAccount, idSelAccounts);
});

// 130c add, remove, total, highest, lowest
idDivControl.addEventListener('click', (event) => {
  const inputName = idInpAccountName.value;
  const inputBalance = Math.floor(idInpAccountBalance.valueAsNumber * 100) / 100; // 2 decimal rounding
  idInpAccountBalance.value = inputBalance; // display the rounded number
  const output = idOutputController;
  const select = idSelAccounts;
  const heading = idHAccount;
  functions.controlClick(
    event, 
    controller, 
    inputName, 
    inputBalance, 
    output, 
    select,
    heading
  );
});

// 130b deposit, withdraw, show balance
idDivAccount.addEventListener('click', (event) => {

  const accountName = idSelAccounts.value;  
  // const accountName = idSelAccounts.options[idSelAccounts.selectedIndex].text; // -- alternate for getting select value
  const account = controller.accounts.find(
    (element) => {return element.name === accountName}
  );
  const input = Math.floor(idInpTransaction.valueAsNumber * 100) / 100; 
  // -- 2 decimal rounding
  idInpTransaction.value = input;
  const output = idOutputAccount;
  functions.accountClick(event, account, input, output);
});