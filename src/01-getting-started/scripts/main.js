import functions from './functions.js';

// **********
//
// Add the event listeners
// 

idNumber.addEventListener('change', () => {
    idNumberSize.textContent = functions.size(idNumber.value);
});

const calcButtonsNd = document.getElementsByClassName('classCalcButton');
calcButtonsNd.forEach( (node) => {
    node.addEventListener('click', calcButton(node.value));
});
const calcSubmitNd = document.getElementbyId('idCalcSubmit');
calcSubmitNd.addEventListener('click', calcSubmit(calcInputNd.value));

const calcInputNd = document.getElementbyId('idCalcInput');
calcInputNd.addEventListener('keypress', () => {
    if (event.keyCode === 13) {
        calcSubmit(calcInputNd.value);
    };
});