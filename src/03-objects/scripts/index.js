import functions from './functions.js';
import {Account, AccountController} from './account.js';

const idMain = document.getElementById('idMain');
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
const idSpanTransaction = document.getElementById('idSpanTransaction');

// initial controller
let user;
// user = prompt('Please enter your username.', 'Anonymous')
user = (user === undefined) ? 'User' : user;
const controller = new AccountController();
idHControl.textContent = `Welcome back, ${user}`;

// *** Listeners ***

// heading updater
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
  const transaction = idSpanTransaction;
  const accountName = idSelAccounts.value;  
  // const accountName = idSelAccounts.options[idSelAccounts.selectedIndex].text; // -- alternate for getting select value
  const account = controller.accounts.find(
    (element) => {return element.name === accountName}
  );
  const input = Math.floor(idInpTransaction.valueAsNumber * 100) / 100; 
  // -- 2 decimal rounding
  idInpTransaction.value = input;
  const output = idOutputAccount;
  functions.accountClick(event, transaction, account, input, output);
});

// hide/show divs
idMain.addEventListener('click', (event) => {
  functions.dynamicDivs(
    event,
    idSpanTransaction,
    idSelAccounts,
    idDivSelect, 
    idDivCreate, 
    idDivReport, 
    idDivAccount, 
    idDivTransaction
  )
});