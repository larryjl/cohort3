import functions from './functions.js';

// **********
//
// Add the event listeners
// 

idNumber.addEventListener('change', () => {
    idNumberSize.textContent = functions.size(idNumber.value);
});

// Calculator
const calcInput1Nd = document.getElementById('idCalcInput1');
const calcInput2Nd = document.getElementById('idCalcInput2');
const calcButtonNd = document.getElementById('idCalcButton');
const calcResultNd = document.getElementById('idCalcResult');
// const calcSubmitNd = document.getElementById('idCalcSubmit');

const calcNodes = [
    calcInput1Nd, 
    calcInput2Nd, 
    calcButtonNd]

calcNodes.forEach( function(v) {
    v.addEventListener('change', function(){
        calcResultNd.textContent = functions.calcSubmit( 
            calcInput1Nd.value, 
            calcInput2Nd.value, 
            calcButtonNd.value
        );
    });
});

// calcSubmitNd.addEventListener('click', function(){
//     functions.calcSubmit( 
//         calcResultNd,
//         calcInput1Nd.value, 
//         calcInput2Nd.value, 
//         calcButtonNd.value
//     );
// });

// tax
const taxInputNd = document.getElementById("idTaxInput");
const taxResultNd = document.getElementById("idTaxResult");
const taxNetNd = document.getElementById("idTaxNet");
taxInputNd.addEventListener('change', function() {
    let taxIncome = Number(taxInputNd.value);
    let taxTotal = functions.tax(taxIncome);
    taxResultNd.textContent = taxTotal;
    taxNetNd.textContent = functions.taxNet( taxIncome, taxTotal);
});

// Array
const arrayInputNd = document.getElementById("idArrayInput");
const arrayMsgNd = document.getElementById("idArrayMsg");
const arrayBtnAddNd = document.getElementById("idArrayBtnAdd");
const arrayBtnShowNd = document.getElementById("idArrayBtnShow");
const arrayBtnTotalNd = document.getElementById("idArrayBtnTotal");
const arrayBtnClearNd = document.getElementById("idArrayBtnClear");
const arrayBtns = [
    [arrayBtnAddNd, functions.arrayAdd],
    [arrayBtnShowNd, functions.arrayShow],
    [arrayBtnTotalNd, functions.arrayTotal],
    [arrayBtnClearNd, functions.arrayClear]
];
let array = [];
arrayBtns.forEach( function(a) {
    a[0].addEventListener('click', function(){
        let result = a[1](arrayInputNd.value, array);
        array = result[0];
        arrayMsgNd.textContent = result[1];
    })
});