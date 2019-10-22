import functions from './functions.js';

const ndContainerA = document.getElementById('idContainerA');
const ndList = document.getElementById('idList');
const ndBtnShow = document.getElementById('idBtnShow');
const ndInputPos = document.getElementById('idInputPos');
const ndInput = document.getElementById('idInput');
const ndBtnAdd = document.getElementById('idBtnAdd');

ndContainerA.addEventListener('click', (param) => {
    // console.log(param); // disabled because it's annoying
    return param;
});
ndBtnShow.addEventListener('click', () => {
    const children = functions.collectionToObj( ndList.children)
    console.log( children);
    return children;
});

ndBtnAdd.addEventListener('click', () => {
    const newLi = functions.makeTag( 'li', ndInput.value, ['classLi']);
    ndList.appendChild(newLi);

    // set list item position
    const pos = ndInputPos.value-1;
    const ndPosition = ndList.children[pos];
    ndList.insertBefore(newLi, ndPosition);
    ndInputPos.max=ndList.children.length+1;

    // add delete button
    functions.addDel(newLi);
    return newLi;
});

const listChildren = functions.collectionToObj( ndList.children);
for (let key in listChildren) { 
    functions.addDel(listChildren[key]);
};

// *** part 2 ***

const ndLeftPanel = document.getElementById('idLeftPanel');
const ndBtnAddCard = document.getElementById('idBtnAddCard');

ndBtnAddCard.addEventListener('click', () => functions.addCard(ndLeftPanel));


export default {ndContainerA, ndBtnShow, ndBtnAdd, ndBtnAddCard};