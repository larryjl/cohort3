import functions from './functions.js';
import {Controller} from './class.js';

// // define nodes
const idDivStats = document.getElementById('idDivStats');
const cityInputArr = [
  document.getElementById('idInpName'),
  document.getElementById('idInpLat'),
  document.getElementById('idInpLon'),
  document.getElementById('idInpPop')
];
const idBtnCreate = document.getElementById('idBtnCreate');
const idDivError = document.getElementById('idDivError');
const idDivCards = document.getElementById('idDivCards');

// initialize data
functions.error(true, '', idDivError); // store error div in functions
const controllerInst = new Controller();
const url = 'http://localhost:5000/';
functions.pull(controllerInst, url, idDivCards); // download from server
functions.showStats(controllerInst, idDivStats);

// // listeners
idBtnCreate.addEventListener('click', (event) => {
  functions.createCity(controllerInst, cityInputArr, url, idDivCards, idDivStats);
});

idDivCards.addEventListener('click', (event) => {
  functions.cardClick(event.target, controllerInst, url, idDivCards, idDivStats);
});
