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
const calcSubmitNd = document.getElementById('idCalcSubmit');

calcInput1Nd.addEventListener('change', function(){
    functions.calcSubmit( 
        calcResultNd,
        calcInput1Nd.value, 
        calcInput2Nd.value, 
        calcButtonNd.value
    );
});

calcInput2Nd.addEventListener('change', function(){
    functions.calcSubmit( 
        calcResultNd,
        calcInput1Nd.value, 
        calcInput2Nd.value, 
        calcButtonNd.value
    );
});

calcButtonNd.addEventListener('change', function(){
    functions.calcSubmit( 
        calcResultNd,
        calcInput1Nd.value, 
        calcInput2Nd.value, 
        calcButtonNd.value
    );
});

calcSubmitNd.addEventListener('click', function(){
    functions.calcSubmit( 
        calcResultNd,
        calcInput1Nd.value, 
        calcInput2Nd.value, 
        calcButtonNd.value
    );
});

// calcSubmitNd.addEventListener('click', functions.calcSubmit( 
//     calcResultNd,
//     calcInput1Nd.value, 
//     calcInput2Nd.value, 
//     calcButtonNd.value
// ));