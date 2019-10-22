import functions from './functions.js';

// ** testing on index.html
// const fs = require('fs');
// const path = require('path');
// const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
// jest .dontMock('fs');

// beforeEach(() => {
//     document.documentElement.innerHTML = html.toString();
// });
// afterEach(() => {
//     // restore the original func after test
//     jest.resetModules();
// });
// ** End testing on index.html


// *** Part 1 ***

test('dom object', () => {
    expect(functions.collectionToObj([{name:'li'},{prop:'some prop'}])).
        toEqual({0:{name:'li'},1:{prop:'some prop'}});
});

test('dom new li- add and delete', () => {
    const ol = document.createElement('ol');
    const li = document.createElement('li');
    ol.appendChild( li);

    // test before function
    expect(ol.children.length).toBe(1);

    // run my function
    const newLi = functions.makeTag( 'li', 'myText', ['myClass']); //add
    ol.appendChild(newLi);
    functions.addDel(newLi); //del

    // test after function
    expect(ol.children.length).toBe(2);
    expect(newLi.firstElementChild.className).toBe('classBtnDel');
});

test('dom li delete click', () => {
    const ol = document.createElement('ol');
    const li = functions.makeTag('li');
    ol.appendChild(li);
    const newButton = functions.addDel(li);
    expect(ol.children.length).toBe(1);
    newButton.click();
    expect(ol.children.length).toBe(0);

})

// *** Part 2 ***

test('dom add card', () => {
    const panel = document.createElement('div');
    const addBtn = document.createElement('button');
    panel.appendChild( addBtn);

    // test before function
    expect(panel.children.length).toBe(1);

    // run my function
    const newCard = functions.addCard( panel);

    // test after function
    expect(panel.children.length).toBe(2);
});

test('dom make card buttons', () => {
    const newCard = document.createElement('div');
    expect( functions.cardContents( newCard, 1)[0].innerHTML).
        toEqual('Add Before');
    expect( functions.cardContents( newCard, 1)[1].innerHTML).
        toEqual('Add After');
    expect( functions.cardContents( newCard, 1)[2].innerHTML).
        toEqual('Delete');
});

test('dom button clicks', () => {
    const panel = document.createElement('div');
    const newCard = functions.addCard(panel);

    expect(panel.children.length).toBe(1);

    newCard.children[1].children[0].click() // add before
    expect(panel.children.length).toBe(2);

    newCard.children[1].children[1].click() // add after
    expect(panel.children.length).toBe(3);

    newCard.children[2].children[0].click() // delete
    expect(panel.children.length).toBe(2);
});

// *** main.js ***

// test( 'dom main clicks', () => {
    // ** to do...
// });