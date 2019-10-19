import functions from './functions';


test('dom object', () => {
    expect(functions.collectionToObj([{name:'li'},{prop:'some prop'}])).
        toEqual({0:{name:'li'},1:{prop:'some prop'}});
});

test('dom new li- add and delete', () => {
    let ol = document.createElement('ol');
    let li = document.createElement('li');
    ol.appendChild( li);

    // test before function
    expect(ol.children.length).toBe(1);

    // run my function
    let newLi = functions.makeTag( 'li', 'myText', ['myClass']); //add
    ol.appendChild(newLi);
    functions.addDel(newLi); //del

    // test after function
    expect(ol.children.length).toBe(2);
    expect(newLi.firstElementChild.className).toBe('classBtnDel');
});

test('dom add card', () => {
    let panel = document.createElement('div');
    let addBtn = document.createElement('button');
    panel.appendChild( addBtn);

    // test before function
    expect(panel.children.length).toBe(1);

    // run my function
    let newCard = functions.addCard( panel);

    // test after function
    expect(panel.children.length).toBe(2);
});

test('dom make card buttons', () => {
    let newCard = document.createElement('div');
    expect( functions.cardContents( newCard, 1)[0].innerHTML).
        toEqual('Add Before');
    expect( functions.cardContents( newCard, 1)[1].innerHTML).
        toEqual('Add After');
    expect( functions.cardContents( newCard, 1)[2].innerHTML).
        toEqual('Delete');
});