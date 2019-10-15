import functions from './functions.js';

const ndContainer = document.getElementById('idContainer');
const ndList = document.getElementById('idList');
const ndBtnShow = document.getElementById('idBtnShow');
const ndInputPos = document.getElementById('idInputPos');
const ndInput = document.getElementById('idInput');
const ndBtnAdd = document.getElementById('idBtnAdd');

ndContainer.addEventListener('click', (param) => {
    // console.log(param); //disabled because it's annoying
});
ndBtnShow.addEventListener('click', () => {
    console.log( functions.collectionToObj( ndList.children));
});

ndBtnAdd.addEventListener('click', () => {
    let newLi = functions.addTag( 'li', ndInput.value, ['classLi']);
    ndList.appendChild(newLi);

    let pos= ndInputPos.value-1;
    let liPosition = ndList.children[pos];
    ndList.insertBefore(newLi, liPosition);
    ndInputPos.max=ndList.children.length+1;

    let newButton = functions.addBtnDel();
    newLi.appendChild(newButton);
});

const listChildren = functions.collectionToObj( ndList.children);
for (let key in listChildren) { 
    let newButton = functions.addBtnDel();
    listChildren[key].appendChild(newButton);
};


