import React, {useState, useEffect} from 'react';
import {
  // linkNode, 
  linkList, 
  linkListDummy, 
  linkListDouble,
  functions
} from './link_biz';

function Link(props) {
  const [position, setPosition] = useState(null);
  const [listText, setListText] = useState('');
  const [total, setTotal] = useState(0);
  const [inputInfo, setInputInfo] = useState({ingredient: 'cheese', calories: 100})
  useEffect(() => {
    // side effect
    return function cleanup() {
      // cleanup
    };
  });
  const data = [
    {ingredient: 'bottom bread', calories: 100},
    {ingredient: 'chicken', calories: 187},
    {ingredient: 'bacon', calories: 108},
    {ingredient: 'lettuce', calories: 5},
    {ingredient: 'tomato', calories: 8},
    {ingredient: 'mayonnaise', calories: 94},
    {ingredient: 'top bread', calories: 100}
  ];
  const list = new linkListDouble(data);
  // setPosition(list.head);
  // setListText(list.showList());
  // setTotal(functions.total(list, 'calories'));
  const functionsObj = {
    first: {f: functions.first, p: [list]},
    last: {f: functions.last, p: [list]},
    next: {f: functions.next, p: [position]},
    previous: {f: functions.previousDouble, p: [position]},
    insert: {f: functions.insert, p: [position, inputInfo]},
    delete: {f: functions.delete, p: [list, position]},
  }
  const handleClick = (e) => {
    let fun = {};
    try {
      fun = functionsObj[e.target.name];
      setPosition(fun.f(...fun.p));
      setListText(list.showList());
      setTotal(functions.total(list, 'calories'));
    } catch (error) {
      console.log(error);
    };
  };
  let buttons = [];
  for (let i in functionsObj) {
    buttons.push(
      <button
        key = {i}
        name = {i}
        onClick = {(e) => {handleClick(e)}}
      >
        {i}
      </button>
    );
  };
  const handleInputChange = (e) => {
    switch (e.target.name) {
      case 'ingredient':
        setInputInfo({ingredient: e.target.value});
        break;
      case 'calories':
        setInputInfo({calories: e.target.value});
        break;
      default:
        // do nothing
    };
  };
  const input = (type, name) => {
    return (
      <input
        type={type}
        value={inputInfo[name]}
        name={name}
        onChange={(e) => handleInputChange(e)}
      ></input>
    );
  }
  return (
    <main id="idMainLink">
      <h2>Linked List</h2>
      <div>
        <p>
          List: {listText}
        </p>
        <p>
          Calories: {total}
        </p>
        <p>
          Selected: {(position)?position.show():null}
        </p>
      </div>
      <div>
        {buttons}
      </div>
      <div>
        {input('text', 'ingredient')}
        {input('number', 'calories')}
      </div>
    </main>
  );
};

export default Link;