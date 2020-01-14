const functions = {
  forward(point, distance, direction) {
    // direction is an array: [1,0], [-1,0], [0,1] or [0,-1]
    return (point.map((v,i) => (
      v + (distance * direction[i])
    )));
  },
  turnLeft(prevDirection) {
    let [x, y] = prevDirection;
    // convert signed -0 to 0
    return [(-y)?-y:0, x];
    // switch (prevDirection) {
    //   case [0,1]:
    //     return [-1,0];
    //   case [-1,0]:
    //     return [0,-1];
    //   case [0,-1]:
    //     return [1,0];
    //   case [1,0]:
    //     return [0,1];
    //   default:
    //     return [-1,0];
    // };
  },
  turnRight(prevDirection) {
    let [x, y] = prevDirection;
    return [y, (-x)?-x:0];
  }
};

export default functions;