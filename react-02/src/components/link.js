import React, {useState, useEffect} from 'react';
import {
  linkNode, 
  linkList, 
  linkListDummy, 
  functions
} from './link_biz';

function Link(props) {
  const [position, setPosition] = useState(0);
  useEffect(() => {
    // side effect
    return function cleanup() {
      // cleanup
    };
  });

  return (
    <div>
    </div>
  );
};

export default Link;