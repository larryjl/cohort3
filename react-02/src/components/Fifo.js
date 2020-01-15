import React, {useState, useEffect} from 'react';
// import Stack from './stack';
import {RecursiveStack} from './queue';
import fifoFunctions from './fifoFunctions';
import inputs from './inputs';
import { ReactComponent as IconUp } from '../svg/Icon_up.svg';
import { ReactComponent as IconLeft } from '../svg/Icon_left.svg';
import { ReactComponent as IconRight } from '../svg/Icon_right.svg';
import { ReactComponent as IconPlay } from '../svg/Icon_play.svg';
import styles from './Fifo.module.css';

const {Button,} = inputs;

const stack = new RecursiveStack();

function Fifo(props) {
  const [last, setLast] = useState({});
  const [position, setPosition] = useState(
    {point: [0,0], direction: [1,0]}
  );
  useEffect(() => {
    // side effect
    return function cleanup() {
      // cleanup
    };
  });
  const functions = {
    forward: {
      f: fifoFunctions.forward, 
      p: [position.point, position.direction, 1]
    },
    turnLeft: {
      f: fifoFunctions.turnLeft, 
      p: [position.point, position.direction]
    },
    turnRight: {
      f: fifoFunctions.turnRight, 
      p: [position.point, position.direction]
    }
  };
  // const icons = {
  //   forward: IconUp,
  //   turnLeft: IconLeft,
  //   turnRight: IconRight,
  //   runFifo: IconPlay,
  //   runLifo: IconPlay
  // };
  let count=0;
  const callbacks = {
    forward: {
      f: stack.push, 
      p: [{id: [count++], cmd: 'forward'}],
      i: IconUp
    },
    turnLeft: {
      f: stack.push, 
      p: [{id: [count++], cmd: 'turnLeft'}],
      i: IconLeft
      },
    turnRight: {
      f: stack.push, 
      p: [{id: [count++], cmd: 'turnRight'}],
      i: IconRight
    },
    runFifo: {
      f: runFifo, 
      p: [],
      i: IconPlay
    },
    runLifo: {
      f: runLifo, 
      p: [],
      i: IconPlay
    }
  };
  function runLifo() {
    while (!stack.isEmpty()) {
      const removed = stack.pop()
      setPosition(functions[removed.cmd].f(
        ...functions[removed.cmd].p
      ));
    };
  };
  function runFifo() {
    while (!stack.isEmpty()) {
      const removed = stack.dequeue()
      setPosition(functions[removed.cmd].f(
        ...functions[removed.cmd].p
      ));
    };
  };
  const buttons = (
    <div>
      {Object.keys(callbacks).map((v,i) => {
        const Icon = callbacks[v].i;
        return (
          <Button
            key={i}
            id={i}
            name={v}
            label={
              <Icon
                key={i}
                name={v}
                alt={v + ' button'}
                tabIndex="0"
                className={[styles.icon, styles.arrow].join(' ')}
              />
            }
            callbacks={callbacks}
            setInputs={setLast}
            classes={styles.button}
          />
        )
      })}
    </div>
  );
  return (
    <main id="idMainLink">
      <h2>Stacks and Queues</h2>
      {buttons}
      <div id={styles.container}>
      </div>
    </main>
  );
};

// function StackComp(props) {
//   const [state, setState] = useState();
//   useEffect(() => {
//     // side effect
//     return function cleanup() {
//       // cleanup
//     };
//   });
//   return (<div>
//     <h3>Stack</h3>

//   </div>);
// };

// function QueueComp(props) {
//   const [state, setState] = useState();
//   useEffect(() => {
//     // side effect
//     return function cleanup() {
//       // cleanup
//     };
//   });
//   return (<div>
//     <h3>Queue</h3>

//   </div>);
// };

export default Fifo;