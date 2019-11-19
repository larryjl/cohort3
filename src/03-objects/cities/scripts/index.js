import functions from './functions.js';
import {Controller} from './class.js';

// // define nodes
// // old
// const idSpanTotal = document.getElementById('idSpanTotal');
// const idSpanNorth = document.getElementById('idSpanNorth');
// const idSpanSouth = document.getElementById('idSpanSouth');
const statsArr = [
  document.getElementById('idSpanTotal'),
  document.getElementById('idSpanNorth'),
  document.getElementById('idSpanSouth')
]
const cityInputArr = [
  document.getElementById('idInpName'),
  document.getElementById('idInpLat'),
  document.getElementById('idInpLon'),
  document.getElementById('idInpPop')
];
const idBtnCreate = document.getElementById('idBtnCreate');
const errorNode = document.getElementById('idDivError');
const cardsNode = document.getElementById('idDivCards');

// initialize data
functions.error(true, '', errorNode); // store error div in functions
const controllerInst = new Controller();
const url = 'http://localhost:5000/';
functions.pull(controllerInst, url, cardsNode); // download from server
functions.stats(controllerInst, ...statsArr);

// // listeners
idBtnCreate.addEventListener('click', (event) => {
  functions.createCity(controllerInst, cityInputArr, url, cardsNode);
});

cardsNode.addEventListener('click', (event) => {
  functions.cardClick(event.target, controllerInst, url, cardsNode);
});
