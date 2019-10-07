console.log("Hello world from basic.js");
const inputNd = document.getElementById('inputId');
const buttonNd = document.getElementById('buttonId');
const resultNd = document.getElementById('resultId');
const h1Nd = document.getElementById('h1Id');

const size = (value) => {
    let numSize =
        (value<10) ? 'small': 
        (value>=10 && value <=19) ? 'medium':
        (value>=20) ? 'large':
        'not a valid number';
    return numSize;
};

const onButtonClicked = () => {
    console.log('I\'m in the button click event');
    let value = inputNd.value;
    value = (value.length===0) ? 0 : value;
    if (!isNaN(value)) {
        console.log( `${value} + 1 = ${Number(value) + 1}`);
        }
        else { console.log('not a number')};
    resultNd.innerText = `${value} is ${size(value)}.`;
};

// const someText = (string) => {
//     const newString =
//         (string != 'something else') ? 'something else' :
//         (string != 'something more else') ? 'something more else':
//         'something went wrong';
//     return newString;
// };

const scramble = (string) => {
    let array = string.split('');
    array.pop();
    let newArray = [];
    array.map( (letter,index) => {
        let rand = 0;
        let timeout = 0;
        do {
            rand = Math.round(Math.random()*(array.length));
            timeout++;
        } while (newArray[rand]!=undefined && timeout<100);
        newArray[rand]=letter;
        });
    const newString = newArray.join('')+'!';
    return newString;
};

const onH1Hover = () => {
    h1Nd.innerText = scramble(h1Nd.innerText)};

h1Nd.addEventListener('mouseenter', () => {setTimeout(onH1Hover,200)});
buttonNd.addEventListener('click', onButtonClicked );
