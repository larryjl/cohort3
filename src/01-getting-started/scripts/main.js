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
const taxInput = document.getElementById("idTaxInput");
const taxResult = document.getElementById("idTaxResult");
taxInput.addEventListener('change', function() {
    taxResult.textContent = functions.tax( Number(taxInput.value));
});