import React, {useState, useEffect} from 'react';

function Link(props) {
  const [position, setPosition] = useState(0);
  useEffect(() => {
    // side effect
    return function cleanup() {
      // cleanup
    };
  });

  const nodeList = {
    head: new linkNode('a', 0, new linkNode('b', 1, new linkNode('c', 2, null)))
  };

  return (
    <div>
    </div>
  );
};

export default Link;