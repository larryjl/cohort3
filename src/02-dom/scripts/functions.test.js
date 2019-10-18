import functions from './functions';


test('dom', () => {
    // first spike
    let div1 = document.createElement('div');
    div1.setAttribute('id', 'id1');
    expect(div1['id']).toEqual('id1');

    // second spike
    document.body.innerHTML = `
        <ol>
            <li id="id2">myText</li>
        </ol>
        `
    const li2 = document.getElementById('id2');
    const li2Text = li2.innerHTML; // Why doesn't innerText work?
    expect(li2Text).toEqual('myText');

    // third try
    let ol = document.createElement('ol');
    let li = document.createElement('li');
    ol.appendChild( li);

    // test before function
    expect(ol.children.length).toEqual(1);

    // run my function
    let newLi = functions.addTag( 'li', 'myText', ['myClass']);
    ol.appendChild(newLi);

    // test after function
    expect(ol.children.length).toEqual(2);

});