import React, {useState, useEffect} from 'react';
import {Stack} from './stack';
import {RecursiveStack} from './queue';
import styles from './Fifo.module.css';

function Fifo(props) {
  const [state, setState] = useState();
  useEffect(() => {
    // side effect
    return function cleanup() {
      // cleanup
    };
  });
  return (<main id="idMainLink">
    <h2>Stacks and Queues</h2>
    <div id={styles.container}>
      <StackComp
      />
      <QueueComp
      />
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