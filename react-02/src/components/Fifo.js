import React, {useState, useEffect} from 'react';
// import Stack from './stack';
import {RecursiveStack} from './queue';
import fifoFunctions from './fifoFunctions';
import inputs from './inputs';
import { ReactComponent as IconUp } from '../svg/Icon_up.svg';
import { ReactComponent as IconLeft } from '../svg/Icon_left.svg';
import { ReactComponent as IconRight } from '../svg/Icon_right.svg';
import styles from './Fifo.module.css';

const {Button,} = inputs;

const stack = new RecursiveStack();

function Fifo(props) {
  const [inputs, setInputs] = useState({});
  useEffect(() => {
    // side effect
    return function cleanup() {
      // cleanup
    };
  });
  const callbacks = {
    forward: {f: fifoFunctions.forward, p: []},
    turnLeft: {f: fifoFunctions.turnLeft, p: []},
    turnRight: {f: fifoFunctions.turnRight, p: []}
  };
  const icons = {
    forward: IconUp,
    turnLeft: IconLeft,
    turnRight: IconRight
  };
  const buttons = (
    <div>
      {Object.keys(callbacks).map((v,i) => {
        const Icon = icons[v];
        return (
          <Button
            key={i}
            id={i}
            name={v}
            label={<Icon
              name={v}
              alt={v + ' button'}
              tabIndex="0"
              className={[styles.icon, styles.arrow].join(' ')}
            />}
            callbacks={callbacks}
            setInputs={setInputs}
            classes={styles.button}
          />
        )
      })}
    </div>
  );
  return (<main id="idMainLink">
    <h2>Stacks and Queues</h2>
    {buttons}
    <div id={styles.container}>
      {/* <StackComp
      />
      <QueueComp
      /> */}
    </div>
  </main>);
};

function StackComp(props) {
  const [state, setState] = useState();
  useEffect(() => {
    // side effect
    return function cleanup() {
      // cleanup
    };
  });
  return (<div>
    <h3>Stack</h3>

  </div>);
};

function QueueComp(props) {
  const [state, setState] = useState();
  useEffect(() => {
    // side effect
    return function cleanup() {
      // cleanup
    };
  });
  return (<div>
    <h3>Queue</h3>

  </div>);
};

export default Fifo;