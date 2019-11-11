import functions from './functions.js';
import {Controller} from './class.js';

const idSpanTotal = document.getElementById('idSpanTotal');
const idSpanNorth = document.getElementById('idSpanNorth');
const idSpanSouth = document.getElementById('idSpanSouth');
const cityInputArr = [
  document.getElementById('idInpName'),
  document.getElementById('idInpLat'),
  document.getElementById('idInpLon'),
  document.getElementById('idInpPop')
];
const idBtnCreate = document.getElementById('idBtnCreate');
const errorNode = document.getElementById('idDivError');
const cardsNode = document.getElementById('idDivCards');

const controllerInst = new Controller();

const url = 'http://localhost:5000/';

functions.error(true, errorNode); // store error div in functions
functions.cards(cardsNode); // store cards div in functions
functions.pull(controllerInst, url); // download from server

idBtnCreate.addEventListener('click', (event) => {
  functions.createCity(controllerInst, cityInputArr, url)
});
