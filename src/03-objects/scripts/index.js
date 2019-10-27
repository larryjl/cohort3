import functions from './functions.js';
import Account from './account.js';

const idDivTransaction = document.getElementById('idDivTransaction');
const idInput = document.getElementById('idInput');
const idDivOutput = document.getElementById('idDivOutput');

const account = new Account('checkingAccount', 0);

idDivTransaction.addEventListener('click', (event) => {
  const input = idInput.valueAsNumber;
  const output = idDivOutput;
  functions.hearClick(event, account, input, output);
});