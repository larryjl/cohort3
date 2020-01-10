import React, {useState, useEffect} from 'react';
import {
  // linkNode, 
  // linkList, 
  // linkListDummy, 
  linkListDouble,
  // functions
} from './link_biz';
import './link.css';

let data = [{}];
data = [
  {ingredient: 'bread', calories: 100},
  {ingredient: 'chicken', calories: 187},
  {ingredient: 'bacon', calories: 108},
  {ingredient: 'lettuce', calories: 5},
  {ingredient: 'tomato', calories: 8},
  {ingredient: 'mayonnaise', calories: 94},
  {ingredient: 'more bread', calories: 100}
];

const list = new linkListDouble(data);

function Link(props) {
  const [position, setPosition] = useState({
    node: {}, show: ''
  });
  const [summary, setSummary] = useState({
    showList: '', total: ''
  });
  const [inputInfo, setInputInfo] = useState({
    ingredient: '', calories: ''
  });
  useEffect(() => {
    // side effect
    return function cleanup() {
      // cleanup
    };
  });

  const functionsObj = {
    first: {f: list.first, p: []},
    last: {f: list.last, p: []},
    next: {f: list.next, p: [position.node]},
    previous: {f: list.previous, p: [position.node]},
    insert: {f: list.insert, p: [position.node, inputInfo]},
    delete: {f: list.delete, p: [position.node]},
  };

  const handleClick = (e) => {

    let fun = {};
    try {
      fun = functionsObj[e.target.name];
      const node = fun.f(...fun.p);
      console.log(node);
      setPosition({node: node, show: node.show()});
      setSummary({showList: list.showList(), total: list.total()});
    } catch (error) {
      console.log(error);
    };
  };
  let buttons = [];
  for (let k in functionsObj) {
    buttons.push(
      <button
        key = {k}
        name = {k}
        onClick = {(e) => {handleClick(e)}}
      >
        {k}
      </button>
    );
  };
  const handleInputChange = (e) => {
    setInputInfo({[e.target.name]: e.target.value});
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
          List: {summary.showList}
        </p>
        <p>
          Calories: {summary.total}
        </p>
        <p>
          Selected: {position.show}
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