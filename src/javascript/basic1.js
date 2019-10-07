console.log("Hello world from basic.js");
let inputEle = document.getElementById('inputId');
let buttonEle = document.getElementById('buttonId');
let resultEle = document.getElementById('resultId');
let h1Ele = document.getElementById('h1Id');

function size(num) {
    if (num<10) {
        numSize = 'small'; }
    else if (num>=10 && num <=19) {
        numSize = 'medium'; }
    else if (num>=20) {
        numSize = 'large'; }
    string = num + ' is ' + numSize + '!';

    // add text showing the number size
    console.log(string);
    resultEle.innerText=string;
}

function onButtonClicked() {
    console.log('I\'m in the button click event');
    let value = inputEle.value;
    if (isNaN(value) || value.length ==0) {
      console.log('Not a number.');
      resultEle.innerText=(value + ' is not a valid number.');} 
    else { 
      let num = Number(value);
      console.log(value + ' + 1 = ' + (num + 1));
      size(value); };
}
let h1Text = h1Ele.innerText
function h1Hover() {
    if (h1Ele.innerText != 'something else') {
        h1Ele.innerText = 'something else';
    } else if (h1Ele.innerText != 'something more else') {
        h1Ele.innerText = 'something more else';
    }
};

h1Ele.addEventListener('mouseenter', function() {setTimeout(h1Hover,200)});
buttonEle.addEventListener('click', onButtonClicked );
